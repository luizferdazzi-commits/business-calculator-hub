import {unstable_cache} from 'next/cache';
import {GoogleAuth} from 'google-auth-library';
import {audienceSnapshot} from '../data/audience';

const propertyId=process.env.GA4_PROPERTY_ID||'550424201';
const api='https://analyticsdata.googleapis.com/v1beta/properties/'+propertyId;

async function token(){
  const email=process.env.GA4_CLIENT_EMAIL;
  const key=process.env.GA4_PRIVATE_KEY?.replace(/\\n/g,'\n');
  if(!email||!key) throw new Error('GA4 service account credentials are not configured');
  const auth=new GoogleAuth({credentials:{client_email:email,private_key:key},scopes:['https://www.googleapis.com/auth/analytics.readonly']});
  const client=await auth.getClient();
  const t=await client.getAccessToken();
  if(!t.token) throw new Error('Unable to obtain GA4 access token');
  return t.token;
}

async function post(path:string,body:any){
  const t=await token();
  const r=await fetch(api+path,{method:'POST',headers:{Authorization:'Bearer '+t,'Content-Type':'application/json'},body:JSON.stringify(body),cache:'no-store'});
  if(!r.ok) throw new Error('GA4 '+path+' failed: '+r.status+' '+await r.text());
  return r.json();
}
async function safeReport(body:any,label:string){try{return await post(':runReport',body)}catch(e){console.error('GA4 optional report failed ['+label+']',e);return {rows:[]}}}
const num=(v:any)=>Number(v?.value||v||0);
const metric=(row:any,i:number)=>num(row?.metricValues?.[i]);
const dim=(row:any,i:number)=>row?.dimensionValues?.[i]?.value||'';
const growth=(now:number,prev:number)=>prev?Math.round((now-prev)/prev*1000)/10:(now?100:0);
const metrics=[{name:'activeUsers'},{name:'sessions'},{name:'screenPageViews'}];
const metricReport=(startDate:string,endDate:string)=>({dateRanges:[{startDate,endDate}],metrics});

const aiPlatform=(source:string)=>{const s=source.toLowerCase();if(s.includes('chatgpt')||s.includes('openai'))return'ChatGPT / OpenAI';if(s.includes('perplexity'))return'Perplexity';if(s.includes('gemini')||s.includes('bard.google'))return'Gemini';if(s.includes('copilot')||s.includes('bing.com/chat'))return'Copilot';if(s.includes('claude'))return'Claude';if(s.includes('poe.com'))return'Poe';if(s.includes('you.com'))return'You.com';if(s.includes('phind'))return'Phind';return null};

async function loadHistorical(){
  const monthlyReport=await post(':runReport',metricReport('29daysAgo','today'));
  const [weeklyReport,previousWeeklyReport,last3Report,previous3Report,countries,content,daily,channels,sources,aiLandings]=await Promise.all([
    safeReport(metricReport('6daysAgo','today'),'weekly'),
    safeReport(metricReport('13daysAgo','7daysAgo'),'previousWeekly'),
    safeReport(metricReport('2daysAgo','today'),'last3'),
    safeReport(metricReport('5daysAgo','3daysAgo'),'previous3'),
    safeReport({dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'country'}],metrics:[{name:'activeUsers'}],orderBys:[{metric:{metricName:'activeUsers'},desc:true}],limit:50},'countries'),
    safeReport({dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'pagePath'},{name:'pageTitle'}],metrics:[{name:'screenPageViews'}],orderBys:[{metric:{metricName:'screenPageViews'},desc:true}],limit:50},'content'),
    safeReport({dateRanges:[{startDate:'13daysAgo',endDate:'today'}],dimensions:[{name:'date'}],metrics,orderBys:[{dimension:{dimensionName:'date'},desc:false}],limit:20},'daily'),
    safeReport({dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'sessionDefaultChannelGroup'}],metrics,orderBys:[{metric:{metricName:'sessions'},desc:true}],limit:20},'channels'),
    safeReport({dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'sessionSource'},{name:'sessionMedium'}],metrics,orderBys:[{metric:{metricName:'sessions'},desc:true}],limit:100},'sources'),
    safeReport({dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'sessionSource'},{name:'landingPagePlusQueryString'}],metrics,orderBys:[{metric:{metricName:'sessions'},desc:true}],limit:250},'aiLandings')
  ]);

  const monthly=monthlyReport.rows?.[0]||{},weekly=weeklyReport.rows?.[0]||{},previousWeekly=previousWeeklyReport.rows?.[0]||{},last3=last3Report.rows?.[0]||{},previous3=previous3Report.rows?.[0]||{};
  const countryRows=countries.rows||[];const monthlyUsers=metric(monthly,0);
  const topMarkets=countryRows.slice(0,8).map((r:any)=>({country:dim(r,0)||'Unknown',users:metric(r,0),share:monthlyUsers?Math.round(metric(r,0)/monthlyUsers*10000)/100:0}));

  const seen=new Set<string>();const topContent:any[]=[];
  for(const r of content.rows||[]){const path=dim(r,0)||'/';if(seen.has(path)||path.startsWith('/advertise'))continue;seen.add(path);topContent.push({path,label:dim(r,1)||path,views:metric(r,0)});if(topContent.length===15)break;}
  const dailyTrend=(daily.rows||[]).map((r:any)=>({date:dim(r,0),activeUsers:metric(r,0),sessions:metric(r,1),pageViews:metric(r,2)}));
  const trafficChannels=(channels.rows||[]).map((r:any)=>({channel:dim(r,0)||'Unassigned',activeUsers:metric(r,0),sessions:metric(r,1),pageViews:metric(r,2)}));
  const sourceMedium=(sources.rows||[]).map((r:any)=>({source:dim(r,0)||'(direct)',medium:dim(r,1)||'(none)',activeUsers:metric(r,0),sessions:metric(r,1),pageViews:metric(r,2)}));

  const platformMap=new Map<string,{platform:string;sessions:number;pageViews:number;sources:Set<string>}>();
  for(const x of sourceMedium){const platform=aiPlatform(x.source);if(!platform)continue;const cur=platformMap.get(platform)||{platform,sessions:0,pageViews:0,sources:new Set<string>()};cur.sessions+=x.sessions;cur.pageViews+=x.pageViews;cur.sources.add(x.source);platformMap.set(platform,cur)}
  const platforms=[...platformMap.values()].map(x=>({platform:x.platform,sessions:x.sessions,pageViews:x.pageViews,sources:[...x.sources]})).sort((a,b)=>b.sessions-a.sessions);
  const landingMap=new Map<string,{path:string;sessions:number;pageViews:number;platforms:Set<string>}>();
  for(const r of aiLandings.rows||[]){const source=dim(r,0),platform=aiPlatform(source);if(!platform)continue;const path=dim(r,1)||'/';const cur=landingMap.get(path)||{path,sessions:0,pageViews:0,platforms:new Set<string>()};cur.sessions+=metric(r,1);cur.pageViews+=metric(r,2);cur.platforms.add(platform);landingMap.set(path,cur)}
  const landingPages=[...landingMap.values()].map(x=>({path:x.path,sessions:x.sessions,pageViews:x.pageViews,platforms:[...x.platforms]})).sort((a,b)=>b.sessions-a.sessions).slice(0,20);
  const aiReferrals={sessions:platforms.reduce((n,x)=>n+x.sessions,0),pageViews:platforms.reduce((n,x)=>n+x.pageViews,0),platforms,landingPages,note:'Sessions and pageviews are additive traffic metrics; do not present sessions as unique people.'};

  const organic=trafficChannels.find((x:any)=>x.channel==='Organic Search')||{activeUsers:0,sessions:0,pageViews:0};
  const direct=trafficChannels.find((x:any)=>x.channel==='Direct')||{activeUsers:0,sessions:0,pageViews:0};
  const referral=trafficChannels.find((x:any)=>x.channel==='Referral')||{activeUsers:0,sessions:0,pageViews:0};
  const social=trafficChannels.filter((x:any)=>String(x.channel).includes('Social')).reduce((a:any,x:any)=>({activeUsers:a.activeUsers+x.activeUsers,sessions:a.sessions+x.sessions,pageViews:a.pageViews+x.pageViews}),{activeUsers:0,sessions:0,pageViews:0});
  const customChannels={aiReferral:{sessions:aiReferrals.sessions,pageViews:aiReferrals.pageViews},organicSearch:organic,paidSearch:trafficChannels.find((x:any)=>x.channel==='Paid Search')||{activeUsers:0,sessions:0,pageViews:0},direct,referral,other:trafficChannels.filter((x:any)=>!['Organic Search','Paid Search','Direct','Referral'].includes(x.channel))};

  return {...audienceSnapshot,source:'Google Analytics 4 · synchronized',propertyId,updatedAt:new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short',timeZone:'America/Sao_Paulo'}).format(new Date()),periodLabel:'Últimos 30 dias',
    monthly:{activeUsers:metric(monthly,0),sessions:metric(monthly,1),pageViews:metric(monthly,2),countries:countryRows.length},
    weekly:{activeUsers:metric(weekly,0),sessions:metric(weekly,1),pageViews:metric(weekly,2),previous:{activeUsers:metric(previousWeekly,0),sessions:metric(previousWeekly,1),pageViews:metric(previousWeekly,2)},activeUsersGrowthPct:growth(metric(weekly,0),metric(previousWeekly,0)),sessionsGrowthPct:growth(metric(weekly,1),metric(previousWeekly,1)),pageViewsGrowthPct:growth(metric(weekly,2),metric(previousWeekly,2)),comparisonLabel:'vs. 7 dias anteriores'},
    last3Days:{activeUsers:metric(last3,0),sessions:metric(last3,1),pageViews:metric(last3,2),previous:{activeUsers:metric(previous3,0),sessions:metric(previous3,1),pageViews:metric(previous3,2)},activeUsersGrowthPct:growth(metric(last3,0),metric(previous3,0)),sessionsGrowthPct:growth(metric(last3,1),metric(previous3,1)),pageViewsGrowthPct:growth(metric(last3,2),metric(previous3,2)),comparisonLabel:'vs. 3 dias anteriores'},
    acquisition:{organic,direct,referral,social,channels:trafficChannels,sourceMedium,customChannels},aiReferrals,dailyTrend,topMarkets,topContent};
}

async function loadRealtime(){const r=await post(':runRealtimeReport',{minuteRanges:[{startMinutesAgo:29,endMinutesAgo:0}],metrics:[{name:'activeUsers'}]});return metric(r.rows?.[0],0)}
const cachedHistorical=unstable_cache(loadHistorical,['ga4-audience-v5-ai-referrals'],{revalidate:900});
const cachedRealtime=unstable_cache(loadRealtime,['ga4-realtime-v5'],{revalidate:60});
export async function getAudienceData(){try{const data=await cachedHistorical();let liveNow:null|number=null;try{liveNow=await cachedRealtime()}catch(e){console.error('GA4 realtime query failed; historical audience remains available',e)}return {...data,liveNow}}catch(e){console.error('GA4 historical audience fallback',e);return {...audienceSnapshot,liveNow:null,source:'Google Analytics 4 · fallback snapshot',error:'Historical GA4 query failed'}}}

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
const num=(v:any)=>Number(v?.value||v||0);
const metric=(row:any,i:number)=>num(row?.metricValues?.[i]);
const dim=(row:any,i:number)=>row?.dimensionValues?.[i]?.value||'';
const growth=(now:number,prev:number)=>prev?Math.round((now-prev)/prev*1000)/10:(now?100:0);
const metrics=[{name:'activeUsers'},{name:'sessions'},{name:'screenPageViews'}];

async function loadHistorical(){
  const [summary,countries,content,daily,channels,sources]=await Promise.all([
    post(':runReport',{dateRanges:[
      {startDate:'29daysAgo',endDate:'today',name:'monthly'},
      {startDate:'6daysAgo',endDate:'today',name:'weekly'},
      {startDate:'13daysAgo',endDate:'7daysAgo',name:'previousWeekly'},
      {startDate:'2daysAgo',endDate:'today',name:'last3'},
      {startDate:'5daysAgo',endDate:'3daysAgo',name:'previous3'}
    ],metrics}),
    post(':runReport',{dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'country'}],metrics:[{name:'activeUsers'}],orderBys:[{metric:{metricName:'activeUsers'},desc:true}],limit:50}),
    post(':runReport',{dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'pagePath'},{name:'pageTitle'}],metrics:[{name:'screenPageViews'}],orderBys:[{metric:{metricName:'screenPageViews'},desc:true}],limit:25}),
    post(':runReport',{dateRanges:[{startDate:'13daysAgo',endDate:'today'}],dimensions:[{name:'date'}],metrics,orderBys:[{dimension:{dimensionName:'date'},desc:false}],limit:20}),
    post(':runReport',{dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'sessionDefaultChannelGroup'}],metrics,orderBys:[{metric:{metricName:'sessions'},desc:true}],limit:20}),
    post(':runReport',{dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'sessionSource'},{name:'sessionMedium'}],metrics,orderBys:[{metric:{metricName:'sessions'},desc:true}],limit:25})
  ]);

  const rows=summary.rows||[];
  const monthly=rows[0]||{},weekly=rows[1]||{},previousWeekly=rows[2]||{},last3=rows[3]||{},previous3=rows[4]||{};
  const countryRows=countries.rows||[];
  const monthlyUsers=metric(monthly,0);
  const topMarkets=countryRows.slice(0,8).map((r:any)=>({country:dim(r,0)||'Unknown',users:metric(r,0),share:monthlyUsers?Math.round(metric(r,0)/monthlyUsers*10000)/100:0}));

  const seen=new Set<string>(); const topContent:any[]=[];
  for(const r of content.rows||[]){
    const path=dim(r,0)||'/';
    if(seen.has(path)||path.startsWith('/advertise'))continue;
    seen.add(path);
    topContent.push({path,label:dim(r,1)||path,views:metric(r,0)});
    if(topContent.length===10)break;
  }

  const dailyTrend=(daily.rows||[]).map((r:any)=>({
    date:dim(r,0),
    activeUsers:metric(r,0),
    sessions:metric(r,1),
    pageViews:metric(r,2)
  }));

  const trafficChannels=(channels.rows||[]).map((r:any)=>({
    channel:dim(r,0)||'Unassigned',
    activeUsers:metric(r,0),
    sessions:metric(r,1),
    pageViews:metric(r,2)
  }));

  const sourceMedium=(sources.rows||[]).map((r:any)=>({
    source:dim(r,0)||'(direct)',
    medium:dim(r,1)||'(none)',
    activeUsers:metric(r,0),
    sessions:metric(r,1),
    pageViews:metric(r,2)
  }));

  const organic=trafficChannels.find((x:any)=>x.channel==='Organic Search')||{activeUsers:0,sessions:0,pageViews:0};
  const direct=trafficChannels.find((x:any)=>x.channel==='Direct')||{activeUsers:0,sessions:0,pageViews:0};
  const referral=trafficChannels.find((x:any)=>x.channel==='Referral')||{activeUsers:0,sessions:0,pageViews:0};
  const social=trafficChannels.filter((x:any)=>String(x.channel).includes('Social')).reduce((a:any,x:any)=>({activeUsers:a.activeUsers+x.activeUsers,sessions:a.sessions+x.sessions,pageViews:a.pageViews+x.pageViews}),{activeUsers:0,sessions:0,pageViews:0});

  return {
    ...audienceSnapshot,
    source:'Google Analytics 4 · synchronized',
    propertyId,
    updatedAt:new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short',timeZone:'America/Sao_Paulo'}).format(new Date()),
    periodLabel:'Últimos 30 dias',
    monthly:{activeUsers:metric(monthly,0),sessions:metric(monthly,1),pageViews:metric(monthly,2),countries:countryRows.length},
    weekly:{
      activeUsers:metric(weekly,0),sessions:metric(weekly,1),pageViews:metric(weekly,2),
      previous:{activeUsers:metric(previousWeekly,0),sessions:metric(previousWeekly,1),pageViews:metric(previousWeekly,2)},
      activeUsersGrowthPct:growth(metric(weekly,0),metric(previousWeekly,0)),
      sessionsGrowthPct:growth(metric(weekly,1),metric(previousWeekly,1)),
      pageViewsGrowthPct:growth(metric(weekly,2),metric(previousWeekly,2)),
      comparisonLabel:'vs. 7 dias anteriores'
    },
    last3Days:{
      activeUsers:metric(last3,0),sessions:metric(last3,1),pageViews:metric(last3,2),
      previous:{activeUsers:metric(previous3,0),sessions:metric(previous3,1),pageViews:metric(previous3,2)},
      activeUsersGrowthPct:growth(metric(last3,0),metric(previous3,0)),
      sessionsGrowthPct:growth(metric(last3,1),metric(previous3,1)),
      pageViewsGrowthPct:growth(metric(last3,2),metric(previous3,2)),
      comparisonLabel:'vs. 3 dias anteriores'
    },
    acquisition:{organic,direct,referral,social,channels:trafficChannels,sourceMedium},
    dailyTrend,
    topMarkets,
    topContent
  };
}
async function loadRealtime(){
  const r=await post(':runRealtimeReport',{minuteRanges:[{startMinutesAgo:29,endMinutesAgo:0}],metrics:[{name:'activeUsers'}]});
  return metric(r.rows?.[0],0);
}
const cachedHistorical=unstable_cache(loadHistorical,['ga4-audience-v2'],{revalidate:900});
const cachedRealtime=unstable_cache(loadRealtime,['ga4-realtime-v2'],{revalidate:60});

export async function getAudienceData(){
  try{
    const [data,liveNow]=await Promise.all([cachedHistorical(),cachedRealtime()]);
    return {...data,liveNow};
  }catch(e){
    console.error('GA4 live audience fallback',e);
    return {...audienceSnapshot,liveNow:null,source:'Google Analytics 4 · fallback snapshot',error:'Live GA4 query failed'};
  }
}

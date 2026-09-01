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
const growth=(now:number,prev:number)=>prev?Math.round((now-prev)/prev*100):(now?100:0);

async function loadHistorical(){
  const summary=await post(':runReport',{dateRanges:[
    {startDate:'29daysAgo',endDate:'today',name:'monthly'},
    {startDate:'6daysAgo',endDate:'today',name:'weekly'},
    {startDate:'13daysAgo',endDate:'7daysAgo',name:'previous'}],
    metrics:[{name:'activeUsers'},{name:'sessions'},{name:'screenPageViews'}]});
  const rows=summary.rows||[];
  const monthly=rows[0]||{},weekly=rows[1]||{},previous=rows[2]||{};
  const countries=await post(':runReport',{dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'country'}],metrics:[{name:'activeUsers'}],orderBys:[{metric:{metricName:'activeUsers'},desc:true}],limit:50});
  const countryRows=countries.rows||[];
  const monthlyUsers=metric(monthly,0);
  const topMarkets=countryRows.slice(0,5).map((r:any)=>({country:r.dimensionValues?.[0]?.value||'Unknown',users:metric(r,0),share:monthlyUsers?metric(r,0)/monthlyUsers*100:0}));
  const content=await post(':runReport',{dateRanges:[{startDate:'29daysAgo',endDate:'today'}],dimensions:[{name:'pagePath'},{name:'pageTitle'}],metrics:[{name:'screenPageViews'}],orderBys:[{metric:{metricName:'screenPageViews'},desc:true}],limit:25});
  const seen=new Set<string>(); const topContent:any[]=[];
  for(const r of content.rows||[]){const path=r.dimensionValues?.[0]?.value||'/';if(seen.has(path)||path.startsWith('/advertise'))continue;seen.add(path);topContent.push({path,label:r.dimensionValues?.[1]?.value||path,views:metric(r,0)});if(topContent.length===5)break;}
  return {...audienceSnapshot,source:'Google Analytics 4 · synchronized',updatedAt:new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Sao_Paulo'}).format(new Date()),monthly:{activeUsers:metric(monthly,0),sessions:metric(monthly,1),pageViews:metric(monthly,2),countries:countryRows.length},weekly:{activeUsers:metric(weekly,0),sessions:metric(weekly,1),pageViews:metric(weekly,2),activeUsersGrowthPct:growth(metric(weekly,0),metric(previous,0)),sessionsGrowthPct:growth(metric(weekly,1),metric(previous,1)),pageViewsGrowthPct:growth(metric(weekly,2),metric(previous,2)),comparisonLabel:'vs. previous 7 days'},topMarkets,topContent};
}
async function loadRealtime(){
  const r=await post(':runRealtimeReport',{minuteRanges:[{startMinutesAgo:29,endMinutesAgo:0}],metrics:[{name:'activeUsers'}]});
  return metric(r.rows?.[0],0);
}
const cachedHistorical=unstable_cache(loadHistorical,['ga4-audience-v2'],{revalidate:900});
const cachedRealtime=unstable_cache(loadRealtime,['ga4-realtime-v1'],{revalidate:60});
export async function getAudienceData(){
  try{const [data,liveNow]=await Promise.all([cachedHistorical(),cachedRealtime()]);return {...data,liveNow};}
  catch(e){console.error('GA4 live audience fallback',e);return {...audienceSnapshot,liveNow:null,source:'Google Analytics 4 · fallback snapshot'};}
}
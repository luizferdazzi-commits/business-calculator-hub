import {NextResponse} from 'next/server';
import {getAudienceData} from '../../lib/ga4';
import {audienceSnapshot} from '../../data/audience';

export const dynamic='force-dynamic';export const revalidate=0;
const base='https://business-calculator-hub.vercel.app';
const seeds=[
 {q:'How much should I charge as a freelancer?',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/how-much-should-i-charge-as-a-freelancer',type:'pillar',commercial:'high'},
 {q:'Freelance rate calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/freelance-rate-calculator',type:'calculator',commercial:'high'},
 {q:'Freelance hourly rate calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/freelance-rate-calculator',type:'calculator',commercial:'high'},
 {q:'Freelance project price calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/fixed-project-price-calculator',type:'calculator',commercial:'high'},
 {q:'Freelance day rate calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/freelance-day-rate-calculator',type:'guide',commercial:'high'},
 {q:'Salary to freelance rate calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/freelance-vs-salary-calculator',type:'calculator',commercial:'high'},
 {q:'Hourly rate to project price calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/fixed-project-price-calculator',type:'calculator',commercial:'high'},
 {q:'Consulting rate calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/consulting-rate-calculator',type:'guide',commercial:'high'},
 {q:'Contractor hourly rate calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/contractor-hourly-rate-calculator',type:'guide',commercial:'high'},
 {q:'Self employed hourly rate calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/self-employed-hourly-rate-calculator',type:'guide',commercial:'high'},
 {q:'$25 an hour is how much a year',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/25-an-hour-is-how-much-a-year',type:'guide',commercial:'medium'},
 {q:'$30 an hour is how much a year',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/30-an-hour-is-how-much-a-year',type:'guide',commercial:'medium'},
 {q:'$35 an hour is how much a year',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/35-an-hour-is-how-much-a-year',type:'guide',commercial:'medium'},
 {q:'$40 an hour is how much a year',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/40-an-hour-is-how-much-a-year',type:'guide',commercial:'medium'},
 {q:'$50 an hour is how much a year',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/50-an-hour-is-how-much-a-year',type:'guide',commercial:'medium'},
 {q:'$75 an hour is how much a year',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/75-an-hour-is-how-much-a-year',type:'guide',commercial:'medium'},
 {q:'$100 an hour is how much a year',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/100-an-hour-is-how-much-a-year',type:'guide',commercial:'medium'},
 {q:'60k salary hourly rate',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/60k-salary-is-how-much-an-hour',type:'guide',commercial:'medium'},
 {q:'75k salary hourly rate',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/75k-salary-is-how-much-an-hour',type:'guide',commercial:'medium'},
 {q:'100k salary hourly rate',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/100k-salary-is-how-much-an-hour',type:'guide',commercial:'medium'},
 {q:'120k salary hourly rate',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/120k-salary-is-how-much-an-hour',type:'guide',commercial:'medium'},
 {q:'150k salary hourly rate',market:'Global / US',lang:'en',cluster:'Salary',path:'/guides/150k-salary-is-how-much-an-hour',type:'guide',commercial:'medium'},
 {q:'How much should a freelance developer charge?',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/freelance-developer-hourly-rate',type:'guide',commercial:'high'},
 {q:'How much should a freelance designer charge?',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/freelance-designer-hourly-rate',type:'guide',commercial:'high'},
 {q:'How much should a freelance marketer charge?',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/freelance-marketer-hourly-rate',type:'guide',commercial:'high'},
 {q:'How much should a freelance copywriter charge?',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/freelance-copywriter-hourly-rate',type:'guide',commercial:'high'},
 {q:'Freelance web developer hourly rate',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/freelance-web-developer-hourly-rate',type:'guide',commercial:'high'},
 {q:'Freelance graphic designer hourly rate',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/freelance-graphic-designer-hourly-rate',type:'guide',commercial:'high'},
 {q:'Freelance consultant hourly rate',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/freelance-consultant-hourly-rate',type:'guide',commercial:'high'},
 {q:'Retainer pricing calculator',market:'Global / US',lang:'en',cluster:'Freelance',path:'/guides/retainer-pricing-calculator',type:'guide',commercial:'high'},
 {q:'Quanto cobrar por hora freelancer?',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/quanto-cobrar-por-hora-freelancer',type:'pillar',commercial:'high'},
 {q:'Calculadora valor hora freelancer',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/calculadora-freelancer',type:'calculator',commercial:'high'},
 {q:'Quanto cobrar por projeto freelancer?',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/quanto-cobrar-por-projeto-freelancer',type:'guide',commercial:'high'},
 {q:'Calculadora preço de projeto',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/fixed-project-price-calculator',type:'calculator',commercial:'high'},
 {q:'Quanto cobrar por consultoria?',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/quanto-cobrar-por-consultoria',type:'guide',commercial:'high'},
 {q:'Valor hora consultor',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/valor-hora-consultor',type:'guide',commercial:'high'},
 {q:'CLT ou PJ 5000',market:'Brazil',lang:'pt-BR',cluster:'CLT',path:'/pt-br/guias/clt-ou-pj-5000',type:'guide',commercial:'high'},
 {q:'CLT ou PJ 8000',market:'Brazil',lang:'pt-BR',cluster:'CLT',path:'/pt-br/guias/clt-ou-pj-8000',type:'guide',commercial:'high'},
 {q:'CLT ou PJ 10000',market:'Brazil',lang:'pt-BR',cluster:'CLT',path:'/pt-br/guias/clt-ou-pj-10000',type:'guide',commercial:'high'},
 {q:'CLT ou PJ 15000',market:'Brazil',lang:'pt-BR',cluster:'CLT',path:'/pt-br/guias/clt-ou-pj-15000',type:'guide',commercial:'high'},
 {q:'Calculadora CLT x PJ',market:'Brazil',lang:'pt-BR',cluster:'CLT',path:'/pt-br/calculadora-clt-pj',type:'calculator',commercial:'high'},
 {q:'Salário líquido 5000',market:'Brazil',lang:'pt-BR',cluster:'Salary',path:'/pt-br/guias/salario-liquido-5000',type:'guide',commercial:'medium'},
 {q:'Salário líquido 8000',market:'Brazil',lang:'pt-BR',cluster:'Salary',path:'/pt-br/guias/salario-liquido-8000',type:'guide',commercial:'medium'},
 {q:'Salário líquido 10000',market:'Brazil',lang:'pt-BR',cluster:'Salary',path:'/pt-br/guias/salario-liquido-10000',type:'guide',commercial:'medium'},
 {q:'Quanto cobrar por site?',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/quanto-cobrar-por-site',type:'guide',commercial:'high'},
 {q:'Quanto cobrar social media?',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/quanto-cobrar-social-media',type:'guide',commercial:'high'},
 {q:'Quanto cobrar gestão de tráfego?',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/quanto-cobrar-gestao-de-trafego',type:'guide',commercial:'high'},
 {q:'Quanto cobrar designer freelancer?',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/quanto-cobrar-designer-freelancer',type:'guide',commercial:'high'},
 {q:'Quanto cobrar programador freelancer?',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/quanto-cobrar-programador-freelancer',type:'guide',commercial:'high'},
 {q:'Quanto cobrar consultoria empresarial?',market:'Brazil',lang:'pt-BR',cluster:'Freelance',path:'/pt-br/guias/quanto-cobrar-consultoria-empresarial',type:'guide',commercial:'high'}
];
const timeout=<T,>(promise:Promise<T>,ms:number,fallback:T)=>Promise.race<T>([promise,new Promise<T>(resolve=>setTimeout(()=>resolve(fallback),ms))]);
async function sitemapPaths(){try{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),5000);const r=await fetch(base+'/sitemap.xml',{next:{revalidate:3600},signal:controller.signal});clearTimeout(timer);if(!r.ok)return new Set<string>();const text=await r.text();return new Set([...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname))}catch{return new Set<string>()}}
export async function GET(){
 const audienceFallback:any={...audienceSnapshot,liveNow:null,source:'Fallback snapshot'};
 const [audience,paths]=await Promise.all([timeout(getAudienceData(),12000,audienceFallback),timeout(sitemapPaths(),6000,new Set<string>())]);
 const top=(audience as any).topContent||[];const ai=(audience as any).aiReferrals||{sessions:0,pageViews:0,platforms:[],landingPages:[]};
 const opportunities=seeds.map((s,i)=>{const exists=paths.has(s.path);const signalTerms=s.cluster==='Freelance'?['freelance','project','consult','clt','pj']:s.cluster==='Salary'?['salary','salario','hour']:['clt','pj'];const clusterSignal=top.reduce((n:any,x:any)=>n+(signalTerms.some(t=>String(x.path).toLowerCase().includes(t))?Number(x.views||0):0),0);const score=Math.max(1,120-i)+(s.commercial==='high'?20:5)+(clusterSignal>0?10:0)-(exists?70:0);return {...s,status:exists?'existing_or_covered':'content_gap',priorityScore:score,signalViews:clusterSignal}}).sort((a,b)=>b.priorityScore-a.priorityScore);
 return NextResponse.json({engine:'BCH Focused Growth Engine',strategy:'Freelancers + small service businesses; English + Brazil first',generatedAt:new Date().toISOString(),cost:'zero additional paid services',sitemapPages:paths.size,aiReferrals:ai,topContent:top,topMarkets:(audience as any).topMarkets||[],opportunities,contentGaps:opportunities.filter(x=>x.status==='content_gap'),feedback:{weekly:(audience as any).weekly||null,last3Days:(audience as any).last3Days||null,nextAction:'Ship the highest-score missing page, distribute it in relevant communities, then measure impressions, clicks and partner outbound clicks before expanding markets.'}},{headers:{'Cache-Control':'public, s-maxage=60, stale-while-revalidate=300','X-Robots-Tag':'noindex, nofollow, noarchive'}})
}
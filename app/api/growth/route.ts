import {NextResponse} from 'next/server';
import {getAudienceData} from '../../lib/ga4';

export const dynamic='force-dynamic';export const revalidate=0;
const base='https://business-calculator-hub.vercel.app';
const seeds=[
 {q:'How do I calculate marketing ROI?',market:'Global / US',lang:'en',cluster:'ROI',path:'/guides/marketing-roi-formula',type:'guide',commercial:'high'},
 {q:'What is a good profit margin for a small business?',market:'Global / US',lang:'en',cluster:'Profit margin',path:'/guides/what-is-a-good-profit-margin',type:'guide',commercial:'high'},
 {q:'How much runway does my startup have?',market:'Global / US',lang:'en',cluster:'Runway',path:'/guides/how-to-calculate-business-runway',type:'guide',commercial:'high'},
 {q:'How do I calculate Google Ads ROI?',market:'Global / US',lang:'en',cluster:'ROI',path:'/guides/google-ads-roi',type:'guide',commercial:'high'},
 {q:'How do I calculate SaaS ROI?',market:'Global / US',lang:'en',cluster:'ROI',path:'/guides/saas-roi',type:'guide',commercial:'high'},
 {q:'What is a healthy CAC to LTV ratio?',market:'Global / US',lang:'en',cluster:'CAC/LTV',path:'/guides/healthy-cac-ltv-ratio',type:'guide',commercial:'high'},
 {q:'How do I calculate ecommerce profit margin?',market:'Global / US',lang:'en',cluster:'Profit margin',path:'/guides/ecommerce-profit-margin',type:'guide',commercial:'high'},
 {q:'How much should I charge per hour as a freelancer?',market:'Global / US',lang:'en',cluster:'Freelance pricing',path:'/guides/how-much-should-i-charge-as-a-freelancer',type:'guide',commercial:'medium'},
 {q:'CLT ou PJ ganhando R$ 10 mil: o que compensa?',market:'Brazil',lang:'pt-BR',cluster:'CLT x PJ',path:'/pt-br/guias/clt-ou-pj-10000',type:'guide',commercial:'high'},
 {q:'Como calcular ROI de marketing?',market:'Brazil',lang:'pt-BR',cluster:'ROI',path:'/pt-br/guias/roi-de-marketing',type:'guide',commercial:'high'},
 {q:'Qual margem de lucro ideal para serviços?',market:'Brazil',lang:'pt-BR',cluster:'Margem',path:'/pt-br/guias/margem-de-lucro-servicos',type:'guide',commercial:'high'},
 {q:'Como calcular CAC e LTV?',market:'Brazil',lang:'pt-BR',cluster:'CAC/LTV',path:'/pt-br/guias/como-calcular-cac-ltv',type:'guide',commercial:'high'},
 {q:'¿Cómo calcular el ROI de marketing?',market:'Mexico',lang:'es-MX',cluster:'ROI',path:'/es-mx/guides/roi-marketing',type:'guide',commercial:'high'},
 {q:'¿Cuál es un buen margen de ganancia para una PYME?',market:'Mexico',lang:'es-MX',cluster:'Profit margin',path:'/es-mx/guides/buen-margen-de-ganancia',type:'guide',commercial:'high'},
 {q:'¿Cómo calcular el punto de equilibrio?',market:'Mexico',lang:'es-MX',cluster:'Break-even',path:'/es-mx/guides/como-calcular-punto-equilibrio',type:'guide',commercial:'medium'},
 {q:'¿Cómo calcular el ROI de una inversión?',market:'Chile',lang:'es-CL',cluster:'ROI',path:'/es-cl/guides/roi-inversion',type:'guide',commercial:'high'},
 {q:'¿Cuál es un buen margen para una PYME chilena?',market:'Chile',lang:'es-CL',cluster:'Profit margin',path:'/es-cl/guides/margen-pyme',type:'guide',commercial:'high'},
 {q:'Wie berechne ich den ROI?',market:'Germany',lang:'de-DE',cluster:'ROI',path:'/de-de/guides/roi-berechnen',type:'guide',commercial:'high'},
 {q:'Was ist eine gute Gewinnmarge?',market:'Germany',lang:'de-DE',cluster:'Profit margin',path:'/de-de/guides/gute-gewinnmarge',type:'guide',commercial:'high'},
 {q:'How do I calculate startup runway in India?',market:'India',lang:'en-IN',cluster:'Runway',path:'/en-in/guides/startup-runway-india',type:'guide',commercial:'high'},
 {q:'How do I calculate freelance hourly rate in India?',market:'India',lang:'en-IN',cluster:'Freelance pricing',path:'/en-in/guides/freelance-hourly-rate-india',type:'guide',commercial:'medium'},
 {q:'How do I calculate break-even for a UK business?',market:'United Kingdom',lang:'en-GB',cluster:'Break-even',path:'/en-gb/guides/break-even-uk-business',type:'guide',commercial:'high'},
 {q:'What is a good profit margin for a UK small business?',market:'United Kingdom',lang:'en-GB',cluster:'Profit margin',path:'/en-gb/guides/good-profit-margin-uk',type:'guide',commercial:'high'},
 {q:'投資ROIはどう計算しますか？',market:'Japan',lang:'ja-JP',cluster:'ROI',path:'/ja-jp/guides/roi-keisan',type:'guide',commercial:'high'},
 {q:'損益分岐点はどう計算しますか？',market:'Japan',lang:'ja-JP',cluster:'Break-even',path:'/ja-jp/guides/break-even-keisan',type:'guide',commercial:'high'}
];
async function sitemapPaths(){try{const r=await fetch(base+'/sitemap.xml',{next:{revalidate:3600}});if(!r.ok)return new Set<string>();const text=await r.text();return new Set([...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname))}catch{return new Set<string>()}}
export async function GET(){const [audience,paths]=await Promise.all([getAudienceData(),sitemapPaths()]);const top=(audience as any).topContent||[];const ai=(audience as any).aiReferrals||{sessions:0,pageViews:0,platforms:[],landingPages:[]};const opportunities=seeds.map((s,i)=>{const exists=paths.has(s.path);const clusterSignal=top.reduce((n:any,x:any)=>n+(String(x.path).toLowerCase().includes(s.cluster.split('/')[0].toLowerCase().replace('profit margin','margin'))?Number(x.views||0):0),0);const score=Math.max(1,100-i*2)+(s.commercial==='high'?15:5)+(clusterSignal>0?10:0)-(exists?60:0);return {...s,status:exists?'existing_or_covered':'content_gap',priorityScore:score,signalViews:clusterSignal}}).sort((a,b)=>b.priorityScore-a.priorityScore);return NextResponse.json({engine:'BCH Organic Growth Engine',generatedAt:new Date().toISOString(),cost:'zero additional paid services',sitemapPages:paths.size,aiReferrals:ai,topContent:top,topMarkets:(audience as any).topMarkets||[],opportunities,contentGaps:opportunities.filter(x=>x.status==='content_gap'),feedback:{weekly:(audience as any).weekly||null,last3Days:(audience as any).last3Days||null,nextAction:'Prioritize missing high-score pages; never auto-publish sensitive tax/legal facts without official-source validation.'}},{headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow, noarchive'}})}

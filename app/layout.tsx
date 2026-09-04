import type {Metadata} from 'next';
import Script from 'next/script';
import {headers} from 'next/headers';
import AffiliateTracker from './components/AffiliateTracker';
import SiteHeader from './components/SiteHeader';
import './globals.css';
import './calculator-theme.css';
import './site-header.css';

const base='https://business-calculator-hub.vercel.app';
export const metadata:Metadata={
  metadataBase:new URL(base),
  title:{default:'Business Calculator Hub | Free Money & Business Calculators',template:'%s | Business Calculator Hub'},
  description:'Free calculators and practical guides for salary, freelance rates, ROI, profit margins, break-even, pricing and business decisions.',
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-snippet':-1,'max-image-preview':'large','max-video-preview':-1}},
  openGraph:{type:'website',siteName:'Business Calculator Hub',title:'Business Calculator Hub | Free Money & Business Calculators',description:'Free calculators and practical guides for business, work, pricing and financial decisions.',url:base},
  twitter:{card:'summary',title:'Business Calculator Hub',description:'Free calculators and practical guides for business and financial decisions.'},
  verification:{google:'GvjIrfdNuogFaBAliRlEmlyk9Sjc3i0X7zOnSZQpaeI',other:{'impact-site-verification':'793175c9-c344-42fa-bf9e-4087374fd188'}}
};
const langFor=(p:string)=>p.startsWith('/pt-br')?'pt-BR':p.startsWith('/es-mx')?'es-MX':p.startsWith('/es-cl')?'es-CL':p.startsWith('/de-de')?'de-DE':p.startsWith('/en-in')?'en-IN':p.startsWith('/ja-jp')?'ja-JP':p.startsWith('/en-gb')?'en-GB':'en';
const clean=(s:string)=>decodeURIComponent(s).replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
const localePrefixes=new Set(['pt-br','es-mx','es-cl','de-de','en-in','ja-jp','en-gb']);
function structuredData(path:string,lang:string){
  const parts=path.split('/').filter(Boolean);const cp=localePrefixes.has(parts[0])?parts.slice(1):parts;const slug=cp[cp.length-1]||'';const url=base+(path==='/'?'':path);const isCalculator=slug.includes('calculator')||slug.startsWith('calculadora-');const isGuide=cp[0]==='guides'||cp[0]==='guias';
  const graph:any[]=[
    {'@type':'WebSite','@id':base+'/#website',url:base+'/',name:'Business Calculator Hub',description:'Free calculators and practical guides for business, work, pricing and financial decisions.',inLanguage:lang,publisher:{'@id':base+'/#organization'}},
    {'@type':'Organization','@id':base+'/#organization',name:'Business Calculator Hub',url:base+'/',description:'Publisher of free business and financial calculators and practical guides.'}
  ];
  if(parts.length){graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb','itemListElement':parts.map((p,i)=>({'@type':'ListItem',position:i+1,name:clean(p),item:base+'/'+parts.slice(0,i+1).join('/')}))});}
  if(isCalculator)graph.push({'@type':'WebApplication','@id':url+'#calculator',name:clean(slug),url,applicationCategory:'FinanceApplication',operatingSystem:'Web',browserRequirements:'Requires JavaScript',isAccessibleForFree:true,inLanguage:lang,description:'Free interactive calculator from Business Calculator Hub with instant results, formula, methodology, examples and limitations.',publisher:{'@id':base+'/#organization'}});
  else if(isGuide)graph.push({'@type':'Article','@id':url+'#article',headline:clean(slug),url,mainEntityOfPage:url,inLanguage:lang,isAccessibleForFree:true,publisher:{'@id':base+'/#organization'}});
  return {'@context':'https://schema.org','@graph':graph};
}
export default async function RootLayout({children}:{children:React.ReactNode}){const h=await headers();const path=h.get('x-pathname')||'/';const lang=langFor(path);const schema=structuredData(path,lang);return <html lang={lang}><body><Script id="site-structured-data" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(schema)}</Script><SiteHeader/>{children}<AffiliateTracker/><Script src="https://www.googletagmanager.com/gtag/js?id=G-HQE0NEPTWV" strategy="afterInteractive"/><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','G-HQE0NEPTWV');`}</Script></body></html>}

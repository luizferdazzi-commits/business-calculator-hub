'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';

const markets=[
  ['/','🌐 Global'],
  ['/pt-br','🇧🇷 Brasil'],
  ['/es-mx','🇲🇽 México'],
  ['/es-cl','🇨🇱 Chile'],
  ['/de-de','🇩🇪 Deutschland'],
  ['/en-in','🇮🇳 India'],
  ['/ja-jp','🇯🇵 日本'],
  ['/en-gb','🇬🇧 UK'],
] as const;

const localeData={
  'pt-br':{lang:'pt-BR',navAria:'Navegação principal',marketAria:'Escolher mercado',markets:'Mercados',trust:'🚀 Calculadoras gratuitas para empreendedores, MEIs e freelancers no Brasil',free:'★ 100% Gratuitas',calc:'Calculadoras',guides:'Guias',advertise:'Anuncie',adCta:'📣 ANUNCIE NO HUB',all:'Todas →'},
  'es-mx':{lang:'es-MX',navAria:'Navegación principal',marketAria:'Elegir mercado',markets:'Mercados',trust:'🚀 Calculadoras gratuitas para emprendedores, freelancers y pequeñas empresas en México',free:'★ 100% gratuitas',calc:'Calculadoras',guides:'Guías',advertise:'Anunciar',adCta:'📣 ANUNCIAR EN EL HUB',all:'Todas →'},
  'es-cl':{lang:'es-CL',navAria:'Navegación principal',marketAria:'Elegir mercado',markets:'Mercados',trust:'🚀 Calculadoras gratuitas para emprendedores, freelancers y pequeñas empresas en Chile',free:'★ 100% gratuitas',calc:'Calculadoras',guides:'Guías',advertise:'Anunciar',adCta:'📣 ANUNCIAR EN EL HUB',all:'Todas →'},
  'de-de':{lang:'de-DE',navAria:'Hauptnavigation',marketAria:'Markt auswählen',markets:'Märkte',trust:'🚀 Kostenlose Rechner für Freelancer, Gründer und kleine Unternehmen in Deutschland',free:'★ 100% kostenlos',calc:'Rechner',guides:'Ratgeber',advertise:'Werben',adCta:'📣 BEI UNS WERBEN',all:'Alle →'},
  'en-in':{lang:'en-IN',navAria:'Main navigation',marketAria:'Choose market',markets:'Markets',trust:'🚀 Free calculators for freelancers, founders and small businesses in India',free:'★ 100% Free',calc:'Calculators',guides:'Guides',advertise:'Advertise',adCta:'📣 ADVERTISE WITH US',all:'All tools →'},
  'ja-jp':{lang:'ja-JP',navAria:'メインナビゲーション',marketAria:'市場を選択',markets:'市場',trust:'🚀 日本のフリーランス・起業家・中小企業向け無料計算ツール',free:'★ 100% 無料',calc:'計算ツール',guides:'ガイド',advertise:'広告掲載',adCta:'📣 広告を掲載',all:'すべて →'},
  'en-gb':{lang:'en-GB',navAria:'Main navigation',marketAria:'Choose market',markets:'Markets',trust:'🚀 Free calculators for UK freelancers, founders and small businesses',free:'★ 100% Free',calc:'Calculators',guides:'Guides',advertise:'Advertise',adCta:'📣 ADVERTISE WITH US',all:'All tools →'},
} as const;

export default function SiteHeader(){
  const path=usePathname()||'/';
  const [marketOpen,setMarketOpen]=useState(false);
  const key=(Object.keys(localeData).find(k=>path.startsWith('/'+k))||'') as keyof typeof localeData|'';
  const d=key?localeData[key]:{lang:'en',navAria:'Main navigation',marketAria:'Choose market',markets:'Markets',trust:'🚀 Trusted by freelancers, entrepreneurs and small businesses worldwide',free:'★ 100% Free Calculators',calc:'Calculators',guides:'Guides',advertise:'Advertise',adCta:'📣 ADVERTISE WITH US',all:'All tools →'};
  const base=key?'/'+key:'';
  useEffect(()=>{document.documentElement.lang=d.lang;setMarketOpen(false)},[d.lang,path]);
  const advertise=key==='pt-br'?'/pt-br/anuncie':key?base+'/advertise':'/advertise';
  const guides=key==='pt-br'?'/pt-br/guias':key?base+'/guides':'/guides';
  return <>
    <div className="siteTrustBar">{d.trust} <span>{d.free}</span></div>
    <header className="siteHeader">
      <Link className="siteLogo" href={base||'/'} aria-label="Business Calculator Hub"><span className="siteLogoIcon">▦</span><span><strong>BUSINESS</strong><em>CALCULATOR HUB</em></span></Link>
      <nav className="siteNav" aria-label={d.navAria}>
        <Link href={(base||'')+'/#calculators'}>{d.calc}</Link>
        <Link href={guides}>{d.guides}</Link>
        {!key&&<Link href="/ai-tools">AI Tools <small>NEW</small></Link>}
        <Link href={advertise}>{d.advertise}</Link>
        <div className={"siteNavDropdown"+(marketOpen?" open":"")}><button type="button" aria-label={d.marketAria} aria-expanded={marketOpen} onClick={()=>setMarketOpen(v=>!v)}>🌐 {key?markets.find(m=>m[0]===base)?.[1].replace(/^.. /,''): d.markets} ▾</button><div className="siteNavMenu siteMarketMenu">{markets.map(([href,label])=><Link key={href} href={href} onClick={()=>setMarketOpen(false)}>{label}</Link>)}</div></div>
      </nav>
      <div className="siteHeaderActions"><Link className="siteAdvertise" href={advertise}>{d.adCta}</Link><Link className="siteAllTools" href={(base||'')+'/#calculators'}>{d.all}</Link></div>
    </header>
  </>;
}
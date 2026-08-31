'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

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
  'pt-br':{lang:'pt-BR',trust:'🚀 Calculadoras gratuitas para empreendedores, MEIs e freelancers no Brasil',free:'★ 100% Gratuitas',calc:'Calculadoras',guides:'Guias',advertise:'Anuncie',adCta:'📣 ANUNCIE NO HUB',all:'Todas →'},
  'es-mx':{lang:'es-MX',trust:'🚀 Calculadoras gratuitas para emprendedores, freelancers y pequeñas empresas en México',free:'★ 100% gratuitas',calc:'Calculadoras',guides:'Guías',advertise:'Anunciar',adCta:'📣 ANUNCIAR EN EL HUB',all:'Todas →'},
  'es-cl':{lang:'es-CL',trust:'🚀 Calculadoras gratuitas para emprendedores, freelancers y pequeñas empresas en Chile',free:'★ 100% gratuitas',calc:'Calculadoras',guides:'Guías',advertise:'Anunciar',adCta:'📣 ANUNCIAR EN EL HUB',all:'Todas →'},
  'de-de':{lang:'de-DE',trust:'🚀 Kostenlose Rechner für Freelancer, Gründer und kleine Unternehmen in Deutschland',free:'★ 100% kostenlos',calc:'Rechner',guides:'Ratgeber',advertise:'Werben',adCta:'📣 BEI UNS WERBEN',all:'Alle →'},
  'en-in':{lang:'en-IN',trust:'🚀 Free calculators for freelancers, founders and small businesses in India',free:'★ 100% Free',calc:'Calculators',guides:'Guides',advertise:'Advertise',adCta:'📣 ADVERTISE WITH US',all:'All tools →'},
  'ja-jp':{lang:'ja-JP',trust:'🚀 日本のフリーランス・起業家・中小企業向け無料計算ツール',free:'★ 100% 無料',calc:'計算ツール',guides:'ガイド',advertise:'広告掲載',adCta:'📣 広告を掲載',all:'すべて →'},
  'en-gb':{lang:'en-GB',trust:'🚀 Free calculators for UK freelancers, founders and small businesses',free:'★ 100% Free',calc:'Calculators',guides:'Guides',advertise:'Advertise',adCta:'📣 ADVERTISE WITH US',all:'All tools →'},
} as const;

export default function SiteHeader(){
  const path=usePathname()||'/';
  const key=(Object.keys(localeData).find(k=>path.startsWith('/'+k))||'') as keyof typeof localeData|'';
  const d=key?localeData[key]:{lang:'en',trust:'🚀 Trusted by freelancers, entrepreneurs and small businesses worldwide',free:'★ 100% Free Calculators',calc:'Calculators',guides:'Guides',advertise:'Advertise',adCta:'📣 ADVERTISE WITH US',all:'All tools →'};
  const base=key?'/'+key:'';
  useEffect(()=>{document.documentElement.lang=d.lang},[d.lang]);
  const advertise=key==='pt-br'?'/pt-br/anuncie':key?base+'/advertise':'/advertise';
  const guides=key==='pt-br'?'/pt-br/guias':'/guides';
  return <>
    <div className="siteTrustBar">{d.trust} <span>{d.free}</span></div>
    <header className="siteHeader">
      <Link className="siteLogo" href={base||'/'} aria-label="Business Calculator Hub"><span className="siteLogoIcon">▦</span><span><strong>BUSINESS</strong><em>CALCULATOR HUB</em></span></Link>
      <nav className="siteNav" aria-label="Main navigation">
        <Link href={(base||'')+'/#tools'}>{d.calc}</Link>
        <Link href={guides}>{d.guides}</Link>
        {!key&&<Link href="/ai-tools">AI Tools <small>NEW</small></Link>}
        <Link href={advertise}>{d.advertise}</Link>
        <div className="siteNavDropdown"><button type="button" aria-label="Choose market">🌐 {key?markets.find(m=>m[0]===base)?.[1].replace(/^.. /,''): 'Markets'} ▾</button><div className="siteNavMenu siteMarketMenu">{markets.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</div></div>
      </nav>
      <div className="siteHeaderActions"><Link className="siteAdvertise" href={advertise}>{d.adCta}</Link><Link className="siteAllTools" href={(base||'')+'/#tools'}>{d.all}</Link></div>
    </header>
  </>;
}
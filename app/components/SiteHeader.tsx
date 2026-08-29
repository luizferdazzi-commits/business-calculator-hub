'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
export default function SiteHeader(){
  const path=usePathname()||'/'; const br=path.startsWith('/pt-br');
  return <>
    <div className="siteTrustBar">{br?'🚀 Calculadoras gratuitas para empreendedores, MEIs e freelancers no Brasil':'🚀 Trusted by freelancers, entrepreneurs and small businesses worldwide'} <span>{br?'★ 100% Gratuitas':'★ 100% Free Calculators'}</span></div>
    <header className="siteHeader">
      <Link className="siteLogo" href={br?'/pt-br':'/'} aria-label="Business Calculator Hub">
        <span className="siteLogoIcon">▦</span><span><strong>BUSINESS</strong><em>CALCULATOR HUB</em></span>
      </Link>
      <nav className="siteNav" aria-label={br?'Navegação principal':'Main navigation'}>
        <Link href={br?'/pt-br#calculadoras':'/#calculators'}>{br?'Calculadoras':'Calculators'}</Link>
        <Link href={br?'/pt-br/calculadora-clt-pj':'/guides'}>{br?'CLT × PJ':'Guides'}</Link>
        <Link href={br?'/pt-br/calculadora-mei-das':'/ai-tools'}>{br?'MEI':'AI Tools'} {!br&&<small>NEW</small>}</Link>
        <Link href={br?'/pt-br/anuncie':'/advertise'}>{br?'Anuncie':'Advertise'}</Link>
        <Link href={br?'/':'/pt-br'}>{br?'🌐 English':'🇧🇷 Português'}</Link>
      </nav>
      <div className="siteHeaderActions">
        <Link className="siteAdvertise" href={br?'/pt-br/anuncie':'/advertise'}>{br?'📣 ANUNCIE NO HUB':'📣 ADVERTISE WITH US'}</Link>
        <Link className="siteAllTools" href={br?'/pt-br#calculadoras':'/#calculators'}>{br?'Todas →':'All tools →'}</Link>
      </div>
    </header>
  </>;
}
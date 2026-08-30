'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
export default function SiteHeader(){
  const path=usePathname()||'/'; const br=path.startsWith('/pt-br');
  return <>
    <div className="siteTrustBar">{br?'🚀 Calculadoras gratuitas para empreendedores, MEIs e freelancers no Brasil':'🚀 Trusted by freelancers, entrepreneurs and small businesses worldwide'} <span>{br?'★ 100% Gratuitas':'★ 100% Free Calculators'}</span></div>
    <header className="siteHeader">
      <Link className="siteLogo" href={br?'/pt-br':'/'} aria-label="Business Calculator Hub"><span className="siteLogoIcon">▦</span><span><strong>BUSINESS</strong><em>CALCULATOR HUB</em></span></Link>
      <nav className="siteNav" aria-label={br?'Navegação principal':'Main navigation'}>
        {br?<div className="siteNavDropdown"><button type="button">Calculadoras ▾</button><div className="siteNavMenu">
          <div><strong>Trabalho</strong><Link href="/pt-br/calculadora-salario-liquido">Salário Líquido</Link><Link href="/pt-br/calculadora-clt-pj">CLT × PJ</Link><Link href="/pt-br/calculadora-inss">INSS</Link><Link href="/pt-br/calculadora-ferias">Férias</Link><Link href="/pt-br/calculadora-decimo-terceiro">13º Salário</Link><Link href="/pt-br/calculadora-fgts">FGTS</Link><Link href="/pt-br/calculadora-hora-extra">Hora Extra</Link></div>
          <div><strong>Empreendedor</strong><Link href="/pt-br/calculadora-mei-das">DAS MEI</Link><Link href="/pt-br/calculadora-pro-labore">Pró-labore</Link><Link href="/pt-br/calculadora-simples-nacional">Simples Nacional</Link><Link href="/pt-br/calculadora-custo-funcionario">Custo de Funcionário</Link><Link href="/pt-br/calculadora-freelancer">Freelancer</Link></div>
          <div><strong>Gestão</strong><Link href="/pt-br/calculadora-preco-venda">Preço de Venda</Link><Link href="/pt-br/calculadora-markup">Markup</Link><Link href="/pt-br/calculadora-margem-lucro">Margem</Link><Link href="/pt-br/calculadora-ponto-equilibrio">Ponto de Equilíbrio</Link><Link href="/pt-br/calculadora-roi">ROI</Link><Link href="/pt-br/calculadora-cac-ltv">CAC e LTV</Link><Link href="/pt-br/calculadora-runway">Runway</Link></div>
        </div></div>:<Link href="/#calculators">Calculators</Link>}
        <Link href={br?'/pt-br/guias':'/guides'}>{br?'Guias':'Guides'}</Link>
        {!br&&<Link href="/ai-tools">AI Tools <small>NEW</small></Link>}
        <Link href={br?'/pt-br/anuncie':'/advertise'}>{br?'Anuncie':'Advertise'}</Link>
        <Link href={br?'/':'/pt-br'}>{br?'🌐 English':'🇧🇷 Português'}</Link>
      </nav>
      <div className="siteHeaderActions"><Link className="siteAdvertise" href={br?'/pt-br/anuncie':'/advertise'}>{br?'📣 ANUNCIE NO HUB':'📣 ADVERTISE WITH US'}</Link><Link className="siteAllTools" href={br?'/pt-br#calculadoras':'/#calculators'}>{br?'Todas →':'All tools →'}</Link></div>
    </header>
  </>;
}
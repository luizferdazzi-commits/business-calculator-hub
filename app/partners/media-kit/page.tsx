import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partner Media Kit — Business Calculator Hub',
  description: 'Official Business Calculator Hub descriptions, links, CTAs and publishing guidelines for media and cross-promotion partners.',
  alternates: { canonical: '/partners/media-kit' }
};

const globalShort='Business Calculator Hub is a free platform offering practical calculators, guides and software resources for freelancers, entrepreneurs and small businesses.';
const globalLong='Business Calculator Hub helps freelancers, entrepreneurs and small businesses make clearer financial and operational decisions. The platform combines free business calculators with practical guides and software resources covering pricing, profitability, hourly rates, ROI, CAC/LTV, runway and other everyday business decisions. Tools are available without registration, with a growing international content library and a dedicated Brazilian edition localized for the realities of CLT, PJ, MEI and small businesses.';
const brShort='Business Calculator Hub Brasil é uma plataforma gratuita de calculadoras, guias e recursos práticos para MEIs, PJs, profissionais e pequenas empresas.';
const brLong='O Business Calculator Hub Brasil reúne calculadoras gratuitas e conteúdo prático para apoiar decisões de trabalhadores, MEIs, PJs, freelancers e pequenas empresas. A edição brasileira inclui ferramentas localizadas para Salário Líquido, INSS, DAS MEI, Pró-labore, CLT × PJ, Férias, 13º, FGTS, Hora Extra e Simples Nacional, além de calculadoras de preço de venda, margem, ROI, CAC/LTV, runway e gestão. As ferramentas não exigem cadastro e usam referências oficiais quando o cálculo depende de regras brasileiras.';

function CopyBox({title,children}:{title:string,children:React.ReactNode}){return <div className="mediaCopyBox"><h3>{title}</h3><div>{children}</div></div>}

export default function MediaKit(){
return <main className="shell">
<section className="hero heroCompact"><p className="eyebrow">PARTNER RESOURCES</p><h1>Business Calculator Hub Partner Media Kit</h1><p className="lead">Ready-to-publish material for editorial partners, cross-promotion, co-marketing and approved brand mentions. Partners may adapt the wording to match their editorial style while preserving factual accuracy.</p><div className="heroActions"><a className="primary" href="#global">Global kit ↓</a><a className="secondary" href="#brasil">Kit Brasil ↓</a><Link className="secondary" href="/advertise">Advertising opportunities</Link></div></section>

<section className="sectionBlock" id="global"><div className="sectionHeading"><div><p className="eyebrow">GLOBAL · ENGLISH</p><h2>Ready-to-publish Global material</h2></div><p>Use the Global homepage for international audiences. Deep links to a relevant calculator or guide are welcome when contextually appropriate.</p></div>
<div className="mediaKitGrid">
<CopyBox title="Short description"><p>{globalShort}</p></CopyBox>
<CopyBox title="Editorial description"><p>{globalLong}</p></CopyBox>
<CopyBox title="Recommended link"><p><strong>Homepage</strong><br/><a href="https://business-calculator-hub.vercel.app/">https://business-calculator-hub.vercel.app/</a></p><p><strong>Media / advertising</strong><br/><a href="https://business-calculator-hub.vercel.app/advertise">https://business-calculator-hub.vercel.app/advertise</a></p></CopyBox>
<CopyBox title="Suggested anchor text"><p>Business Calculator Hub<br/>free business calculators<br/>business calculators for entrepreneurs<br/>calculators for freelancers and small businesses</p></CopyBox>
<CopyBox title="Suggested CTAs"><p>Explore Business Calculator Hub →<br/>Try free business calculators →<br/>Calculate your next business decision →<br/>Explore free tools for small businesses →</p></CopyBox>
<CopyBox title="Key points"><p>Free to use · No registration required · Practical calculators + guides · Built for freelancers, entrepreneurs and small businesses · Global and Brazilian editions</p></CopyBox>
</div>
<div className="mediaSample"><span className="tag">SAMPLE PARTNER MENTION</span><h3>Free tools for everyday business decisions</h3><p>{globalShort} From pricing and profitability to ROI, CAC/LTV and freelancer rates, the Hub provides straightforward tools designed to turn common business questions into actionable numbers.</p><a className="primary" href="https://business-calculator-hub.vercel.app/">Explore Business Calculator Hub →</a></div>
</section>

<section className="sectionBlock" id="brasil"><div className="sectionHeading"><div><p className="eyebrow">BRASIL · PORTUGUÊS</p><h2>Material pronto para parceiros brasileiros</h2></div><p>Para público brasileiro, recomendamos direcionar o usuário diretamente à edição /pt-br.</p></div>
<div className="mediaKitGrid">
<CopyBox title="Descrição curta"><p>{brShort}</p></CopyBox>
<CopyBox title="Descrição editorial"><p>{brLong}</p></CopyBox>
<CopyBox title="Links recomendados"><p><strong>Hub Brasil</strong><br/><a href="https://business-calculator-hub.vercel.app/pt-br">https://business-calculator-hub.vercel.app/pt-br</a></p><p><strong>Anuncie / parcerias</strong><br/><a href="https://business-calculator-hub.vercel.app/pt-br/anuncie">https://business-calculator-hub.vercel.app/pt-br/anuncie</a></p></CopyBox>
<CopyBox title="Textos âncora sugeridos"><p>Business Calculator Hub Brasil<br/>calculadoras gratuitas para empresas<br/>calculadoras para MEI e PJ<br/>calculadoras para pequenos negócios</p></CopyBox>
<CopyBox title="CTAs sugeridos"><p>Acesse o Business Calculator Hub →<br/>Use as calculadoras gratuitamente →<br/>Calcule antes de tomar sua decisão →<br/>Conheça as ferramentas para pequenos negócios →</p></CopyBox>
<CopyBox title="Diferenciais"><p>19 calculadoras em português · Sem cadastro · Valores em reais · Ferramentas para CLT, PJ e MEI · Gestão e precificação · Fontes oficiais nas regras brasileiras aplicáveis</p></CopyBox>
</div>
<div className="mediaSample"><span className="tag">EXEMPLO DE MENÇÃO</span><h3>Calculadoras gratuitas para decisões profissionais e empresariais</h3><p>{brShort} A plataforma reúne ferramentas para remuneração, MEI, impostos, precificação, margem e gestão em uma experiência simples e sem cadastro.</p><a className="primary" href="https://business-calculator-hub.vercel.app/pt-br">Conhecer o Hub Brasil →</a></div>
</section>

<section className="sectionBlock"><div className="sectionHeading"><div><p className="eyebrow">PUBLISHING GUIDELINES</p><h2>Brand & linking guidelines</h2></div></div><div className="guidelineGrid"><div><strong>Brand name</strong><p>Write “Business Calculator Hub” in full on first mention. For later mentions, “the Hub” is acceptable.</p></div><div><strong>Links</strong><p>Use the clean URLs above. Contextual deep links are encouraged. Do not use misleading anchor text or imply endorsement of claims we have not made.</p></div><div><strong>Editorial independence</strong><p>Reviews and editorial mentions should reflect the partner’s genuine assessment. Do not invent traffic, customer, revenue or performance claims.</p></div><div><strong>Disclosure</strong><p>If a placement is sponsored, paid, affiliate-based or otherwise compensated, use the disclosure and link attributes required by your platform and applicable rules.</p></div></div></section>

<section className="sponsorCallout"><div><span className="sponsorLabel">CO-MARKETING & SPONSORSHIP</span><h2>Want a custom partner package?</h2><p>We can prepare a tailored description, deep-link strategy, editorial angle and reciprocal placement for your audience.</p></div><a className="primary" href="mailto:contato@assessorialf.com.br?subject=Business%20Calculator%20Hub%20Partnership">Contact Business Calculator Hub →</a></section>
</main>}
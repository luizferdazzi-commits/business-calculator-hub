import {notFound} from 'next/navigation';import type {Metadata} from 'next';import LocalizedCalculator from '../../components/LocalizedCalculator';
const locales=['pt-br','es-mx','es-cl','de-de','en-in','ja-jp','en-gb'];const toolSlugs=['freelance-rate-calculator','roi-calculator','salary-to-hourly-calculator','markup-calculator','break-even-calculator','payback-period-calculator','cac-ltv-calculator','runway-calculator','selling-price-calculator','discount-margin-calculator','fixed-project-price-calculator','project-hourly-rate-calculator','freelance-vs-salary-calculator'];export function generateStaticParams(){return locales.flatMap(locale=>toolSlugs.map(tool=>({locale,tool})))}
const descriptions:any={
'pt-br':'Calculadora gratuita para decisões de trabalho e negócios, com resultados instantâneos e valores localizados para o Brasil.',
'es-mx':'Calculadora gratuita para decisiones de trabajo y negocio, con resultados instantáneos y valores localizados para México.',
'es-cl':'Calculadora gratuita para decisiones de trabajo y negocio, con resultados instantáneos y valores localizados para Chile.',
'de-de':'Kostenloser Rechner für Arbeit und Unternehmensentscheidungen mit sofortigen Ergebnissen und lokalisierten Werten für Deutschland.',
'en-in':'Free calculator for work and business decisions with instant results and values localized for India.',
'ja-jp':'仕事とビジネスの意思決定に役立つ無料計算ツール。日本向けの値で結果をすぐに確認できます。',
'en-gb':'Free calculator for work and business decisions with instant results and values localized for the United Kingdom.'};
const titles:any={
'pt-br':['Valor Freelancer','ROI','Salário por Hora','Markup','Ponto de Equilíbrio','Payback','CAC & LTV','Runway','Preço de Venda','Desconto e Margem','Projeto Fechado','Valor Hora de Projeto','Freelancer vs Salário'],
'es-mx':['Tarifa Freelancer','ROI','Salario por Hora','Markup','Punto de Equilibrio','Payback','CAC & LTV','Runway','Precio de Venta','Descuento y Margen','Proyecto Cerrado','Tarifa por Proyecto','Freelancer vs Salario'],
'es-cl':['Tarifa Freelancer','ROI','Sueldo por Hora','Markup','Punto de Equilibrio','Payback','CAC & LTV','Runway','Precio de Venta','Descuento y Margen','Proyecto Cerrado','Tarifa por Proyecto','Freelancer vs Sueldo'],
'de-de':['Freelancer-Stundensatz','ROI','Gehalt pro Stunde','Aufschlag','Break-even','Amortisation','CAC & LTV','Runway','Verkaufspreis','Rabatt & Marge','Festpreis-Projekt','Projekt-Stundensatz','Freelance vs Gehalt'],
'en-in':['Freelance Rate','ROI','Salary to Hourly','Markup','Break-even','Payback Period','CAC & LTV','Business Runway','Selling Price','Discount Margin','Fixed Project Price','Project Hourly Rate','Freelance vs Salary'],
'ja-jp':['フリーランス料金','ROI','年収から時給','マークアップ','損益分岐点','投資回収期間','CAC・LTV','資金ランウェイ','販売価格','割引・利益率','固定価格プロジェクト','プロジェクト時給','フリーランス vs 給与'],
'en-gb':['Freelance Rate','ROI','Salary to Hourly','Markup','Break-even','Payback Period','CAC & LTV','Business Runway','Selling Price','Discount Margin','Fixed Project Price','Project Hourly Rate','Freelance vs Salary']};
export async function generateMetadata({params}:{params:Promise<{locale:string,tool:string}>}):Promise<Metadata>{const {locale,tool}=await params;if(!locales.includes(locale)||!toolSlugs.includes(tool))return{};const i=toolSlugs.indexOf(tool);return{title:titles[locale][i],description:descriptions[locale],alternates:{canonical:`/${locale}/${tool}`}}}
export default async function Page({params}:{params:Promise<{locale:string,tool:string}>}){const {locale,tool}=await params;if(!locales.includes(locale)||!toolSlugs.includes(tool))notFound();return <LocalizedCalculator locale={locale as any} tool={tool}/>}
import Link from 'next/link';
const guideMap:Record<string,{label:string;href:string}[]>={
'pt-br':[{label:'ROI de marketing',href:'/pt-br/guias/roi-de-marketing'},{label:'Margem de lucro em serviços',href:'/pt-br/guias/margem-de-lucro-servicos'}],
'es-mx':[{label:'ROI de marketing',href:'/es-mx/guides/roi-marketing'},{label:'Buen margen de ganancia',href:'/es-mx/guides/buen-margen-de-ganancia'}],
'es-cl':[{label:'ROI de una inversión',href:'/es-cl/guides/roi-inversion'},{label:'Margen para una PYME',href:'/es-cl/guides/margen-pyme'}],
'de-de':[{label:'ROI berechnen',href:'/de-de/guides/roi-berechnen'},{label:'Gute Gewinnmarge',href:'/de-de/guides/gute-gewinnmarge'}],
'en-in':[{label:'Startup runway in India',href:'/en-in/guides/startup-runway-india'},{label:'Freelance hourly rate in India',href:'/en-in/guides/freelance-hourly-rate-india'}],
'en-gb':[{label:'Break-even for a UK business',href:'/en-gb/guides/break-even-uk-business'},{label:'Good profit margin for a UK small business',href:'/en-gb/guides/good-profit-margin-uk'}],
'ja-jp':[{label:'ROIの計算方法',href:'/ja-jp/guides/roi-keisan'},{label:'損益分岐点の計算方法',href:'/ja-jp/guides/break-even-keisan'}]};
export default function GrowthGuideLinks({locale}:{locale:string}){const items=guideMap[locale]||[];if(!items.length)return null;return <section className="content"><h2>Practical guides</h2><p>{items.map((x,i)=><span key={x.href}>{i?' · ':''}<Link href={x.href}>{x.label}</Link></span>)}</p></section>}

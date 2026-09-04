import Link from 'next/link';
import type {GrowthGuide} from './GrowthGuide';

type Labels={eyebrow:string;formula:string;example:string;interpretation:string;when:string;limits:string;use:string;related:string};
const labels:Record<string,Labels>={
  'pt-BR':{eyebrow:'BUSINESS CALCULATOR HUB · GUIA',formula:'Fórmula',example:'Exemplo',interpretation:'Como interpretar o resultado',when:'Quando usar',limits:'Limitações',use:'Usar',related:'Guias relacionados'},
  'es-MX':{eyebrow:'BUSINESS CALCULATOR HUB · GUÍA',formula:'Fórmula',example:'Ejemplo',interpretation:'Cómo interpretar el resultado',when:'Cuándo usarlo',limits:'Limitaciones',use:'Usar',related:'Guías relacionadas'},
  'es-CL':{eyebrow:'BUSINESS CALCULATOR HUB · GUÍA',formula:'Fórmula',example:'Ejemplo',interpretation:'Cómo interpretar el resultado',when:'Cuándo usarlo',limits:'Limitaciones',use:'Usar',related:'Guías relacionadas'},
  'de-DE':{eyebrow:'BUSINESS CALCULATOR HUB · RATGEBER',formula:'Formel',example:'Beispiel',interpretation:'Ergebnis interpretieren',when:'Wann verwenden?',limits:'Grenzen der Berechnung',use:'Öffnen:',related:'Verwandte Ratgeber'},
  'ja-JP':{eyebrow:'BUSINESS CALCULATOR HUB · ガイド',formula:'計算式',example:'例',interpretation:'結果の見方',when:'使うタイミング',limits:'注意点',use:'使う：',related:'関連ガイド'},
  'en-IN':{eyebrow:'BUSINESS CALCULATOR HUB · GUIDE',formula:'Formula',example:'Example',interpretation:'How to interpret the result',when:'When to use it',limits:'Limitations',use:'Use',related:'Related guides'},
  'en-GB':{eyebrow:'BUSINESS CALCULATOR HUB · GUIDE',formula:'Formula',example:'Example',interpretation:'How to interpret the result',when:'When to use it',limits:'Limitations',use:'Use',related:'Related guides'},
  'en':{eyebrow:'BUSINESS CALCULATOR HUB · GUIDE',formula:'Formula',example:'Example',interpretation:'How to interpret the result',when:'When to use it',limits:'Limitations',use:'Use',related:'Related guides'}
};
export default function LocalizedGrowthGuidePage({guide,prefix}:{guide:GrowthGuide;prefix:string}){
  const l=labels[guide.lang]||labels.en;
  const article={'@context':'https://schema.org','@type':'Article','headline':guide.title,'description':guide.description,'inLanguage':guide.lang,'isAccessibleForFree':true};
  return <main className="shell"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(article)}}/><article className="content"><p className="eyebrow">{l.eyebrow}</p><h1>{guide.title}</h1><p className="lead">{guide.description}</p><h2>{guide.question}</h2><p>{guide.answer}</p><h2>{l.formula}</h2><p><strong>{guide.formula}</strong></p><h2>{l.example}</h2><p>{guide.example}</p><h2>{l.interpretation}</h2><p>{guide.interpretation}</p><h2>{l.when}</h2><p>{guide.when}</p><h2>{l.limits}</h2><p>{guide.limits}</p><p><Link href={guide.calculator}>{l.use} {guide.calculatorLabel} →</Link></p>{guide.related.length>0&&<><h2>{l.related}</h2><p>{guide.related.map((slug,i)=><span key={slug}>{i?' · ':''}<Link href={`${prefix}/${slug}`}>{slug.replace(/-/g,' ')}</Link></span>)}</p></>}</article></main>;
}

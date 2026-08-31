'use client';
import {useMemo} from 'react';

type Lang='en'|'pt'|'es'|'de'|'ja';
type BannerSize='1200x628'|'728x90'|'300x250'|'1080x1080';
type LogoVariant='full-color'|'full-dark'|'icon-color'|'icon-dark';

const blue='#146CFF', navy='#06152f', white='#ffffff';

function esc(s:string){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]||c));}
function svgData(svg:string){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);}

function iconSvg(bg:string,box:string,cells:string,w=300,h=300){
  const s=Math.min(w,h)*.8,x=(w-s)/2,y=(h-s)/2,p=s*.15,g=s*.08,c=(s-2*p-g)/2;
  return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'"><rect width="100%" height="100%" fill="'+bg+'"/><rect x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" rx="'+(s*.18)+'" fill="'+box+'"/><g fill="'+cells+'"><rect x="'+(x+p)+'" y="'+(y+p)+'" width="'+c+'" height="'+c+'" rx="'+(c*.12)+'"/><rect x="'+(x+p+c+g)+'" y="'+(y+p)+'" width="'+c+'" height="'+c+'" rx="'+(c*.12)+'"/><rect x="'+(x+p)+'" y="'+(y+p+c+g)+'" width="'+c+'" height="'+c+'" rx="'+(c*.12)+'"/><rect x="'+(x+p+c+g)+'" y="'+(y+p+c+g)+'" width="'+c+'" height="'+c+'" rx="'+(c*.12)+'"/></g></svg>';
}

function logoSvg(v:LogoVariant){
  const dark=v.includes('dark'), icon=v.startsWith('icon');
  if(icon) return iconSvg(dark?navy:white,dark?white:blue,dark?navy:white);
  const bg=dark?navy:white, ib=dark?white:blue, cell=dark?navy:white, text=dark?white:navy, sub=dark?'#8EB8FF':blue;
  return '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="240" viewBox="0 0 900 240"><rect width="900" height="240" fill="'+bg+'"/><g transform="translate(30,30)"><rect width="180" height="180" rx="32" fill="'+ib+'"/><g fill="'+cell+'"><rect x="27" y="27" width="58" height="58" rx="8"/><rect x="95" y="27" width="58" height="58" rx="8"/><rect x="27" y="95" width="58" height="58" rx="8"/><rect x="95" y="95" width="58" height="58" rx="8"/></g></g><text x="240" y="95" font-family="Arial,Helvetica,sans-serif" font-size="62" font-weight="700" fill="'+text+'">Business</text><text x="240" y="158" font-family="Arial,Helvetica,sans-serif" font-size="62" font-weight="700" fill="'+text+'">Calculator Hub</text><text x="242" y="204" font-family="Arial,Helvetica,sans-serif" font-size="22" fill="'+sub+'">Free tools. Smarter decisions.</text></svg>';
}

function bannerSvg(lang:Lang,size:BannerSize){
  const [W,H]=size.split('x').map(Number);
  const copy:any={en:['Free business calculators for smarter decisions.','Practical tools for freelancers, entrepreneurs and small businesses.','Explore free tools'],pt:['Calculadoras gratuitas para decisões mais inteligentes.','Ferramentas para MEI, PJ, trabalho e pequenos negócios.','Acesse gratuitamente'],es:['Calculadoras gratuitas para decisiones más inteligentes.','Herramientas prácticas para freelancers, emprendedores y pequeñas empresas.','Explorar herramientas'],de:['Kostenlose Business-Rechner für bessere Entscheidungen.','Praktische Tools für Freelancer, Gründer und kleine Unternehmen.','Kostenlose Rechner öffnen'],ja:['より良い意思決定のための無料ビジネス計算ツール。','フリーランス・起業家・中小企業向け実用ツール。','無料ツールを見る']}[lang];const [headline,sub,cta]=copy;
  const fs=Math.max(18,Math.round(H*.115)), subFs=Math.max(11,Math.round(H*.052)), brandFs=Math.max(12,Math.round(H*.065));
  const icon=Math.max(34,Math.round(Math.min(W,H)*.16));
  const ix=Math.round(W*.05), iy=Math.round(H*.08), tx=ix+icon+Math.round(W*.015);
  const h1y=Math.round(H*.40);
  return '<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"><rect width="'+W+'" height="'+H+'" fill="'+navy+'"/><ellipse cx="'+(W*.82)+'" cy="'+(H*.18)+'" rx="'+(W*.28)+'" ry="'+(H*.62)+'" fill="#0d2b63"/><rect x="'+(W*.73)+'" y="'+(H*.16)+'" width="'+(W*.20)+'" height="'+(H*.68)+'" rx="'+Math.max(8,H*.04)+'" fill="#0f2857" stroke="#456a9f"/><g transform="translate('+ix+','+iy+') scale('+(icon/300)+')">'+iconSvg('transparent',blue,white).replace(/^<svg[^>]*>|<\/svg>$/g,'')+'</g><text x="'+tx+'" y="'+(iy+brandFs)+'" font-family="Arial,Helvetica,sans-serif" font-size="'+brandFs+'" font-weight="700" fill="'+white+'">Business Calculator Hub</text><foreignObject x="'+(W*.05)+'" y="'+(H*.31)+'" width="'+(W*.60)+'" height="'+(H*.48)+'"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;color:white;font-size:'+fs+'px;font-weight:700;line-height:1.05">'+esc(headline)+'<div style="font-size:'+subFs+'px;font-weight:400;line-height:1.25;color:#cbdcff;margin-top:'+Math.max(6,H*.035)+'px">'+esc(sub)+'</div><span style="display:inline-block;margin-top:'+Math.max(8,H*.045)+'px;background:'+blue+';padding:'+Math.max(7,H*.025)+'px '+Math.max(12,W*.018)+'px;border-radius:'+Math.max(6,H*.03)+'px;font-size:'+Math.max(10,H*.045)+'px">'+esc(cta)+'</span></div></foreignObject></svg>';
}

function trigger(blob:Blob,name:string){
  const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1500);
}
async function rasterize(svg:string,format:'png'|'jpg',name:string){
  const blob=new Blob([svg],{type:'image/svg+xml'}), url=URL.createObjectURL(blob), img=new Image();
  await new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=reject;img.src=url;});
  const canvas=document.createElement('canvas'); canvas.width=img.naturalWidth; canvas.height=img.naturalHeight;
  const ctx=canvas.getContext('2d')!; if(format==='jpg'){ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);} ctx.drawImage(img,0,0); URL.revokeObjectURL(url);
  await new Promise<void>(resolve=>canvas.toBlob(b=>{if(b)trigger(b,name);resolve();},format==='png'?'image/png':'image/jpeg',.94));
}

function Buttons({svg,base,jpg=true}:{svg:string,base:string,jpg?:boolean}){
 return <div className="assetButtons"><button onClick={()=>trigger(new Blob([svg],{type:'image/svg+xml'}),base+'.svg')}>SVG</button><button onClick={()=>rasterize(svg,'png',base+'.png')}>PNG</button>{jpg&&<button onClick={()=>rasterize(svg,'jpg',base+'.jpg')}>JPG</button>}</div>
}

export default function MediaKitAssets({lang}:{lang:Lang}){
 const logos=useMemo(()=>[
  ['full-color','Full logo · light background'],['full-dark','Full logo · dark background'],['icon-color','Icon · light background'],['icon-dark','Icon · dark background']
 ] as [LogoVariant,string][],[]);
 const banners=useMemo(()=>(['1200x628','728x90','300x250','1080x1080'] as BannerSize[]),[]);
 return <section className="sectionBlock assetSection">
  <div className="sectionHeading"><div><p className="eyebrow">{({pt:'ARQUIVOS DE MARCA',es:'ARCHIVOS DE MARCA',de:'MARKENASSETS',ja:'ブランド素材',en:'BRAND ASSETS'} as any)[lang]}</p><h2>{({pt:'Logos e banners para download',es:'Logos y banners para descargar',de:'Logos & Banner zum Download',ja:'ロゴ・バナーをダウンロード',en:'Download-ready logos & banners'} as any)[lang]}</h2></div><p>{({pt:'Arquivos reais gerados no navegador, prontos para salvar e publicar.',es:'Archivos reales generados en el navegador, listos para guardar y publicar.',de:'Dateien werden direkt im Browser erzeugt und können gespeichert und veröffentlicht werden.',ja:'ブラウザで実ファイルを生成し、保存・公開できます。',en:'Every button generates a real downloadable file in your browser, ready to publish.'} as any)[lang]}</p></div>
  <h3 className="assetGroupTitle">{lang==='pt'?'Logos':'Logos'}</h3>
  <div className="assetGrid">{logos.map(([v,label])=>{const svg=logoSvg(v);return <article className="assetCard" key={v}><div className={'assetPreview '+(v.includes('dark')?'dark':'')}><img src={svgData(svg)} alt={label}/></div><strong>{lang==='pt'?label.replace('Full logo','Logo completo').replace('light background','fundo claro').replace('dark background','fundo escuro').replace('Icon','Ícone'):label}</strong><Buttons svg={svg} base={'business-calculator-hub-'+v} jpg={false}/></article>})}</div>
  <h3 className="assetGroupTitle">{lang==='pt'?'Banners':'Banners'}</h3>
  <div className="bannerAssetGrid">{banners.map(size=>{const svg=bannerSvg(lang,size);return <article className="assetCard bannerCard" key={size}><div className="bannerPreview"><img src={svgData(svg)} alt={'Business Calculator Hub banner '+size}/></div><strong>{size}</strong><span>{size==='1200x628'?'Social / Open Graph':size==='728x90'?'Leaderboard':size==='300x250'?'Medium Rectangle':'Social Square'}</span><Buttons svg={svg} base={'business-calculator-hub-banner-'+size+'-'+lang}/></article>})}</div>
 </section>
}

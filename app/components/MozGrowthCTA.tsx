'use client';
import {useEffect}from'react';
import TrackedOutboundLink from'./TrackedOutboundLink';

export const MOZ_AFFILIATE_URL='https://moz.pxf.io/gRQm1B';

export default function MozGrowthCTA({placement,headline='Turn business growth into search visibility.'}:{placement:string;headline?:string}){
 useEffect(()=>{
  const payload={partner:'moz',placement,page_path:window.location.pathname,transport_type:'beacon'};
  window.gtag?.('event','partner_affiliate_impression',payload);
  window.gtag?.('event','affiliate_impression',payload);
 },[placement]);

 return <section className="sponsorCallout">
  <div>
   <span className="sponsorLabel">SEO & AI SEARCH · MOZ AFFILIATE PARTNER</span>
   <h2>{headline}</h2>
   <p>Moz Pro combines traditional SEO research with AI Visibility tools for ChatGPT, Gemini, Google AI Mode and Perplexity. Start with a 7-day free trial; eligible annual plans include 20% off.</p>
  </div>
  <TrackedOutboundLink className="primary" href={MOZ_AFFILIATE_URL} partner="moz" placement={placement}>Start your 7-day free trial →</TrackedOutboundLink>
 </section>
}

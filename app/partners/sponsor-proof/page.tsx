import Link from'next/link';
import {getAudienceData}from'../../lib/ga4';

export const metadata={title:'Sponsor Proof — Business Calculator Hub',description:'Live audience, intent and sponsorship proof for Business Calculator Hub partners.',alternates:{canonical:'/partners/sponsor-proof'}};

const focusPaths=[
 '/freelance-rate-calculator',
 '/guides/how-much-should-i-charge-as-a-freelancer',
 '/guides/consulting-rate-calculator',
 '/guides/freelance-marketer-hourly-rate',
 '/guides/freelance-consultant-hourly-rate',
 '/guides/retainer-pricing-calculator',
 '/pt-br/guias/quanto-cobrar-por-hora-freelancer',
 '/pt-br/guias/quanto-cobrar-por-consultoria',
 '/pt-br/calculadora-clt-pj'
];

export default async function SponsorProof(){
 const a=await getAudienceData();
 const focus=a.topContent.filter((x:any)=>focusPaths.some(p=>x.path.startsWith(p))).slice(0,8);
 const organic=(a as any).acquisition?.organic||{activeUsers:0,sessions:0,pageViews:0};
 const ai=(a as any).aiReferrals||{sessions:0,pageViews:0,platforms:[]};
 return <main className="shell">
  <section className="hero heroCompact">
   <p className="eyebrow">SPONSOR PROOF · LIVE DATA</p>
   <h1>A focused audience making pricing and business decisions.</h1>
   <p className="lead">Business Calculator Hub is building an acquisition cluster around freelancers, consultants and small service businesses. This page exposes measured audience data and the commercial contexts available to partners.</p>
   <div className="heroActions"><Link className="primary" href="/advertise">See sponsorship options →</Link><Link className="secondary" href="/partners/media-kit">Open partner media kit</Link></div>
  </section>
  <section className="trafficProof">
   <div className="trafficSectionTitle"><div><span>30-DAY AUDIENCE</span><strong>{a.periodLabel}</strong></div><em>Updated {a.updatedAt}</em></div>
   <div className="trafficMetrics">
    <div><strong>{a.monthly.activeUsers.toLocaleString('en-US')}</strong><span>Active users</span></div>
    <div><strong>{a.monthly.sessions.toLocaleString('en-US')}</strong><span>Sessions</span></div>
    <div><strong>{a.monthly.pageViews.toLocaleString('en-US')}</strong><span>Page views</span></div>
    <div><strong>{a.monthly.countries}+</strong><span>Countries reached</span></div>
   </div>
   <div className="momentumGrid">
    <div><span>Organic users</span><strong>{Number(organic.activeUsers||0).toLocaleString('en-US')}</strong><b>Measured GA4 traffic</b></div>
    <div><span>Organic sessions</span><strong>{Number(organic.sessions||0).toLocaleString('en-US')}</strong><b>Search-driven visits</b></div>
    <div><span>AI referral sessions</span><strong>{Number(ai.sessions||0).toLocaleString('en-US')}</strong><b>Tracked separately from search</b></div>
   </div>
  </section>
  <section className="sectionBlock">
   <div className="sectionHeading"><div><p className="eyebrow">AUDIENCE WE ARE CONCENTRATING ON</p><h2>Freelancers, consultants and small service businesses.</h2></div><p>Our current acquisition work is intentionally centered on users deciding what to charge, how to structure a project, whether a contract is viable and which tools help them run the business.</p></div>
   <div className="guideGrid">
    <article className="guideCard"><span className="tag">PRICING</span><h2>Rate & project decisions</h2><p>Hourly rates, project prices, retainers, margin and break-even decisions.</p></article>
    <article className="guideCard"><span className="tag">OPERATIONS</span><h2>Running the business</h2><p>CRM, invoicing, payments, email, automation, productivity and client management are natural next steps.</p></article>
    <article className="guideCard"><span className="tag">BRAZIL</span><h2>CLT, PJ & freelance economics</h2><p>Localized content supports people comparing employment and independent-work scenarios.</p></article>
   </div>
  </section>
  <section className="sectionBlock">
   <div className="sectionHeading"><div><p className="eyebrow">MEASURED CONTENT INTENT</p><h2>What visitors are actually reading.</h2></div><p>These are GA4 page-view measurements, not inferred demographics.</p></div>
   <div className="guideGrid">{(focus.length?focus:a.topContent.slice(0,8)).map((x:any)=><Link className="guideCard" href={x.path} key={x.path}><span className="tag">LIVE GA4</span><h2>{x.label}</h2><p>{x.views} measured page views in the current reporting window.</p><strong>Open page →</strong></Link>)}</div>
  </section>
  <section className="splitFeature advertiserFit"><div className="featureCopy"><p className="eyebrow">SPONSOR INVENTORY</p><h2>Sell context, not generic impressions.</h2><p>Partners can sponsor the moment immediately after a user calculates or researches a business decision. Every outbound partner CTA can be tagged with partner, placement and page path for GA4 measurement.</p></div><div className="featureList"><div><span>Category</span><strong>Billing / invoicing</strong></div><div><span>Category</span><strong>CRM / client management</strong></div><div><span>Category</span><strong>Email / growth</strong></div><div><span>Category</span><strong>Payments / fintech</strong></div><div><span>Category</span><strong>SEO / software</strong></div></div></section>
  <section className="sponsorCallout"><div><span className="sponsorLabel">PILOT FORMAT</span><h2>Start small, measure, then expand.</h2><p>We can run a 30-day contextual pilot, report exposure and outbound CTA clicks, and use actual performance to decide whether the partnership should grow.</p></div><a className="primary" href="mailto:contato@assessorialf.com.br?subject=Business%20Calculator%20Hub%20sponsorship%20pilot">Discuss a pilot →</a></section>
  <p className="trafficNote">Source: {a.source}. Audience figures are measured, not projected. Organic Search and AI referral traffic are reported separately to avoid overstating acquisition.</p>
 </main>
}
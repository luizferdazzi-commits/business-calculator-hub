import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise with Business Calculator Hub',
  description: 'Reach freelancers, entrepreneurs and small-business owners at the moment they are making a financial or software decision.',
};

const plans = [
  { name: 'Presence', price: '$49', description: 'Start with one high-intent placement.', features: ['One relevant calculator or guide', 'Contextual partner card', 'Tracked outbound clicks', 'Monthly performance summary'] },
  { name: 'Featured', price: '$129', description: 'Build visibility across a focused topic.', features: ['Up to three relevant pages', 'Logo, message and call to action', 'Tracked impressions and clicks', 'Monthly insights and placement review'], featured: true },
  { name: 'Category Partner', price: '$299', description: 'Own a category during the founding program.', features: ['Up to five relevant pages', 'Category exclusivity', 'Priority placement and creative testing', 'Monthly report and strategy review'] },
];

export default function AdvertisePage() {
  return <main className="shell">
    <header className="header">
      <Link className="brand" href="/">Business Calculator Hub</Link>
      <nav className="nav"><Link href="/#calculators">Calculators</Link><Link href="/guides">Guides</Link><Link href="/ai-tools">AI Tools</Link><Link href="/advertise">Advertise</Link></nav>
    </header>

    <section className="partnerHero">
      <div>
        <p className="eyebrow">FOUNDING PARTNER PROGRAM</p>
        <h1>Be useful at the exact moment a business decision is being made.</h1>
        <p className="lead">Place your product beside calculators and practical guides used by freelancers, entrepreneurs and small-business owners. Every placement is contextual, clearly disclosed and measurable.</p>
        <div className="heroActions"><a className="primary" href="#plans">See founding plans →</a><a className="secondary" href="#apply">How applications work</a></div>
        <div className="trustRow"><span>✓ Contextual placements</span><span>✓ Transparent sponsorship</span><span>✓ Click tracking</span><span>✓ Monthly reporting</span></div>
      </div>
      <div className="partnerSignal">
        <span className="tag">THE DIFFERENCE</span>
        <strong>Intent, not interruption.</strong>
        <p>Your offer appears after a visitor calculates pricing, profitability, ROI or compensation—not as an unrelated display ad.</p>
        <div><b>calculator_completed</b><span>Decision intent</span></div>
        <div><b>partner_click</b><span>Measurable interest</span></div>
      </div>
    </section>

    <section className="valueStrip partnerStats"><div><strong>6</strong><span>Decision calculators</span></div><div><strong>10+</strong><span>Practical guides</span></div><div><strong>Global</strong><span>English-language audience</span></div><div><strong>GA4</strong><span>Measured interactions</span></div></section>

    <section className="sectionBlock" id="fit">
      <div className="sectionHeading"><div><p className="eyebrow">WHO IT FITS</p><h2>Products that help visitors act on their numbers.</h2></div><p>We approve partners only when the offer matches the intent of the calculator or guide where it appears.</p></div>
      <div className="partnerFitGrid">
        {['Freelancer software and CRM','Accounting and invoicing','Business banking and payments','Pricing and ecommerce tools','Payroll and HR software','Marketing and productivity tools'].map(item=><div className="partnerFit" key={item}><span>✓</span><strong>{item}</strong></div>)}
      </div>
    </section>

    <section className="sectionBlock" id="plans">
      <div className="sectionHeading"><div><p className="eyebrow">FOUNDING RATES</p><h2>Start small. Prove value. Scale what works.</h2></div><p>Monthly founding rates are designed for the first partner cohort and may change as verified traffic and conversion data grows.</p></div>
      <div className="pricingGrid">{plans.map(plan=><article className={`pricingCard ${plan.featured?'pricingFeatured':''}`} key={plan.name}>{plan.featured&&<span className="planBadge">BEST START</span>}<p className="tag">{plan.name}</p><h3>{plan.price}<small>/month</small></h3><p>{plan.description}</p><ul>{plan.features.map(feature=><li key={feature}>{feature}</li>)}</ul><a href="#apply" className={plan.featured?'primary full':'secondary full'}>Apply for this plan</a></article>)}</div>
      <p className="pricingNote">Affiliate and hybrid agreements are also available: a lower monthly fee plus an agreed commission per qualified lead or sale.</p>
    </section>

    <section className="partnerProcess">
      <div><p className="eyebrow">HOW IT WORKS</p><h2>A controlled, transparent partner process.</h2></div>
      <ol><li><span>01</span><div><strong>Fit review</strong><p>We review the product, audience and the pages where it can genuinely help.</p></div></li><li><span>02</span><div><strong>Placement plan</strong><p>We agree on message, pages, tracking destination and sponsorship disclosure.</p></div></li><li><span>03</span><div><strong>Launch and measure</strong><p>We publish the placement and track impressions, clicks and available outcomes.</p></div></li><li><span>04</span><div><strong>Monthly review</strong><p>You receive a concise report and recommendations for the next cycle.</p></div></li></ol>
    </section>

    <section className="ctaPanel partnerApply" id="apply">
      <div><p className="eyebrow">APPLICATIONS OPENING</p><h2>Prepare your founding partner application.</h2><p>Include your product URL, ideal customer, preferred calculators or guides, target countries, offer, landing page and whether you prefer fixed monthly, affiliate or hybrid pricing.</p><p className="applicationNote">The dedicated commercial contact channel is being finalized. No payment is required before fit and placement are approved.</p></div>
      <Link className="secondary" href="/affiliate-disclosure">Review our disclosure policy →</Link>
    </section>

    <footer className="footer"><span>© 2026 Business Calculator Hub</span><div><Link href="/advertise">Advertise</Link><Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
  </main>;
}

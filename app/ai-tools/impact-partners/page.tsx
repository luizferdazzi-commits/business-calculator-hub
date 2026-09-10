import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impact Affiliate Partners & Business Tools | Business Calculator Hub',
  description: 'Explore business software and services available through our Impact affiliate partnerships, including DocHub, signNow, pdfFiller, Wegic and italki.',
  alternates: { canonical: '/ai-tools/impact-partners' }
};

const partners = [
  {name:'DocHub',category:'DOCUMENT WORKFLOW',text:'Online document workflows for editing, signing and managing PDFs and business documents.'},
  {name:'signNow',category:'E-SIGNATURE',text:'Electronic signature workflows for businesses that need to prepare, send and sign documents.'},
  {name:'pdfFiller',category:'PDF PRODUCTIVITY',text:'PDF editing and document-management tools for forms, contracts and everyday business paperwork.'},
  {name:'Wegic',category:'AI WEBSITE BUILDER',text:'AI-assisted website creation for entrepreneurs and small businesses exploring faster ways to launch a web presence.'},
  {name:'italki',category:'LANGUAGE LEARNING',text:'Online language learning with tutors, useful for professionals and entrepreneurs building communication skills for international business.'}
];

export default function ImpactPartners(){return <main className="shell">
<header className="header"><Link className="brand" href="/">Business Calculator Hub</Link><nav className="nav"><Link href="/#calculators">Calculators</Link><Link href="/guides">Guides</Link><Link href="/ai-tools">AI Tools</Link><Link className="advertiseNav" href="/advertise">📣 Advertise with us</Link></nav></header>
<section className="hero heroCompact"><p className="eyebrow">IMPACT · AFFILIATE PARTNERS</p><h1>Business tools worth evaluating for your workflow.</h1><p className="lead">A transparent directory of selected software and services available through our active affiliate relationships on Impact. We focus on practical business use cases rather than simply listing offers.</p><div className="heroActions"><Link className="primary" href="#partners">Explore partners →</Link><Link className="secondary" href="/affiliate-disclosure">Affiliate disclosure</Link></div><div className="trustRow"><span>✓ Business focused</span><span>✓ Practical use cases</span><span>✓ Affiliate transparency</span><span>✓ No added cost to readers</span></div></section>
<section id="partners" className="sectionBlock"><div className="sectionHeading"><div><p className="eyebrow">PARTNER DIRECTORY</p><h2>Choose by the problem you need to solve.</h2></div><p>Partner inclusion does not replace comparison. Check current pricing, features and terms on each provider before purchasing.</p></div><div className="guideGrid">{partners.map(p=><div className="guideCard" key={p.name}><span className="tag">{p.category}</span><h2>{p.name}</h2><p>{p.text}</p><strong>Impact affiliate partner</strong></div>)}</div></section>
<section className="splitFeature"><div className="featureCopy"><p className="eyebrow">EDITORIAL APPROACH</p><h2>Affiliate relationships are disclosed, not hidden.</h2><p>Business Calculator Hub may earn a commission when a qualifying action or purchase is attributed to an affiliate link. This does not increase the price paid by the reader. Recommendations should still be evaluated against your own requirements.</p><Link className="secondary dark" href="/affiliate-disclosure">Read our disclosure →</Link></div><div className="featureList"><div><span>Documents</span><strong>DocHub · pdfFiller</strong></div><div><span>E-signature</span><strong>signNow</strong></div><div><span>Website</span><strong>Wegic</strong></div><div><span>Skills</span><strong>italki</strong></div></div></section>
<section className="sponsorCallout"><div><span className="sponsorLabel">PARTNER BRANDS</span><h2>Want deeper contextual placement?</h2><p>Relevant software and business-service brands can propose sponsored contextual placements separately from affiliate relationships.</p></div><Link className="primary" href="/advertise">Advertise with us →</Link></section>
<footer className="footer"><span>© 2026 Business Calculator Hub</span><div><Link href="/advertise">Advertise with us</Link><Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
</main>}

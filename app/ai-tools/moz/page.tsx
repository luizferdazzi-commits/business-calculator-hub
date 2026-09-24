import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedOutboundLink from '../../components/TrackedOutboundLink';
import {MOZ_AFFILIATE_URL} from '../../components/MozGrowthCTA';

export const metadata: Metadata = {
  title: 'Moz Pro: SEO + AI Visibility for Small Business | Business Calculator Hub',
  description: 'Explore Moz Pro traditional SEO tools plus AI Visibility across ChatGPT, Gemini, Google AI Mode and Perplexity. 7-day free trial and eligible annual-plan discount.',
  alternates: { canonical: '/ai-tools/moz' }
};

export default function MozReview(){
  return <main className="shell">
    <header className="header"><Link className="brand" href="/">Business Calculator Hub</Link><nav className="nav"><Link href="/#calculators">Calculators</Link><Link href="/guides">Guides</Link><Link href="/ai-tools">AI Tools</Link><Link className="advertiseNav" href="/advertise">📣 Advertise with us</Link></nav></header>

    <section className="hero heroCompact">
      <p className="eyebrow">ALL-IN-ONE SEO TOOLKIT · AFFILIATE PARTNER</p>
      <h1>Moz Pro: modern SEO meets AI search.</h1>
      <p className="lead">Moz Pro combines traditional SEO tools with AI Research tools to help businesses optimize their sites, uncover opportunities and understand how their brands appear across search and AI.</p>
      <div className="heroActions">
        <TrackedOutboundLink className="primary" href={MOZ_AFFILIATE_URL} partner="moz" placement="moz_review_hero_trial">Start your 7-day free trial →</TrackedOutboundLink>
        <TrackedOutboundLink className="secondary" href={MOZ_AFFILIATE_URL} partner="moz" placement="moz_review_hero_discount">Claim 20% off annual plans →</TrackedOutboundLink>
      </div>
      <div className="trustRow"><span>✓ 7-day free trial</span><span>✓ AI Visibility</span><span>✓ SEO research</span><span>✓ 20% off eligible annual plans</span></div>
    </section>

    <section className="sectionBlock">
      <div className="sectionHeading"><div><p className="eyebrow">AI VISIBILITY</p><h2>See how your brand appears across AI search.</h2></div><p>Track presence across ChatGPT, Gemini, Google AI Mode and Perplexity, then use AI Research tools to understand citations, sentiment, prompts and content opportunities.</p></div>
      <div className="guideGrid">
        <div className="guideCard"><span className="tag">AI CITATIONS</span><h2>Find trusted sources and citation gaps</h2><p>See which domains AI systems cite, where your brand is mentioned and where competitors may be winning visibility.</p></div>
        <div className="guideCard"><span className="tag">AI SENTIMENT</span><h2>Understand how your brand is discussed</h2><p>Review whether AI answers describe your brand favorably or unfavorably and identify areas that need attention.</p></div>
        <div className="guideCard"><span className="tag">PROMPTS</span><h2>Discover high-intent questions</h2><p>Surface the questions people ask AI tools so you can build content around real research and buying intent.</p></div>
        <div className="guideCard"><span className="tag">CONTENT BRIEFS</span><h2>Turn research into action</h2><p>Use research signals to create practical content guidance for both traditional search and AI discovery.</p></div>
      </div>
    </section>

    <section className="splitFeature">
      <div className="featureCopy"><p className="eyebrow">TRADITIONAL SEO FOUNDATION</p><h2>SEO fundamentals still matter.</h2><p>Use Keyword Explorer, Site Crawl, Rank Tracking, Link Explorer and Competitive Research to find opportunities, diagnose issues and monitor performance.</p><TrackedOutboundLink className="secondary dark" href={MOZ_AFFILIATE_URL} partner="moz" placement="moz_review_seo_tools">Explore Moz Pro →</TrackedOutboundLink></div>
      <div className="featureList"><div><span>Research</span><strong>Keyword Explorer</strong></div><div><span>Technical</span><strong>Site Crawl</strong></div><div><span>Measure</span><strong>Rank Tracking</strong></div><div><span>Authority</span><strong>Link Explorer</strong></div><div><span>Landscape</span><strong>Competitive Research</strong></div></div>
    </section>

    <section className="sectionBlock">
      <div className="sectionHeading"><div><p className="eyebrow">FROM INSIGHT TO ACTION</p><h2>One workflow for search and AI discovery.</h2></div><p>Use core SEO data to identify gaps, map AI visibility, discover user prompts and create content designed to compete across both search experiences.</p></div>
      <div className="guideGrid">
        <div className="guideCard"><span className="tag">1</span><h2>Uncover SEO gaps</h2><p>Find high-value keyword and topic opportunities.</p></div>
        <div className="guideCard"><span className="tag">2</span><h2>Map AI visibility</h2><p>Check how your topics and brand appear across leading AI platforms.</p></div>
        <div className="guideCard"><span className="tag">3</span><h2>Discover user prompts</h2><p>Identify the follow-up questions your audience is asking.</p></div>
        <div className="guideCard"><span className="tag">4</span><h2>Create rank-ready content</h2><p>Turn research into actionable briefs for Google and AI search.</p></div>
      </div>
    </section>

    <section className="sponsorCallout"><div><span className="sponsorLabel">MOZ PRO OFFER</span><h2>Try the full workflow before deciding.</h2><p>Start a 7-day free trial. If you continue with an eligible annual Moz Pro plan, the partner offer includes 20% off.</p></div><TrackedOutboundLink className="primary" href={MOZ_AFFILIATE_URL} partner="moz" placement="moz_review_final_trial">Start your free trial →</TrackedOutboundLink></section>

    <section className="content"><h2>Affiliate disclosure</h2><p>Business Calculator Hub participates in the Moz affiliate program. We may earn a commission from qualifying actions or purchases at no additional cost to you. Product descriptions on this page reflect materials provided by Moz for the current 2026 positioning.</p></section>
    <footer className="footer"><span>© 2026 Business Calculator Hub</span><div><Link href="/advertise">Advertise with us</Link><Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
  </main>
}

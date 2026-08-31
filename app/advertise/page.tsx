import Link from 'next/link';
import { audienceSnapshot as audience } from '../data/audience';
import AdvertisingPlans from '../components/AdvertisingPlans';

export const metadata = {
  title: 'Advertise With Us',
  description: 'Reach freelancers, entrepreneurs and small-business decision makers through Business Calculator Hub.',
};

export default function AdvertisePage(){
  return <main className="shell">
    <header className="header"><Link className="brand" href="/">Business Calculator Hub</Link><nav className="nav"><Link href="/">Calculators</Link><Link href="/guides">Guides</Link><Link href="/ai-tools">AI Tools</Link></nav></header>
    <section className="hero heroCompact advertiseHero">
      <p className="eyebrow">ADVERTISE WITH US</p>
      <h1>Reach people while they are making business decisions.</h1>
      <p className="lead">Business Calculator Hub helps freelancers, entrepreneurs and small businesses make pricing, compensation, profitability and investment decisions. We offer relevant, clearly labeled sponsorship opportunities for brands that serve this audience.</p>
      <div className="heroActions"><a className="primary" href="#plans">View plans & placements ↓</a><a className="secondary" href="mailto:contato@assessorialf.com.br?subject=Advertising%20inquiry%20-%20Business%20Calculator%20Hub">Email advertising inquiry</a></div>
    </section>
    <AdvertisingPlans lang="en" contact="#proposal"/>

    <section className="trafficProof" aria-label="Audience and partner media kit">
      <div className="trafficProofIntro">
        <p className="eyebrow">LIVE AUDIENCE & PARTNER MEDIA KIT</p>
        <h2>Real audience data, updated daily from Google Analytics.</h2>
        <p>Business Calculator Hub is in its growth stage. We publish measured audience data so prospective partners can evaluate reach, momentum and content intent with transparent numbers.</p>
      </div>

      <div className="trafficSectionTitle"><div><span>30-DAY AUDIENCE</span><strong>{audience.periodLabel}</strong></div><em>Updated {audience.updatedAt}</em></div>
      <div className="trafficMetrics">
        <div><strong>{audience.monthly.activeUsers.toLocaleString('en-US')}</strong><span>Monthly active users</span></div>
        <div><strong>{audience.monthly.sessions.toLocaleString('en-US')}</strong><span>Monthly sessions</span></div>
        <div><strong>{audience.monthly.pageViews.toLocaleString('en-US')}</strong><span>Monthly page views</span></div>
        <div><strong>{audience.monthly.countries}+</strong><span>Countries reached</span></div>
      </div>

      <div className="trafficSectionTitle trafficSectionTitleSecond"><div><span>7-DAY MOMENTUM</span><strong>Recent audience movement</strong></div><em>{audience.weekly.comparisonLabel}</em></div>
      <div className="momentumGrid">
        <div><span>Active users</span><strong>{audience.weekly.activeUsers.toLocaleString('en-US')}</strong><b className={audience.weekly.activeUsersGrowthPct>=0?'growthUp':'growthDown'}>{audience.weekly.activeUsersGrowthPct>=0?'+':''}{audience.weekly.activeUsersGrowthPct}%</b></div>
        <div><span>Sessions</span><strong>{audience.weekly.sessions.toLocaleString('en-US')}</strong><b className={audience.weekly.sessionsGrowthPct>=0?'growthUp':'growthDown'}>{audience.weekly.sessionsGrowthPct>=0?'+':''}{audience.weekly.sessionsGrowthPct}%</b></div>
        <div><span>Page views</span><strong>{audience.weekly.pageViews.toLocaleString('en-US')}</strong><b className={audience.weekly.pageViewsGrowthPct>=0?'growthUp':'growthDown'}>{audience.weekly.pageViewsGrowthPct>=0?'+':''}{audience.weekly.pageViewsGrowthPct}%</b></div>
      </div>

      <div className="mediaKitGrid">
        <div className="mediaKitCard">
          <span className="tag">TOP MARKETS</span>
          <h3>International reach</h3>
          <div className="marketList">{audience.topMarkets.map(m=><div key={m.country}><span>{m.country}</span><strong>{m.share.toFixed(1)}%</strong><em>{m.users} users</em></div>)}</div>
        </div>
        <div className="mediaKitCard">
          <span className="tag">MOST VISITED DECISION CONTENT</span>
          <h3>What visitors are researching</h3>
          <div className="contentList">{audience.topContent.map(p=><Link href={p.path} key={p.path}><span>{p.label}</span><strong>{p.views} views</strong></Link>)}</div>
        </div>
      </div>

      <div className="intentPanel">
        <div><span className="tag">AUDIENCE INTENT</span><h3>Topics our visitors are actively exploring</h3><p>These themes are based on the business content and tools being visited, not inferred personal demographics.</p></div>
        <div className="intentTags">{audience.intentTopics.map(t=><span key={t}>{t}</span>)}</div>
      </div>

      <div className="earlyPartnerPanel">
        <div><span className="tag">EARLY PARTNER OPPORTUNITY</span><h3>Join while the platform is scaling.</h3><p>Early partners can request preferential launch packages and contextual placements while our international organic audience and long-tail calculator library continue to expand.</p></div>
        <a className="primary" href="#proposal">Request an early partner package →</a>
      </div>

      <p className="trafficNote">Source: {audience.source}. Audience figures are measured, not projected. Data is refreshed daily and may change as Google Analytics processes traffic. Detailed media-kit data can be shared with qualified prospective partners.</p>
    </section>

    

    <section className="sectionBlock advertiseSection">
      <div className="sectionHeading"><div><p className="eyebrow">AVAILABLE OPPORTUNITIES</p><h2>Contextual placements, not intrusive ads.</h2></div><p>We prioritize placements that match the user's current business question and keep sponsored content clearly identified.</p></div>
      <div className="guideGrid">
        <article className="guideCard"><span className="tag">SPONSORED PLACEMENT</span><h2>Calculator sponsorship</h2><p>Place your brand next to a high-intent calculator result, with a short relevant message and destination link.</p></article>
        <article className="guideCard"><span className="tag">CONTENT</span><h2>Guide sponsorship</h2><p>Reach readers researching pricing, profitability, freelancing, compensation and business software.</p></article>
        <article className="guideCard"><span className="tag">PARTNERSHIP</span><h2>Featured software</h2><p>Relevant SaaS and business services can be considered for clearly disclosed featured placements and reviews.</p></article>
      </div>
    </section>

    <section className="splitFeature advertiserFit"><div className="featureCopy"><p className="eyebrow">WHO FITS BEST</p><h2>Built for useful B2B partnerships.</h2><p>Strong fits include SaaS, CRM, invoicing, accounting, payments, fintech, productivity, payroll, freelancer tools and other services that help people run a business.</p></div><div className="featureList"><div className="advertiserPoint"><span>01</span><strong>Relevant audience</strong><em>Freelancers & small businesses</em></div><div className="advertiserPoint"><span>02</span><strong>Decision context</strong><em>Pricing, margin, ROI & planning</em></div><div className="advertiserPoint"><span>03</span><strong>Flexible deals</strong><em>Monthly sponsorships & custom partnerships</em></div></div></section>

    <section id="proposal" className="proposalPanel">
      <div><p className="eyebrow">REQUEST A MEDIA KIT / SEND A PROPOSAL</p><h2>Tell us what you want to promote.</h2><p>We are currently accepting direct advertising and sponsorship proposals. Early partners can request custom launch packages while the platform grows.</p></div>
      <form className="proposalForm" action="https://formsubmit.co/contato@assessorialf.com.br" method="POST">
        <input type="hidden" name="_subject" value="New advertising proposal - Business Calculator Hub"/>
        <input type="hidden" name="_captcha" value="false"/>
        <input type="hidden" name="_template" value="table"/>
        <label>Company / brand<input required name="company" placeholder="Company name"/></label>
        <label>Contact name<input required name="name" placeholder="Your name"/></label>
        <label>Business email<input required type="email" name="email" placeholder="name@company.com"/></label>
        <label>Company website<input type="url" name="website" placeholder="https://"/></label>
        <label>Monthly advertising budget<select required name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>Under $250</option><option>$250–$500</option><option>$500–$1,000</option><option>$1,000–$2,500</option><option>$2,500+</option><option>Let's discuss</option></select></label>
        <label>Target markets<input name="markets" placeholder="e.g. United States, Latin America, Global"/></label>
        <label className="wide">What would you like to promote?<textarea required name="message" rows={5} placeholder="Tell us about your product, campaign goals and preferred placement."/></label>
        <button className="primary proposalButton" type="submit">Send advertising proposal →</button>
        <p className="formNote">Advertising is subject to editorial review. Sponsored placements are clearly disclosed and must be relevant to our audience.</p>
      </form>
    </section>

    <footer className="footer"><span>© 2026 Business Calculator Hub</span><div><Link href="/advertise">Advertise with us</Link><Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
  </main>;
}

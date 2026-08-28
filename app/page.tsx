import Link from 'next/link';
import s from './home.module.css';

const cards = [
  { href:'/freelance-rate-calculator', icon:'$', title:'Freelance Rate Calculator', text:'Calculate your ideal hourly rate' },
  { href:'/roi-calculator', icon:'↗', title:'ROI Calculator', text:'Measure the return on investment' },
  { href:'/salary-to-hourly-calculator', icon:'◉', title:'Salary Calculator', text:'Calculate salary after taxes' },
  { href:'/markup-calculator', icon:'▦', title:'Business Pricing Calculator', text:'Estimate selling prices and markup' },
  { href:'/break-even-calculator', icon:'◔', title:'Break-Even Calculator', text:'Find your break-even point' },
  { href:'/payback-period-calculator', icon:'↻', title:'Payback Period Calculator', text:'Estimate investment recovery time' },
  { href:'/cac-ltv-calculator', icon:'×', title:'CAC & LTV Calculator', text:'Measure customer unit economics' },
  { href:'/runway-calculator', icon:'◷', title:'Business Runway Calculator', text:'Estimate how long cash will last' },
  { href:'/selling-price-calculator', icon:'$', title:'Selling Price Calculator', text:'Price from cost and target margin' },
  { href:'/discount-margin-calculator', icon:'%', title:'Discount Margin Calculator', text:'Protect profit before discounting' },
  { href:'/fixed-project-price-calculator', icon:'▣', title:'Fixed Project Price Calculator', text:'Turn hourly work into a fixed quote' },
  { href:'/project-hourly-rate-calculator', icon:'⌁', title:'Project Hourly Rate Calculator', text:'Price multiple freelance projects' },
  { href:'/self-employment-tax-calculator', icon:'Tax', title:'Self-Employment Tax Calculator', text:'Estimate US freelancer tax reserve' },
  { href:'/freelance-vs-salary-calculator', icon:'↔', title:'Freelance vs Salary', text:'Compare compensation models' },
];

export default function Home(){
  return <main className={s.page}>
    <div className={s.topbar}>🚀 Trusted by freelancers, entrepreneurs and small businesses worldwide ⭐ 100% Free Calculators</div>
    <div className={s.wrap}>
      <header className={s.header}>
        <Link href="/" className={s.brand}><span className={s.logoBox}>▦</span><span>BUSINESS<br/><span className={s.brandBlue}>CALCULATOR HUB</span></span></Link>
        <nav className={s.nav}>
          <Link href="#calculators">Calculators⌄</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/ai-tools">AI Tools <span className={s.new}>NEW</span></Link>
          <Link href="/advertise" className={s.adNav}>📣 ADVERTISE WITH US</Link>
        </nav>
      </header>

      <section className={s.hero}>
        <div>
          <span className={s.kicker}>FREE BUSINESS TOOLS & GUIDES</span>
          <h1>Smart Calculators<br/>for <span className={s.blue}>Smarter<br/>Business Decisions</span></h1>
          <p className={s.lead}>Powerful, free and easy-to-use calculators to help you plan, invest, grow and succeed.</p>
          <div className={s.features}>
            <div className={s.feature}><span className={s.featureIcon}>⚡</span><div><strong>100% Free</strong><span>Always free, no sign-up</span></div></div>
            <div className={s.feature}><span className={s.featureIcon}>✓</span><div><strong>Accurate</strong><span>Reliable results you can trust</span></div></div>
            <div className={s.feature}><span className={s.featureIcon}>◷</span><div><strong>Fast & Easy</strong><span>Get results in seconds</span></div></div>
          </div>
          <div className={s.actions}><Link className={s.primary} href="#calculators">Explore Calculators →</Link><Link className={s.secondary} href="/guides">Browse Guides</Link></div>
        </div>

        <div className={s.visual}>
          <div className={s.calcCard}>
            <h3>Profit Margin Calculator</h3>
            <div className={s.field}><span>Revenue</span><div className={s.fakeInput}>$ 10,000</div></div>
            <div className={s.field}><span>Costs</span><div className={s.fakeInput}>$ 6,500</div></div>
            <div className={s.resultBox}><span>Profit Margin</span><strong>35.00%</strong><span className={s.healthy}>✓ Healthy Profit Margin</span></div>
          </div>
          <div className={s.chart}>
            <div className={s.arrow}>↗</div>
            <div className={s.bubble}>Make better<br/>decisions.<br/>Grow your<br/>business.</div>
            <div className={s.bars}><span className={s.bar}/><span className={s.bar}/><span className={s.bar}/></div>
            <div className={s.pie}/>
          </div>
        </div>
      </section>

      <Link href="/advertise" className={s.adBanner}>
        <span className={s.megaphone}>📣</span>
        <span className={s.adCopy}>
          <small>PUT YOUR BRAND IN FRONT OF</small>
          <strong>HIGH-INTENT BUSINESS USERS</strong>
          <span>Reach entrepreneurs, freelancers and business owners actively looking for tools, software and solutions.</span>
          <span className={s.adMeta}><span>🌐 Global Audience</span><span>🎯 High Engagement</span><span>🏷 Affordable Packages</span></span>
        </span>
        <span className={s.adButton}>ADVERTISE WITH US →<small>GET SEEN. GET CLICKS. GET RESULTS.</small></span>
      </Link>

      <section className={s.popular} id="calculators">
        <div className={s.popularHead}><h2>⭐ Popular Calculators</h2><Link href="#calculators">View all calculators →</Link></div>
        <div className={s.cards}>{cards.map(c=><Link href={c.href} className={s.card} key={c.href}><span className={s.cardIcon}>{c.icon}</span><span><strong>{c.title}</strong><span>{c.text}</span></span></Link>)}</div>
      </section>

      <footer className={s.footer}><span>© 2026 Business Calculator Hub</span><div><Link href="/advertise">Advertise with us</Link><Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
    </div>
  </main>;
}
import Link from 'next/link';

export default function Home() {
  return <main className="shell">
    <header className="header"><Link className="brand" href="/">Business Calculator Hub</Link><nav className="nav"><Link href="/salary-to-hourly-calculator">Calculators</Link><Link href="/ai-tools">AI Tools</Link></nav></header>
    <section className="hero"><p className="eyebrow">FREE BUSINESS TOOLS & GUIDES</p><h1>Make smarter business decisions.</h1><p className="lead">Practical calculators, business resources and software guides for freelancers, entrepreneurs and small businesses.</p><Link className="primary" href="/salary-to-hourly-calculator">Explore calculators →</Link></section>
    <h2 className="sectionTitle">Popular calculators</h2><section className="cards"><article><h2>Salary to Hourly</h2><p>Convert annual salary into hourly, weekly, daily and monthly pay.</p><Link href="/salary-to-hourly-calculator">Open calculator →</Link></article><article><h2>Freelance Rate</h2><p>Estimate a sustainable hourly rate using income goals, expenses, taxes and billable time.</p><Link href="/freelance-rate-calculator">Open calculator →</Link></article><article><h2>Profit Margin</h2><p>Calculate profit per sale, margin and markup.</p><Link href="/profit-margin-calculator">Open calculator →</Link></article><article><h2>Break-even</h2><p>Estimate the sales volume needed to cover fixed and variable costs.</p><Link href="/break-even-calculator">Open calculator →</Link></article></section>
    <section className="guideBand"><div><p className="eyebrow">NEW: AI & SOFTWARE GUIDES</p><h2>Evaluate business software before you buy.</h2><p>Explore practical guides focused on use cases, limitations and fit for small businesses.</p></div><div className="guideLinks"><Link href="/ai-tools/creao">CREAO AI Review →</Link><Link href="/ai-tools/best-ai-tools-for-small-business">Best AI Tools for Small Business →</Link></div></section>
    <footer className="footer"><span>© 2026 Business Calculator Hub</span><div><Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
  </main>;
}

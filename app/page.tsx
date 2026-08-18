import Link from 'next/link';

const calculators = [
  { href: '/salary-to-hourly-calculator', icon: '↔', title: 'Salary to Hourly', text: 'Convert annual salary into hourly, weekly, daily and monthly pay.' },
  { href: '/freelance-rate-calculator', icon: '⌁', title: 'Freelance Rate', text: 'Estimate a sustainable hourly rate using income goals, expenses and billable time.' },
  { href: '/profit-margin-calculator', icon: '%', title: 'Profit Margin', text: 'Calculate profit per sale, margin and markup with a clean, fast workflow.' },
  { href: '/break-even-calculator', icon: '◎', title: 'Break-even', text: 'Estimate the sales volume needed to cover fixed and variable costs.' },
];

export default function Home() {
  return <main className="shell">
    <header className="header"><Link className="brand" href="/">Business Calculator Hub</Link><nav className="nav"><Link href="#calculators">Calculators</Link><Link href="/guides">Guides</Link><Link href="/ai-tools">AI Tools</Link></nav></header>

    <section className="hero heroHome"><div className="heroGlow" aria-hidden="true"/><div className="heroCopy"><p className="eyebrow">FREE BUSINESS TOOLS & GUIDES</p><h1>Make clearer decisions with numbers that actually help.</h1><p className="lead">Fast calculators, practical business guides and curated software insights for freelancers, entrepreneurs and small businesses.</p><div className="heroActions"><Link className="primary" href="#calculators">Explore free tools →</Link><Link className="secondary" href="/guides">Browse guides</Link></div><div className="trustRow"><span>✓ No signup</span><span>✓ Free calculators</span><span>✓ Mobile friendly</span><span>✓ Practical guides</span></div></div><div className="heroVisual"><div className="metricCard metricMain"><span className="metricLabel">Profit margin</span><strong>32.4%</strong><small>Simple, instant calculation</small></div><div className="metricCard metricFloat"><span className="metricLabel">Break-even</span><strong>250 units</strong><small>Turn costs into a sales target</small></div><div className="miniBadge">Built for real decisions</div></div></section>

    <section className="valueStrip"><div><strong>4</strong><span>Free calculators</span></div><div><strong>4+</strong><span>Business guides</span></div><div><strong>AI</strong><span>Software research</span></div><div><strong>0</strong><span>Account required</span></div></section>

    <section id="calculators" className="sectionBlock"><div className="sectionHeading"><div><p className="eyebrow">POPULAR TOOLS</p><h2>Start with a number you need.</h2></div><p>Each tool is designed to answer one business question quickly, without spreadsheets or signup forms.</p></div><div className="toolGrid">{calculators.map((tool) => <Link className="toolCard" href={tool.href} key={tool.href}><span className="toolIcon">{tool.icon}</span><h3>{tool.title}</h3><p>{tool.text}</p><strong>Open calculator →</strong></Link>)}</div></section>

    <section className="splitFeature"><div className="featureCopy"><p className="eyebrow">LEARN + CALCULATE</p><h2>Understand the formula, then test your own numbers.</h2><p>Our guides explain the reasoning behind the calculators, with examples and direct links back to the tools.</p><Link className="secondary dark" href="/guides">Explore business guides →</Link></div><div className="featureList"><Link href="/guides/how-to-calculate-profit-margin"><span>Profitability</span><strong>How to Calculate Profit Margin</strong><em>Read →</em></Link><Link href="/guides/how-to-calculate-break-even-point"><span>Planning</span><strong>How to Calculate Break-Even Point</strong><em>Read →</em></Link><Link href="/guides/freelance-hourly-rate"><span>Freelancing</span><strong>How to Calculate Your Freelance Rate</strong><em>Read →</em></Link><Link href="/guides/salary-to-hourly-rate"><span>Compensation</span><strong>Salary to Hourly Rate</strong><em>Read →</em></Link></div></section>

    <section className="softwareShowcase"><div><p className="eyebrow">AI & SOFTWARE GUIDES</p><h2>Choose tools with less guesswork.</h2><p>Independent, practical software guides focused on real use cases, limitations and fit for small businesses.</p><div className="heroActions"><Link className="primary" href="/ai-tools">Explore AI tools →</Link><Link className="secondary" href="/ai-tools/creao">Read CREAO review</Link></div></div><div className="softwareCard"><span className="tag">FEATURED REVIEW</span><h3>CREAO AI</h3><p>Explore potential business use cases, strengths and considerations before deciding whether it fits your workflow.</p><Link href="/ai-tools/creao">Read the review →</Link></div></section>

    <section className="ctaPanel homeCta"><div><p className="eyebrow">SAVE TIME</p><h2>Bookmark the hub. Come back whenever the numbers get messy.</h2><p>Use one site for pricing, compensation, profitability, planning and software research.</p></div><Link className="primary" href="/guides">Explore all guides →</Link></section>

    <footer className="footer"><span>© 2026 Business Calculator Hub</span><div><Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
  </main>;
}

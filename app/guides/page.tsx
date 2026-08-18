import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Business Guides, Freelance Tips & Financial Formulas',
  description: 'Practical business guides covering profit margin, break-even, freelance pricing, salary conversion and AI tools.',
  alternates: { canonical: '/guides' },
};

const guides = [
  { href: '/guides/how-to-calculate-profit-margin', tag: 'Profitability', title: 'How to Calculate Profit Margin', text: 'Formula, examples and a direct path to the free margin calculator.' },
  { href: '/guides/how-to-calculate-break-even-point', tag: 'Planning', title: 'How to Calculate Break-Even Point', text: 'Understand contribution margin and estimate the sales volume needed to cover costs.' },
  { href: '/guides/freelance-hourly-rate', tag: 'Freelancing', title: 'How to Calculate Your Freelance Hourly Rate', text: 'Build a sustainable rate around income goals, expenses and realistic billable hours.' },
  { href: '/guides/salary-to-hourly-rate', tag: 'Compensation', title: 'Salary to Hourly Rate', text: 'Convert annual salary into an hourly equivalent and compare compensation more clearly.' },
  { href: '/ai-tools/best-ai-tools-for-small-business', tag: 'AI & Software', title: 'Best AI Tools for Small Business', text: 'A growing buyer guide for automation, productivity and business operations.' },
  { href: '/ai-tools/creao', tag: 'AI Review', title: 'CREAO AI Review', text: 'A practical look at CREAO for businesses exploring AI-powered workflows.' },
];

export default function GuidesPage() {
  return <main className="shell">
    <header className="header"><Link className="brand" href="/">Business Calculator Hub</Link><nav className="nav"><Link href="/">Calculators</Link><Link href="/guides">Guides</Link><Link href="/ai-tools">AI Tools</Link></nav></header>
    <section className="hero heroCompact"><p className="eyebrow">BUSINESS KNOWLEDGE HUB</p><h1>Guides that turn numbers into better decisions.</h1><p className="lead">Short, practical explanations that connect directly to calculators and software guides—so you can learn, test and act in one place.</p></section>
    <section className="guideGrid">{guides.map((guide) => <Link className="guideCard" href={guide.href} key={guide.href}><span className="tag">{guide.tag}</span><h2>{guide.title}</h2><p>{guide.text}</p><strong>Read guide →</strong></Link>)}</section>
    <section className="ctaPanel"><div><p className="eyebrow">NEED A QUICK ANSWER?</p><h2>Skip the formulas and use the calculators.</h2><p>Get instant estimates for salary conversion, freelance pricing, profit margin and break-even analysis.</p></div><Link className="primary" href="/salary-to-hourly-calculator">Explore calculators →</Link></section>
    <footer className="footer"><span>© 2026 Business Calculator Hub</span><div><Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
  </main>;
}

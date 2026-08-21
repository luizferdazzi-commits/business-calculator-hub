import Link from 'next/link';

export default function SiteHeader(){
  return <>
    <div className="siteTrustBar">🚀 Trusted by freelancers, entrepreneurs and small businesses worldwide <span>★ 100% Free Calculators</span></div>
    <header className="siteHeader">
      <Link className="siteLogo" href="/" aria-label="Business Calculator Hub home">
        <span className="siteLogoIcon">▦</span>
        <span><strong>BUSINESS</strong><em>CALCULATOR HUB</em></span>
      </Link>
      <nav className="siteNav" aria-label="Main navigation">
        <Link href="/#calculators">Calculators</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/ai-tools">AI Tools <small>NEW</small></Link>
        <Link href="/advertise">Advertise</Link>
      </nav>
      <div className="siteHeaderActions">
        <Link className="siteAdvertise" href="/advertise">📣 ADVERTISE WITH US</Link>
        <Link className="siteAllTools" href="/#calculators">All tools →</Link>
      </div>
    </header>
  </>;
}

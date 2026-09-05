import Link from 'next/link';
import s from './home.module.css';

const Flag=({code,name}:{code:string,name:string})=><img className={s.marketFlag} src={'https://flagcdn.com/w40/'+code+'.png'} alt={'Flag of '+name} loading="eager"/>;
const markets=[['/','us','United States'],['/pt-br','br','Brazil'],['/es-mx','mx','Mexico'],['/es-cl','cl','Chile'],['/en-gb','gb','United Kingdom'],['/de-de','de','Germany'],['/en-in','in','India'],['/ja-jp','jp','Japan']] as const;
const cards=[
['/freelance-rate-calculator','$','Freelance Rate Calculator','Calculate your ideal hourly rate'],
['/roi-calculator','↗','ROI Calculator','Measure return on investment'],
['/salary-to-hourly-calculator','◉','Salary Calculator','Calculate salary after taxes'],
['/markup-calculator','▦','Business Pricing Calculator','Estimate selling prices and markup'],
['/break-even-calculator','◔','Break-Even Calculator','Find your break-even point'],
['/payback-period-calculator','↻','Payback Period Calculator','Estimate investment recovery time'],
['/cac-ltv-calculator','×','CAC & LTV Calculator','Measure customer unit economics'],
['/runway-calculator','◷','Business Runway Calculator','Estimate how long cash will last']
];
export default function Home(){return <main className={s.page}>
  <div className={s.brMarketBar}><span>Choose your market:</span>{markets.map(([href,code,name])=><Link key={href} href={href} className={href==='/'?s.activeMarket:undefined}><Flag code={code} name={name}/>{name}</Link>)}</div>
  <div className={s.brWrap}>
    <section className={s.brHero}><div className={s.brHeroCopy}><h1>Financial tools and guides for <span>smarter decisions.</span></h1><p>100% free, built for entrepreneurs, freelancers and small businesses worldwide.</p><div className={s.brSearch}><span>e.g. ROI, freelance rate, margin, tax...</span><a href="#calculators">⌕</a></div><div className={s.brBenefits}><div><b>⚡</b><span><strong>100% Free</strong><small>No sign-up</small></span></div><div><b>✓</b><span><strong>Reliable</strong><small>Clear methodology</small></span></div><div><b>◷</b><span><strong>Fast & easy</strong><small>Results in seconds</small></span></div></div></div><div className={s.brCalcVisual}><div className={s.brCalcCard}><h3>Profit Margin Calculator</h3><label>Revenue<div>$ 10,000</div></label><label>Costs<div>$ 6,500</div></label><span>Profit Margin</span><strong>35.00%</strong><em>Excellent</em><Link href="/profit-margin-calculator">View details →</Link></div><div className={s.brChart}><span>↗</span><div className={s.brBars}><i/><i/><i/></div><div className={s.brPie}/></div></div></section>
    <Link href="/advertise" className={s.brSponsor}><b>POSITION 1</b><span className={s.brSponsorLogo}>☁ <strong>YOUR BRAND HERE</strong></span><span><strong>Premium placement for your company</strong><small>Reach high-intent business users.</small></span><span className={s.brSponsorButton}>Learn More</span></Link>
    <section className={s.brFeatured} id="calculators"><div className={s.brSectionHead}><h2>Featured calculators</h2><a href="#all-calculators">View all →</a></div><div className={s.brFeaturedGrid}>{cards.slice(0,4).map(x=><Link key={x[0]} href={x[0]}><b>{x[1]}</b><strong>{x[2]}</strong><span>{x[3]}</span><small>🌐 Global</small></Link>)}</div></section>
    <Link href="/advertise" className={s.brSponsor}><b>POSITION 2</b><span className={s.brSponsorLogo}>☁ <strong>YOUR BRAND HERE</strong></span><span><strong>Contextual exposure across the Global Hub</strong><small>Formats designed for visibility and performance.</small></span><span className={s.brSponsorButton}>View Plans</span></Link>
    <section className={s.brTrust}><div><b>♢</b><strong>Trusted content</strong><span>Clear calculators and guides built for practical decisions.</span></div><div><b>◎</b><strong>Always updated</strong><span>Content reviewed regularly for accuracy and relevance.</span></div><div><b>▥</b><strong>100% free</strong><span>Unlimited access to Business Calculator Hub tools.</span></div><div><b>▣</b><strong>Privacy & security</strong><span>Secure browsing without unnecessary personal-data collection.</span></div></section>
    <section className={s.popular} id="all-calculators"><div className={s.popularHead}><h2>All calculators</h2></div><div className={s.cards}>{cards.map(x=><Link href={x[0]} className={s.card} key={x[0]}><span className={s.cardIcon}>{x[1]}</span><span><strong>{x[2]}</strong><span>{x[3]}</span></span></Link>)}</div></section>
  </div>
  <div className={s.brMarketFooter}><span>Choose your market:</span>{markets.map(([href,code,name])=><Link key={href} href={href}><Flag code={code} name={name}/>{name}</Link>)}</div>
</main>}
'use client';
import Link from'next/link';
import{useMemo,useState}from'react';
import MozGrowthCTA from'../components/MozGrowthCTA';

export default function SeoRoiCalculator(){
 const[spend,setSpend]=useState('1500'),[leads,setLeads]=useState('25'),[closeRate,setCloseRate]=useState('20'),[value,setValue]=useState('1200');
 const r=useMemo(()=>{
  const investment=Math.max(0,+spend||0),organicLeads=Math.max(0,+leads||0),close=Math.max(0,Math.min(100,+closeRate||0))/100,customerValue=Math.max(0,+value||0);
  const customers=organicLeads*close,revenue=customers*customerValue,net=revenue-investment,roi=investment>0?(net/investment)*100:0;
  return{investment,customers,revenue,net,roi};
 },[spend,leads,closeRate,value]);
 const m=(n:number)=>n.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
 return <main className="shell">
  <section className="calculator">
   <p className="eyebrow">MARKETING DECISION TOOL</p><h1>SEO ROI Calculator</h1>
   <p className="lead">Estimate the monthly return on SEO by connecting investment, organic leads, close rate and customer value.</p>
   <div className="grid"><div className="panel">
    <label>Monthly SEO investment<div className="inputWrap"><span>$</span><input value={spend} onChange={e=>setSpend(e.target.value)}/></div></label>
    <label>Organic leads per month<input value={leads} onChange={e=>setLeads(e.target.value)}/></label>
    <label>Lead-to-customer close rate (%)<input value={closeRate} onChange={e=>setCloseRate(e.target.value)}/></label>
    <label>Average customer value<div className="inputWrap"><span>$</span><input value={value} onChange={e=>setValue(e.target.value)}/></div></label>
   </div><div className="result">
    <p className="resultLabel">Estimated SEO ROI</p><div className="big">{r.roi.toFixed(1)}%</div>
    <div className="resultGrid"><div><span>Customers from organic leads</span><strong>{r.customers.toFixed(1)}</strong></div><div><span>Attributed revenue</span><strong>{m(r.revenue)}</strong></div><div><span>Return after investment</span><strong>{m(r.net)}</strong></div></div>
    <p style={{marginTop:18,color:'#666',lineHeight:1.6}}>This is a planning estimate, not an attribution model. Use your analytics and CRM data to validate lead source, revenue and time lag.</p>
   </div></div>
  </section>
  <MozGrowthCTA placement="seo_roi_calculator_after_result" headline="Measure the economics. Then improve the visibility behind them."/>
  <section className="content"><h2>How to read SEO ROI</h2><p>SEO ROI compares the estimated revenue generated from organic-search customers with the amount invested in SEO. It is most useful when your lead-source and customer-value inputs come from measured data.</p><h2>SEO takes time</h2><p>Organic visibility often compounds over months, so a single-month snapshot can understate or overstate the long-term result. Track the same inputs consistently and compare trends.</p><div className="relatedBox"><strong>Keep researching</strong><div className="relatedLinks"><Link href="/guides/how-much-should-small-business-spend-on-seo">How much should a small business spend on SEO? →</Link><Link href="/guides/seo-roi-for-freelancers-consultants">SEO ROI for freelancers & consultants →</Link><Link href="/ai-tools/moz">Moz Pro: SEO + AI Visibility →</Link></div></div></section>
 </main>
}

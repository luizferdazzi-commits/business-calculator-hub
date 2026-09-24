'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import MozGrowthCTA from '../components/MozGrowthCTA';

declare global { interface Window { gtag?: (...args: any[]) => void } }

const RIIBASE_AFFILIATE_URL='https://riibase.pxf.io/4aMza3';

export default function FreelanceRateCalculator(){
  const [income,setIncome]=useState('80000');
  const [expenses,setExpenses]=useState('12000');
  const [taxRate,setTaxRate]=useState('25');
  const [hours,setHours]=useState('40');
  const [weeks,setWeeks]=useState('48');
  const [billable,setBillable]=useState('65');
  const [buffer,setBuffer]=useState('15');
  const [shareStatus,setShareStatus]=useState('');
  const firstRender=useRef(true);

  const result=useMemo(()=>{
    const desired=Math.max(0,Number(income)||0);
    const businessExpenses=Math.max(0,Number(expenses)||0);
    const taxes=Math.min(90,Math.max(0,Number(taxRate)||0))/100;
    const hoursPerWeek=Math.max(1,Number(hours)||40);
    const workingWeeks=Math.max(1,Number(weeks)||48);
    const billablePct=Math.min(100,Math.max(1,Number(billable)||65))/100;
    const bufferPct=Math.min(100,Math.max(0,Number(buffer)||0))/100;
    const preTaxRevenue=(desired+businessExpenses)/(1-taxes || 1);
    const annualBillableHours=hoursPerWeek*workingWeeks*billablePct;
    const minimum=preTaxRevenue/annualBillableHours;
    const recommended=minimum*(1+bufferPct);
    return { minimum,recommended,day:recommended*8,month:recommended*annualBillableHours/12,target:preTaxRevenue,billableHours:annualBillableHours };
  },[income,expenses,taxRate,hours,weeks,billable,buffer]);

  useEffect(()=>{
    if(firstRender.current){ firstRender.current=false; return; }
    const timer=window.setTimeout(()=>{
      window.gtag?.('event','calculator_completed',{
        calculator_name:'freelance_rate',
        page_path:window.location.pathname,
        recommended_rate:Number(result.recommended.toFixed(2)),
        transport_type:'beacon'
      });
    },900);
    return()=>window.clearTimeout(timer);
  },[income,expenses,taxRate,hours,weeks,billable,buffer,result.recommended]);

  const trackAffiliateClick=()=>{
    window.gtag?.('event','affiliate_click',{
      partner:'riibase',
      calculator_name:'freelance_rate',
      page_path:window.location.pathname,
      link_url:RIIBASE_AFFILIATE_URL
    });
  };

  const money=(n:number)=>n.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2});
  const number=(n:number)=>n.toLocaleString('en-US',{maximumFractionDigits:0});
  const resultText=()=>`My freelance pricing baseline: ${money(result.minimum)}/hr minimum, ${money(result.recommended)}/hr recommended, and ${money(result.day)} for an 8-hour day. Calculated with Business Calculator Hub.`;

  const copyResult=async()=>{
    try{
      await navigator.clipboard.writeText(resultText()+' '+window.location.href);
      setShareStatus('Result copied');
      window.gtag?.('event','share_result',{calculator_name:'freelance_rate',method:'copy'});
    }catch{setShareStatus('Copy failed');}
  };

  const shareResult=async()=>{
    const text=resultText();
    try{
      if(navigator.share){
        await navigator.share({title:'My freelance rate',text,url:window.location.href});
        setShareStatus('Shared');
        window.gtag?.('event','share_result',{calculator_name:'freelance_rate',method:'native'});
      }else{
        await copyResult();
      }
    }catch(e:any){
      if(e?.name!=='AbortError') setShareStatus('Share cancelled');
    }
  };

  return <main className="shell">
    <section className="calculator">
      <p className="eyebrow">FREELANCE PRICING TOOL</p>
      <h1>Freelance Rate Calculator</h1>
      <p className="lead">Estimate a sustainable freelance hourly rate based on your income goal, business costs, taxes and realistic billable time.</p>
      <div className="grid">
        <div className="panel">
          <label>Desired annual take-home income<div className="inputWrap"><span>$</span><input inputMode="decimal" value={income} onChange={e=>setIncome(e.target.value)}/></div></label>
          <label>Annual business expenses<div className="inputWrap"><span>$</span><input inputMode="decimal" value={expenses} onChange={e=>setExpenses(e.target.value)}/></div></label>
          <label>Estimated tax rate (%)<input inputMode="decimal" value={taxRate} onChange={e=>setTaxRate(e.target.value)}/></label>
          <label>Hours worked per week<input inputMode="decimal" value={hours} onChange={e=>setHours(e.target.value)}/></label>
          <label>Working weeks per year<input inputMode="decimal" value={weeks} onChange={e=>setWeeks(e.target.value)}/></label>
          <label>Billable time (%)<input inputMode="decimal" value={billable} onChange={e=>setBillable(e.target.value)}/></label>
          <label>Safety / profit buffer (%)<input inputMode="decimal" value={buffer} onChange={e=>setBuffer(e.target.value)}/></label>
        </div>
        <div className="result">
          <p className="resultLabel">Recommended hourly rate</p>
          <div className="big">{money(result.recommended)}</div>
          <div className="resultGrid">
            <div><span>Minimum rate</span><strong>{money(result.minimum)}</strong></div>
            <div><span>Day rate (8h)</span><strong>{money(result.day)}</strong></div>
            <div><span>Monthly revenue target</span><strong>{money(result.month)}</strong></div>
          </div>
          <p style={{marginTop:24,color:'#666',lineHeight:1.6}}>Estimated annual revenue needed: <strong>{money(result.target)}</strong><br/>Estimated billable hours per year: <strong>{number(result.billableHours)}</strong></p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:18}}>
            <button className="primary" type="button" onClick={copyResult}>Copy result</button>
            <button className="primary" type="button" onClick={shareResult}>Share result</button>
          </div>
          {shareStatus&&<p aria-live="polite" style={{margin:'8px 0 0',fontSize:13,color:'#555'}}>{shareStatus}</p>}
          <Link className="primary full" href="/fixed-project-price-calculator" style={{marginTop:12}}>Turn this rate into a project price →</Link>
          <a className="primary full" href={RIIBASE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer" onClick={trackAffiliateClick} style={{marginTop:12}}>Manage your freelance business with Riibase →</a>
          <p style={{marginTop:10,fontSize:12,color:'#777',lineHeight:1.5}}>Affiliate link. We may earn a commission if you sign up through this link, at no extra cost to you.</p>
        </div>
      </div>
    </section>
    <MozGrowthCTA placement="freelance_rate_after_calculator" headline="You know what to charge. Now help more clients find you." />
    <section className="content">
      <h2>How this freelance rate is calculated</h2>
      <p>The calculator starts with your desired annual take-home income, adds annual business expenses, adjusts for estimated taxes and divides the required revenue by your realistic billable hours. A buffer is then added to create a more sustainable recommended rate.</p>
      <h2>Why billable time matters</h2>
      <p>Freelancers rarely bill every working hour. Sales, administration, meetings, proposals, accounting and downtime all reduce billable capacity. Using a realistic billable percentage helps avoid underpricing.</p>
      <h2>From hourly rate to a client quote</h2>
      <p>Your hourly baseline is a decision tool, not a rule. Use it to test whether a project price can cover the time, risk and overhead required. Then compare the result with a fixed-fee quote before sending a proposal.</p>
      <div className="relatedBox"><strong>Next pricing decisions</strong><div className="relatedLinks"><Link href="/fixed-project-price-calculator">Price a fixed-fee project →</Link><Link href="/project-hourly-rate-calculator">Check project hourly value →</Link><Link href="/guides/how-much-should-i-charge-as-a-freelancer">Read the pricing guide →</Link><Link href="/freelance-vs-salary-calculator">Compare freelance vs salary →</Link></div></div>
    </section>
  </main>;
}
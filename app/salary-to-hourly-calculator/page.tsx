'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

declare global { interface Window { gtag?: (...args: any[]) => void } }

export default function SalaryCalculator() {
  const [salary, setSalary] = useState('60000');
  const [hours, setHours] = useState('40');
  const [weeks, setWeeks] = useState('52');
  const [vacation, setVacation] = useState('0');
  const result = useMemo(() => { const annual=Math.max(0,Number(salary)||0); const weeklyHours=Math.max(0,Number(hours)||0); const workingWeeks=Math.max(1,Number(weeks)||52); const vacationWeeks=Math.max(0,Number(vacation)||0); const effectiveWeeks=Math.max(1,workingWeeks-vacationWeeks); const hourly=annual/(weeklyHours*effectiveWeeks||1); return {hourly,weekly:annual/effectiveWeeks,monthly:annual/12,daily:hourly*8}; },[salary,hours,weeks,vacation]);
  const money=(n:number)=>n.toLocaleString('en-US',{style:'currency',currency:'USD'});
  const trackCalculation=()=>window.gtag?.('event','calculator_completed',{calculator_name:'salary_to_hourly',page_path:window.location.pathname});
  return <main className="shell"><header className="header"><Link className="brand" href="/">Business Calculator Hub</Link><Link href="/">All calculators</Link></header><section className="calculator"><p className="eyebrow">SALARY CALCULATOR</p><h1>Salary to Hourly Calculator</h1><p className="lead">Convert your annual salary into an estimated hourly, daily, weekly and monthly rate.</p><div className="grid"><div className="panel"><label>Annual salary<div className="inputWrap"><span>$</span><input inputMode="decimal" value={salary} onChange={e=>setSalary(e.target.value)}/></div></label><label>Hours per week<input inputMode="decimal" value={hours} onChange={e=>setHours(e.target.value)}/></label><label>Weeks per year<input inputMode="decimal" value={weeks} onChange={e=>setWeeks(e.target.value)}/></label><label>Vacation weeks<input inputMode="decimal" value={vacation} onChange={e=>setVacation(e.target.value)}/></label></div><div className="result"><p className="resultLabel">Estimated hourly rate</p><div className="big">{money(result.hourly)}</div><div className="resultGrid"><div><span>Monthly</span><strong>{money(result.monthly)}</strong></div><div><span>Weekly</span><strong>{money(result.weekly)}</strong></div><div><span>Daily (8h)</span><strong>{money(result.daily)}</strong></div></div><Link className="primary full" href="/freelance-rate-calculator" onClick={trackCalculation}>Calculate your freelance rate →</Link></div></div></section><section className="content"><h2>How to convert salary to hourly pay</h2><p>For a basic estimate, divide annual salary by the hours you expect to work in a year. Adjust weekly hours, working weeks and vacation time above.</p><h2>Example</h2><p>At $60,000 per year, 40 hours per week and 52 working weeks, the basic hourly equivalent is about $28.85.</p><h2>Thinking about freelancing?</h2><p>Freelancers need to account for taxes, business expenses, unpaid time and non-billable work. Our freelance rate calculator will help estimate a sustainable rate.</p></section></main>;
}
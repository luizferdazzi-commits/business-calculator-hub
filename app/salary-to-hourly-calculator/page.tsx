'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

declare global { interface Window { gtag?: (...args: any[]) => void } }

export default function SalaryCalculator() {
  const [salary, setSalary] = useState('60000');
  const [hours, setHours] = useState('40');
  const [weeks, setWeeks] = useState('52');
  const [unpaidWeeks, setUnpaidWeeks] = useState('0');
  const [interacted, setInteracted] = useState(false);
  const trackedRef = useRef(false);

  const result = useMemo(() => {
    const annual = Math.max(0, Number(salary) || 0);
    const weeklyHours = Math.max(0, Number(hours) || 0);
    const weeksPerYear = Math.max(1, Number(weeks) || 52);
    const unpaid = Math.min(Math.max(0, Number(unpaidWeeks) || 0), weeksPerYear - 1);
    const paidWorkingWeeks = Math.max(1, weeksPerYear - unpaid);
    const totalHours = weeklyHours * paidWorkingWeeks;
    const hourly = totalHours > 0 ? annual / totalHours : 0;
    return {
      hourly,
      weekly: annual / paidWorkingWeeks,
      monthly: annual / 12,
      daily: hourly * 8,
    };
  }, [salary, hours, weeks, unpaidWeeks]);

  useEffect(() => {
    if (!interacted || trackedRef.current) return;
    const timer = window.setTimeout(() => {
      if (result.hourly <= 0 || !window.gtag) return;
      window.gtag('event', 'calculator_completed', {
        calculator_name: 'salary_to_hourly',
        page_path: window.location.pathname,
        annual_salary: Number(salary) || 0,
        hours_per_week: Number(hours) || 0,
      });
      trackedRef.current = true;
    }, 900);
    return () => window.clearTimeout(timer);
  }, [interacted, result.hourly, salary, hours]);

  const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const change = (setter: (value: string) => void) => (value: string) => {
    setInteracted(true);
    setter(value);
  };

  return <main className="shell"><header className="header"><Link className="brand" href="/">Business Calculator Hub</Link><Link href="/">All calculators</Link></header><section className="calculator"><p className="eyebrow">SALARY CALCULATOR</p><h1>Salary to Hourly Calculator</h1><p className="lead">Convert your annual salary into an estimated hourly, daily, weekly and monthly rate.</p><div className="grid"><div className="panel"><label>Annual salary<div className="inputWrap"><span>$</span><input inputMode="decimal" value={salary} onChange={e=>change(setSalary)(e.target.value)}/></div></label><label>Hours per week<input inputMode="decimal" value={hours} onChange={e=>change(setHours)(e.target.value)}/></label><label>Weeks per year<input inputMode="decimal" value={weeks} onChange={e=>change(setWeeks)(e.target.value)}/></label><label>Unpaid weeks off<input inputMode="decimal" value={unpaidWeeks} onChange={e=>change(setUnpaidWeeks)(e.target.value)}/></label><p style={{marginTop:8,fontSize:14,opacity:.75}}>Paid vacation is already included in an annual salary. Only enter weeks here if they are unpaid.</p></div><div className="result"><p className="resultLabel">Estimated hourly rate</p><div className="big">{money(result.hourly)}</div><div className="resultGrid"><div><span>Monthly</span><strong>{money(result.monthly)}</strong></div><div><span>Weekly</span><strong>{money(result.weekly)}</strong></div><div><span>Daily (8h)</span><strong>{money(result.daily)}</strong></div></div><Link className="primary full" href="/freelance-rate-calculator">Calculate your freelance rate →</Link></div></div></section><section className="content"><h2>How to convert salary to hourly pay</h2><p>For a basic estimate, divide annual salary by the paid working hours represented by that salary. Paid vacation should not be subtracted from annual salary; only unpaid weeks off reduce the paid working weeks used in this estimate.</p><h2>Example</h2><p>At $60,000 per year, 40 hours per week and 52 paid weeks, the hourly equivalent is about $28.85.</p><h2>Thinking about freelancing?</h2><p>Freelancers need to account for taxes, business expenses, unpaid time and non-billable work. Our freelance rate calculator will help estimate a sustainable rate.</p></section></main>;
}
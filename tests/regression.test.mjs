import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('profit margin visual links to profit margin calculator',()=>{
  const src=read('app/page.tsx');
  assert.match(src,/Profit Margin Calculator[\s\S]*href="\/profit-margin-calculator"/);
});

test('localized calculators expose metadata, canonical and hreflang',()=>{
  const src=read('app/[locale]/[tool]/page.tsx');
  assert.match(src,/generateMetadata/);
  assert.match(src,/alternates:\{canonical:/);
  assert.match(src,/languages/);
  assert.match(src,/openGraph/);
});

test('security middleware emits baseline browser protections',()=>{
  const src=read('middleware.ts');
  for(const header of ['Content-Security-Policy','X-Content-Type-Options','X-Frame-Options','Referrer-Policy','Permissions-Policy']) assert.match(src,new RegExp(header));
});

test('no legacy Portuguese flag alt label remains in homepage',()=>{
  assert.doesNotMatch(read('app/page.tsx'),/Bandeira de/);
});

test('core calculator formulas remain present in localized calculator',()=>{
  const src=read('app/components/LocalizedCalculator.tsx');
  assert.match(src,/\(ret-i\)\/i\*100/); // ROI
  assert.match(src,/num\('fixed'\)\/c/); // break-even units
  assert.match(src,/num\('cash'\)\/num\('burn'\)/); // runway
  assert.match(src,/num\('marketing'\)\/num\('customers'\)/); // CAC
  assert.match(src,/num\('arpu'\)\/\(num\('churn'\)\/100\)/); // LTV
});

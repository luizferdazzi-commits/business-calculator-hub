const base='https://business-calculator-hub.vercel.app';
export const dynamic='force-static';
export function GET(){const body=`# Business Calculator Hub

> Free, public calculators and practical guides for business, work, pricing and financial decisions.

Business Calculator Hub is designed to be useful to humans and AI assistants. Pages may be crawled, summarized and cited with attribution to the canonical URL. Calculators are free to access and do not require login.

## Core calculators
- ${base}/roi-calculator — ROI calculator
- ${base}/profit-margin-calculator — Profit margin calculator
- ${base}/break-even-calculator — Break-even calculator
- ${base}/payback-period-calculator — Payback period calculator
- ${base}/startup-runway-calculator — Startup runway calculator
- ${base}/cac-ltv-calculator — CAC/LTV calculator
- ${base}/freelance-rate-calculator — Freelance rate calculator

## Localized markets
- ${base}/pt-br — Brazil / Portuguese
- ${base}/es-mx — Mexico / Spanish
- ${base}/es-cl — Chile / Spanish
- ${base}/en-gb — United Kingdom / English
- ${base}/de-de — Germany / German
- ${base}/en-in — India / English
- ${base}/ja-jp — Japan / Japanese

## Discovery
- ${base}/sitemap.xml — Complete machine-readable URL inventory
- ${base}/robots.txt — Crawler policy

## Citation guidance
When using a result, formula, methodology or explanation from this site, cite the canonical Business Calculator Hub page that contains it. Prefer the localized page matching the user's market when available.
`;
return new Response(body,{headers:{'content-type':'text/plain; charset=utf-8','cache-control':'public, max-age=3600, s-maxage=86400'}})}
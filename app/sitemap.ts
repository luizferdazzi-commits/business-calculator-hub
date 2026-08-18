import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://business-calculator-hub.vercel.app';
  const routes = ['', '/salary-to-hourly-calculator', '/freelance-rate-calculator', '/profit-margin-calculator', '/break-even-calculator', '/privacy', '/terms', '/affiliate-disclosure'];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : route.includes('calculator') ? 0.9 : 0.3 }));
}

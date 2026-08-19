import type { Metadata } from 'next';
import Script from 'next/script';
import AffiliateTracker from './components/AffiliateTracker';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://business-calculator-hub.vercel.app'),
  title: {
    default: 'Business Calculator Hub | Free Money & Business Calculators',
    template: '%s | Business Calculator Hub',
  },
  description: 'Free calculators for salary, freelance rates, profit margins and business decisions.',
  verification: {
    google: 'GvjIrfdNuogFaBAliRlEmlyk9Sjc3i0X7zOnSZQpaeI',
    other: {
      'impact-site-verification': '793175c9-c344-42fa-bf9e-4087374fd188',
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <AffiliateTracker />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HQE0NEPTWV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){ window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', 'G-HQE0NEPTWV');`}
        </Script>
      </body>
    </html>
  );
}

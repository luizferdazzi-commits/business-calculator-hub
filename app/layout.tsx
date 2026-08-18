import type { Metadata } from 'next';
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
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
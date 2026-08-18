import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator | Business Calculator Hub',
  description: 'Free salary to hourly calculator. Convert annual salary to hourly, weekly, daily and monthly pay.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
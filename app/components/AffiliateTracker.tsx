'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function AffiliateTracker() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const el = (event.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
      if (!el) return;

      let url: URL;
      try {
        url = new URL(el.href, window.location.href);
      } catch {
        return;
      }

      const host = url.hostname.toLowerCase();
      let partner = '';
      if (host === 'riibase.pxf.io' || host.endsWith('.pxf.io')) partner = 'riibase';
      if (host === 'creaoailimited.sjv.io' || host.endsWith('.sjv.io')) partner = 'creao';
      if (!partner) return;

      const params = {
        debug_mode: true,
        transport_type: 'beacon',
        affiliate_partner: partner,
        calculator_name: window.location.pathname.includes('freelance-rate-calculator') ? 'freelance_rate' : undefined,
        link_url: url.href,
        link_text: (el.textContent || '').trim().slice(0, 100),
        page_path: window.location.pathname,
      };

      console.log('[GA4] affiliate_click', params);
      window.gtag?.('event', 'affiliate_click', params);
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return null;
}

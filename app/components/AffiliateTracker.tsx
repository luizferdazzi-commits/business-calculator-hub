'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function calculatorName() {
  return window.location.pathname
    .replace(/^\//, '')
    .replace(/-calculator$/, '')
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/^_|_$/g, '') || 'business';
}

export default function AffiliateTracker() {
  useEffect(() => {
    const send = (name: string, params: Record<string, unknown>) => {
      window.gtag?.('event', name, {
        ...params,
        transport_type: 'beacon',
      });
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a') as HTMLAnchorElement | null;
      if (!link?.href) return;

      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      if (!/^https?:$/.test(url.protocol) || url.hostname === window.location.hostname) return;

      const common = {
        calculator_name: calculatorName(),
        link_url: url.href,
        link_text: (link.textContent || '').trim().slice(0, 100),
        page_path: window.location.pathname,
      };

      send('outbound_click', common);

      const host = url.hostname.toLowerCase();
      const partner =
        host === 'riibase.pxf.io'
          ? 'riibase'
          : host === 'wizstar.pxf.io' || (host === 'wizstar.com' || host.endsWith('.wizstar.com'))
            ? 'wizstar'
            : host === 'creaoailimited.sjv.io'
              ? 'creao'
              : '';

      if (partner) {
        send('affiliate_click', { ...common, affiliate_partner: partner });
      }
    };

    const onInput = (event: Event) => {
      const input = event.target as HTMLInputElement | null;
      if (!input || !['INPUT', 'SELECT', 'TEXTAREA'].includes(input.tagName)) return;

      const path = window.location.pathname;
      const isCalculator = path.includes('calculator') || path.includes('calculadora-') || path === '/';
      if (!isCalculator) return;

      const key = `calculator_started:${path}`;
      if (sessionStorage.getItem(key)) return;

      sessionStorage.setItem(key, '1');
      send('calculator_started', {
        calculator_name: calculatorName(),
        page_path: path,
      });
    };

    document.addEventListener('click', onClick, true);
    document.addEventListener('input', onInput, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('input', onInput, true);
    };
  }, []);

  return null;
}

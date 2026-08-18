'use client';

import type { ReactNode } from 'react';

type Props = { href: string; partner: string; position: string; className?: string; children: ReactNode };

export default function AffiliateLink({ href, partner, position, className, children }: Props) {
  const track = () => {
    const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.('event', 'affiliate_click', {
      affiliate_partner: partner,
      page_path: window.location.pathname,
      link_position: position,
    });
  };

  return <a href={href} target="_blank" rel="sponsored nofollow noopener" className={className} onClick={track}>{children}</a>;
}

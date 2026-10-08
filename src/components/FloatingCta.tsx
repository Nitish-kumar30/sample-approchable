'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LandingCohort } from '@/lib/current-cohort-offer';
import { trackCTA } from '@/lib/analytics';

export default function FloatingCta({ offer }: { offer: LandingCohort }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const pct = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (pct >= 0.55) setVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (pathname !== '/' || dismissed) return null;

  return (
    <div id="floatingCta" className={visible ? 'visible' : ''}>
      <div className="floating-inner">
        <div className="floating-text">
          {`🔥 Only ${offer.seatsLeft} seats left · ${offer.cohortLabel} starts ${offer.startLabel}`}
        </div>
        <div className="floating-actions">
          <Link
            href="/#pricing"
            className="floating-cta-btn"
            onClick={() => trackCTA('Floating CTA', 'Float')}
          >
            {`Get One of ${offer.seatsLeft} Seats →`}
          </Link>
          <button className="floating-close" onClick={() => setDismissed(true)}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

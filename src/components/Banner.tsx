'use client';

import type { LandingCohort } from '@/lib/current-cohort-offer';
import { trackCTA } from '@/lib/analytics';

export default function Banner({ offer }: { offer: LandingCohort }) {
  const content = offer.soldOut ? (
    <>
      🛑 {offer.startLabel} Cohort is full &nbsp;•&nbsp; Join the waitlist for the next batch{' '}
      <a href="#signup">Join Waitlist</a>
    </>
  ) : (
    <>
      🔥 {offer.cohortLabel} starts {offer.startLabel} &nbsp;•&nbsp; Only {offer.seatsLeft} seats left{' '}
      <a href="#pricing" onClick={() => trackCTA('Banner', 'Top')}>
        Reserve Seat →
      </a>
    </>
  );

  return <div id="topBanner">{content}</div>;
}

'use client';

import { useEffect, useState, useCallback } from 'react';
import { COHORT } from '@/lib/cohort-config';
import { trackCTA } from '@/lib/analytics';

function getTimeLeft(target: number) {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
    mins: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
    secs: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
  };
}

export default function PricingSection() {
  const target = new Date(COHORT.priceIncreaseAt).getTime();
  const [isLate, setIsLate] = useState(() => Date.now() >= target);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = getTimeLeft(target);
      setTimeLeft(tl);
      if (!tl) {
        setIsLate(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  const price = useCallback(
    (field: 'priceIndia' | 'priceIntl' | 'priceTaglineIndia' | 'priceTaglineIntl') => {
      if (isLate) {
        const lateMap = {
          priceIndia: COHORT.priceIndiaLate,
          priceIntl: COHORT.priceIntlLate,
          priceTaglineIndia: COHORT.priceTaglineIndiaLate,
          priceTaglineIntl: COHORT.priceTaglineIntlLate,
        };
        return lateMap[field];
      }
      return COHORT[field];
    },
    [isLate],
  );

  return (
    <section id="pricing">
      <div className="container-max" style={{ maxWidth: 680 }}>
        <div className="section-label" style={{ textAlign: 'center' }}>Pricing</div>
        <div className="section-title" style={{ textAlign: 'center' }}>One cohort. One price.</div>
        <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto' }}>
          Small non-refundable fee keeps the group serious. Every seat is reserved only after payment.
        </p>

        <div className="pricing-card">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span
              className={`price-tagline${isLate ? ' price-tagline--expired' : ''}`}
              style={{ display: 'inline-block' }}
            >
              🚀 Early registration price — 50% off
            </span>
          </div>

          <div className="price-countdown">
            {timeLeft ? (
              <>
                Price goes up on {COHORT.priceIncreaseDateShort} in{' '}
                <strong>
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s
                </strong>
              </>
            ) : (
              'Early price has ended — new price is now live'
            )}
          </div>

          <div className="pricing-head">
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                India
              </div>
              <div>
                <span className="price-original">{COHORT.originalPriceIndia}</span>
                <span className="price-main">{price('priceIndia')}</span>
              </div>
              <div className="price-sub">{price('priceTaglineIndia')}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                International
              </div>
              <div>
                <span className="price-original">{COHORT.originalPriceIntl}</span>
                <span className="price-main">{price('priceIntl')}</span>
              </div>
              <div className="price-sub">{price('priceTaglineIntl')}</div>
            </div>
          </div>

          <ul className="pricing-includes">
            <li><span className="check">✓</span> 4 live 60-90-min mentor-led sessions</li>
            <li><span className="check">✓</span> Pre-session reading &amp; video materials</li>
            <li><span className="check">✓</span> Access to the Approachable learning platform</li>
            <li><span className="check">✓</span> Quizzes, progress tracking, prompting guide</li>
            <li><span className="check">✓</span> Session recordings shared after each class</li>
            <li><span className="check">✓</span> WhatsApp community + mentor access between sessions</li>
            <li><span className="check">✓</span> 2 capstone project slots (demo to the group)</li>
          </ul>

          <a
            href={COHORT.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pricing-cta"
            onClick={() => trackCTA('Pricing CTA', 'Pricing')}
          >
            Claim My Seat for {COHORT.dateShort} →
          </a>
          <p className="pricing-note">
            Only {COHORT.seatsLeft} seats · Starts {COHORT.date} · {COHORT.time}
          </p>
        </div>
      </div>
    </section>
  );
}

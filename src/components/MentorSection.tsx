import type { ReactNode } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/Lightbox';
import LinkedInReviews from '@/components/LinkedInReviews';

const TESTIMONIALS = [
  '"Built my first AI agent in week 3 — something I thought would take me months."',
  '"The study group format kept me accountable. I actually finished the course."',
  '"Ranbeer makes complex AI concepts feel simple and immediately actionable."',
];

type MentorSectionProps = {
  id?: string;
  label?: string;
  title?: string;
  bio?: ReactNode;
  quote?: ReactNode;
  showTestimonials?: boolean;
  showLinkedInReviews?: boolean;
  showLightbox?: boolean;
  showStats?: boolean;
  footnote?: ReactNode;
};

const DEFAULT_BIO = (
  <>
    Full-time entrepreneur, 3 years teaching AI to 250+ professionals from Gap, Deloitte, Microsoft, Upwork, and
    early-stage startups. Runs the cohorts as small, discussion-driven study groups — not lectures.
  </>
);

const DEFAULT_QUOTE = (
  <>
    &ldquo;I created Approachable because I believe anyone should be able to build with AI. My goal is 1 million
    students. This is my way of giving back.&rdquo;
  </>
);

export default function MentorSection({
  id,
  label = 'Your mentor',
  title = 'Meet Ranbeer',
  bio = DEFAULT_BIO,
  quote = DEFAULT_QUOTE,
  showTestimonials = false,
  showLinkedInReviews = false,
  showLightbox = false,
  showStats = true,
  footnote,
}: MentorSectionProps) {
  return (
    <section id={id} style={{ background: 'var(--bg-warm)' }}>
      <div className="container-max">
        <div className="section-label" style={{ textAlign: 'center' }}>
          {label}
        </div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          {title}
        </h2>
        <div className="mentor-card">
          <div>
            <Image
              src="/img/Ranbeer makin aug 22.jpg"
              alt="Ranbeer Makin"
              className="mentor-photo"
              width={160}
              height={200}
            />
          </div>
          <div>
            <div className="mentor-name">Ranbeer Makin</div>
            <div className="mentor-role">Entrepreneur, AI Educator &amp; Claude Partner</div>
            <a
              href="https://www.linkedin.com/in/ranbeer/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 16,
              }}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              linkedin.com/in/ranbeer
            </a>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
              {bio}
            </p>
            <div className="mentor-quote">{quote}</div>
            {showStats && (
              <div className="mentor-stats">
                <div className="mentor-stat">
                  <div className="val">250+</div>
                  <div className="lbl">Students</div>
                </div>
                <div className="mentor-stat">
                  <div className="val">1M</div>
                  <div className="lbl">Goal</div>
                </div>
                <div className="mentor-stat">
                  <div className="val">3 yrs</div>
                  <div className="lbl">Teaching</div>
                </div>
                <div className="mentor-stat">
                  <div className="val">4.9★</div>
                  <div className="lbl">Rating</div>
                </div>
              </div>
            )}
            {footnote && (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 14 }}>{footnote}</p>
            )}
          </div>
        </div>

        {showTestimonials && (
          <div className="testimonials-section">
            <h2 className="testimonials-section-title">What Alumni Are Saying on LinkedIn</h2>
            <div className="testimonials-grid">
              {TESTIMONIALS.map((text, i) => (
                <div key={i} className="testimonial-card">
                  <p className="testimonial-text">{text}</p>
                </div>
              ))}
            </div>

            {showLinkedInReviews && <LinkedInReviews />}
          </div>
        )}

        {showLightbox && <Lightbox />}
      </div>
    </section>
  );
}

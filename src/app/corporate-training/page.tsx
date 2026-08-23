import type { Metadata } from 'next';
import CorporateTrainingNav from '@/components/corporate-training/CorporateTrainingNav';
import ScrollReveal from '@/components/corporate-training/ScrollReveal';
import FaqAccordion from '@/components/corporate-training/FaqAccordion';
import MentorPhoto from '@/components/corporate-training/MentorPhoto';
import styles from './corporate-training.module.css';

export const metadata: Metadata = {
  title: 'Approachable for Teams — Private AI Training for Your Organization',
  description:
    'A private, mentor-led AI training program for your organization. 4 live sessions. Every tier — CxOs to middle managers — leaves hands-on capable, not just informed.',
  openGraph: {
    title: 'Approachable for Teams — Private AI Training for Your Organization',
    description:
      'A private, mentor-led AI training program for your organization. 4 live sessions. Every tier — CxOs to middle managers — leaves hands-on capable, not just informed.',
    url: 'https://approachable.dev/corporate-training',
  },
};

const ALUMNI = ['Adobe', 'Microsoft', 'GAP Inc', 'Deloitte', 'Nordstrom', 'Upwork', 'TeamViewer', 'Coca-Cola', 'WBD'];

const TIERS = [
  {
    id: 'cxo',
    className: styles.tierCxo,
    tag: 'CxO',
    title: 'For the people who sign off',
    role: 'CEOs, CFOs, CIOs and C-suite',
    outcome:
      'review an AI-drafted board pack and catch what\u2019s wrong, draft memos without waiting on anyone, and tell substance from hype in a vendor pitch.',
  },
  {
    id: 'director',
    className: styles.tierDirector,
    tag: 'Director',
    title: 'For the people who translate',
    role: 'Directors and heads of function',
    outcome:
      'turn a stack of team updates into one clean summary in minutes, run a competitive scan solo, and build a reporting workflow that runs without them.',
  },
  {
    id: 'mgmt',
    className: styles.tierMgmt,
    tag: 'Management',
    title: 'For the people who run the team',
    role: 'People managers and functional leads',
    outcome:
      'auto-draft performance summaries from raw notes, consolidate status updates without copy-paste, and run a first-cut forecast they can trust.',
  },
  {
    id: 'mid',
    className: styles.tierMid,
    tag: 'Middle Manager',
    title: 'For the people closest to the work',
    role: 'Team leads and middle managers',
    outcome:
      'build a small AI agent for their team\u2019s most repetitive weekly task, delegate multi-step busywork with a quality checklist, and teach their own team what they learned.',
  },
];

const WEEKS = [
  {
    num: 'WEEK 1',
    title: 'AI Foundations & the Real Landscape',
    desc: 'Vendor-neutral grounding in how modern AI works. Covers Claude, ChatGPT, Gemini, Copilot — and where each fits. Mapped to where your specific industry is already using AI, and where it isn\u2019t yet.',
    outcomeLabel: 'Your team leaves able to',
    outcome: 'explain AI clearly, evaluate any vendor pitch in 10 minutes, and pick the right tool for the job.',
  },
  {
    num: 'WEEK 2',
    title: 'Research, Reporting & Prompting',
    desc: 'Build a reusable prompt library around your team\u2019s actual recurring tasks. Go from raw data to a first-draft report or competitive scan in one sitting.',
    outcomeLabel: 'Your team leaves with',
    outcome:
      'a working prompt library and one real report — drafted live, ready to reuse at their desk the next morning.',
  },
  {
    num: 'WEEK 3',
    title: 'Agentic Task Automation',
    desc: 'Delegate real multi-step work to AI agents — while keeping control of the quality. Your team picks a repetitive task they already do every week and automates it live.',
    outcomeLabel: 'Your team leaves with',
    outcome: 'one end-to-end automation, built in the session, ready to save hours the same week.',
  },
  {
    num: 'WEEK 4',
    title: 'Shipping Prototypes Fast',
    desc: 'Turn ideas into working internal tools or prototypes — days instead of months. Relevant for developers and non-developers alike.',
    outcomeLabel: 'Your team leaves with',
    outcome: 'a working prototype or internal tool tied to a real need, demoed live to close the program.',
  },
];

const INDUSTRIES = ['Retail & CPG', 'Financial Services', 'Manufacturing', 'Tech & Services', 'Healthcare Ops'];

const TESTIMONIALS = [
  {
    quote:
      'Built my first working AI agent by week three — something I expected would take months to figure out.',
    name: 'Approachable alumnus',
    source: 'Verified LinkedIn review',
  },
  {
    quote:
      'Concepts that sounded complicated on paper became things I could use the same day. The small-group format is what actually made it stick.',
    name: 'Approachable alumnus',
    source: 'Verified LinkedIn review',
  },
];

const PROCESS = [
  {
    title: '1. Intro call',
    text: '20 minutes. Tell us your team size, tiers, industry, and goals. We\u2019ll discuss pricing and format.',
  },
  {
    title: '2. We tailor it',
    text: 'Every prompt, exercise, and example gets mapped to your org\u2019s real work before session 1.',
  },
  {
    title: '3. Four live sessions',
    text: 'One per week. Virtual or on-site, your choice. Hands-on throughout, mentor-led start to finish.',
  },
];

const CONTACT_MAILTO =
  'mailto:hello@bigintsolutions.com?subject=Approachable%20for%20Teams%20-%20Proposal%20Request&body=Company%3A%0AApprox.%20team%20size%3A%0ATiers%20to%20include%3A%0AIndustry%3A%0APreferred%20timing%3A';

export default function CorporateTrainingPage() {
  return (
    <div className={styles.page}>
      <CorporateTrainingNav />
      <ScrollReveal />

      <main id="top">
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={`${styles.heroBadges} ${styles.reveal} ${styles.revealIn}`}>
              <span className={styles.heroBadge}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="5" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M4 5V3.5a3 3 0 116 0V5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <strong>Private</strong> — one org at a time
              </span>
              <span className={styles.heroBadge}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M4 7.5l2 2 4-4.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <strong>Vendor-neutral</strong> landscape, deep skill finish
              </span>
            </div>
            <h1>
              Get your leadership team <em className={styles.heroHighlight}>actually using</em> AI.
            </h1>
            <p className={styles.heroSub}>
              Four live, hands-on sessions. Use cases built around your industry. Your team leaves with working AI
              workflows — not a certificate.
            </p>
            <div className={styles.heroCtas}>
              <a href="#contact" className={`${styles.btn} ${styles.btnAccent}`}>
                Book a 20-minute intro call →
              </a>
              <a href="#curriculum" className={`${styles.btn} ${styles.btnGhost}`}>
                See the curriculum
              </a>
            </div>

            <div className={`${styles.heroProof} ${styles.reveal} ${styles.revealIn}`}>
              <div className={styles.proofItem}>
                <span className={styles.pNum}>250+</span>
                <span className={styles.pLabel}>professionals trained</span>
              </div>
              <div className={styles.proofItem}>
                <span className={styles.pNum}>4.9★</span>
                <span className={styles.pLabel}>avg. rating</span>
              </div>
              <div className={styles.proofItem}>
                <span className={styles.pNum}>4</span>
                <span className={styles.pLabel}>live sessions</span>
              </div>
              <div className={styles.proofItem}>
                <span className={styles.pNum}>1</span>
                <span className={styles.pLabel}>dedicated mentor</span>
              </div>
            </div>
          </div>
        </section>

        {/* LOGOS */}
        <div className={styles.logoStrip}>
          <div className={styles.wrap}>
            <span className={styles.logoLabel}>ALUMNI FROM</span>
            <div className={styles.logoNames}>
              {ALUMNI.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* TIERS */}
        <section id="tiers" className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Who it&apos;s for</span>
              <h2>Four tiers in one room. Each leaves with something different.</h2>
              <p>
                Everyone attends the same live sessions — but what they build is calibrated to their actual job.
              </p>
            </div>
            <div className={`${styles.tierGrid} ${styles.reveal}`}>
              {TIERS.map((tier) => (
                <div className={`${styles.tierCard} ${tier.className}`} key={tier.id}>
                  <span className={styles.tierTag}>{tier.tag}</span>
                  <h3>{tier.title}</h3>
                  <p className={styles.tierRole}>{tier.role}</p>
                  <p className={styles.tierOutcome}>
                    <strong>Leaves able to:</strong> {tier.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section id="curriculum" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>The 4 weeks</span>
              <h2>Four live sessions. 60–90 minutes each. Hands-on throughout.</h2>
            </div>
            <div className={`${styles.weekTrack} ${styles.reveal}`}>
              {WEEKS.map((week) => (
                <div className={styles.week} key={week.num}>
                  <div className={styles.weekTop}>
                    <span className={styles.weekNum}>{week.num}</span>
                    <h3>{week.title}</h3>
                  </div>
                  <p className={styles.weekDesc}>{week.desc}</p>
                  <div className={styles.weekOutcome}>
                    <strong>{week.outcomeLabel}</strong>
                    {week.outcome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRY */}
        <section className={styles.section} style={{ paddingTop: 0 }}>
          <div className={styles.wrap}>
            <div className={`${styles.industryLine} ${styles.reveal}`}>
              <h3>Every example gets swapped for one from your world.</h3>
              <p>All prompts, exercises, and use cases are rebuilt around your industry before session 1.</p>
              <div className={styles.indChips}>
                {INDUSTRIES.map((industry) => (
                  <span className={styles.indChip} key={industry}>
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MENTOR */}
        <section id="mentor" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Your mentor</span>
              <h2>One named mentor. Not a rotating bench.</h2>
            </div>
            <div className={`${styles.mentor} ${styles.reveal}`}>
              <MentorPhoto />
              <div>
                <h3 style={{ fontSize: 22, marginBottom: 2 }}>Ranbeer Makin</h3>
                <p style={{ color: 'var(--ink-soft)', marginBottom: 14, fontSize: 15 }}>
                  Entrepreneur · AI Educator · Claude Certified &amp; Claude Partner
                </p>
                <div className={styles.mentorStats}>
                  <div>
                    <span className={styles.mNum}>250+</span>
                    <span className={styles.mLabel}>professionals trained</span>
                  </div>
                  <div>
                    <span className={styles.mNum}>4.9★</span>
                    <span className={styles.mLabel}>average rating</span>
                  </div>
                  <div>
                    <span className={styles.mNum}>3 yrs</span>
                    <span className={styles.mLabel}>teaching AI full-time</span>
                  </div>
                </div>
                <blockquote className={styles.mentorQuote}>
                  &ldquo;I created Approachable because I believe anyone should be able to build with AI. My goal is 1
                  million students — this is my way of giving back.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>From alumni</span>
              <h2>What past participants say</h2>
            </div>
            <div className={`${styles.testiRow} ${styles.reveal}`}>
              {TESTIMONIALS.map((testimonial) => (
                <div className={styles.testiCard} key={testimonial.quote}>
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                  <span className={styles.testiAttr}>
                    <span className={styles.testiName}>{testimonial.name}</span>
                    {testimonial.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>How to get started</span>
              <h2>Three steps to a running program</h2>
            </div>
            <div className={`${styles.process} ${styles.reveal}`}>
              {PROCESS.map((step) => (
                <div className={styles.procCard} key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>FAQ</span>
              <h2>Common questions</h2>
            </div>
            <div className={styles.reveal}>
              <FaqAccordion />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.ctaBand} ${styles.reveal}`}>
              <span className={styles.eyebrow} style={{ color: 'var(--accent)' }}>
                Get started
              </span>
              <h2>Bring this to your team.</h2>
              <p>
                Tell us your company, team size, and industry. We&apos;ll come back with a tailored outline and dates
                within a few days.
              </p>
              <div className={styles.ctaCtas}>
                <a href="#contact" className={`${styles.btn} ${styles.btnAccent}`}>
                  Book a 20-minute intro call →
                </a>
                <a href={CONTACT_MAILTO} className={`${styles.btn} ${styles.btnGhost}`}>
                  Or email us directly
                </a>
              </div>
              <div className={styles.ctaMeta}>
                Delivered via BIGINT Solutions · www.bigintsolutions.com · Pricing discussed on the call
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import type { Metadata } from 'next';
import Header from '@/components/Header';
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

const POSITIONING = [
  {
    icon: '🏢',
    title: 'Private to your org',
    text: 'Only your people are in the room. Every example, prompt, and exercise is built around your team\u2019s actual work.',
  },
  {
    icon: '🔧',
    title: 'Hands-on, every session',
    text: 'Every tier — including the C-suite — spends the sessions drafting, reviewing, and building. No passive slides.',
  },
  {
    icon: '🌐',
    title: 'Vendor-neutral start, deep skill finish',
    text: 'Session 1 covers the real AI landscape across providers. Then we go hands-on with the tools your team will actually use.',
  },
];

const TIERS = [
  {
    id: 'cxo',
    className: styles.tierCxo,
    tag: 'CxO',
    title: 'For the people who sign off',
    role: 'CEOs, CFOs, CIOs and C-suite',
    outcome:
      'Leaves able to review an AI-drafted board pack, draft their own memos without waiting on anyone, and tell substance from hype in a vendor pitch.',
  },
  {
    id: 'director',
    className: styles.tierDirector,
    tag: 'Director',
    title: 'For the people who translate',
    role: 'Directors and heads of function',
    outcome:
      'Leaves able to turn a stack of team updates into one clean summary in minutes, run their own competitive scan, and build a reporting workflow that runs without them.',
  },
  {
    id: 'mgmt',
    className: styles.tierMgmt,
    tag: 'Management',
    title: 'For the people who run the team',
    role: 'People managers and functional leads',
    outcome:
      'Leaves able to auto-draft performance summaries from raw notes, consolidate status updates without copy-paste, and run a first-cut forecast they trust.',
  },
  {
    id: 'mid',
    className: styles.tierMid,
    tag: 'Middle Manager',
    title: 'For the people closest to the work',
    role: 'Team leads and middle managers',
    outcome:
      'Leaves able to build a small AI agent for a repetitive weekly task, delegate multi-step busywork with a real quality checklist, and teach their own team what they learned.',
  },
];

const WEEKS = [
  {
    num: 'WEEK 1',
    title: 'AI Foundations & the Real Landscape',
    desc: 'A vendor-neutral grounding in how modern AI works — before opening a single tool. Your team leaves able to explain AI clearly and tell which tool fits which job.',
    chips: ['How LLMs work', 'Key vocabulary', 'Claude · ChatGPT · Gemini · Copilot', 'Your industry\u2019s AI map'],
  },
  {
    num: 'WEEK 2',
    title: 'Research, Reporting & Prompting',
    desc: 'The deep, hands-on layer. Build a reusable prompt library around your team\u2019s real recurring tasks. Produce a first-draft report or analysis in minutes instead of hours.',
    chips: ['Prompt library', 'Web search → deep research', 'Projects & artifacts', 'API intro'],
  },
  {
    num: 'WEEK 3',
    title: 'Agentic Task Automation',
    desc: 'Delegate real multi-step work to AI agents while keeping control of the quality. Hand off a recurring task your team does every week — built live in the session.',
    chips: ['AI agents', 'Multi-step automation', 'Browser-based workflows', 'Quality checkpoints'],
  },
  {
    num: 'WEEK 4',
    title: 'Shipping Prototypes Fast',
    desc: 'Turn ideas into working software or internal tools — days instead of months. Relevant for developers and non-developers alike.',
    chips: ['AI-assisted coding', 'Internal tools & dashboards', 'Code quality control', 'Live prototype demo'],
  },
];

const INDUSTRIES = [
  'Retail & CPG',
  'Financial Services',
  'Manufacturing',
  'Tech & Professional Services',
  'Healthcare Operations',
];

const TESTIMONIALS = [
  {
    quote: 'Built my first AI agent in week 3 — something I thought would take me months.',
    attribution: '— Verified LinkedIn review',
  },
  {
    quote: 'Ranbeer makes complex AI concepts feel simple and immediately actionable.',
    attribution: '— Verified LinkedIn review',
  },
];

const PROCESS = [
  { title: '1. Intro call', text: 'Tell us your team size, tiers, and industry. Takes about 20 minutes.' },
  { title: '2. We tailor it', text: 'Session content, prompts, and exercises get mapped to your org\u2019s real work.' },
  { title: '3. Four live sessions', text: 'One per week, virtual or on-site. Hands-on throughout, mentor-led start to finish.' },
];

const CONTACT_MAILTO =
  'mailto:hello@bigintsolutions.com?subject=Approachable%20for%20Teams%20-%20Proposal%20Request&body=Company%3A%0AApprox.%20team%20size%3A%0ATiers%20to%20include%3A%0AIndustry%3A%0APreferred%20timing%3A';

export default function CorporateTrainingPage() {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <ScrollReveal />

        <main id="top">
          {/* HERO */}
          <section className={styles.hero}>
            <div className={styles.wrap}>
              <div className={`${styles.heroPrivate} ${styles.reveal} ${styles.revealIn}`}>
                <span>🔒</span> <strong>Private engagement</strong> — built for one organization at a time
              </div>
              <h1>
                Get your leadership team <em className={styles.heroHighlight}>actually using</em> AI.
              </h1>
              <p className={styles.heroSub}>
                A private, hands-on AI training program delivered to your company. Four live sessions. Use cases from
                your industry. Every level — CxO to middle manager — leaves having built something real, not just sat
                through a deck.
              </p>
              <div className={styles.heroCtas}>
                <a href="#contact" className={`${styles.btn} ${styles.btnAccent}`}>
                  Request a proposal →
                </a>
                <a href="#curriculum" className={`${styles.btn} ${styles.btnGhost}`}>
                  See the curriculum
                </a>
              </div>
            </div>
          </section>

          <div className={styles.alumniStrip}>
            <div className={styles.wrap}>
              <span className={styles.alumniLabel}>MENTOR&apos;S ALUMNI FROM</span>
              <div className={styles.alumniNames}>
                {ALUMNI.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </div>
          </div>

          {/* WHAT THIS IS */}
          <section className={styles.section}>
            <div className={styles.wrap}>
              <div className={`${styles.sectionHead} ${styles.reveal}`}>
                <span className={styles.eyebrow}>What this is</span>
                <h2>Not a webinar. Not a video course. Not a vendor pitch.</h2>
              </div>
              <div className={`${styles.positioningGrid} ${styles.reveal}`}>
                {POSITIONING.map((item) => (
                  <div className={styles.posCard} key={item.title}>
                    <span className={styles.posIcon}>{item.icon}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TIERS */}
          <section id="tiers" className={`${styles.section} ${styles.sectionAlt}`}>
            <div className={styles.wrap}>
              <div className={`${styles.sectionHead} ${styles.reveal}`}>
                <span className={styles.eyebrow}>Who it&apos;s for</span>
                <h2>Four tiers in one room. Each leaves with something different.</h2>
                <p>
                  Your CxOs, directors, managers, and middle managers all attend the same live sessions — but what
                  they build is calibrated to what each tier does day to day.
                </p>
              </div>
              <div className={`${styles.tierGrid} ${styles.reveal}`}>
                {TIERS.map((tier) => (
                  <div className={`${styles.tierCard} ${tier.className}`} key={tier.id}>
                    <span className={styles.tierTag}>{tier.tag}</span>
                    <h3>{tier.title}</h3>
                    <p className={styles.tierRole}>{tier.role}</p>
                    <p className={styles.tierOutcome}>{tier.outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CURRICULUM */}
          <section id="curriculum" className={styles.section}>
            <div className={styles.wrap}>
              <div className={`${styles.sectionHead} ${styles.reveal}`}>
                <span className={styles.eyebrow}>The 4 weeks</span>
                <h2>Four live sessions. Each 60–90 minutes, hands-on throughout.</h2>
              </div>
              <div className={`${styles.weekTrack} ${styles.reveal}`}>
                {WEEKS.map((week) => (
                  <div className={styles.week} key={week.num}>
                    <div className={styles.weekTop}>
                      <span className={styles.weekNum}>{week.num}</span>
                      <h3>{week.title}</h3>
                    </div>
                    <p className={styles.weekDesc}>{week.desc}</p>
                    <div className={styles.chips}>
                      {week.chips.map((chip) => (
                        <span className={styles.chip} key={chip}>
                          {chip}
                        </span>
                      ))}
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
                <p>
                  The curriculum above is the spine. What changes company to company is the material — all prompts,
                  exercises, and use cases are rebuilt around your industry before session 1.
                </p>
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
                    Entrepreneur, AI Educator, Claude Certified &amp; Claude Partner
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
                      <span className={styles.mLabel}>teaching AI</span>
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
                    <span>{testimonial.attribution}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section className={`${styles.section} ${styles.sectionAlt}`}>
            <div className={styles.wrap}>
              <div className={`${styles.sectionHead} ${styles.reveal}`}>
                <span className={styles.eyebrow}>How it works</span>
                <h2>From first email to finished program</h2>
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
                  <a href={CONTACT_MAILTO} className={`${styles.btn} ${styles.btnAccent}`}>
                    Email us a proposal request →
                  </a>
                  <a
                    href="https://www.bigintsolutions.com"
                    className={`${styles.btn} ${styles.btnGhost}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit BIGINT Solutions
                  </a>
                </div>
                <div className={styles.ctaMeta}>
                  Delivered via BIGINT Solutions · Pricing based on team size — discussed on the call · 🔒 Your data stays
                  private
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

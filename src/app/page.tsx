import type { Metadata } from 'next';
import Image from 'next/image';
import { COHORT } from '@/lib/cohort-config';
import { buildCohortSchema } from '@/lib/seo/cohort-schema';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import FloatingCta from '@/components/FloatingCta';
import PricingSection from '@/components/PricingSection';
import Lightbox from '@/components/Lightbox';
import LinkedInReviews from '@/components/LinkedInReviews';

const COHORT_TITLE = 'Claude AI Cohort — Master the Claude Ecosystem in 6 Weeks | Approachable';
const COHORT_DESCRIPTION =
  'A small-group, mentor-led cohort on the full Claude ecosystem — Claude Chat, Claude Code, Claude Cowork, and the API. 20 seats. Live sessions. Real projects.';
const COHORT_OG_IMAGE = '/img/og-image.png';

export const metadata: Metadata = {
  title: COHORT_TITLE,
  description: COHORT_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Claude AI Cohort — Master the Claude Ecosystem in 6 Weeks',
    description: 'Small-group, mentor-led cohort on Claude Chat, Claude Code, Cowork, and the API. 20 seats max.',
    url: '/',
    siteName: 'Approachable',
    images: [
      {
        url: COHORT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Approachable Claude AI Cohort — master the Claude ecosystem in 6 weeks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude AI Cohort — Master the Claude Ecosystem in 6 Weeks',
    description: 'Small-group, mentor-led cohort on Claude Chat, Claude Code, Cowork, and the API. 20 seats max.',
    images: [COHORT_OG_IMAGE],
  },
};

const COMPANIES = ['Adobe', 'Microsoft', 'GAP Inc', 'Deloitte', 'Nordstrom', 'Upwork', 'TeamViewer', 'MAQ Software', 'Wheels Up', 'Swire Coca-Cola', 'WBD', '& many more'];

const CURRICULUM = [
  {
    num: '1',
    label: 'Session 1',
    title: 'AI Foundations + The Claude Context',
    outcomes: [
      'A clear mental model of how LLMs work — enough to explain it to your team or boss',
      'Speak AI fluently: tokens, hallucinations, MCP, Human Capital vs Token Capital',
      'Clarity on which Claude product to use for which job — Chat, Code, Cowork, Design or API',
    ],
    tags: [
      { text: 'How LLMs work', highlight: true },
      { text: 'Loop Engineering', highlight: true },
      { text: 'Key terms: tokens, hallucinations, MCP', highlight: false },
      { text: 'Human Capital vs Token Capital', highlight: false },
      { text: 'Where the industry is heading', highlight: false },
      { text: 'Claude ecosystem overview', highlight: false },
      { text: 'How to access Claude: Chat, Code, Cowork, Design, API', highlight: false },
    ],
  },
  {
    num: '2',
    label: 'Session 2',
    title: 'Claude Chat & API — Deep Dive',
    outcomes: [
      'Your own reusable prompt library, ready to use at work',
      'Automate research, reporting, competitive intelligence, and operational workflows that normally consume hours.',
      'Learn the fundamentals of using AI APIs to integrate intelligence into your workflows.',
      'Produce high-quality reports, presentations, and analyses in a fraction of the time.',
      'How to optimize tokens in Claude Chat',
    ],
    tags: [
      { text: 'Prompt library & context management', highlight: true },
      { text: 'Web search → Deep research workflow', highlight: true },
      { text: 'Internal knowledge vs external search', highlight: false },
      { text: 'Projects & Artifacts', highlight: false },
      { text: 'Connectors & customisation', highlight: false },
      { text: 'Calling the Claude API (intro)', highlight: false },
      { text: '🛠 Live project: build with Claude API', highlight: false },
    ],
  },
  {
    num: '3',
    label: 'Session 3',
    title: 'Claude Cowork - Agentic Task Automation',
    outcomes: [
      'Build your first AI agent that independently completes real knowledge-work tasks.',
      'Automate repetitive workflows that consume hours every week.',
      'Learn how to delegate multi-step work to AI while maintaining quality and control.',
      'Leave with production-ready automations you can start using immediately.',
    ],
    tags: [
      { text: 'AI Agents', highlight: true },
      { text: 'Claude Cowork', highlight: true },
      { text: 'Claude in Chrome', highlight: true },
      { text: 'Live Artifacts', highlight: true },
      { text: 'Automating multi-step knowledge work', highlight: false },
      { text: '🛠 Live project: end-to-end Cowork workflow', highlight: false },
    ],
  },
  {
    num: '4',
    label: 'Session 4',
    title: 'Claude Code — Agentic Development',
    outcomes: [
      'Build software faster by collaborating effectively with Claude Code.',
      'Ship real features or prototypes with significantly less manual effort.',
      'Apply proven practices to maximize quality while minimizing AI cost.',
      'Learn workflows for navigating, understanding, and modifying unfamiliar codebases.',
    ],
    tags: [
      { text: 'CLAUDE.md — memory and context files', highlight: true },
      { text: 'Skills, MCP, Hooks, Plugins, Routines', highlight: true },
      { text: 'Loop Engineering in code', highlight: true },
      { text: 'Claude Code in large projects — best practices', highlight: false },
      { text: '🛠 Live project: ship something with Claude Code', highlight: false },
    ],
  },
];

const CAPSTONE = {
  outcomes: [
    'Complete two portfolio-worthy AI projects relevant to your role.',
    'Present a live demo showcasing practical AI implementation.',
    'Receive personalized feedback to refine your workflows and solve real challenges.',
    'Finish the cohort with repeatable AI workflows you can apply immediately at work.',
  ],
  tags: [
    { text: '2 capstone projects you choose', highlight: true },
    { text: 'Focused doubt-clearing sessions', highlight: false },
    { text: 'Demo to the group', highlight: false },
    { text: 'Portfolio-ready output', highlight: false },
  ],
};

const FAQ = [
  { q: 'Who is this cohort for?', a: 'Anyone who uses or wants to use AI & Claude seriously — developers, PMs, founders, consultants, and tech professionals who want to go beyond chat prompts and actually build with the Claude ecosystem.' },
  { q: 'Do I need to know how to code?', a: "Helpful but not required. Claude Code sessions assume basic familiarity with files and terminals. Everything else is accessible to non-developers. We'll calibrate to the group." },
  { q: 'How long is the program?', a: '4 live sessions (90 mins each), followed by a 2-week capstone build period and a final demo session. Roughly 6–7 weeks start to finish.' },
  { q: 'Why is the fee non-refundable?', a: "We cap at 20 seats. When someone takes a seat and doesn't show, it costs another learner their spot. The commitment fee protects the group experience — it's the same reason the cohort model works." },
  { q: "What's the Approachable learning platform?", a: 'All enrolled students get access to a dedicated hub with quizzes, a progress tracker, leaderboard, an interactive prompting guide, and sample prompts to practice between sessions.' },
  { q: 'I was in a previous cohort — can I join this one?', a: "Yes, and we'd love to have you back. Reach out directly" },
  { q: 'How do I contact you?', a: 'Contact us at BIGINT Solutions. www.bigintsolutions.com' },
];

export default function HomePage() {
  const cohortSchema = buildCohortSchema(FAQ);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cohortSchema) }}
      />
      <Banner />
      <Header />
      <main>
        {/* HERO */}
        <section style={{ padding: '64px 24px 0', borderBottom: '1px solid var(--border)' }}>
          <div className="hero" style={{ padding: '0 0 48px' }}>
            <div className="hero-label">Cohort 7 · {COHORT.dateShort} · 20 seats max</div>
            <h1>
              Master the AI fundamentals <br />
              with <span>Claude Ecosystem</span>
              <br />
              in 6 Weeks
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 auto 12px', fontWeight: 500 }}>
              Mentor: Ranbeer Makin (Claude Certified &amp; Claude Partner)
            </p>
            <p>
              A small, mentor-led study group covering AI fundamentals, and Claude Chat, Claude Design, Claude Code, Claude Cowork, and the Claude API — from first principles to live projects.
            </p>
            <div className="hero-actions">
              <a href="#pricing" className="btn-primary">Become AI Capable →</a>
              <a href="#curriculum" className="btn-secondary">See the Curriculum</a>
            </div>
          </div>

          <div className="cohort-box">
            <div className="cohort-box-row">
              <div className="cohort-meta">
                <div className="cohort-meta-item">📅 <strong>Starts {COHORT.date}</strong> &nbsp;·&nbsp; {COHORT.time}</div>
                <div className="cohort-meta-item">👥 <strong>Max 20 seats</strong> &nbsp;·&nbsp; Small group, discussion-driven</div>
                <div className="cohort-meta-item">⏱ <strong>4 live sessions (each week)</strong> &nbsp;·&nbsp; 60-90 min each + capstone build</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                <span className="cohort-badge">{COHORT.seatsLeft} seats left</span>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 0 48px' }} />
        </section>

        {/* COMPANIES */}
        <div className="logos-section">
          <div className="logos-label">Alumni from these organisations</div>
          <div className="logos-grid">
            {COMPANIES.map((c) => (
              <span key={c} className="logo-pill">{c}</span>
            ))}
          </div>
        </div>

        <hr className="divider" />

        {/* VIDEO */}
        <section style={{ background: 'var(--bg-warm)', padding: '56px 24px' }}>
          <div className="container-max" style={{ maxWidth: 780 }}>
            <div className="section-label" style={{ textAlign: 'center' }}>Cohort overview</div>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 32 }}>See what you&apos;re signing up for</h2>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
              <iframe
                src="https://player.vimeo.com/video/1208021044?badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="Claude AI Cohort — Approachable"
              />
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* CURRICULUM */}
        <section id="curriculum" style={{ background: 'var(--bg)' }}>
          <div className="container-max">
            <div className="section-label">What you&apos;ll learn</div>
            <h2 className="section-title">The full AI fundamentals and Claude curriculum</h2>
            <p className="section-sub">Four live sessions, each 60-90 minutes with hands-on activities. Then two weeks to build your capstone project.</p>

            <div className="curriculum-wrap" style={{ marginTop: 40 }}>
              {CURRICULUM.map((session) => (
                <div key={session.num} className="curriculum-block">
                  <div className="curriculum-header">
                    <div className="curriculum-num">{session.num}</div>
                    <div>
                      <div className="curriculum-session-label">{session.label}</div>
                      <div className="curriculum-title">{session.title}</div>
                    </div>
                  </div>
                  <div className="curriculum-body">
                    <div className="curriculum-columns">
                      <div>
                        <div className="curriculum-col-label">Outcomes</div>
                        <ul className="curriculum-outcome-list">
                          {session.outcomes.map((o, i) => (<li key={i}>{o}</li>))}
                        </ul>
                      </div>
                      <div>
                        <div className="curriculum-col-label">What&apos;s Covered</div>
                        <div className="curriculum-tags">
                          {session.tags.map((t, i) => (
                            <span key={i} className={`curriculum-tag${t.highlight ? ' highlight' : ''}`}>{t.text}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Capstone */}
              <div className="curriculum-block" style={{ border: '2px solid var(--accent)' }}>
                <div className="curriculum-header" style={{ background: 'var(--accent-light)' }}>
                  <div className="curriculum-num" style={{ background: 'var(--text-primary)' }}>✦</div>
                  <div>
                    <div className="curriculum-session-label">Weeks 5–6</div>
                    <div className="curriculum-title">Capstone Projects + Cohort Completion</div>
                  </div>
                </div>
                <div className="curriculum-body">
                  <div className="curriculum-columns">
                    <div>
                      <div className="curriculum-col-label">Outcomes</div>
                      <ul className="curriculum-outcome-list">
                        {CAPSTONE.outcomes.map((o, i) => (<li key={i}>{o}</li>))}
                      </ul>
                    </div>
                    <div>
                      <div className="curriculum-col-label">What&apos;s Covered</div>
                      <div className="curriculum-tags">
                        {CAPSTONE.tags.map((t, i) => (
                          <span key={i} className={`curriculum-tag${t.highlight ? ' highlight' : ''}`}>{t.text}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* OUTCOMES */}
        <section id="outcomes" style={{ background: 'var(--bg-warm)' }}>
          <div className="container-max">
            <div className="section-label">After 6 weeks</div>
            <h2 className="section-title">What you&apos;ll be able to do</h2>
            <div className="outcomes-grid">
              <div className="outcome-card">
                <div className="outcome-icon" style={{ background: '#4F33C8' }}>💬</div>
                <h3>Build Custom AI Applications</h3>
                <p>Create intelligent applications for customer service, data summarization, data extraction tasks, and more — no coding required.</p>
                <div className="outcome-project">✓ Project: Your own business AI assistant</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-icon" style={{ background: '#0D9488' }}>⚡</div>
                <h3>Build AI employees with AI Agents</h3>
                <p>Build Agentic AI workflows with Cowork that save 5-10 hours per week: customer support, report generation, ticket routing, classification, and more.</p>
                <div className="outcome-project">✓ Project: AI Agent working 24x7 for you</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-icon" style={{ background: '#7C3AED' }}>💡</div>
                <h3>Ship AI Prototypes Fast</h3>
                <p>Use Claude Code to turn ideas into working demos in days, not months. Perfect for validating startup ideas or pitching to investors.</p>
                <div className="outcome-project">✓ Capstone: Demo-ready AI prototype</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* HOW IT WORKS */}
        <section id="how">
          <div className="container-max">
            <div className="section-label">Process</div>
            <h2 className="section-title">How the cohort works</h2>
            <div className="how-grid">
              {[
                { icon: '📋', title: 'Join the cohort', desc: 'Fill out the short form. We confirm your seat and send payment details within 12 hours.' },
                { icon: '📖', title: 'Pre-session materials', desc: 'Short videos and reading delivered before each session. Come ready to build, not to passively watch.' },
                { icon: '🎙', title: '90-minute live sessions', desc: 'Mentor-led, hands-on, discussion-driven. Small group means every question gets answered.' },
                { icon: '🏗', title: 'Build your capstone', desc: 'Two weeks of independent building with mentor access for doubt-clearing, then a live demo.' },
              ].map((card) => (
                <div key={card.title} className="how-card">
                  <div className="how-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* MENTOR */}
        <section id="mentor" style={{ background: 'var(--bg-warm)' }}>
          <div className="container-max">
            <div className="section-label" style={{ textAlign: 'center' }}>Your mentor</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Meet Ranbeer</h2>
            <div className="mentor-card">
              <div>
                <Image src="/img/Ranbeer makin aug 22.jpg" alt="Ranbeer Makin" className="mentor-photo" width={160} height={200} />
              </div>
              <div>
                <div className="mentor-name">Ranbeer Makin</div>
                <div className="mentor-role">Entrepreneur, AI Educator &amp; Claude Partner</div>
                <a
                  href="https://www.linkedin.com/in/ranbeer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  linkedin.com/in/ranbeer
                </a>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                  Full-time entrepreneur, 3 years teaching AI to 250+ professionals from Gap, Deloitte, Microsoft, Upwork, and early-stage startups. Runs the cohorts as small, discussion-driven study groups — not lectures.
                </p>
                <div className="mentor-quote">
                  &ldquo;I created Approachable because I believe anyone should be able to build with AI. My goal is 1 million students. This is my way of giving back.&rdquo;
                </div>
                <div className="mentor-stats">
                  <div className="mentor-stat"><div className="val">250+</div><div className="lbl">Students</div></div>
                  <div className="mentor-stat"><div className="val">1M</div><div className="lbl">Goal</div></div>
                  <div className="mentor-stat"><div className="val">3 yrs</div><div className="lbl">Teaching</div></div>
                  <div className="mentor-stat"><div className="val">4.9★</div><div className="lbl">Rating</div></div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="testimonials-section">
              <h2 className="testimonials-section-title">What Alumni Are Saying on LinkedIn</h2>
              <div className="testimonials-grid">
                {[
                  '"Built my first AI agent in week 3 — something I thought would take me months."',
                  '"The study group format kept me accountable. I actually finished the course."',
                  '"Ranbeer makes complex AI concepts feel simple and immediately actionable."',
                ].map((text, i) => (
                  <div key={i} className="testimonial-card">
                    <p className="testimonial-text">{text}</p>
                  </div>
                ))}
              </div>

              <LinkedInReviews />
            </div>

            <Lightbox />
          </div>
        </section>

        <hr className="divider" />

        {/* PRICING */}
        <PricingSection />

        <hr className="divider" />

        {/* SIGN-UP */}
        <section id="signup" className="signup-section">
          <div className="container-max" style={{ maxWidth: 680 }}>
            <div className="section-label" style={{ textAlign: 'center' }}>Register</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Here&apos;s what happens next</h2>

            <div className="signup-steps">
              <div className="signup-step">
                <div className="step-num">1</div>
                <div>
                  <div className="step-title">Fill out the quick form</div>
                  <div className="step-desc">Tell us about yourself and what you&apos;re trying to build. Takes 2 minutes.</div>
                </div>
              </div>
              <div className="signup-step">
                <div className="step-num">2</div>
                <div>
                  <div className="step-title">We&apos;ll reach out within 12 hrs</div>
                  <div className="step-desc">Seat confirmed</div>
                </div>
              </div>
              <div className="signup-step">
                <div className="step-num">3</div>
                <div>
                  <div className="step-title">Start learning {COHORT.dateShort}</div>
                  <div className="step-desc">Cohort workspace + Week 1 materials arrive before your first session.</div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <a href={COHORT.formUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Start Building with Claude →
              </a>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 12 }}>
                Only {COHORT.seatsLeft} seats remaining · {COHORT.date}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                <span>🔒</span> Your data is private
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                <span>❓</span> No question is too basic
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                <span>🎓</span> 250+ alumni taught
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* FAQ */}
        <section id="faq">
          <div className="container-max" style={{ maxWidth: 680 }}>
            <h2 className="section-title">FAQ</h2>
            <div className="faq-list" style={{ marginTop: 24 }}>
              {FAQ.map((item, i) => (
                <div key={i} className="faq-item">
                  <h3 className="faq-q">{item.q}</h3>
                  <div className="faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FloatingCta />
    </>
  );
}

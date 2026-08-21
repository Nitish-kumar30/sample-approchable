import type { Metadata } from 'next';
import Header from '@/components/Header';
import SupportFooter from '@/components/SupportFooter';
import ScrollReveal from '@/components/corporate-training/ScrollReveal';
import IndustrySelector from '@/components/corporate-training/IndustrySelector';
import FaqAccordion from '@/components/corporate-training/FaqAccordion';
import MentorPhoto from '@/components/corporate-training/MentorPhoto';
import styles from './corporate-training.module.css';

export const metadata: Metadata = {
  title: 'Approachable for Teams — Private AI Training, One Company at a Time',
  description:
    'A private, mentor-led AI training program for your organization. 4 live sessions. Every tier — CxOs to middle managers — leaves able to do more, not just talk about it.',
  openGraph: {
    title: 'Approachable for Teams — Private AI Training, One Company at a Time',
    description:
      'A private, mentor-led AI training program for your organization. 4 live sessions. Every tier — CxOs to middle managers — leaves able to do more, not just talk about it.',
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
    role: 'CEOs, CFOs, CIOs and other C-suite leaders',
    items: [
      'Review an AI-drafted board pack or report yourself and catch what\u2019s wrong with it before it reaches a meeting',
      'Draft your own memos and announcements without waiting on someone else\u2019s calendar',
      'Sit through a vendor\u2019s AI pitch and know when you\u2019re being sold hype instead of substance',
    ],
  },
  {
    id: 'director',
    className: styles.tierDirector,
    tag: 'Director',
    title: 'For the people who translate',
    role: 'Directors and heads of function',
    items: [
      'Turn a stack of team updates into one clean cross-functional summary in minutes, not an afternoon',
      'Run your own research or competitive scan instead of tasking it out and waiting two days',
      'Build a reporting workflow that still runs correctly when you\u2019re out for a week',
    ],
  },
  {
    id: 'mgmt',
    className: styles.tierMgmt,
    tag: 'Management',
    title: 'For the people who run the team',
    role: 'People managers and functional leads',
    items: [
      'Auto-draft performance summaries and 1:1 notes from your own raw notes',
      'Consolidate a team\u2019s Friday status updates without the copy-paste marathon',
      'Run a first-cut forecast or plan, and know which parts still need a human gut-check',
    ],
  },
  {
    id: 'mid',
    className: styles.tierMid,
    tag: 'Middle Manager',
    title: 'For the people closest to the work',
    role: 'Team leads and middle managers',
    items: [
      'Build one small AI agent that handles your team\u2019s most repetitive weekly task — scheduling, ticket triage, meeting notes',
      'Delegate multi-step busywork to AI while keeping a real checklist for quality',
      'Leave able to teach two people on your own team what you just learned',
    ],
  },
];

const SESSIONS = [
  {
    num: '01',
    title: 'AI Foundations & the Real Landscape',
    week: 'Week 1 \u00b7 60\u201390 min',
    sub: 'A vendor-neutral grounding in how modern AI actually works, before we ever open a single tool.',
    covered: [
      'How large language models actually work, in plain language',
      'Key vocabulary: tokens, hallucinations, context windows, agents, MCP',
      'The current AI landscape — Claude, ChatGPT, Gemini, Copilot, and where each fits',
      'Where your industry specifically is already using AI, and where it isn\u2019t yet',
    ],
    outcomes: [
      'Explain AI to your own team or your board without the jargon',
      'Tell which AI tool is the right one for a given job, not just the one you already have',
      'Ask a sharper question the next time a vendor pitches you an "AI-powered" product',
    ],
    built: 'A shared glossary and landscape map specific to your company\u2019s tools and industry.',
  },
  {
    num: '02',
    title: 'Claude Chat & API — Research, Reporting, Prompting',
    week: 'Week 2 \u00b7 60\u201390 min',
    sub: 'The deep, hands-on layer. This is where the "getting things done" part of the program starts in earnest.',
    covered: [
      'A reusable prompt library built around your team\u2019s actual recurring tasks',
      'Web search → deep research workflows for reports and competitive scans',
      'Projects, Artifacts, and Connectors for ongoing work, not one-off chats',
      'An intro to calling the Claude API — for the teams that need it',
    ],
    outcomes: [
      'Produce a first-draft report or analysis in minutes instead of hours',
      'Reuse your own prompt library at your desk the next morning',
      'Tell the difference between a quick answer and one that needs real research',
    ],
    built: 'A working prompt library and one real report or analysis, drafted live using your own data or a close stand-in.',
  },
  {
    num: '03',
    title: 'Claude Cowork — Building Agents for Your Team\u2019s Real Work',
    week: 'Week 3 \u00b7 60\u201390 min',
    sub: 'Delegating actual multi-step work to AI, while keeping control of the quality.',
    covered: [
      'What an AI agent is and isn\u2019t, in practical terms',
      'Claude Cowork and Claude in Chrome for multi-step task automation',
      'Designing a workflow for a repetitive task your team already does every week',
      'Keeping quality control on delegated, agentic work',
    ],
    outcomes: [
      'Hand off a real recurring task to an AI agent instead of doing it by hand',
      'Spot where an automation needs a human checkpoint and where it doesn\u2019t',
      'Reclaim hours a week currently spent on repetitive knowledge work',
    ],
    built: 'One end-to-end automation for a task your team picks — live, working, and ready to reuse the same week.',
  },
  {
    num: '04',
    title: 'Claude Code — Shipping Real Prototypes Fast',
    week: 'Week 4 \u00b7 60\u201390 min',
    sub: 'Turning ideas into working software or internal tools, days instead of months.',
    covered: [
      'Working effectively with Claude Code as a collaborator, not a black box',
      'CLAUDE.md, skills, and the basics of navigating an unfamiliar codebase with AI help',
      'Best practices for quality control when AI is writing real code',
      'Where this fits even for non-developers — internal tools, prototypes, dashboards',
    ],
    outcomes: [
      'Ship a working prototype or internal tool without a full engineering sprint',
      'Brief a developer — or Claude Code itself — with far less back-and-forth',
      'Judge AI-written output for quality instead of taking it on faith',
    ],
    built: 'A working prototype or internal tool tied to a real need on your team, demoed live to close the program.',
  },
];

const PROCESS = [
  { icon: '📋', title: '1. Intro call', text: 'Tell us your team size, tiers, and industry. Takes about 20 minutes.' },
  { icon: '🎯', title: '2. We tailor it', text: 'Session content, prompts, and exercises get mapped to your org\u2019s real work.' },
  { icon: '🎙', title: '3. Four live sessions', text: 'One per week, virtual or on-site, mentor-led and hands-on throughout.' },
  { icon: '🏗', title: '4. Wrap & handoff', text: 'Your team leaves with working prompts, workflows, and prototypes already in use.' },
];

const PRICE_INCLUDES = [
  '4 live, 60\u201390 minute mentor-led sessions',
  'Curriculum tailored to your industry and tiers before session 1',
  'Pre-session reading and short prep videos',
  'Session recordings shared with your team afterward',
  'A reusable prompt library built during the sessions',
  'Private team access channel + mentor access between sessions',
  'Delivered virtually or on-site, your choice',
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
            <div className={`${styles.heroBanner} ${styles.reveal} ${styles.revealIn}`}>
              <span>🔒</span> <strong>Private cohort</strong> — built for one organization at a time, not a public class
            </div>
            <h1>
              Get your leadership team <em className={styles.heroHighlight}>actually using</em> AI, not just talking
              about it.
            </h1>
            <p className={styles.heroSub}>
              A private, mentor-led AI training program delivered to your company. Four live sessions. Real use
              cases from your industry. Every level of your org — from the CxO to the middle manager — leaves able
              to do more with AI, hands-on, in the room.
            </p>
            <div className={styles.heroCtas}>
              <a href="#contact" className={`${styles.btn} ${styles.btnAccent}`}>
                Request a proposal for your team →
              </a>
              <a href="#curriculum" className={`${styles.btn} ${styles.btnGhost}`}>
                See the curriculum
              </a>
            </div>
            <div className={styles.heroFacts}>
              <div className={styles.fact}>
                <span className={styles.num}>4</span>
                <span className={styles.label}>live sessions, one per week</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.num}>4</span>
                <span className={styles.label}>tiers trained: CxO → middle mgmt</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.num}>₹3,000</span>
                <span className={styles.label}>per participant, flat</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.num}>1</span>
                <span className={styles.label}>named mentor, not a rotating faculty</span>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.alumniStrip}>
          <div className={styles.wrap}>
            <span className={styles.alumniLabel}>MENTOR&apos;S ALUMNI HAVE COME FROM</span>
            <div className={styles.alumniNames}>
              {ALUMNI.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* PUBLIC VS PRIVATE */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Not the same thing</span>
              <h2>This isn&apos;t the public cohort. It&apos;s built for your company.</h2>
              <p>
                We also run a well-reviewed public cohort for individuals. This is a different, private engagement
                — shorter, tighter, and built entirely around your people and your industry.
              </p>
            </div>
            <div className={`${styles.compare} ${styles.reveal}`}>
              <div className={styles.compareCard}>
                <h3>🌐 Public Cohort</h3>
                <ul>
                  <li>Anyone can join — mixed group of strangers</li>
                  <li>6 weeks: 4 sessions + 2-week capstone build</li>
                  <li>Generic examples, not your industry</li>
                  <li>₹3,999 per seat, self-paid, capped at 20</li>
                </ul>
              </div>
              <div className={`${styles.compareCard} ${styles.compareCardThis}`}>
                <h3>🏢 Approachable for Teams (this page)</h3>
                <ul>
                  <li>Private — only your organization is in the room</li>
                  <li>4 weeks: one focused live session per week, no capstone tail</li>
                  <li>Use cases built around your industry, live in session</li>
                  <li>₹3,000 per participant, company-paid</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHY: RESEARCH GROUNDED */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Why generic training doesn&apos;t stick</span>
              <h2>Most companies already run AI training. Most still have a skills gap.</h2>
              <p>
                That&apos;s not a motivation problem. It&apos;s a design problem — training built for everyone ends
                up useful to no one.
              </p>
            </div>
            <div className={`${styles.statGrid} ${styles.reveal}`}>
              <div className={styles.statCard}>
                <span className={styles.big}>82% → 59%</span>
                <p>
                  Of enterprise leaders say their company already runs some form of AI training — yet a majority
                  still report a real skills gap on their team.
                </p>
              </div>
              <div className={styles.statCard}>
                <span className={styles.big}>~2 in 3</span>
                <p>
                  Of employees say they&apos;d use AI meaningfully better if the training were built around their
                  actual job — but only about a third say the training they got was.
                </p>
              </div>
              <div className={styles.statCard}>
                <span className={styles.big}>Video ≠ skill</span>
                <p>
                  Leaders repeatedly flag pre-recorded, one-size-fits-all video courses as the format that fails to
                  translate into real, on-the-job capability.
                </p>
              </div>
            </div>
            <p className={styles.statSource}>
              Sources: DataCamp 2026 State of Data &amp; AI Literacy survey (500+ enterprise leaders, with YouGov);
              TalentLMS 2026 L&amp;D Report. Figures rounded for readability.
            </p>
          </div>
        </section>

        {/* TIERS */}
        <section id="tiers" className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>One room, four tiers</span>
              <h2>Everyone builds the same skill. What they build it on is different.</h2>
              <p>
                Your CxOs, directors, managers, and middle managers all sit in the same live sessions — but the
                exercises, prompts, and examples are calibrated to what each tier actually does day to day.
              </p>
            </div>
            <div className={`${styles.tierGrid} ${styles.reveal}`}>
              {TIERS.map((tier) => (
                <div className={`${styles.tierCard} ${tier.className}`} key={tier.id}>
                  <span className={styles.tierTag}>{tier.tag}</span>
                  <h3>{tier.title}</h3>
                  <p className={styles.tierRole}>{tier.role}</p>
                  <ul>
                    {tier.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className={`${styles.noStrategyNote} ${styles.reveal}`}>
              <strong>What this program deliberately isn&apos;t:</strong> a strategy workshop or an ROI framework.
              Even the sessions the CxOs sit in are about doing the work yourself — drafting, reviewing, building —
              not another slide deck about AI&apos;s competitive advantage. Every tier leaves having personally
              built something, not just discussed it.
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section id="curriculum" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>The curriculum</span>
              <h2>Four live sessions. Vendor-neutral where it should be, deeply hands-on where it counts.</h2>
              <p>
                Session 1 covers the real AI landscape — not just one company&apos;s product line. From there, we go
                deep on the Claude ecosystem, because that&apos;s the layer we can teach with genuine, practiced
                expertise.
              </p>
            </div>

            {SESSIONS.map((session) => (
              <div className={`${styles.session} ${styles.reveal}`} key={session.num}>
                <div className={styles.sessionNum}>{session.num}</div>
                <div>
                  <div className={styles.sessionHead}>
                    <h3>{session.title}</h3>
                    <span className={styles.sessionWeek}>{session.week}</span>
                  </div>
                  <p className={styles.sessionSub}>{session.sub}</p>
                  <div className={styles.sessionCols}>
                    <div>
                      <h4>What&apos;s covered</h4>
                      <ul>
                        {session.covered.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>You leave able to</h4>
                      <ul>
                        {session.outcomes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.builtBox}>
                    <strong>Built in the room</strong>
                    {session.built}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INDUSTRY SELECTOR */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.industryPanel} ${styles.reveal}`}>
              <div className={styles.sectionHead} style={{ marginBottom: 26 }}>
                <span className={styles.eyebrow} style={{ color: 'var(--accent)' }}>
                  Built around your industry
                </span>
                <h2>Every example in the room gets swapped for one from your world.</h2>
                <p>
                  The curriculum above is the spine. What changes company to company is the material — pull an
                  example below to see how it adapts.
                </p>
              </div>
              <IndustrySelector />
            </div>
          </div>
        </section>

        {/* MENTOR */}
        <section id="mentor" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Your mentor</span>
              <h2>One named mentor. Not a rotating bench of trainers.</h2>
            </div>
            <div className={`${styles.mentor} ${styles.reveal}`}>
              <MentorPhoto />
              <div>
                <h3 style={{ fontSize: 24, marginBottom: 2 }}>Ranbeer Makin</h3>
                <p style={{ color: 'var(--ink-soft)', marginBottom: 16 }}>
                  Entrepreneur, AI Educator, Claude Certified &amp; Claude Partner
                </p>
                <p style={{ maxWidth: '60ch' }}>
                  Full-time entrepreneur with three years teaching AI to 250+ professionals from companies including
                  Adobe, Microsoft, Deloitte, GAP Inc, Nordstrom, Upwork, TeamViewer, Coca-Cola, and WBD. Runs every
                  session as a small, discussion-driven room — not a lecture. Your team gets him directly, session
                  to session, not a rotating cast of facilitators.
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
                  <div>
                    <span className={styles.mNum}>1M</span>
                    <span className={styles.mLabel}>student goal</span>
                  </div>
                </div>
                <blockquote className={styles.mentorQuote}>
                  &ldquo;I created Approachable because I believe anyone should be able to build with AI. My goal is
                  1 million students — this is my way of giving back.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>From past cohorts</span>
              <h2>What alumni actually say</h2>
            </div>
            <div className={`${styles.testiGrid} ${styles.reveal}`}>
              <div className={styles.testiCard}>
                <p>One participant had their first working AI agent by week three — work they expected to take months.</p>
                <span>— Verified LinkedIn review</span>
              </div>
              <div className={styles.testiCard}>
                <p>
                  The small study-group format is what several alumni credit for actually finishing, instead of
                  letting the course lapse.
                </p>
                <span>— Verified LinkedIn review</span>
              </div>
              <div className={styles.testiCard}>
                <p>
                  The recurring theme: concepts that sounded complicated on paper became things people could use the
                  same day.
                </p>
                <span>— Verified LinkedIn review</span>
              </div>
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
                  <span className={styles.procIcon}>{step.icon}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Pricing</span>
              <h2>One flat rate per participant</h2>
            </div>
            <div className={`${styles.priceCard} ${styles.reveal}`}>
              <div>
                <div className={styles.priceNum}>
                  ₹3,000 <span>/ participant</span>
                </div>
                <p style={{ color: 'var(--ink-soft)' }}>
                  Delivered privately to your organization only. Billed to the company, not the individual.
                </p>
                <div className={styles.priceNote}>
                  Running this for a large team, multiple departments, or multiple cohorts? Group size can change
                  how this is structured — tell us your headcount on the intro call and we&apos;ll talk through it
                  directly rather than guess at a number here.
                </div>
              </div>
              <div>
                <h4 className={styles.priceListLabel}>What&apos;s included</h4>
                <ul className={styles.priceList}>
                  {PRICE_INCLUDES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`}>
              <span className={styles.eyebrow}>FAQ</span>
              <h2>Common questions from teams booking this</h2>
            </div>
            <div className={styles.reveal}>
              <FaqAccordion />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.contactBand} ${styles.reveal}`}>
              <span className={styles.eyebrow} style={{ color: 'var(--accent)' }}>
                Get started
              </span>
              <h2>Bring this to your leadership team.</h2>
              <p>
                Tell us your company, team size, and industry — we&apos;ll come back with a tailored outline and
                dates within a few days.
              </p>
              <div className={styles.contactCtas}>
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
              <div className={styles.contactMeta}>
                Delivered via BIGINT Solutions · www.bigintsolutions.com · 🔒 your company&apos;s data stays private
                to this cohort
              </div>
            </div>
          </div>
        </section>
      </main>

      <SupportFooter className={styles.supportFooter} />
    </div>
    </>
  );
}

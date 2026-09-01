import type { Metadata } from 'next';
import Image from 'next/image';
import {
  EnquiryModalProvider,
  OpenEnquiryButton,
  TeamAiTrainingNav,
} from '@/components/corporate-training/EnquiryModal';
import JsonLd from '@/components/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildTeamTrainingSchema } from '@/lib/seo/team-training-schema';
import styles from './team-ai-training.module.css';

const TEAM_TRAINING_DESCRIPTION =
  'A four-week, hands-on AI implementation program for teams. Build practical AI workflows, automate one real task, and ship a working prototype.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Practical AI Implementation for Teams',
  description: TEAM_TRAINING_DESCRIPTION,
  path: '/team-ai-training',
  ogImageAlt: 'Approachable — practical AI implementation for teams',
});

const caseStudies = [
  {
    image: '/images/team-ai-case-01.png',
    alt: 'Messy manual inputs turned into a structured AI workflow with a prompt library and reusable templates, producing consistent dashboards and reports',
    label: 'CASE STUDY 01',
    title: 'From repeated work to a shared AI workflow',
    description:
      'We took the manual back-and-forth the team was doing by hand and turned it into a repeatable AI workflow, complete with a prompt library and templates anyone can reuse.',
  },
  {
    image: '/images/team-ai-case-02.png',
    alt: 'AI automation engine that triages, routes, and completes business requests',
    label: 'CASE STUDY 02',
    title: 'One real task automated',
    description:
      'We found the task eating the most hours every week and built the automation that now handles it end to end — sorting, routing, and completing it without manual input.',
  },
  {
    image: '/images/team-ai-case-03.png',
    alt: 'Working internal AI prototype dashboard your team can use every day',
    label: 'CASE STUDY 03',
    title: 'A useful internal AI prototype',
    description:
      'By the end of the program the team has an actual working tool, not a slide deck — something people open and use to get real work done.',
  },
] as const;

const testimonials = [
  { image: '/images/testimonial-01.png', alt: 'David Anderson, CEO of Lumea, on going from idea to a working AI agent in three weeks' },
  { image: '/images/testimonial-02.png', alt: 'Shivam Kumar, Head of Customer Support at Solvix, on 45% faster response times and 20+ hours saved weekly' },
  { image: '/images/testimonial-03.png', alt: 'Daniel Mitchell, Director of Analytics at Nexora, on cutting monthly reporting time from 3 days to 2 hours' },
] as const;

export default function TeamAiTrainingPage() {
  return (
    <EnquiryModalProvider>
      <JsonLd data={buildTeamTrainingSchema()} />
      <div className={styles.page}>
        <TeamAiTrainingNav />

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <div className={styles.eyebrow}>AI implementation for teams</div>
              <h1>
                Your team is using AI.
                <br />
                <span>Now make it actually useful.</span>
              </h1>
              <p className={styles.heroSub}>
                A four-week, hands-on program for teams of 5–20. We turn your team&apos;s real work into reusable AI
                workflows, one automated process, and a working prototype.
              </p>
              <div className={styles.heroActions}>
                <OpenEnquiryButton className={`${styles.btn} ${styles.btnPrimary}`}>
                  Book a 20-min AI team assessment →
                </OpenEnquiryButton>
                <a className={`${styles.btn} ${styles.btnGhost}`} href="#program">
                  See what you get
                </a>
              </div>
              <div className={`${styles.heroNote} ${styles.small}`}>
                No pitch. We&apos;ll look at your current AI use and tell you honestly if this fits.
              </div>
            </div>

            <div className={styles.heroCard}>
              <div className={`${styles.cardTop} ${styles.mono}`}>
                <span>THE FOUR WEEKS</span>
                <span className={styles.live}>LIVE · UP TO 20 PEOPLE</span>
              </div>
              <div className={styles.weekList}>
                <div className={styles.weekRow}>
                  <div className={styles.weekNum}>01</div>
                  <div>
                    <div className={styles.weekTitle}>See the real landscape</div>
                    <div className={styles.weekDesc}>Choose the right AI tools for your actual work.</div>
                  </div>
                </div>
                <div className={styles.weekRow}>
                  <div className={styles.weekNum}>02</div>
                  <div>
                    <div className={styles.weekTitle}>Build reusable AI workflows</div>
                    <div className={styles.weekDesc}>Turn repeated work into reliable, shared processes.</div>
                  </div>
                </div>
                <div className={styles.weekRow}>
                  <div className={styles.weekNum}>03</div>
                  <div>
                    <div className={styles.weekTitle}>Automate one real task</div>
                    <div className={styles.weekDesc}>Your team ships something it actually needs.</div>
                  </div>
                </div>
                <div className={styles.weekRow}>
                  <div className={styles.weekNum}>04</div>
                  <div>
                    <div className={styles.weekTitle}>Ship a working prototype</div>
                    <div className={styles.weekDesc}>Demo a useful internal tool built around your business.</div>
                  </div>
                </div>
              </div>
              <div className={styles.heroCardFoot}>
                Then a 30-day check-in. Recordings and your shared library stay with the team.
              </div>
            </div>
          </div>
        </section>

        {/* PROOF BAR */}
        <section className={styles.trust}>
          <div className={`${styles.container} ${styles.stats}`}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>250+</div>
              <div className={styles.statLabel}>Professionals trained</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>
                4.9<span style={{ color: 'var(--accent)' }}>★</span>
              </div>
              <div className={styles.statLabel}>Average rating</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>20</div>
              <div className={styles.statLabel}>People per team</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>1</div>
              <div className={styles.statLabel}>Dedicated mentor</div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className={styles.problem}>
          <div className={styles.container}>
            <div className={styles.problemIntro}>
              <div>
                <div className={styles.eyebrow}>The problem</div>
                <h2>AI adoption isn&apos;t the problem. AI adoption that sticks is.</h2>
              </div>
              <p className={styles.problemCopy}>
                Your team has access to ChatGPT, Claude, Gemini or Copilot. A few people are experimenting. But
                there is no shared way of working, no reliable standard, and no clear path from &ldquo;interesting
                demo&rdquo; to &ldquo;this saves us time every week.&rdquo;
              </p>
            </div>

            <div className={styles.problemGrid}>
              <div className={styles.problemItem}>
                <div className={styles.problemNum}>01</div>
                <p>Everyone uses AI differently. Prompts, quality and results vary from person to person.</p>
              </div>
              <div className={styles.problemItem}>
                <div className={styles.problemNum}>02</div>
                <p>Nobody is checking whether the outputs are actually good enough for your business.</p>
              </div>
              <div className={styles.problemItem}>
                <div className={styles.problemNum}>03</div>
                <p>
                  Generic webinars show possibilities. Enterprise programs cost too much. Your team needs the
                  middle ground.
                </p>
              </div>
            </div>

            <div className={styles.problemClose}>That&apos;s the gap we fill.</div>
          </div>
        </section>

        {/* OUTCOMES */}
        <section className={styles.outcomes} id="program">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrow}>The outcome</div>
              <h2>Don&apos;t leave with notes. Leave with things that work.</h2>
              <p>In four weeks, your team moves from experimenting with AI to using it inside real business workflows.</p>
            </div>

            <div className={styles.outcomeGrid}>
              <div className={styles.outcome}>
                <div className={styles.icon}>01</div>
                <h3>Shared workflows</h3>
                <p>A common way for your team to use AI for recurring work.</p>
              </div>
              <div className={styles.outcome}>
                <div className={styles.icon}>02</div>
                <h3>Prompt library</h3>
                <p>Reusable prompts built around your team&apos;s actual tasks and data.</p>
              </div>
              <div className={styles.outcome}>
                <div className={styles.icon}>03</div>
                <h3>One automation</h3>
                <p>A repetitive business task turned into a working automated process.</p>
              </div>
              <div className={styles.outcome}>
                <div className={styles.icon}>04</div>
                <h3>One prototype</h3>
                <p>A useful internal AI tool demonstrated live on the final session.</p>
              </div>
              <div className={styles.outcome}>
                <div className={styles.icon}>05</div>
                <h3>30-day support</h3>
                <p>A follow-up check-in to see what stuck and unblock what didn&apos;t.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SHOW THE WORK */}
        <section className={styles.work} id="work">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrow}>Show, don&apos;t tell</div>
              <h2>Here&apos;s what we actually build.</h2>
              <p>
                Real workflows, automations and prototypes teams walk away with — not slides about what AI could
                theoretically do.
              </p>
            </div>

            <div className={styles.workGrid}>
              {caseStudies.map((study) => (
                <article key={study.label} className={styles.case}>
                  <div className={styles.caseMedia}>
                    <Image
                      src={study.image}
                      alt={study.alt}
                      width={1200}
                      height={750}
                      className={styles.caseImage}
                    />
                  </div>
                  <div className={styles.caseBody}>
                    <div className={styles.mono}>{study.label}</div>
                    <h3>{study.title}</h3>
                    <p>{study.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW */}
        <section className={styles.how}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrow}>How it works</div>
              <h2>Four weeks. Your business. One working outcome.</h2>
              <p>Every session is built around your team&apos;s actual work, not sample data or toy examples.</p>
            </div>

            <div className={styles.howRow}>
              <div className={styles.howNum}>WEEK 01</div>
              <h3>See the real landscape</h3>
              <p>
                Claude, ChatGPT, Gemini, Copilot and other tools — mapped to your industry and the jobs your team
                actually does.
              </p>
            </div>
            <div className={styles.howRow}>
              <div className={styles.howNum}>WEEK 02</div>
              <h3>Build reusable AI workflows</h3>
              <p>
                Turn real work into repeatable prompts and workflows your team can use consistently instead of
                starting from scratch every time.
              </p>
            </div>
            <div className={styles.howRow}>
              <div className={styles.howNum}>WEEK 03</div>
              <h3>Automate one real task</h3>
              <p>Your team chooses something repetitive it does every week and builds a working automation around it.</p>
            </div>
            <div className={styles.howRow}>
              <div className={styles.howNum}>WEEK 04</div>
              <h3>Ship a prototype</h3>
              <p>A working internal tool tied to something you actually need, demonstrated live on the final call.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div className={styles.outcome}>
                <div className={styles.mono}>DAY 30</div>
                <h3 style={{ marginTop: 25 }}>Check-in</h3>
                <p>See what stuck, unblock what didn&apos;t, and help the team keep using what it built.</p>
              </div>
              <div className={styles.outcome}>
                <div className={styles.mono}>YOURS TO KEEP</div>
                <h3 style={{ marginTop: 25 }}>The knowledge stays</h3>
                <p>Recordings, workflows and your prompt library stay with your team for future use and onboarding.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className={styles.proof} id="proof">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrow}>Proof</div>
              <h2>Trusted by professionals who want practical AI, not another demo.</h2>
              <p>More than 250 professionals have trained with Ranbeer, with an average rating of 4.9/5.</p>
            </div>

            <div className={styles.logos} aria-label="Organizations represented in previous training">
              <span className={styles.logo}>Adobe</span>
              <span className={styles.logo}>Microsoft</span>
              <span className={styles.logo}>GAP Inc.</span>
              <span className={styles.logo}>Deloitte</span>
              <span className={styles.logo}>Nordstrom</span>
              <span className={styles.logo}>Upwork</span>
              <span className={styles.logo}>TeamViewer</span>
              <span className={styles.logo}>Coca-Cola</span>
              <span className={styles.logo}>WBD</span>
            </div>

            <div className={styles.testimonialGrid}>
              {testimonials.map((testimonial) => (
                <article key={testimonial.image} className={styles.testimonial}>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.alt}
                    width={1536}
                    height={1024}
                    className={styles.testimonialImage}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FIT */}
        <section className={styles.fit}>
          <div className={styles.container}>
            <div className={styles.fitGrid}>
              <div className={styles.fitCol}>
                <div className={styles.eyebrow}>Good fit</div>
                <h2>Built for teams that are ready to use AI.</h2>
                <ul className={styles.fitList}>
                  <li>5–20 people</li>
                  <li>No dedicated AI or IT team</li>
                  <li>People already experimenting with ChatGPT, Claude or similar tools</li>
                  <li>Repetitive knowledge-work processes that could be improved</li>
                  <li>An owner, founder or team lead who wants practical adoption</li>
                </ul>
              </div>

              <div className={`${styles.fitCol} ${styles.notFor}`}>
                <div className={styles.eyebrow}>Not the right fit</div>
                <h2>We&apos;re not trying to be your enterprise AI department.</h2>
                <ul className={styles.fitList}>
                  <li>Large-scale enterprise AI transformation</li>
                  <li>Generic awareness-only workshops</li>
                  <li>Long consulting engagements with no implementation target</li>
                  <li>Custom software development as the primary deliverable</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className={styles.why}>
          <div className={`${styles.container} ${styles.whyGrid}`}>
            <div>
              <div className={styles.eyebrow}>Why this works</div>
              <h2>Most AI training stops at learning. We stay until something works.</h2>
              <p className={styles.whyCopy}>
                Your team doesn&apos;t need another afternoon of impressive demos. It needs enough structure,
                practice and follow-through to change how work gets done.
              </p>
            </div>

            <div className={styles.whyPoints}>
              <div className={styles.whyPoint}>
                <h3>Real business data</h3>
                <p>We work from your team&apos;s actual workflows and problems, not generic examples.</p>
              </div>
              <div className={styles.whyPoint}>
                <h3>Hands-on implementation</h3>
                <p>The team builds during the program instead of passively watching.</p>
              </div>
              <div className={styles.whyPoint}>
                <h3>Shared knowledge</h3>
                <p>Workflows and prompts become reusable team assets rather than individual tricks.</p>
              </div>
              <div className={styles.whyPoint}>
                <h3>Follow-through</h3>
                <p>The 30-day check-in gives the team a reason to keep using what it built.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className={styles.pricing} id="pricing">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrow}>Investment</div>
              <h2>One team. One program. No per-seat pricing.</h2>
              <p>
                The exact scope depends on your format, team and implementation depth. We agree on the number
                before anything is committed.
              </p>
            </div>

            <div className={styles.priceBox}>
              <div className={styles.priceMain}>
                <div className={styles.mono}>PRICING</div>
                <div className={styles.price}>$3,000–$8,000</div>
                <div className={styles.priceNote}>FLAT PER TEAM · UP TO 20 PEOPLE</div>
              </div>
              <div className={styles.priceDetail}>
                <p>
                  Includes the four-week live program, hands-on implementation, your team&apos;s reusable AI assets,
                  and the 30-day check-in.
                </p>
                <ul className={styles.priceList}>
                  <li>4 live sessions</li>
                  <li>Up to 20 people</li>
                  <li>Real business workflows</li>
                  <li>Shared prompt / workflow library</li>
                  <li>One automation target</li>
                  <li>One working prototype target</li>
                  <li>Recordings</li>
                  <li>30-day check-in</li>
                </ul>
                <OpenEnquiryButton className={`${styles.btn} ${styles.btnPrimary}`} style={{ marginTop: 25 }}>
                  Get your exact number →
                </OpenEnquiryButton>
                <div className={styles.pricingNote}>No per-seat pricing. No enterprise contract.</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faq} id="faq">
          <div className={`${styles.container} ${styles.faqGrid}`}>
            <div>
              <div className={styles.eyebrow}>Questions worth asking</div>
              <h2>Before you book.</h2>
              <p className={styles.muted}>A few practical questions we hear from small teams.</p>
            </div>

            <div>
              <details open>
                <summary>We&apos;re a small team — is this overkill?</summary>
                <p>
                  No. It&apos;s designed specifically for teams without a dedicated AI or L&amp;D department. The
                  goal is practical implementation, not a large transformation project.
                </p>
              </details>
              <details>
                <summary>Do we need everyone to already use AI?</summary>
                <p>
                  No. Some familiarity helps, but the program is designed to create a shared baseline and shared
                  workflows across the team.
                </p>
              </details>
              <details>
                <summary>Is this a pitch for one AI tool?</summary>
                <p>
                  No. The program can cover Claude, ChatGPT, Gemini, Copilot and other tools. The focus is choosing
                  what works for the job.
                </p>
              </details>
              <details>
                <summary>Virtual, on-site, or hybrid?</summary>
                <p>Virtual preferred. Open to travel, based on initial call.</p>
              </details>
              <details>
                <summary>What if it doesn&apos;t work for us?</summary>
                <p>
                  The intro assessment is designed to establish fit before you commit. We&apos;ll tell you honestly
                  if the program isn&apos;t appropriate for your team.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className={styles.finalCta} id="book">
          <div className={`${styles.container} ${styles.ctaGrid}`}>
            <div>
              <div className={styles.eyebrow}>Start with one conversation</div>
              <h2>Let&apos;s find one thing your team can improve with AI.</h2>
              <p>
                Tell us your business, team size and industry. In a 20-minute conversation, we&apos;ll look at how
                your team currently uses AI and tell you whether this is a fit.
              </p>
            </div>
            <div className={styles.ctaCard}>
              <OpenEnquiryButton className={`${styles.btn} ${styles.btnPrimary}`}>
                Book a free 20-min AI team assessment →
              </OpenEnquiryButton>
              <div className={styles.ctaMicro}>20 minutes · no pitch · honest answer on fit</div>
            </div>
          </div>
        </section>
      </main>
      </div>
    </EnquiryModalProvider>
  );
}

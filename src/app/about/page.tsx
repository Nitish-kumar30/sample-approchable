import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import MentorSection from '@/components/MentorSection';
import { buildAboutPageSchema } from '@/lib/seo/about-schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const ABOUT_DESCRIPTION =
  'The story behind Approachable — why we started teaching AI, what we stand for, and where we\'re headed next.';

const AIMS = [
  {
    title: 'Right now',
    desc: 'Keep every cohort small enough that no question goes unanswered, even as demand grows.',
  },
  {
    title: 'Next',
    desc: 'Bring the same hands-on model to more teams, not just individuals.',
  },
  {
    title: 'The long game',
    desc: '1 million professionals who are confident builders with AI, not just casual users.',
  },
];

const PILLARS = [
  {
    icon: '🎓',
    iconBg: '#C2410C',
    title: 'The Cohort',
    description:
      'A small circle of people learning together, out loud, in real time — so nobody has to figure this out alone.',
    href: '/',
    cta: 'See how it runs →',
  },
  {
    icon: '📚',
    iconBg: '#0F766E',
    title: 'The Courses',
    description:
      'For the ones who\'d rather start tonight than wait for a cohort date. Same substance, your own pace.',
    href: '/courses',
    cta: 'Start learning →',
  },
  {
    icon: '🏢',
    iconBg: '#6D28D9',
    title: 'Team Training',
    description:
      'For teams tired of AI staying a side conversation. We help it become part of how the work actually gets done.',
    href: '/team-ai-training',
    cta: 'Bring it to your team →',
  },
];

const PRINCIPLES = [
  {
    icon: '🧭',
    title: 'Curiosity over credentials',
    description: 'You don\'t need a technical background to be in the room. You just need to be curious enough to ask.',
  },
  {
    icon: '🧑‍🤝‍🧑',
    title: 'Small rooms, real conversation',
    description: 'We cap every group on purpose. Fewer people, more air time, nowhere to hide and no need to.',
  },
  {
    icon: '🔧',
    title: 'Judged by what you build',
    description: 'Notes and slides fade. A working prototype, an automation, an agent — that\'s the receipt that counts.',
  },
  {
    icon: '🪞',
    title: 'Straight answers, even unflattering ones',
    description: 'If a program isn\'t the right fit for you, we\'ll say so before you pay for it, not after.',
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: 'About Us',
  description: ABOUT_DESCRIPTION,
  path: '/about',
  ogImageAlt: 'About Approachable — the story behind making AI approachable for everyone',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildAboutPageSchema()} />
      <Header navVariant="contact" />
      <main>
        {/* Hero */}
        <section className="courses-page">
          <div className="container-max">
            <div className="courses-hero">
              <div className="section-label" style={{ fontSize: 14, letterSpacing: '0.14em' }}>Our story</div>
              <h1 className="section-title">AI shouldn&apos;t need a translator</h1>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                Somewhere between the hype and the fear, most people just quietly gave up trying to understand AI.
                Approachable exists to close that gap — one small, honest group at a time.
              </p>
            </div>

            {/* Our Story narrative */}
            <div
              className="prose-content"
              style={{
                maxWidth: 720,
                margin: '0 auto',
                background: 'var(--bg-warm)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '32px 36px',
              }}
            >
              <p>
                It started with a pattern too obvious to ignore: talented, capable professionals — the same people
                running teams, closing deals, shipping products — froze the moment AI came up. Not because they
                weren&apos;t smart enough. Because everything written about AI seemed to assume they already knew
                the answer.
              </p>
              <p>
                So instead of another guide or another webinar, we built a room. A small one, where questions
                that felt too basic to ask out loud finally had somewhere to land — and where the only real
                measure of progress was whether you could go build something afterward.
              </p>
              <p>
                That room is still the whole idea. Bigger now, with more formats and more paths in, but the rule
                hasn&apos;t changed: understand it well enough to use it, then go use it.
              </p>
            </div>

            {/* Vision callout */}
            <div
              style={{
                maxWidth: 720,
                margin: '40px auto 0',
                padding: '28px 32px',
                borderRadius: 16,
                background: 'var(--accent-light)',
                border: '1px solid var(--border-warm)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Our bet: a future where knowing how to work with AI is as unremarkable as knowing how to use email
                — and everyone got there without feeling stupid on the way.
              </p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Our Aim */}
        <section style={{ background: 'var(--bg-warm)' }}>
          <div className="container-max">
            <div className="section-label" style={{ textAlign: 'center', fontSize: 14, letterSpacing: '0.14em' }}>Our aim</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>What we&apos;re working toward</h2>
            <div className="signup-steps">
              {AIMS.map((aim, i) => (
                <div key={aim.title} className="signup-step">
                  <div className="step-num">{i + 1}</div>
                  <div>
                    <div className="step-title">{aim.title}</div>
                    <div className="step-desc">{aim.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Three pillars */}
        <section style={{ background: 'var(--bg-warm)' }}>
          <div className="container-max">
            <div className="section-label" style={{ fontSize: 14, letterSpacing: '0.14em' }}>How we teach it</div>
            <h2 className="section-title">Three doors, one destination</h2>
            <p className="section-sub" style={{ marginBottom: 32 }}>
              However you find us, the goal is the same: you leave able to actually use what you learned.
            </p>
            <div className="outcomes-grid">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="outcome-card">
                  <div className="outcome-icon" style={{ background: pillar.iconBg }}>
                    {pillar.icon}
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                  <Link
                    href={pillar.href}
                    style={{
                      marginTop: 16,
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--accent)',
                      textDecoration: 'none',
                    }}
                  >
                    {pillar.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Principles */}
        <section>
          <div className="container-max" style={{ maxWidth: 780 }}>
            <div className="section-label" style={{ fontSize: 14, letterSpacing: '0.14em' }}>What we won&apos;t compromise on</div>
            <h2 className="section-title">The rules we teach by</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px 40px',
                marginTop: 32,
              }}
            >
              {PRINCIPLES.map((principle) => (
                <div key={principle.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 22, lineHeight: 1, marginTop: 2 }}>{principle.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{principle.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Founder */}
        <MentorSection
          label="The person behind it"
          title="Ranbeer, in his own words"
          bio={
            <>
              Eighteen years building software and companies, the last three spent almost entirely in front of a
              whiteboard teaching AI to whoever was willing to show up — 250+ professionals so far, from teams at
              Gap, Deloitte, Microsoft, and Upwork to solo founders just starting out.
            </>
          }
          quote={
            <>
              &ldquo;I&apos;m not trying to build the biggest AI school. I&apos;m trying to build the one where
              nobody leaves feeling more confused than when they walked in. If that scales to a million people,
              even better.&rdquo;
            </>
          }
          showStats={false}
          footnote="Trusted by professionals from Adobe, Microsoft, Gap, Deloitte, and 50+ other companies."
        />
      </main>
    </>
  );
}

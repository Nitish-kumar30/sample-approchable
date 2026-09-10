import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import MentorSection from '@/components/MentorSection';
import OneOnOneCurriculum from '@/components/one-on-one/OneOnOneCurriculum';
import { CONTACT_HREF, ONE_ON_ONE_PACKAGES } from '@/data/one-on-one';
import { COHORT } from '@/lib/cohort-config';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildOneOnOneSchema } from '@/lib/seo/one-on-one-schema';
import styles from './one-on-one-ai-training.module.css';

const DESCRIPTION =
  'Private 1-1 AI training with Ranbeer. Custom from $1,200 with two capstones, or Standard at $675 with the same curriculum as the live AI cohorts — two 90-minute sessions over two weeks.';

export const metadata: Metadata = buildPageMetadata({
  title: '1-1 AI Training',
  description: DESCRIPTION,
  path: '/one-on-one-ai-training',
  ogImageAlt: 'Approachable 1-1 AI training — Custom and Standard packages',
});

export default function OneOnOneAiTrainingPage() {
  return (
    <>
      <JsonLd data={buildOneOnOneSchema()} />
      <Header navVariant="course" />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.eyebrow}>1-1 AI training</div>
            <h1>
              Private sessions with your mentor, <em>built around your work.</em>
            </h1>
            <p>
              Two 90-minute live sessions over two weeks, with demos, pre-reads, and quizzes in
              between. Pick the cohort curriculum as-is, or have it rewritten around your use case.
            </p>
            <div className={styles.buttons}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#packages">
                See the packages
              </a>
              <a className={`${styles.btn} ${styles.btnSecondary}`} href="#curriculum">
                Browse the curriculum
              </a>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <b>2</b>
                <span>weeks</span>
              </div>
              <div className={styles.heroStat}>
                <b>90 min</b>
                <span>per session</span>
              </div>
              <div className={styles.heroStat}>
                <b>Live demos</b>
                <span>in every session</span>
              </div>
              <div className={styles.heroStat}>
                <b>1-1</b>
                <span>with Ranbeer</span>
              </div>
            </div>
          </div>
        </section>

        <section id="packages">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>Packages</div>
              <h2>Custom if your work is specific. Standard if you want the cohort map.</h2>
              <p>Same two-week shape. Different amount of tailoring — and capstones only on Custom.</p>
            </div>

            <div className={styles.packageGrid}>
              {ONE_ON_ONE_PACKAGES.map((pkg) => (
                <article
                  key={pkg.id}
                  className={`${styles.packageCard} ${pkg.highlighted ? styles.packageHighlighted : ''}`}
                >
                  <span className={styles.tag}>{pkg.tag}</span>
                  <p className={styles.packagePriceNote}>{pkg.priceNote}</p>
                  <div className={styles.packagePrice}>{pkg.price}</div>
                  <h3>{pkg.name}</h3>
                  <p>{pkg.blurb}</p>
                  <ul className={styles.packageList}>
                    {pkg.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <Link
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.packageCta}`}
                    href={CONTACT_HREF}
                  >
                    {pkg.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="curriculum">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>General curriculum</div>
              <h2>The cohort curriculum, in two private weeks.</h2>
              <p>
                Click a week, then open a card. This is the Standard map — Custom starts here and is
                rewritten around your objectives.
              </p>
            </div>
            <OneOnOneCurriculum />
          </div>
        </section>

        <div className={styles.mentorWrap}>
          <MentorSection
            label="Your mentor"
            title="One person, on the other side of the call"
            footnote={`${COHORT.studentsTotal} professionals have already gone through Approachable programs.`}
          />
        </div>

        <section className={styles.final}>
          <div className={styles.container}>
            <div className={styles.sectionLabel}>Ready to book a pair of sessions?</div>
            <h2>Tell us which package, and what you want to build.</h2>
            <p>
              There is no public calendar for 1-1 — dates are set once we know Custom or Standard,
              and what you need the two weeks to cover.
            </p>
            <div className={styles.buttons}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href={CONTACT_HREF}>
                Enquire about 1-1 training →
              </Link>
              <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/">
                See the Live AI Cohort
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

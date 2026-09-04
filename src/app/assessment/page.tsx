import type { Metadata } from 'next';
import Link from 'next/link';
import AssessmentCard from '@/components/assessment/AssessmentCard';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import { getAllAssessments } from '@/lib/assessments';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/site';
import styles from './assessment.module.css';

const DESCRIPTION =
  'Three short free AI assessments on prompting, agents, and vibe coding. See where the gaps are and get pointed to the course that closes them.';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Assessments',
  description: DESCRIPTION,
  path: '/assessment',
  ogImageAlt: 'Free AI skill assessments from Approachable',
});

export default function AssessmentPage() {
  const assessments = getAllAssessments();

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Assessments',
    description: DESCRIPTION,
    itemListElement: assessments.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${a.title} Assessment`,
      url: absoluteUrl(`/assessment/quiz/${a.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={listSchema} />
      <Header navVariant="course" />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.eyebrow}>Free AI assessments</div>
            <h1>
              Find out what you <em>actually know.</em>
            </h1>
            <p>
              Three short checks on the skills that matter most at work right now. Answer honestly,
              see where the gaps are, and get pointed to the course that closes them.
            </p>
            <div className={styles.buttons}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#assessments">
                Choose an assessment ↓
              </a>
              <Link
                className={`${styles.btn} ${styles.btnSecondary}`}
                href="/assessment/quiz/prompting"
              >
                Start with Prompting
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <b>3</b>
                <span>assessments</span>
              </div>
              <div className={styles.heroStat}>
                <b>5</b>
                <span>questions each</span>
              </div>
              <div className={styles.heroStat}>
                <b>~5 min</b>
                <span>to finish one</span>
              </div>
              <div className={styles.heroStat}>
                <b>Free</b>
                <span>no sign-up</span>
              </div>
            </div>
          </div>
        </section>

        <section id="assessments">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>Pick a skill</div>
              <h2>Which one do you want to test?</h2>
              <p>Each assessment stands alone. Start anywhere, take them in any order.</p>
            </div>

            <div className={styles.quizGrid}>
              {assessments.map((a) => (
                <AssessmentCard
                  key={a.slug}
                  href={`/assessment/quiz/${a.slug}`}
                  tag={a.topic}
                  title={a.title}
                  description={a.description}
                  questionCount={a.questions.length}
                  minutes={a.minutes}
                  level={a.level}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pathSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>How scoring works</div>
              <h2>A starting point, not a grade.</h2>
              <p>
                However you land, you get a specific next step rather than a number to feel bad
                about.
              </p>
            </div>

            <div className={styles.bands}>
              <div className={styles.band}>
                <div className={styles.bandScore}>0–49%</div>
                <div className={styles.bandBar}>
                  <i style={{ width: '33%' }} />
                </div>
                <h3>Start with the fundamentals</h3>
                <p>
                  You&apos;ve seen the tools but the mental model isn&apos;t there yet. Begin with a
                  free course, then join the live cohort for structure.
                </p>
              </div>
              <div className={styles.band}>
                <div className={styles.bandScore}>50–79%</div>
                <div className={styles.bandBar}>
                  <i style={{ width: '66%' }} />
                </div>
                <h3>Turn knowledge into practice</h3>
                <p>
                  The basics are solid. What&apos;s missing is reps on real work — the self-paced
                  course for that skill is built exactly for this.
                </p>
              </div>
              <div className={styles.band}>
                <div className={styles.bandScore}>80–100%</div>
                <div className={styles.bandBar}>
                  <i style={{ width: '100%' }} />
                </div>
                <h3>Go deeper, or go build</h3>
                <p>
                  You know this well. Push into harder material, or bring a real project to the
                  mentor-led cohort and ship it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.journey}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>What to expect</div>
              <h2>By the end, you&apos;ll know where you stand.</h2>
              <p>No sign-up, no timer, nothing saved. Just an honest read on where you are.</p>
            </div>

            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.num}>01 — ANSWER</span>
                <h3>One at a time</h3>
                <p>
                  Multiple choice, one correct answer each. Pick with your mouse or the number keys.
                </p>
              </div>
              <div className={styles.step}>
                <span className={styles.num}>02 — LEARN</span>
                <h3>See why</h3>
                <p>
                  After you finish, open any answer in the review to see what was correct and why.
                </p>
              </div>
              <div className={styles.step}>
                <span className={styles.num}>03 — DECIDE</span>
                <h3>Get your next step</h3>
                <p>
                  Your score maps to a specific course or the live cohort — no guessing what to do
                  next.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <div className={styles.container}>
            <div className={styles.sectionLabel}>Not sure where to begin?</div>
            <h2>Start with Prompting.</h2>
            <p>
              It&apos;s the shortest of the three, and it&apos;s the skill everything else at
              Approachable builds on. Five minutes, and you&apos;ll know what to learn next.
            </p>
            <div className={styles.buttons}>
              <Link
                className={`${styles.btn} ${styles.btnPrimary}`}
                href="/assessment/quiz/prompting"
              >
                Take the Prompting check →
              </Link>
              <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/courses">
                Browse courses
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

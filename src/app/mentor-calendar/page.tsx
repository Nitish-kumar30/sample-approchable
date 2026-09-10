import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import MentorSection from '@/components/MentorSection';
import MentorCalendar from '@/components/mentor-calendar/MentorCalendar';
import { COHORT } from '@/lib/cohort-config';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildMentorCalendarSchema } from '@/lib/seo/mentor-calendar-schema';
import styles from './mentor-calendar.module.css';

const DESCRIPTION =
  'See how a mentor-led AI cohort week actually runs: live sessions, office hours, and assignments, laid out week by week. Sample dates until the next cohort calendar is confirmed.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Mentor Calendar',
  description: DESCRIPTION,
  path: '/mentor-calendar',
  ogImageAlt: 'Approachable mentor calendar — a sample week-by-week cohort schedule',
});

export default function MentorCalendarPage() {
  return (
    <>
      <JsonLd data={buildMentorCalendarSchema()} />
      <Header navVariant="course" />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.eyebrow}>Mentor calendar</div>
            <h1>
              Six weeks with your mentor, <em>mapped week by week.</em>
            </h1>
            <p>
              Live sessions on Thursdays, office hours when you get stuck, and one assignment that
              turns the session into something you can use at work. This is a sample calendar —
              click a week to see how it unfolds.
            </p>
            <div className={styles.buttons}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#calendar">
                Browse the weeks
              </a>
              <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/">
                Live AI Cohort
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <b>6</b>
                <span>weeks</span>
              </div>
              <div className={styles.heroStat}>
                <b>Live + OH</b>
                <span>with your mentor</span>
              </div>
              <div className={styles.heroStat}>
                <b>90 min</b>
                <span>live sessions</span>
              </div>
              <div className={styles.heroStat}>
                <b>Sample</b>
                <span>placeholder dates</span>
              </div>
            </div>
          </div>
        </section>

        <section id="calendar" className={styles.calendarSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>Week by week</div>
              <h2>Pick a week. See what happens.</h2>
              <p>
                Tabs move you through the cohort. Days with a dot have a session — click one to
                filter, then open a card for the details.
              </p>
            </div>
            <MentorCalendar />
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>How weeks run</div>
              <h2>One live session. Time to practise. A way to get unstuck.</h2>
              <p>The same rhythm most weeks, so you always know what to expect.</p>
            </div>

            <div className={styles.rhythmGrid}>
              <article className={styles.rhythmCard}>
                <span className={styles.tag}>Live session</span>
                <h3>Show up live</h3>
                <p>
                  Thursday, 7:30 PM IST / 10 AM US Eastern. A 90-minute study group — not a lecture —
                  on the week&apos;s Claude skill.
                </p>
              </article>
              <article className={styles.rhythmCard}>
                <span className={styles.tag}>Office hours</span>
                <h3>Get unstuck</h3>
                <p>
                  Optional drop-in time with Ranbeer. Bring the thing that broke, the prompt that
                  went sideways, or the capstone that needs a second pair of eyes.
                </p>
              </article>
              <article className={styles.rhythmCard}>
                <span className={styles.tag}>Assignment</span>
                <h3>Use it at work</h3>
                <p>
                  One concrete task due Sunday. A prompt library, an agent, a prototype — something
                  you can point to on Monday.
                </p>
              </article>
            </div>
          </div>
        </section>

        <div className={styles.mentorWrap}>
          <MentorSection
            label="Your mentor"
            title="The person on the other side of the calendar"
            footnote={`${COHORT.studentsTotal} professionals have already gone through Approachable programs.`}
          />
        </div>

        <section className={styles.final}>
          <div className={styles.container}>
            <div className={styles.sectionLabel}>Ready for a real cohort date?</div>
            <h2>Join the next live group.</h2>
            <p>
              This page is a sample so you can see the shape of six weeks. Seats, timing, and the
              next start date live on the cohort page.
            </p>
            <div className={styles.buttons}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/">
                See the Live AI Cohort →
              </Link>
              <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/contact">
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

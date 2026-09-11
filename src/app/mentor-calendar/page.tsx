import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import MentorSection from '@/components/MentorSection';
import MentorCalendar from '@/components/mentor-calendar/MentorCalendar';
import {
  OFFERING_LABELS,
  STATUS_LABELS,
  getHeroStats,
  getOfferingSnapshots,
} from '@/data/mentor-calendar';
import { COHORT } from '@/lib/cohort-config';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildMentorCalendarSchema } from '@/lib/seo/mentor-calendar-schema';
import styles from './mentor-calendar.module.css';

const DESCRIPTION =
  'See when Ranbeer can take on team training, 1-1 training, and live AI cohorts. Request an open window — dates are confirmed after the enquiry.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Mentor Calendar',
  description: DESCRIPTION,
  path: '/mentor-calendar',
  ogImageAlt: 'Approachable mentor calendar — availability for team training, 1-1, and AI cohorts',
});

function snapshotStatusClass(status: string): string {
  if (status === 'open') return styles.statusOpen;
  if (status === 'limited') return styles.statusLimited;
  if (status === 'waitlist') return styles.statusWaitlist;
  if (status === 'full') return styles.statusFull;
  return styles.statusClosed;
}

export default function MentorCalendarPage() {
  const stats = getHeroStats();
  const snapshots = getOfferingSnapshots();

  return (
    <>
      <JsonLd data={buildMentorCalendarSchema()} />
      <Header navVariant="course" />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.eyebrow}>Mentor calendar</div>
            <h1>
              When your mentor can take on <em>team, 1-1, and cohort work.</em>
            </h1>
            <p>
              This is availability, not a booking grid. Pick an open window for team training, 1-1
              training, or the next live AI cohort, then request it through the usual enquiry path.
            </p>
            <div className={styles.buttons}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#calendar">
                See open windows
              </a>
              <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/contact">
                Contact us
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <b>{stats.nextOpenLabel}</b>
                <span>next open window</span>
              </div>
              <div className={styles.heroStat}>
                <b>{stats.openOfferingCount}</b>
                <span>offerings taking work</span>
              </div>
              <div className={styles.heroStat}>
                <b>{stats.timezone}</b>
                <span>session timezones</span>
              </div>
              <div className={styles.heroStat}>
                <b>{stats.updatedAtLabel}</b>
                <span>calendar updated</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>What is open</div>
              <h2>Three ways to work with your mentor.</h2>
              <p>
                Status and next dates come from the same availability file that drives the calendar
                below — they update together.
              </p>
            </div>

            <div className={styles.rhythmGrid}>
              {snapshots.map(({ offering, status, nextWindow }) => (
                <article key={offering.id} className={styles.rhythmCard}>
                  <span className={`${styles.statusTag} ${snapshotStatusClass(status)}`}>
                    {STATUS_LABELS[status]}
                  </span>
                  <h3>{OFFERING_LABELS[offering.id]}</h3>
                  <p>
                    {nextWindow
                      ? nextWindow.title
                      : offering.emptyMessage}
                  </p>
                  <Link className={`${styles.btn} ${styles.btnSecondary} ${styles.snapshotCta}`} href={offering.href}>
                    {offering.ctaLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="calendar" className={styles.calendarSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>Open windows</div>
              <h2>Filter by offering. Pick a month.</h2>
              <p>
                Dots mark days inside an open window. Click a day to filter, then request the window
                that fits — no public booking, just a request.
              </p>
            </div>
            <MentorCalendar />
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>How to request</div>
              <h2>Ask for the window. Dates get confirmed after.</h2>
              <p>Each offering already has a path. The calendar just shows when there is room.</p>
            </div>

            <div className={styles.rhythmGrid}>
              {snapshots.map(({ offering }) => (
                <article key={offering.id} className={styles.rhythmCard}>
                  <span className={styles.tag}>{offering.shortLabel}</span>
                  <h3>{offering.label}</h3>
                  <p>
                    {offering.id === 'team-training' &&
                      'Company teams enquire on the team training page. Timing is confirmed after headcount and timezone.'}
                    {offering.id === 'one-on-one' &&
                      '1-1 requests go to Contact with the topic pre-filled. Custom vs Standard is chosen there, then dates lock in.'}
                    {offering.id === 'cohort' &&
                      'Cohort seats and start dates live on the Live AI Cohort page. Use that page to register or join the waitlist.'}
                  </p>
                  <Link className={`${styles.btn} ${styles.btnSecondary} ${styles.snapshotCta}`} href={offering.href}>
                    {offering.ctaLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.mentorWrap}>
          <MentorSection
            label="Your mentor"
            title="The person whose calendar this is"
            footnote={`${COHORT.studentsTotal} professionals have already gone through Approachable programs.`}
          />
        </div>

        <section className={styles.final}>
          <div className={styles.container}>
            <div className={styles.sectionLabel}>Ready to request a window?</div>
            <h2>Tell us which offering, and when you need it.</h2>
            <p>
              Open windows are current availability to take on team training, 1-1, and the next
              cohort. Request one and we confirm dates after the enquiry.
            </p>
            <div className={styles.buttons}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#calendar">
                See open windows →
              </a>
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

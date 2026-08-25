import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import CoursesScrollRow from '@/components/CoursesScrollRow';
import ExploreMoreCard from '@/components/ExploreMoreCard';
import { getFreeCourses, getPaidCourses } from '@/lib/course-content';

const COURSES_OG_IMAGE = '/img/og-image.png';
const COURSES_DESCRIPTION =
  'Free Claude 101 courses and recorded AI training on Mastery, No-Code Agents, and Vibe Coding. Hands-on learning for working professionals.';
const COURSES_OG_DESCRIPTION =
  'Free Claude 101 and recorded AI courses for professionals. Start free, then go deeper with hands-on projects.';

export const metadata: Metadata = {
  title: 'Free & Recorded AI Courses',
  description: COURSES_DESCRIPTION,
  alternates: { canonical: '/courses' },
  openGraph: {
    type: 'website',
    title: 'AI Courses — Approachable',
    description: COURSES_OG_DESCRIPTION,
    url: '/courses',
    siteName: 'Approachable',
    images: [
      {
        url: COURSES_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Approachable AI courses for working professionals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Courses — Approachable',
    description: COURSES_OG_DESCRIPTION,
    images: [COURSES_OG_IMAGE],
  },
};

export default async function CoursesPage() {
  const [freeCourses, paidCourses] = await Promise.all([getFreeCourses(), getPaidCourses()]);

  return (
    <>
      <Header coursePage />
      <main>
        <section className="courses-page" style={{ paddingBottom: 0 }}>
          <div className="container-max">
            <div className="courses-hero">
              <div className="section-title" style={{ textAlign: 'center' }}>
                Pick your path to becoming AI Capable
              </div>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                Start with a free course, then explore recorded, self-paced courses taught by Ranbeer Makin. Lifetime access, hands-on projects, and a certificate when you finish.
              </p>
            </div>

            {freeCourses.length > 0 && (
              <div className="courses-section">
                <div className="courses-section-header">
                  <div className="section-label">No cost</div>
                  <h2 className="courses-section-title">Start for Free</h2>
                  <p className="courses-section-sub">No payment required — get started with AI today.</p>
                </div>
                <CoursesScrollRow>
                  {freeCourses.map((course) => (
                    <CourseCard key={course.slug} course={course} />
                  ))}
                  <ExploreMoreCard variant="free" />
                </CoursesScrollRow>
              </div>
            )}

            {freeCourses.length > 0 && <hr className="divider courses-section-divider" />}

            <div className="courses-section">
              <div className="courses-section-header">
                <div className="section-label">Self-paced</div>
                <h2 className="courses-section-title">Recorded Courses</h2>
                <p className="courses-section-sub">Go deeper with self-paced courses and lifetime access.</p>
              </div>
              <CoursesScrollRow>
                {paidCourses.length > 0 ? (
                  paidCourses.map((course) => (
                    <CourseCard key={course.slug} course={course} />
                  ))
                ) : (
                  <p className="courses-empty">Recorded courses are unavailable right now. Please refresh the page.</p>
                )}
                <ExploreMoreCard variant="paid" />
              </CoursesScrollRow>
            </div>
          </div>
        </section>

        <hr className="divider" style={{ marginTop: 64 }} />

        <section id="courses-cta" className="signup-section">
          <div className="container-max" style={{ maxWidth: 680, textAlign: 'center' }}>
            <div className="section-title">Not sure which course is right for you?</div>
            <p className="section-sub" style={{ margin: '0 auto 24px' }}>
              If you want live, mentor-led sessions instead of recorded courses, check out our flagship cohort — small groups, real projects, direct access to your mentor.
            </p>
            <Link href="/" className="btn-primary">See the AI Cohort →</Link>
          </div>
        </section>
      </main>
    </>
  );
}

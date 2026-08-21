import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import { getFreeCourses, getPaidCourses } from '@/lib/course-content';

export const metadata: Metadata = {
  title: 'Courses — Approachable | Free & Recorded AI Courses for Working Professionals',
  description:
    'Start free with our Claude 101 courses, then explore recorded courses on AI Mastery, No-Code AI Agents, and Vibe Coding — practical, hands-on learning for working professionals.',
  openGraph: {
    title: 'Courses — Approachable',
    description: 'Free and recorded AI courses for working professionals — start free, then go deeper with AI Mastery, No-Code AI Agents, and Vibe Coding.',
    url: 'https://approachable.dev/courses',
  },
};

export default async function CoursesPage() {
  const [freeCourses, paidCourses] = await Promise.all([getFreeCourses(), getPaidCourses()]);

  return (
    <>
      <Header />
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
                <div className="courses-grid">
                  {freeCourses.map((course) => (
                    <CourseCard key={course.slug} course={course} />
                  ))}
                </div>
              </div>
            )}

            {freeCourses.length > 0 && <hr className="divider courses-section-divider" />}

            <div className="courses-section">
              <div className="courses-section-header">
                <div className="section-label">Self-paced</div>
                <h2 className="courses-section-title">Recorded Courses</h2>
                <p className="courses-section-sub">Go deeper with self-paced courses and lifetime access.</p>
              </div>
              <div className="courses-grid">
                {paidCourses.length > 0 ? (
                  paidCourses.map((course) => (
                    <CourseCard key={course.slug} course={course} />
                  ))
                ) : (
                  <p className="courses-empty">Recorded courses are unavailable right now. Please refresh the page.</p>
                )}
              </div>
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
            <Link href="/#pricing" className="btn-primary">See the AI Cohort →</Link>
          </div>
        </section>
      </main>
    </>
  );
}

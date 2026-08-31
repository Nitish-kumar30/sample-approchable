import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import CoursesScrollRow from '@/components/CoursesScrollRow';
import ExploreMoreCard from '@/components/ExploreMoreCard';
import JsonLd from '@/components/JsonLd';
import { getFreeCourses, getPaidCourses } from '@/lib/course-content';
import { buildCoursesListSchema } from '@/lib/seo/course-schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const COURSES_DESCRIPTION =
  'Free Claude 101 courses and recorded AI training on Mastery, No-Code Agents, and Vibe Coding. Hands-on learning for working professionals.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Free & Recorded AI Courses',
  description: COURSES_DESCRIPTION,
  path: '/courses',
  ogImageAlt: 'Approachable AI courses for working professionals',
});

export default async function CoursesPage() {
  const [freeCourses, paidCourses] = await Promise.all([getFreeCourses(), getPaidCourses()]);
  const allCourses = [...freeCourses, ...paidCourses];
  const coursesListSchema = buildCoursesListSchema(
    allCourses.map((course) => ({ slug: course.slug, title: course.title })),
  );

  return (
    <>
      <JsonLd data={coursesListSchema} />
      <Header navVariant="course" />
      <main>
        <section className="courses-page" style={{ paddingBottom: 0 }}>
          <div className="container-max">
            <div className="courses-hero">
              <h1 className="section-title" style={{ textAlign: 'center' }}>
                Pick your path to becoming AI Capable
              </h1>
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

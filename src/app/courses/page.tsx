import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import SupportFooter from '@/components/SupportFooter';
import FloatingCta from '@/components/FloatingCta';
import CourseCard from '@/components/CourseCard';
import { getAllCourses } from '@/lib/course-content';

export const metadata: Metadata = {
  title: 'Courses — Approachable | Recorded AI Courses for Working Professionals',
  description:
    'Browse our recorded courses on AI Mastery, No-Code AI Agents, and Vibe Coding — practical, hands-on courses to help working professionals go from AI Curious to AI Capable.',
  openGraph: {
    title: 'Courses — Approachable',
    description: 'Recorded AI courses for working professionals — AI Mastery, No-Code AI Agents, and Vibe Coding.',
    url: 'https://approachable.dev/courses',
  },
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <>
      <Header />
      <main>
        <section style={{ paddingBottom: 0 }}>
          <div className="container-max">
            <div className="courses-hero">
              <div className="section-title" style={{ textAlign: 'center' }}>
                Pick your path to becoming AI Capable
              </div>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                Recorded, self-paced courses taught by Ranbeer Makin. Lifetime access, hands-on projects, and a certificate when you finish.
              </p>
            </div>

            <div className="courses-grid">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
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

      <SupportFooter />
      <FloatingCta />
    </>
  );
}

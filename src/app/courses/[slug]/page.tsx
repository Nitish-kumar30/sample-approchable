import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCourseContent } from '@/lib/course-content';
import CurriculumSection from '@/components/course/CurriculumSection';
import CourseInfoPanel from '@/components/course/CourseInfoPanel';
import CourseStickyBar from '@/components/course/CourseStickyBar';
import FAQSection from '@/components/course/FAQSection';
import styles from './course.module.css';

const COURSE_SLUGS = [
  'ai-mastery-for-working-professionals',
];

export function generateStaticParams() {
  return COURSE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseContent(slug);
  if (!course) return {};
  return {
    title: `${course.title} — Approachable`,
    description: course.ogDescription,
    openGraph: {
      type: 'website',
      title: `${course.title} — Approachable`,
      description: course.ogDescription,
      url: `https://www.approachable.dev/courses/${course.slug}`,
      siteName: 'Approachable',
      images: [{ url: course.ogImage, alt: 'Approachable — your AI journey starts here' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} — Approachable`,
      description: course.ogDescription,
      images: [course.ogImage],
    },
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseContent(slug);
  if (!course) notFound();

  return (
    <div className={styles.page}>
      {course.discountLabel && (
        <div className={styles.discountBanner}>{course.discountLabel}</div>
      )}

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.courseLayout}>
            {/* Hero */}
            <div id="course-hero" className={styles.hero}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={course.heroImage} alt={course.title} />
            </div>

            {/* Header row */}
            <div className={styles.headerRow}>
              <div>
                <h1 className={styles.title}>{course.title}</h1>
                <p className={styles.mentor}>By {course.instructor.name}</p>
                <div className={styles.meta}><span>{course.metadata.type}</span></div>
              </div>
            </div>

            {/* Sidebar */}
            <CourseInfoPanel course={course} />

            {/* Body */}
            <div className={styles.courseBody}>
              <hr className={styles.separator} />

              {/* About */}
              <section className="card-elevated">
                <div className="card-header"><h2 className="card-title">About this Course</h2></div>
                <div className={`card-body ${styles.prose}`}>
                  <div dangerouslySetInnerHTML={{ __html: course.description }} />
                  {course.instructorBio && (
                    <div className={styles.instructorBio}>
                      <h4>About the Instructor</h4>
                      <p>{course.instructorBio}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Curriculum */}
              <CurriculumSection sessions={course.sessions} />

              {/* FAQ */}
              {course.faqs.length > 0 && <FAQSection faqs={course.faqs} />}
            </div>
          </div>
        </div>
      </main>

      <CourseStickyBar course={course} />

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2026 Approachable.dev. All rights reserved. For support, contact: {course.instructor.email}</p>
        </div>
      </footer>
    </div>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCourseContent, getCourseSections, getSectionIcon, ALL_CATALOG_SLUGS } from '@/lib/course-content';
import CurriculumSection from '@/components/course/CurriculumSection';
import CourseInfoPanel from '@/components/course/CourseInfoPanel';
import CourseStickyBar from '@/components/course/CourseStickyBar';
import Header from '@/components/Header';
import FAQSection from '@/components/course/FAQSection';
import JsonLd from '@/components/JsonLd';
import { buildCourseSchema } from '@/lib/seo/course-schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import styles from './course.module.css';

const COURSE_SLUGS = ALL_CATALOG_SLUGS;

export function generateStaticParams() {
  return COURSE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseContent(slug);
  if (!course) return {};
  const title = course.title;
  return buildPageMetadata({
    title,
    description: course.ogDescription,
    path: `/courses/${course.slug}`,
    ogImage: course.ogImage,
    ogImageAlt: `${course.title} — Approachable`,
  });
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseContent(slug);
  if (!course) notFound();

  const sections = getCourseSections(course.description);
  const courseSchema = buildCourseSchema(course);

  return (
    <>
      <JsonLd data={courseSchema} />
      <Header navVariant="course" showBackToCourses />
      <div className={`${styles.page}${course.isFree ? ` ${styles.pageNoSticky}` : ''}`}>
      {course.discountLabel && !course.isFree && (
        <div className={styles.discountBanner}>{course.discountLabel}</div>
      )}

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.courseLayout}>
            {/* Hero */}
            <div id="course-hero" className={styles.hero}>
              {course.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={course.heroImage} alt={course.title} />
              ) : (
                // TODO: replace with a real course hero image once available
                <div className={styles.heroPlaceholder}>
                  <span>{course.title}</span>
                </div>
              )}
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

              {/* Description, split into clearly hierarchied sections */}
              {sections.map((section, i) => (
                <section className={styles.sectionCard} key={section.heading ?? i}>
                  {section.heading && (
                    <div className={styles.sectionCardHeader}>
                      <span className={styles.sectionCardIcon} aria-hidden="true">
                        {getSectionIcon(section.heading)}
                      </span>
                      <h2 className={styles.sectionCardTitle}>{section.heading}</h2>
                    </div>
                  )}
                  <div className={`${styles.sectionCardBody} ${styles.prose}`}>
                    <div dangerouslySetInnerHTML={{ __html: section.html }} />
                    {i === 0 && course.instructorBio && (
                      <div className={styles.instructorBio}>
                        <h3>About the Instructor</h3>
                        <p>{course.instructorBio}</p>
                      </div>
                    )}
                  </div>
                </section>
              ))}

              {/* Curriculum */}
              <CurriculumSection sessions={course.sessions} />

              {/* FAQ */}
              {course.faqs.length > 0 && <FAQSection faqs={course.faqs} />}
            </div>
          </div>
        </div>
      </main>

      {!course.isFree && <CourseStickyBar course={course} />}
    </div>
    </>
  );
}

import Link from 'next/link';
import type { CourseSummary } from '@/lib/course-content';

interface CourseCardProps {
  course: CourseSummary;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`} className="course-card-v2">
      <div className="course-card-banner">
        {course.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.heroImage} alt={course.title} />
        ) : (
          // TODO: replace with a real course thumbnail once available
          <div className="course-card-placeholder">
            <span>🎓</span>
          </div>
        )}
        {course.enrolled ? (
          <span className="course-card-badge">Enrolled</span>
        ) : course.isFree ? (
          <span className="course-card-badge course-card-badge-free">Free</span>
        ) : null}
      </div>

      <div className="course-card-body">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-desc">{course.shortDescription}</p>

        <div className="course-card-bottom">
          <div className="course-card-meta">
            <span className="course-card-meta-item">
              {course.isFree ? (
                <span aria-hidden="true">🎓</span>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              )}
              {course.instructor}
            </span>
            {!course.isFree && (
              <span className="course-card-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                {course.type}
              </span>
            )}
          </div>

          <span className={`course-card-footer${course.isFree ? ' course-card-footer-free' : ''}`}>
            {course.isFree ? 'Start learning →' : 'View details →'}
          </span>
        </div>
      </div>
    </Link>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import ExploreMoreCard from '@/components/ExploreMoreCard';
import type { CourseSummary } from '@/lib/course-content';
import styles from '@/app/courses/courses.module.css';

interface PaidCourseGridProps {
  courses: (CourseSummary & { tag: string; displayTitle: string })[];
}

export default function PaidCourseGrid({ courses }: PaidCourseGridProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.cards}>
      {courses.map((course, index) => {
        const isLast = index === courses.length - 1;
        const card = (
          <article className={styles.card} key={course.slug}>
            <div className={styles.cardImage}>
              {course.heroImage && <img src={course.heroImage} alt={course.displayTitle} />}
            </div>
            <div className={styles.cardBody}>
              <span className={styles.tag}>{course.tag}</span>
              <h3>{course.displayTitle}</h3>
              <p>{course.shortDescription}</p>
              <Link className={styles.cardLink} href={`/courses/${course.slug}`}>
                View course →
              </Link>
            </div>
          </article>
        );

        if (!isLast || showMore) return card;

        return (
          <div className={styles.cardWithReveal} key={course.slug}>
            {card}
            <button
              type="button"
              className={styles.revealBtn}
              aria-label="Show more courses"
              onClick={() => setShowMore(true)}
            >
              →
            </button>
          </div>
        );
      })}
      {showMore && <ExploreMoreCard variant="paid" />}
    </div>
  );
}

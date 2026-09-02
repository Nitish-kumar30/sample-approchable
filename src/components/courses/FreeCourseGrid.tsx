'use client';

import { useState } from 'react';
import Link from 'next/link';
import ExploreMoreCard from '@/components/ExploreMoreCard';
import type { CourseSummary } from '@/lib/course-content';
import styles from '@/app/courses/courses.module.css';

interface FreeCourseGridProps {
  courses: (CourseSummary & { displayTitle: string })[];
}

export default function FreeCourseGrid({ courses }: FreeCourseGridProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.freeGrid}>
      {courses.map((course, index) => {
        const isLast = index === courses.length - 1;
        const card = (
          <article className={styles.freeCard} key={course.slug}>
            <div className={styles.freeImage}>
              {course.heroImage && <img src={course.heroImage} alt={course.displayTitle} />}
            </div>
            <span className={styles.tag}>Free</span>
            <h3>{course.displayTitle}</h3>
            <p>{course.shortDescription}</p>
            <Link className={styles.cardLink} href={`/courses/${course.slug}`}>
              Start learning →
            </Link>
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
      {showMore && <ExploreMoreCard variant="free" />}
    </div>
  );
}

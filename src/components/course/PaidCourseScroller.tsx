'use client';

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from '@/app/courses/courses.module.css';

const GAP = 18;

export default function PaidCourseScroller({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(items.length <= 3);

  const updateEnds = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setAtStart(viewport.scrollLeft <= 1);
    setAtEnd(viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    updateEnds();
    viewport.addEventListener('scroll', updateEnds, { passive: true });
    window.addEventListener('resize', updateEnds);
    return () => {
      viewport.removeEventListener('scroll', updateEnds);
      window.removeEventListener('resize', updateEnds);
    };
  }, [updateEnds, items.length]);

  const scrollByCard = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector(`.${styles.card}`) as HTMLElement | null;
    if (!viewport || !card) return;
    viewport.scrollBy({ left: direction * (card.offsetWidth + GAP), behavior: 'smooth' });
  };

  return (
    <div className={styles.scroller}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        aria-label="Previous courses"
        disabled={atStart}
        onClick={() => scrollByCard(-1)}
      >
        ‹
      </button>
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.track}>{items}</div>
      </div>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        aria-label="Next courses"
        disabled={atEnd}
        onClick={() => scrollByCard(1)}
      >
        ›
      </button>
    </div>
  );
}

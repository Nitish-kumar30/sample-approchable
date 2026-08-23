'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

interface CoursesScrollRowProps {
  children: ReactNode;
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      {direction === 'left' ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export default function CoursesScrollRow({ children }: CoursesScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft > 4) {
      setHasScrolled(true);
    }
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  const scrollByDirection = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('.course-card-v2');
    const cardWidth = card ? card.offsetWidth + 24 : el.clientWidth * 0.85;

    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    const onScroll = () => updateScrollState();
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;

      event.preventDefault();
      el.scrollBy({ left: event.deltaY, behavior: 'auto' });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: false });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
    if (el.firstElementChild) {
      resizeObserver.observe(el.firstElementChild);
    }

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', onWheel);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  return (
    <div
      className={[
        'courses-scroll-wrap',
        canScrollLeft ? 'courses-scroll-wrap--left' : '',
        canScrollRight ? 'courses-scroll-wrap--right' : '',
      ].filter(Boolean).join(' ')}
    >
      {canScrollRight && !hasScrolled && (
        <p className="courses-scroll-hint">
          Swipe to see more courses
          <ChevronIcon direction="right" />
        </p>
      )}

      {canScrollLeft && (
        <button
          type="button"
          className="courses-scroll-btn courses-scroll-btn-prev"
          onClick={() => scrollByDirection('left')}
          aria-label="Scroll courses left"
        >
          <ChevronIcon direction="left" />
        </button>
      )}

      <div ref={scrollRef} className="courses-scroll-row" tabIndex={0}>
        {children}
      </div>

      {canScrollRight && (
        <button
          type="button"
          className="courses-scroll-btn courses-scroll-btn-next"
          onClick={() => scrollByDirection('right')}
          aria-label="Scroll courses right"
        >
          <ChevronIcon direction="right" />
        </button>
      )}
    </div>
  );
}

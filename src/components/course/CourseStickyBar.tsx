'use client';

import { useEffect, useRef, useState } from 'react';
import type { CourseContent } from '@/lib/course-content';

interface CourseStickyBarProps {
  course: CourseContent;
}

export default function CourseStickyBar({ course }: CourseStickyBarProps) {
  const [visible, setVisible] = useState(false);
  const [isIntl, setIsIntl] = useState(false);
  const observerTarget = useRef<string>('course-hero');

  useEffect(() => {
    fetch('https://ipwho.is/')
      .then((r) => r.json())
      .then((data) => {
        if (data?.country_code && data.country_code !== 'IN') {
          setIsIntl(true);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const hero = document.getElementById(observerTarget.current);
    if (!hero) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const price = isIntl ? course.pricing.usd : course.pricing.inr;

  return (
    <div id="sticky-pay" className={`sticky-pay${visible ? ' visible' : ''}`} aria-hidden={!visible}>
      <div className="sticky-pay-inner">
        <div className="sticky-pay-text">
          <p className="sticky-pay-title">{course.title}</p>
          <div className="price-row">
            <span className="price-old">{price.original}</span>
            <span className="price-new">{price.current}</span>
            <span className="discount-tag">{course.pricing.discountPercent}% off</span>
          </div>
        </div>
        <a className="btn-primary" href={course.purchaseUrl}>
          Pay {price.current}
        </a>
      </div>
    </div>
  );
}

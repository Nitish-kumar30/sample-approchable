'use client';

import { useEffect } from 'react';
import styles from '@/app/corporate-training/corporate-training.module.css';

/**
 * Progressively enhances `.reveal` elements with scroll animations.
 * Content stays visible until JS runs (no-JS safe via default `.reveal` styles).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(`.${styles.reveal}`);

    targets.forEach((el) => {
      if (!el.classList.contains(styles.revealIn)) {
        el.classList.add(styles.revealPending);
      }
    });

    const reveal = (el: Element) => {
      el.classList.add(styles.revealIn);
      el.classList.remove(styles.revealPending);
    };

    if (!('IntersectionObserver' in window)) {
      targets.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

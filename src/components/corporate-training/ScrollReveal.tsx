'use client';

import { useEffect } from 'react';
import styles from '@/app/corporate-training/corporate-training.module.css';

/**
 * Fades/slides `.reveal` elements into view as they enter the viewport,
 * mirroring the original page's scroll-reveal script.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(`.${styles.reveal}`);

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add(styles.revealIn));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealIn);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

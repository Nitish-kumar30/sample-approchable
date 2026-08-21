'use client';

import { useState } from 'react';
import styles from '@/app/corporate-training/corporate-training.module.css';

export default function MentorPhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.mentorPhotoWrap}>
      {failed ? (
        <div className={`${styles.mentorPhoto} ${styles.mentorPhotoFallback}`}>RM</div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.mentorPhoto}
          src="/img/Ranbeer makin aug 22.jpg"
          alt="Ranbeer Makin, mentor at Approachable"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

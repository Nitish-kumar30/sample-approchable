import Link from 'next/link';
import styles from '@/app/corporate-training/corporate-training.module.css';

export default function CorporateTrainingNav() {
  return (
    <header className={styles.siteHeader}>
      <nav className={styles.nav}>
        <Link href="#top" className={styles.brand}>
          <span className={styles.brandMark}>ct1</span>
          <span className={styles.forTeamsChip}>for teams</span>
          <span className={styles.brandTag}>making AI approachable for everyone</span>
        </Link>
        <div className={styles.navLinks}>
          <a href="#tiers">Who it&apos;s for</a>
          <a href="#curriculum">Curriculum</a>
          <a href="#mentor">Mentor</a>
          <a href="#faq">FAQ</a>
        </div>
        <a href="#contact" className={`${styles.btn} ${styles.btnPrimary}`}>
          Book an intro call →
        </a>
      </nav>
    </header>
  );
}

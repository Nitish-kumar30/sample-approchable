import type { Metadata } from 'next';
import Header from '@/components/Header';
import CorporateTrainingForm from '@/components/corporate-training/CorporateTrainingForm';
import styles from '../corporate-training.module.css';

export const metadata: Metadata = {
  title: 'Team Inquiry — Approachable for Teams',
  description:
    'Tell us about your team and training requirements. We will come back with a tailored outline and dates within a few days.',
  alternates: { canonical: '/corporate-training/inquiry' },
  openGraph: {
    title: 'Team Inquiry — Approachable for Teams',
    description:
      'Tell us about your team and training requirements. We will come back with a tailored outline and dates within a few days.',
    url: 'https://approachable.dev/corporate-training/inquiry',
  },
};

export default function CorporateInquiryPage() {
  return (
    <>
      <Header coursePage showBackToCorporate />
      <div className={`${styles.page} ${styles.inquiryPage}`}>
        <main>
          <section className={styles.formSection}>
            <div className={styles.wrap}>
              <div className={styles.formPageIntro}>
                <span className={styles.eyebrow}>Get started</span>
                <h1>Tell us about your team.</h1>
                <p>
                  Share your company details and training requirements. We&apos;ll come back with a tailored outline
                  and dates within a few days.
                </p>
                <p className={styles.formPageMeta}>
                  Delivered via BIGINT Solutions · www.bigintsolutions.com · Pricing discussed on the call
                </p>
              </div>
              <div className={styles.formPageForm}>
                <CorporateTrainingForm />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

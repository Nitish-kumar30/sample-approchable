'use client';

import { useState } from 'react';
import styles from '@/app/corporate-training/corporate-training.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How is this different from sending people to the public cohort?',
    answer:
      'The public cohort is open enrollment, mixed groups of strangers, and generic examples. This is private to your company, four tight sessions instead of six weeks, and every example is built around your industry and your four leadership tiers.',
  },
  {
    question: 'Do we need everyone to already use AI daily?',
    answer:
      'No. Session 1 starts from first principles and is calibrated live to the group in the room. It\u2019s genuinely useful for someone who\u2019s never opened an AI chat and for someone who already uses it daily — the exercises scale to the person.',
  },
  {
    question: 'Is this a Claude sales pitch?',
    answer:
      'No. Session 1 covers the AI landscape honestly, across providers. We go deep on Claude specifically because that\u2019s where the mentor has real, practiced expertise — not because it\u2019s the only tool that exists.',
  },
  {
    question: 'Can the CxO track focus on strategy and ROI instead?',
    answer:
      'Deliberately, no. Every tier — including the C-suite — spends the sessions doing hands-on work: drafting, reviewing, building. If your leadership wants a strategy or ROI workshop, this isn\u2019t that program; it\u2019s built to leave people able to do more, not to produce a deck.',
  },
  {
    question: 'Virtual, on-site, or hybrid?',
    answer:
      'Either. Most private cohorts run virtually for scheduling ease across teams, but on-site and hybrid are both available — tell us what works for your team on the intro call.',
  },
  {
    question: 'How do we book this?',
    answer:
      'Reach out through the contact section below or directly via BIGINT Solutions. We\u2019ll set up a short intro call, confirm dates and tiers, and get a tailored outline back to you within a few days.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 760 }}>
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
            <button
              type="button"
              className={styles.faqQ}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>{faq.question}</span>
              <span className={styles.faqPlus} aria-hidden="true">+</span>
            </button>
            <div className={styles.faqA} style={{ maxHeight: isOpen ? '400px' : '0px' }}>
              <div className={styles.faqAInner}>{faq.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

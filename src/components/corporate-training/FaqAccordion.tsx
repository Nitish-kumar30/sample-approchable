'use client';

import { useRef, useState } from 'react';
import styles from '@/app/corporate-training/corporate-training.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Do we need everyone to already use AI?',
    answer:
      'No. Session 1 starts from first principles and is calibrated live to the room. The exercises scale — genuinely useful for someone who\u2019s never opened an AI chat and for someone who uses it daily.',
  },
  {
    question: 'Is this a sales pitch for one AI tool?',
    answer:
      'No. Session 1 covers the full landscape — Claude, ChatGPT, Gemini, Copilot, and where each fits. We go deeper on specific tools where the mentor has real, practiced expertise, but the program is about the skill, not any single product.',
  },
  {
    question: 'Virtual, on-site, or hybrid?',
    answer:
      'Either. Most private cohorts run virtually for scheduling ease, but on-site and hybrid are both available — we\u2019ll sort this on the intro call.',
  },
  {
    question: 'What about pricing?',
    answer:
      'Pricing depends on team size and structure. We\u2019ll walk through it on the intro call rather than guess at a number on a web page. There\u2019s a flat per-participant rate, billed to the company.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: 700 }}>
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        const answerEl = answerRefs.current[i];
        return (
          <div key={faq.question} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
            <button
              type="button"
              className={styles.faqQ}
              aria-expanded={isOpen}
              onClick={() => handleClick(i)}
            >
              <span>{faq.question}</span>
              <span className={styles.faqPlus} aria-hidden="true">
                +
              </span>
            </button>
            <div
              className={styles.faqA}
              style={{ maxHeight: isOpen && answerEl ? `${answerEl.scrollHeight}px` : '0px' }}
            >
              <div
                className={styles.faqAInner}
                ref={(el) => {
                  answerRefs.current[i] = el;
                }}
              >
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

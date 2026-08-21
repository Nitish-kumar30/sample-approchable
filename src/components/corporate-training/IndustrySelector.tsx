'use client';

import { useState } from 'react';
import styles from '@/app/corporate-training/corporate-training.module.css';

interface IndustryExample {
  session: string;
  text: string;
}

interface Industry {
  id: string;
  label: string;
  examples: IndustryExample[];
}

const INDUSTRIES: Industry[] = [
  {
    id: 'retail',
    label: 'Retail & CPG',
    examples: [
      { session: 'Session 1', text: 'Mapping where AI already touches merchandising, pricing, and store ops — and where it\u2019s still hype.' },
      { session: 'Session 2', text: 'Drafting a competitive pricing scan and a promo calendar summary from raw data in minutes.' },
      { session: 'Session 3', text: 'An agent that consolidates weekly store-ops reports from every location into one summary.' },
    ],
  },
  {
    id: 'finance',
    label: 'Financial Services',
    examples: [
      { session: 'Session 1', text: 'Where AI is genuinely useful in financial services today, and where compliance still says no.' },
      { session: 'Session 2', text: 'Drafting an internal review memo and a first-cut variance analysis from a real dataset.' },
      { session: 'Session 3', text: 'An agent that preps meeting notes and follow-ups for a recurring client or committee review.' },
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing & Supply Chain',
    examples: [
      { session: 'Session 1', text: 'AI on the plant floor vs. AI in the back office — a realistic map, not a hype reel.' },
      { session: 'Session 2', text: 'Reviewing a vendor RFP response and drafting a comparison summary in one sitting.' },
      { session: 'Session 3', text: 'An agent that triages incoming maintenance tickets and routes them by urgency.' },
    ],
  },
  {
    id: 'tech',
    label: 'Tech & Professional Services',
    examples: [
      { session: 'Session 1', text: 'Where Claude, ChatGPT, Gemini and Copilot each fit into a real product and eng workflow.' },
      { session: 'Session 2', text: 'Automating client status reporting so it stops eating an account manager\u2019s Friday.' },
      { session: 'Session 4', text: 'Shipping an internal tool or client-facing prototype live in the session with Claude Code.' },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare Operations',
    examples: [
      { session: 'Session 1', text: 'A clear line between AI for operations and admin versus anything clinical — we stay firmly on the ops side.' },
      { session: 'Session 2', text: 'Drafting policy and process documentation from messy source notes.' },
      { session: 'Session 3', text: 'An agent that handles routine scheduling and intake follow-ups for a non-clinical team.' },
    ],
  },
];

export default function IndustrySelector() {
  const [activeId, setActiveId] = useState(INDUSTRIES[0].id);
  const active = INDUSTRIES.find((ind) => ind.id === activeId) ?? INDUSTRIES[0];

  return (
    <>
      <div className={styles.industryTabs} role="tablist" aria-label="Industry examples">
        {INDUSTRIES.map((industry) => (
          <button
            key={industry.id}
            type="button"
            role="tab"
            aria-selected={industry.id === activeId}
            className={`${styles.indBtn} ${industry.id === activeId ? styles.indBtnActive : ''}`}
            onClick={() => setActiveId(industry.id)}
          >
            {industry.label}
          </button>
        ))}
      </div>

      <div className={`${styles.indPanel} ${styles.indPanelActive}`}>
        {active.examples.map((example) => (
          <div className={styles.indCard} key={example.session}>
            <span className={styles.indTag}>{example.session}</span>
            <p>{example.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

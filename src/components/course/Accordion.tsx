'use client';

import { useState } from 'react';

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function Accordion({ title, defaultOpen = false, children }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`accordion-item${open ? ' open' : ''}`}>
      <button
        type="button"
        className="accordion-trigger"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="accordion-trigger-inner">
          <svg className="icon icon-sm text-primary accordion-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
          <svg className="icon icon-sm text-primary accordion-minus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14" /></svg>
          <span className="accordion-title">{title}</span>
        </span>
      </button>
      <div className="accordion-content">
        {children}
      </div>
    </div>
  );
}

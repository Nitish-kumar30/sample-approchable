'use client';

import { createPortal } from 'react-dom';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import CorporateTrainingForm from '@/components/corporate-training/CorporateTrainingForm';
import pageStyles from '@/app/team-ai-training/team-ai-training.module.css';
import styles from './enquiry-modal.module.css';

type EnquiryModalContextValue = {
  open: () => void;
  close: () => void;
};

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null);

function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within EnquiryModalProvider');
  }
  return context;
}

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#enquiry' || hash === '#book') {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeModal, open]);

  return (
    <EnquiryModalContext.Provider value={{ open: openModal, close: closeModal }}>
      {children}
      {open && typeof document !== 'undefined'
        ? createPortal(<EnquiryModalDialog titleId={titleId} onClose={closeModal} />, document.body)
        : null}
    </EnquiryModalContext.Provider>
  );
}

function EnquiryModalDialog({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.dialogHeader}>
          <div>
            <p className={styles.dialogEyebrow}>Enquiry</p>
            <h2 id={titleId} className={styles.dialogTitle}>
              Tell us about your team
            </h2>
            <p className={styles.dialogSub}>
              Share your company details and training requirements. We&apos;ll come back with a tailored
              outline and dates within a few days.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close enquiry form"
          >
            ×
          </button>
        </div>
        <div className={styles.dialogBody}>
          <CorporateTrainingForm />
        </div>
      </div>
    </div>
  );
}

export function TeamAiTrainingNav() {
  const { open } = useEnquiryModal();

  return (
    <nav className={pageStyles.nav}>
      <div className={`${pageStyles.container} ${pageStyles.navInner}`}>
        <a className={pageStyles.brand} href="#">
          <span className={pageStyles.brandDot}></span>
          Approachable
        </a>
        <div className={pageStyles.navLinks}>
          <a href="#program">Program</a>
          <a href="#work">What we build</a>
          <a href="#proof">Proof</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">Questions</a>
        </div>
        <button type="button" className={`${pageStyles.btn} ${pageStyles.btnDark}`} onClick={open}>
          Book an AI assessment
        </button>
      </div>
    </nav>
  );
}

export function OpenEnquiryButton({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const { open } = useEnquiryModal();

  return (
    <button type="button" className={className} style={style} onClick={open}>
      {children}
    </button>
  );
}

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
import Logo from '@/components/Logo';
import MobileMenuButton from '@/components/MobileMenuButton';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Program', href: '#program' },
    { label: 'What we build', href: '#work' },
    { label: 'Proof', href: '#proof' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Questions', href: '#faq' },
  ] as const;

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', menuOpen);
    return () => document.body.classList.remove('mobile-nav-open');
  }, [menuOpen]);

  function handleNavClick() {
    setMenuOpen(false);
  }

  function handleBookClick() {
    setMenuOpen(false);
    open();
  }

  return (
    <nav className={`${pageStyles.nav}${menuOpen ? ` ${pageStyles.navMenuOpen}` : ''}`}>
      <div className={`${pageStyles.container} ${pageStyles.navInner}`}>
        <Logo />
        <div className={pageStyles.navLinks}>
          {navItems.map(({ label, href }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className={`${pageStyles.btn} ${pageStyles.btnDark} ${pageStyles.navCtaDesktop}`}
          onClick={open}
        >
          Book an AI assessment
        </button>
        <MobileMenuButton
          open={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          controlsId="team-ai-training-mobile-nav"
          className={pageStyles.navMenuBtn}
        />
      </div>

      <div
        id="team-ai-training-mobile-nav"
        className={`${pageStyles.navMobilePanel}${menuOpen ? ` ${pageStyles.navMobilePanelOpen}` : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={pageStyles.navMobilePanelInner}>
          {navItems.map(({ label, href }) => (
            <a key={href} href={href} className={pageStyles.navMobileLink} onClick={handleNavClick}>
              {label}
            </a>
          ))}
          <button type="button" className={pageStyles.navMobileAction} onClick={handleBookClick}>
            Book an AI assessment
          </button>
        </div>
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

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

interface HeaderProps {
  coursePage?: boolean;
  showBackToCourses?: boolean;
  showBackToCorporate?: boolean;
  showCorporateEnquiry?: boolean;
  hideNav?: boolean;
  navVariant?: 'course' | 'blog' | 'contact';
}

const NAV_LINKS = {
  course: [
    { label: 'Live AI Cohort', href: '/' },
    { label: 'Team Training', href: '/team-ai-training' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ],
  contact: [
    { label: 'Live AI Cohort', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Team Training', href: '/team-ai-training' },
    { label: 'Blog', href: '/blog' },
  ],
  blog: [
    { label: 'Live AI Cohort', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Team Training', href: '/team-ai-training' },
    { label: 'Contact Us', href: '/contact' },
  ],
} as const;

const DEFAULT_LINKS = [
  { label: 'Courses', href: '/courses' },
  { label: 'Corporate Training', href: '/team-ai-training' },
  { label: 'Contact Us', href: '/contact' },
] as const;

function BackLink({ href, ariaLabel, fullLabel }: { href: string; ariaLabel: string; fullLabel: string }) {
  return (
    <Link href={href} className="header-back-link" aria-label={ariaLabel}>
      <svg
        className="header-back-link-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span className="header-back-text-full">{fullLabel}</span>
      <span className="header-back-text-short">Back</span>
    </Link>
  );
}

function NavLinks({
  links,
  className,
  onNavigate,
}: {
  links: readonly { label: string; href: string }[];
  className: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {links.map(({ label, href }) => (
        <Link key={label} href={href} className={className} onClick={onNavigate}>
          {label}
        </Link>
      ))}
    </>
  );
}

export default function Header({
  coursePage = false,
  showBackToCourses = false,
  showBackToCorporate = false,
  showCorporateEnquiry = false,
  hideNav = false,
  navVariant,
}: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = navVariant ? NAV_LINKS[navVariant] : null;
  const showMainNav = !hideNav && (links || (!coursePage && !navVariant));

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', menuOpen);
    return () => document.body.classList.remove('mobile-nav-open');
  }, [menuOpen]);

  const mobileCta = showCorporateEnquiry ? (
    <a href="#book" className="header-mobile-cta" onClick={() => setMenuOpen(false)}>
      Send enquiry →
    </a>
  ) : !coursePage && !hideNav && !navVariant && !showBackToCourses && !showBackToCorporate ? (
    <Link href="/#pricing" className="header-mobile-cta" onClick={() => setMenuOpen(false)}>
      Join the Cohort →
    </Link>
  ) : null;

  return (
    <header className={`site-header${menuOpen ? ' site-header--menu-open' : ''}`}>
      <div className="container-max header-inner">
        <Logo />

        {links ? (
          <nav className="header-nav" aria-label="Main navigation">
            <NavLinks links={links} className="header-nav-link" />
          </nav>
        ) : (
          !coursePage &&
          !hideNav && (
            <nav className="header-nav" aria-label="Main navigation">
              <NavLinks links={DEFAULT_LINKS} className="header-nav-link" />
            </nav>
          )
        )}

        <div className="header-actions">
          {showMainNav && (
            <button
              type="button"
              className="header-menu-btn"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="header-mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="header-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          )}

          {showBackToCourses ? (
            <BackLink href="/courses" ariaLabel="Back to courses" fullLabel="Back to Courses" />
          ) : showBackToCorporate ? (
            <BackLink
              href="/team-ai-training"
              ariaLabel="Back to corporate training"
              fullLabel="Back to Corporate Training"
            />
          ) : showCorporateEnquiry ? (
            <a href="#book" className="header-cta header-cta-corporate">
              Send enquiry →
            </a>
          ) : (
            !coursePage &&
            !hideNav &&
            !navVariant && (
              <Link href="/#pricing" className="header-cta">
                Join the Cohort →
              </Link>
            )
          )}
        </div>
      </div>

      {showMainNav && (
        <nav
          id="header-mobile-nav"
          className={`header-mobile-nav${menuOpen ? ' header-mobile-nav--open' : ''}`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          <div className="container-max header-mobile-nav-inner">
            {links ? (
              <NavLinks links={links} className="header-mobile-nav-link" onNavigate={() => setMenuOpen(false)} />
            ) : (
              <NavLinks links={DEFAULT_LINKS} className="header-mobile-nav-link" onNavigate={() => setMenuOpen(false)} />
            )}
            {mobileCta}
          </div>
        </nav>
      )}
    </header>
  );
}

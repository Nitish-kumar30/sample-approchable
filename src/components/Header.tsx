import Image from 'next/image';
import Link from 'next/link';

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

export default function Header({
  coursePage = false,
  showBackToCourses = false,
  showBackToCorporate = false,
  showCorporateEnquiry = false,
  hideNav = false,
  navVariant,
}: HeaderProps) {
  const links = navVariant ? NAV_LINKS[navVariant] : null;

  return (
    <header className="site-header">
      <div className="container-max header-inner">
        <Link href="/" className="logo-wrap">
          <Image src="/logo.png" alt="Approachable" width={43} height={43} priority />
          <div>
            <div className="logo-name">Approachable</div>
            <div className="logo-sub">making AI approachable for everyone</div>
          </div>
        </Link>

        {links ? (
          <nav className="header-nav">
            {links.map(({ label, href }) =>
              href ? (
                <Link key={label} href={href} className="header-nav-link">
                  {label}
                </Link>
              ) : (
                <span key={label} className="header-nav-link header-nav-link-static" aria-disabled="true">
                  {label}
                </span>
              )
            )}
          </nav>
        ) : (
          !coursePage && !hideNav && (
          <nav className="header-nav">
            <Link href="/courses" className="header-nav-link">
              Courses
            </Link>
            <Link href="/team-ai-training" className="header-nav-link">
              Corporate Training
            </Link>
            <Link href="/contact" className="header-nav-link">
              Contact Us
            </Link>
          </nav>
          )
        )}

        <div className="header-actions">
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
            !coursePage && !hideNav && !navVariant && (
              <Link href="/#pricing" className="header-cta">
                Join the Cohort →
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}

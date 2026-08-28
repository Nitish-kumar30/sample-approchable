import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  coursePage?: boolean;
  showBackToCourses?: boolean;
  hideNav?: boolean;
  navVariant?: 'course' | 'blog';
}

const NAV_LINKS = {
  course: [
    { label: 'Live AI Cohort', href: '/' },
    { label: 'Team Training', href: '/team-ai-training' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us' },
  ],
  blog: [
    { label: 'Live AI Cohort', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Team Training', href: '/team-ai-training' },
    { label: 'Contact Us' },
  ],
} as const;

export default function Header({ coursePage = false, showBackToCourses = false, hideNav = false, navVariant }: HeaderProps) {
  const links = navVariant ? NAV_LINKS[navVariant] : null;

  return (
    <header className="site-header">
      <div className="container-max header-inner">
        <Link href="/" className="logo-wrap">
          <Image src="/logo.png" alt="Approachable" width={43} height={43} />
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
          </nav>
          )
        )}

        {showBackToCourses ? (
          <Link href="/courses" className="header-back-link" aria-label="Back to courses">
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
            <span className="header-back-text-full">Back to Courses</span>
            <span className="header-back-text-short">Back</span>
          </Link>
        ) : (
          !coursePage && !hideNav && !navVariant && (
            <Link href="/#pricing" className="header-cta">
              Join the Cohort →
            </Link>
          )
        )}
      </div>
    </header>
  );
}

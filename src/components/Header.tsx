import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  coursePage?: boolean;
  showBackToCourses?: boolean;
  hideNav?: boolean;
}

export default function Header({ coursePage = false, showBackToCourses = false, hideNav = false }: HeaderProps) {
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

        {!coursePage && !hideNav && (
          <nav className="header-nav">
            <Link href="/courses" className="header-nav-link">
              Courses
            </Link>
            <Link href="/corporate-training" className="header-nav-link">
              Corporate Training
            </Link>
          </nav>
        )}

        {showBackToCourses ? (
          <Link href="/courses" className="header-back-link">
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
            Back to Courses
          </Link>
        ) : (
          !coursePage && (
            <Link href="/#pricing" className="header-cta">
              Join the Cohort →
            </Link>
          )
        )}
      </div>
    </header>
  );
}

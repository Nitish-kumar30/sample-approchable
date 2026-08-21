import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
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

        <nav className="header-nav">
          <Link href="/courses" className="header-nav-link">
            Courses
          </Link>
          <Link href="/corporate-training" className="header-nav-link">
            Corporate Training
          </Link>
        </nav>

        <Link href="/#pricing" className="header-cta">
          Join the Cohort →
        </Link>
      </div>
    </header>
  );
}

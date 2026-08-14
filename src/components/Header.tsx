import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container-max header-inner" style={{ padding: '14px 24px' }}>
        <Link href="/" className="logo-wrap">
          <Image src="/logo.png" alt="Approachable" width={36} height={36} />
          <div>
            <div className="logo-name">Approachable</div>
            <div className="logo-sub">making AI approachable for everyone</div>
          </div>
        </Link>
        <a href="#pricing" className="header-cta">
          Join the Cohort →
        </a>
      </div>
    </header>
  );
}

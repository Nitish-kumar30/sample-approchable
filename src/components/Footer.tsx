import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
  { label: 'Team Training', href: '/team-ai-training' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div style={{ fontSize: 13 }}>© 2026 Approachable · making AI approachable for everyone</div>
        <nav aria-label="Footer navigation" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <a href="https://www.linkedin.com/in/ranbeer/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}

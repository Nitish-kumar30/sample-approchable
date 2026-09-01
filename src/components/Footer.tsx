import Link from 'next/link';
import FooterSubscribe from './FooterSubscribe';

const footerColumns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/#mentor' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'All Courses', href: '/courses' },
      { label: 'Team Training', href: '/team-ai-training' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'FAQs', href: '/#faq' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Request a Demo', href: 'mailto:ranbeer@gmail.com?subject=Demo%20Request' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Data Security', href: '/data-security' },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-columns">
          {footerColumns.map((col) => (
            <div key={col.heading} className="footer-col">
              <h4 className="footer-col-heading">{col.heading}</h4>
              <ul className="footer-col-links">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('mailto:') ? (
                      <a href={link.href}>{link.label}</a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <FooterSubscribe />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2026 Approachable · making AI approachable for everyone</span>
          <div className="footer-bottom-links">
            <a href="/sitemap.xml">Sitemap</a>
            <a href="https://www.linkedin.com/in/ranbeer/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

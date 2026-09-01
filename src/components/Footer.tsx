import Link from 'next/link';
import FooterSubscribe from './FooterSubscribe';

const footerColumns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'AI Cohort', href: '/#pricing' },
      { label: 'AI Mastery for Working Professionals', href: '/courses/ai-mastery-for-working-professionals' },
      {
        label: 'No Code AI Agents Mastery for Working Professionals',
        href: '/courses/no-code-ai-agents-mastery-for-working-professionals',
      },
      { label: 'Vibe Coding Mastery for Working Professionals', href: '/courses/vibe-coding-mastery-for-working-professionals' },
      { label: 'Free Courses', href: '/courses' },
      { label: 'Team Training', href: '/team-ai-training' },
    ],
  },
  {
    heading: 'Resources',
    links: [{ label: 'Blog', href: '/blog' }],
  },
  {
    heading: 'Support',
    links: [{ label: 'Contact Us', href: '/contact' }],
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
                  <li key={link.label}>
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

      <p className="footer-copyright">© 2026 Approachable · making AI approachable for everyone</p>
    </footer>
  );
}

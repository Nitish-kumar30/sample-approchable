import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Approachable',
  description: 'Get in touch with the Approachable team.',
};

export default function ContactPage() {
  return (
    <main className="placeholder-page">
      <h1>Contact Us</h1>
      <p>
        We&apos;d love to hear from you. Reach out at{' '}
        <a href="mailto:ranbeer@gmail.com">ranbeer@gmail.com</a>
      </p>
      <Link href="/" className="placeholder-back">← Back to Home</Link>
    </main>
  );
}

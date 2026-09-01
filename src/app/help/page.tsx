import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help Center | Approachable',
  description: 'Get help with Approachable courses and platform.',
};

export default function HelpPage() {
  return (
    <main className="placeholder-page">
      <h1>Help Center</h1>
      <p>
        Need help? Reach out at{' '}
        <a href="mailto:ranbeer@gmail.com">ranbeer@gmail.com</a> and we&apos;ll get back to you.
      </p>
      <Link href="/" className="placeholder-back">← Back to Home</Link>
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Approachable',
  description: 'Terms of service for Approachable.',
};

export default function TermsPage() {
  return (
    <main className="placeholder-page">
      <h1>Terms of Service</h1>
      <p>This page is coming soon. Our full terms of service will be published here.</p>
      <Link href="/" className="placeholder-back">← Back to Home</Link>
    </main>
  );
}

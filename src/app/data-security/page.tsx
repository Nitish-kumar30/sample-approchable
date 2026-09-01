import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Data Security | Approachable',
  description: 'How Approachable protects your data — our security and GDPR practices.',
};

export default function DataSecurityPage() {
  return (
    <main className="placeholder-page">
      <h1>Data Security</h1>
      <p>This page is coming soon. Our data security and GDPR practices will be detailed here.</p>
      <Link href="/" className="placeholder-back">← Back to Home</Link>
    </main>
  );
}

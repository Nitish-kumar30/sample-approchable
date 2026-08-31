import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Approachable',
  description: 'Privacy policy for Approachable — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <main className="placeholder-page">
      <h1>Privacy Policy</h1>
      <p>This page is coming soon. Our full privacy policy will be published here.</p>
      <Link href="/" className="placeholder-back">← Back to Home</Link>
    </main>
  );
}

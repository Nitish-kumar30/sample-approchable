import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Studies | Approachable',
  description: 'Real results from professionals and teams using Approachable AI training.',
};

export default function CaseStudiesPage() {
  return (
    <main className="placeholder-page">
      <h1>Case Studies</h1>
      <p>This page is coming soon. We&apos;re collecting stories from our alumni and enterprise partners.</p>
      <Link href="/" className="placeholder-back">← Back to Home</Link>
    </main>
  );
}

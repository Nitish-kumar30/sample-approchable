import type { Metadata } from 'next';
import Header from '@/components/Header';
import GlossaryView from '@/components/glossary/GlossaryView';
import { getGlossaryEntries } from '@/lib/glossary';
import { buildPageMetadata } from '@/lib/seo/metadata';

const GLOSSARY_DESCRIPTION =
  "Plain-English definitions of the AI terms you'll actually run into: agents, tokens, RAG, MCP, fine-tuning and more.";

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Glossary',
  description: GLOSSARY_DESCRIPTION,
  path: '/glossary',
  ogImageAlt: 'AI Glossary from Approachable',
});

export default function GlossaryPage() {
  const entries = getGlossaryEntries();

  return (
    <main className="glossary-page">
      <Header navVariant="blog" />

      <section className="gl-page-hero">
        <span className="gl-page-label">AI Glossary - {entries.length} terms</span>
        <h1 className="gl-page-title">
          Every AI term, <span>in plain English</span>
        </h1>
        <p className="gl-page-subtitle">
          Tokens, agents, RAG, MCP, fine-tuning. Here is what each one actually means - no maths, no hype.
        </p>
      </section>

      <GlossaryView entries={entries} />
    </main>
  );
}

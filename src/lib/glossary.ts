import glossaryData from '@/data/glossary.json';

export const CATEGORIES = ['Foundations', 'Models', 'Prompting', 'Agents', 'Data', 'Risks', 'Building'] as const;

export type GlossaryCategory = (typeof CATEGORIES)[number];

export interface GlossaryEntryRaw {
  t: string;
  c: GlossaryCategory;
  a: string;
  d: string;
  w: string;
  s: string[];
}

export interface GlossaryEntry extends GlossaryEntryRaw {
  slug: string;
}

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  Foundations: 'Foundations',
  Models: 'Models & training',
  Prompting: 'Prompting',
  Agents: 'Agents & tools',
  Data: 'Data & retrieval',
  Risks: 'Risks & safety',
  Building: 'Building & shipping',
};

export function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getGlossaryEntries(): GlossaryEntry[] {
  return (glossaryData as GlossaryEntryRaw[])
    .map((entry) => ({
      ...entry,
      slug: slugify(entry.t),
    }))
    .sort((a, b) => a.t.localeCompare(b.t));
}

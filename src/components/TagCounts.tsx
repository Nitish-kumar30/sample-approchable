import Link from 'next/link';
import { getAllTags } from '@/lib/posts';

export default function TagCounts() {
  const tags = getAllTags();
  if (tags.length === 0) return null;
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: 'var(--bg-warm)', border: '1px solid var(--border)' }}
    >
      <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        Tags
      </h2>
      <ul className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <li key={tag}>
            <Link
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'var(--bg-accent-light)', color: 'var(--accent)' }}
            >
              {tag}
              <span className="text-xs opacity-60">({count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

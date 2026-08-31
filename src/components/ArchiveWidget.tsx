import Link from 'next/link';
import { getPostsGroupedByMonth } from '@/lib/posts';

function toAnchorId(label: string) {
  return label.toLowerCase().replace(/\s+/g, '-');
}

export default function ArchiveWidget() {
  const groups = getPostsGroupedByMonth();
  if (groups.length === 0) return null;
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: 'var(--bg-warm)', border: '1px solid var(--border)' }}
    >
      <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        Archives
      </h2>
      <ul className="flex flex-col gap-2">
        {groups.map((group) => (
          <li key={`${group.year}-${group.month}`} className="flex items-center justify-between">
            <Link
              href={`/archive#${toAnchorId(group.label)}`}
              className="text-sm hover:underline"
              style={{ color: 'var(--text-primary)' }}
            >
              {group.label}
            </Link>
            <span
              className="text-xs rounded-full px-2 py-0.5"
              style={{ backgroundColor: 'var(--bg-section)', color: 'var(--text-muted)' }}
            >
              {group.posts.length}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 5);
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: 'var(--bg-warm)', border: '1px solid var(--border)' }}
    >
      <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        Latest Posts
      </h2>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block text-sm hover:underline leading-snug mb-0.5"
              style={{ color: 'var(--text-primary)' }}
            >
              {post.title}
            </Link>
            <time className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {post.date}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}

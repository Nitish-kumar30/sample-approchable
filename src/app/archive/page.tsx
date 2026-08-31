import type { Metadata } from 'next';
import Link from 'next/link';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostsGroupedByMonth } from '@/lib/posts';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Archives — Approachable',
  description: 'Browse all blog posts by month and year.',
  openGraph: {
    title: 'Archives — Approachable',
    description: 'Browse all blog posts by month and year.',
    url: 'https://approachable.dev/archive',
  },
};

export default function ArchivePage() {
  const groups = getPostsGroupedByMonth();

  return (
    <>
      <Banner />
      <Header hideNav coursePage />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="mx-auto max-w-[800px] px-6 py-20">
          <h1 className="text-4xl font-bold mb-10" style={{ color: 'var(--text-primary)' }}>
            Archives
          </h1>

          {groups.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No posts yet. Check back soon.</p>
          ) : (
            groups.map((group) => (
              <section
                key={`${group.year}-${group.month}`}
                id={group.label.toLowerCase().replace(/\s+/g, '-')}
                className="mb-10"
              >
                <h2
                  className="text-xl font-semibold mb-4 pb-2"
                  style={{
                    color: 'var(--text-primary)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {group.label}
                </h2>
                <ul className="flex flex-col gap-3">
                  {group.posts.map((post) => (
                    <li key={post.slug} className="flex items-baseline gap-3">
                      <time
                        className="text-sm shrink-0"
                        style={{ color: 'var(--text-muted)' }}
                        dateTime={post.date}
                      >
                        {post.date}
                      </time>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </main>
    </>
  );
}

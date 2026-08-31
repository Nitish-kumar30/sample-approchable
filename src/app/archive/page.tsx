import type { Metadata } from 'next';
import Link from 'next/link';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import { getPostsGroupedByMonth } from '@/lib/posts';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

const ARCHIVE_DESCRIPTION =
  'Browse all Approachable blog posts organized by month and year — AI tips, Claude guides, and learning insights.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Archives',
  description: ARCHIVE_DESCRIPTION,
  path: '/archive',
  ogImageAlt: 'Approachable blog archives',
});

export default function ArchivePage() {
  const groups = getPostsGroupedByMonth();

  return (
    <>
      <Banner />
      <Header hideNav coursePage />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="mx-auto max-w-[800px] px-6 py-20">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Archives
          </h1>
          <p className="mb-10 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Every post from the Approachable blog, sorted by date.
          </p>

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

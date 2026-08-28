import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import LatestPosts from '@/components/LatestPosts';
import TagCounts from '@/components/TagCounts';
import ArchiveWidget from '@/components/ArchiveWidget';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo/site';

export const revalidate = 60;
export const dynamicParams = false;

type Props = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const canonical = `/blog/tag/${encodeURIComponent(decoded)}`;
  const title = `Posts tagged "${decoded}" | ${SITE_NAME} Blog`;
  const description = `All blog posts tagged with "${decoded}" on Approachable.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  return (
    <>
      <Banner />
      <Header hideNav coursePage/>
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 min-w-0">
              <Link
                href="/blog"
                className="text-sm mb-8 inline-block"
                style={{ color: 'var(--accent)' }}
              >
                ← All posts
              </Link>

              <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Tag:{' '}
                <span style={{ color: 'var(--accent)' }}>{decoded}</span>
              </h1>
              <p className="mb-10 text-lg" style={{ color: 'var(--text-secondary)' }}>
                {posts.length} post{posts.length !== 1 ? 's' : ''}
              </p>

              {posts.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No posts for this tag yet.</p>
              ) : (
                <ul className="flex flex-col gap-10">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <div
                        className="rounded-xl overflow-hidden border"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        {post.coverImage && (
                          <Link href={`/blog/${post.slug}`} className="block relative w-full" style={{ aspectRatio: '16/7' }}>
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </Link>
                        )}
                        <div className="p-6" style={{ backgroundColor: 'var(--bg-warm)' }}>
                          <time
                            className="text-sm"
                            style={{ color: 'var(--text-muted)' }}
                            dateTime={post.date}
                          >
                            {post.date}
                          </time>
                          <h2 className="text-xl font-semibold mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>
                            <Link href={`/blog/${post.slug}`} className="hover:underline">
                              {post.title}
                            </Link>
                          </h2>
                          <p style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.tags.map((t) => (
                                <Link
                                  key={t}
                                  href={`/blog/tag/${encodeURIComponent(t)}`}
                                  className="inline-block rounded-full px-3 py-0.5 text-xs font-medium hover:opacity-80 transition-opacity"
                                  style={{ backgroundColor: 'var(--bg-accent-light)', color: 'var(--accent)' }}
                                >
                                  {t}
                                </Link>
                              ))}
                            </div>
                          )}
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-block mt-4 text-sm font-medium"
                            style={{ color: 'var(--accent)' }}
                          >
                            Read more →
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="lg:w-72 shrink-0 flex flex-col gap-6">
              <LatestPosts />
              <TagCounts />
              <ArchiveWidget />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

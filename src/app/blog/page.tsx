import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import LatestPosts from '@/components/LatestPosts';
import TagCounts from '@/components/TagCounts';
import ArchiveWidget from '@/components/ArchiveWidget';
import SubscribeForm from '@/components/SubscribeForm';
import JsonLd from '@/components/JsonLd';
import { getAllPosts } from '@/lib/posts';
import { buildBlogIndexSchema } from '@/lib/seo/blog-schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

// revalidate every 60 s so new CMS posts appear without a full redeploy
export const revalidate = 60;

const BLOG_DESCRIPTION = 'Insights on AI, learning, and making the most of tools like Claude.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog',
  description: BLOG_DESCRIPTION,
  path: '/blog',
  ogImageAlt: 'Approachable Blog — insights on AI and the Claude ecosystem',
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const blogSchema = buildBlogIndexSchema(posts.map((post) => ({ slug: post.slug, title: post.title })));

  return (
    <>
      <JsonLd data={blogSchema} />
      <Banner />
      <Header hideNav coursePage/>
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 min-w-0">
              <h1
                className="text-4xl font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                Blog
              </h1>
              <p className="mb-12 text-lg" style={{ color: 'var(--text-secondary)' }}>
                Thoughts on AI, learning, and the Claude ecosystem.
              </p>

              {posts.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No posts yet. Check back soon.</p>
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
                          <h2
                            className="text-xl font-semibold mt-1 mb-2"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            <Link href={`/blog/${post.slug}`} className="hover:underline">
                              {post.title}
                            </Link>
                          </h2>
                          <p style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.tags.map((tag) => (
                                <Link
                                  key={tag}
                                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                                  className="inline-block rounded-full px-3 py-0.5 text-xs font-medium hover:opacity-80 transition-opacity"
                                  style={{ backgroundColor: 'var(--bg-accent-light)', color: 'var(--accent)' }}
                                >
                                  {tag}
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
              <SubscribeForm />
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

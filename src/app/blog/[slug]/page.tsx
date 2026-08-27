import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import LatestPosts from '@/components/LatestPosts';
import TagCounts from '@/components/TagCounts';
import ArchiveWidget from '@/components/ArchiveWidget';
import SubscribeForm from '@/components/SubscribeForm';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

// allow slugs committed after the last build to be rendered on-demand
export const dynamicParams = true;
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Approachable`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Approachable`,
      description: post.excerpt,
      url: `https://approachable.dev/blog/${slug}`,
      ...(post.coverImage && { images: [{ url: post.coverImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — Approachable`,
      description: post.excerpt,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked(post.body);

  return (
    <>
    <Banner />
      <Header hideNav coursePage/>
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <div className="flex flex-col lg:flex-row gap-12">
            <article className="flex-1 min-w-0">
              <Link
                href="/blog"
                className="text-sm mb-8 inline-block"
                style={{ color: 'var(--accent)' }}
              >
                ← All posts
              </Link>

              <time
                className="block text-sm mb-2"
                style={{ color: 'var(--text-muted)' }}
                dateTime={post.date}
              >
                {post.date}
              </time>

              <h1
                className="text-4xl font-bold mb-4 leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {post.title}
              </h1>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
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

              <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
                {post.excerpt}
              </p>

              {post.coverImage && (
                <div className="relative w-full mb-10 rounded-xl overflow-hidden" style={{ aspectRatio: '16/7' }}>
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                </div>
              )}

              <div
                className="prose-content"
                style={{ color: 'var(--text-primary)' }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </article>

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

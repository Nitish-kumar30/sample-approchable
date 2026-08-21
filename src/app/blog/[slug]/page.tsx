import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

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
      <Header />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <article className="mx-auto max-w-[740px] px-6 py-20">
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
      </main>
      <Footer />
    </>
  );
}

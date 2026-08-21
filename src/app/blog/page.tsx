import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog — Approachable',
  description: 'Insights on AI, learning, and making the most of tools like Claude.',
  openGraph: {
    title: 'Blog — Approachable',
    description: 'Insights on AI, learning, and making the most of tools like Claude.',
    url: 'https://approachable.dev/blog',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="mx-auto max-w-[800px] px-6 py-20">
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
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-xl overflow-hidden border"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {post.coverImage && (
                      <div className="relative w-full" style={{ aspectRatio: '16/7' }}>
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
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
                        className="text-xl font-semibold mt-1 mb-2 group-hover:underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {post.title}
                      </h2>
                      <p style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
                      <span
                        className="inline-block mt-4 text-sm font-medium"
                        style={{ color: 'var(--accent)' }}
                      >
                        Read more →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

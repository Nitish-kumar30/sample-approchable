import type { Post } from '@/lib/posts';
import { SITE_URL } from '@/lib/seo/metadata';

function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

export function buildBlogPostSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Ranbeer Makin',
      url: 'https://www.linkedin.com/in/ranbeer/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Approachable',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(post.coverImage && { image: absoluteUrl(post.coverImage) }),
  };
}

export function buildBlogIndexSchema(posts: { slug: string; title: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Approachable Blog',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Approachable',
      url: SITE_URL,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };
}

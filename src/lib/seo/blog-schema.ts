import type { Post } from '@/lib/posts';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seo/site';

const BLOG_PATH = '/blog';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BLOG_ID = `${SITE_URL}${BLOG_PATH}#blog`;
const AUTHOR_NAME = 'Ranbeer Makin';
const AUTHOR_URL = 'https://www.linkedin.com/in/ranbeer/';

function normalizeSchemaDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

function blogPostUrl(slug: string): string {
  return absoluteUrl(`/blog/${slug}`);
}

function schemaImageUrl(imagePath?: string): string {
  if (!imagePath) return absoluteUrl(DEFAULT_OG_IMAGE);
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  return absoluteUrl(imagePath);
}

export function buildBlogIndexSchema(posts: Post[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl('/logo.png'),
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'Blog',
        '@id': BLOG_ID,
        url: absoluteUrl(BLOG_PATH),
        name: `${SITE_NAME} Blog`,
        description: 'Insights on AI, learning, and making the most of tools like Claude.',
        inLanguage: 'en',
        publisher: { '@id': ORGANIZATION_ID },
        isPartOf: { '@id': WEBSITE_ID },
        blogPost: posts.map((post) => ({ '@id': `${blogPostUrl(post.slug)}#blogposting` })),
      },
    ],
  };
}

export function buildBlogPostSchema(post: Post) {
  const postUrl = blogPostUrl(post.slug);
  const datePublished = normalizeSchemaDate(post.date);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl('/logo.png'),
      },
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#blogposting`,
        headline: post.title,
        description: post.excerpt,
        image: schemaImageUrl(post.coverImage),
        datePublished,
        dateModified: datePublished,
        inLanguage: 'en',
        keywords: post.tags,
        mainEntityOfPage: postUrl,
        author: {
          '@type': 'Person',
          name: AUTHOR_NAME,
          url: AUTHOR_URL,
        },
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  };
}

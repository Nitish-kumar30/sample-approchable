import { getAllPosts } from '@/lib/posts';
import { SITE_NAME, absoluteUrl } from '@/lib/seo/site';

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const postUrl = absoluteUrl(`/blog/${post.slug}`);
      const pubDate = new Date(post.date);
      const safeDate = Number.isNaN(pubDate.getTime()) ? new Date().toUTCString() : pubDate.toUTCString();

      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${postUrl}</link>
  <guid>${postUrl}</guid>
  <pubDate>${safeDate}</pubDate>
  <description>${escapeXml(post.excerpt)}</description>
</item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(`${SITE_NAME} Blog`)}</title>
  <link>${absoluteUrl('/blog')}</link>
  <description>Insights on AI, Claude, learning, and practical workflows from ${SITE_NAME}.</description>
  <language>en-us</language>
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

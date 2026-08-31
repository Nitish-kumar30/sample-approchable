import type { MetadataRoute } from 'next';
import { ALL_CATALOG_SLUGS } from '@/lib/course-content';
import { getAllPosts, getAllTags } from '@/lib/posts';

const BASE_URL = 'https://approachable.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/courses`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/team-ai-training`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/archive`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = ALL_CATALOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/courses/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const tagRoutes: MetadataRoute.Sitemap = getAllTags()
    .filter(({ count }) => count > 1)
    .map(({ tag }) => ({
      url: `${BASE_URL}/blog/tag/${encodeURIComponent(tag)}`,
      changeFrequency: 'weekly',
      priority: 0.4,
    }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...tagRoutes];
}

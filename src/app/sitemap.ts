import type { MetadataRoute } from 'next';
import { ALL_CATALOG_SLUGS } from '@/lib/course-content';

const BASE_URL = 'https://approachable.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/courses`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/corporate-training`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/live-courses`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = ALL_CATALOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/courses/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes];
}

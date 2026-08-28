import type { MetadataRoute } from 'next';
import { ALL_CATALOG_SLUGS } from '@/lib/course-content';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { absoluteUrl } from '@/lib/seo/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const posts = getAllPosts();
  const tags = getAllTags();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/courses'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/corporate-training'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/corporate-training/inquiry'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/archive'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = ALL_CATALOG_SLUGS.map((slug) => ({
    url: absoluteUrl(`/courses/${slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const postDate = new Date(post.date);
    return {
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: Number.isNaN(postDate.getTime()) ? lastModified : postDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  const blogTagRoutes: MetadataRoute.Sitemap = tags.map(({ tag }) => ({
    url: absoluteUrl(`/blog/tag/${encodeURIComponent(tag)}`),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...blogTagRoutes];
}

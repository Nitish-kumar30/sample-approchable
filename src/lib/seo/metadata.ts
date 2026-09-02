import type { Metadata } from 'next';

export const SITE_URL = 'https://approachable.dev';
export const SITE_NAME = 'Approachable';
export const DEFAULT_OG_IMAGE = '/img/og-image.png';
export const DEFAULT_OG_IMAGE_ALT = 'Approachable — making AI approachable for everyone';

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article';
  robots?: Metadata['robots'];
}

export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  ogType = 'website',
  robots,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(robots && { robots }),
    openGraph: {
      type: ogType,
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

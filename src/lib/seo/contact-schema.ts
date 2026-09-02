import { SITE_URL } from '@/lib/seo/metadata';

export function buildContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Approachable',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Approachable',
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: `${SITE_URL}/contact`,
      },
    },
  };
}

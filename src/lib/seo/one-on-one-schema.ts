import { ONE_ON_ONE_PACKAGES } from '@/data/one-on-one';
import { SITE_NAME, absoluteUrl } from '@/lib/seo/site';

const PATH = '/one-on-one-ai-training';

export function buildOneOnOneSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': absoluteUrl(`${PATH}#webpage`),
        url: absoluteUrl(PATH),
        name: `1-1 AI Training | ${SITE_NAME}`,
        description:
          'Private 1-1 AI training with Ranbeer: a Custom package from $1,200 or a Standard package at $675. Two 90-minute sessions over two weeks.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': absoluteUrl('/#website'),
          url: absoluteUrl('/'),
          name: SITE_NAME,
        },
      },
      {
        '@type': 'ItemList',
        '@id': absoluteUrl(`${PATH}#offers`),
        name: '1-1 AI training packages',
        numberOfItems: ONE_ON_ONE_PACKAGES.length,
        itemListElement: ONE_ON_ONE_PACKAGES.map((pkg, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Offer',
            name: `1-1 AI Training — ${pkg.name}`,
            description: pkg.blurb,
            price: pkg.id === 'custom' ? '1200' : '675',
            priceCurrency: 'USD',
            url: absoluteUrl(PATH),
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: absoluteUrl('/'),
            },
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '1-1 AI Training',
            item: absoluteUrl(PATH),
          },
        ],
      },
    ],
  };
}

import { COHORT } from '@/lib/cohort-config';

const SITE_URL = 'https://approachable.dev';

export interface FaqItem {
  q: string;
  a: string;
}

const COURSE_TITLE = 'Claude AI Cohort — Master the Claude Ecosystem in 6 Weeks';
const COURSE_DESCRIPTION =
  'A small-group, mentor-led cohort on the full Claude ecosystem — Claude Chat, Claude Code, Claude Cowork, and the API. 20 seats. Live sessions. Real projects.';

export function buildCohortSchema(faq: FaqItem[]) {
  const startDate = new Date(COHORT.date).toISOString().split('T')[0];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Approachable',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
      },
      {
        '@type': 'Course',
        name: COURSE_TITLE,
        description: COURSE_DESCRIPTION,
        url: SITE_URL,
        provider: { '@id': `${SITE_URL}/#organization` },
        instructor: {
          '@type': 'Person',
          name: 'Ranbeer Makin',
          url: 'https://www.linkedin.com/in/ranbeer/',
        },
        courseMode: 'online',
        offers: [
          {
            '@type': 'Offer',
            price: '4999',
            priceCurrency: 'INR',
            url: COHORT.formUrl,
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            price: '129',
            priceCurrency: 'USD',
            url: COHORT.formUrl,
            availability: 'https://schema.org/InStock',
          },
        ],
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          startDate,
          instructor: {
            '@type': 'Person',
            name: 'Ranbeer Makin',
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };
}

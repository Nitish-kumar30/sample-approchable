import { SITE_URL } from '@/lib/seo/metadata';

export function buildAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Approachable',
    url: `${SITE_URL}/about`,
    description:
      'Approachable helps working professionals go from AI Curious to AI Capable through mentor-led cohorts, hands-on courses, and team training on the Claude ecosystem.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Approachable',
      url: SITE_URL,
      description: 'Making AI approachable for everyone — mentor-led cohorts, courses, and team training.',
      founder: {
        '@type': 'Person',
        name: 'Ranbeer Makin',
        jobTitle: 'AI Educator & Claude Partner',
        url: 'https://www.linkedin.com/in/ranbeer/',
      },
    },
  };
}

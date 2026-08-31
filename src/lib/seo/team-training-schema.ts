import { SITE_URL } from '@/lib/seo/metadata';

const TEAM_TRAINING_DESCRIPTION =
  'A four-week, hands-on AI implementation program for teams. Build practical AI workflows, automate one real task, and ship a working prototype.';

const TEAM_FAQ = [
  {
    q: "We're a small team — is this overkill?",
    a: "No. It's designed specifically for teams without a dedicated AI or L&D department. The goal is practical implementation, not a large transformation project.",
  },
  {
    q: 'Do we need everyone to already use AI?',
    a: 'No. Some familiarity helps, but the program is designed to create a shared baseline and shared workflows across the team.',
  },
  {
    q: 'Is this a pitch for one AI tool?',
    a: 'No. The program can cover Claude, ChatGPT, Gemini, Copilot and other tools. The focus is choosing what works for the job.',
  },
  {
    q: 'Virtual, on-site, or hybrid?',
    a: 'Virtual preferred. Open to travel, based on initial call.',
  },
  {
    q: "What if it doesn't work for us?",
    a: "The intro assessment is designed to establish fit before you commit. We'll tell you honestly if the program isn't appropriate for your team.",
  },
];

export function buildTeamTrainingSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        name: 'Practical AI Implementation for Teams',
        description: TEAM_TRAINING_DESCRIPTION,
        url: `${SITE_URL}/team-ai-training`,
        provider: {
          '@type': 'Organization',
          name: 'Approachable',
          url: SITE_URL,
        },
        courseMode: 'online',
      },
      {
        '@type': 'FAQPage',
        mainEntity: TEAM_FAQ.map((item) => ({
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

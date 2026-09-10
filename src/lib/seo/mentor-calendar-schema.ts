import {
  EVENT_TYPE_LABELS,
  MENTOR_EVENTS,
  type MentorEvent,
} from '@/data/mentor-calendar';
import { SITE_NAME, absoluteUrl } from '@/lib/seo/site';

const MENTOR_CALENDAR_PATH = '/mentor-calendar';

function eventStartDate(event: MentorEvent): string {
  if (event.type === 'assignment') {
    return `${event.date}T23:59:00+05:30`;
  }
  if (event.time.startsWith('7:30 PM')) {
    return `${event.date}T19:30:00+05:30`;
  }
  if (event.time.startsWith('10:00 AM')) {
    return `${event.date}T10:00:00+05:30`;
  }
  return `${event.date}T19:30:00+05:30`;
}

export function buildMentorCalendarSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': absoluteUrl(`${MENTOR_CALENDAR_PATH}#webpage`),
        url: absoluteUrl(MENTOR_CALENDAR_PATH),
        name: `Mentor Calendar | ${SITE_NAME}`,
        description:
          'A sample week-by-week mentor calendar for the Approachable live AI cohort: live sessions, office hours, and assignments.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': absoluteUrl('/#website'),
          url: absoluteUrl('/'),
          name: SITE_NAME,
        },
      },
      {
        '@type': 'ItemList',
        '@id': absoluteUrl(`${MENTOR_CALENDAR_PATH}#itemlist`),
        name: 'Sample mentor calendar',
        numberOfItems: MENTOR_EVENTS.length,
        itemListElement: MENTOR_EVENTS.map((event, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Event',
            name: event.title,
            description: event.summary,
            startDate: eventStartDate(event),
            eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
              '@type': 'VirtualLocation',
              url: absoluteUrl(MENTOR_CALENDAR_PATH),
            },
            organizer: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: absoluteUrl('/'),
            },
            performer: {
              '@type': 'Person',
              name: 'Ranbeer Makin',
            },
            additionalType: EVENT_TYPE_LABELS[event.type],
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
            name: 'Mentor Calendar',
            item: absoluteUrl(MENTOR_CALENDAR_PATH),
          },
        ],
      },
    ],
  };
}

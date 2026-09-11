import {
  OFFERING_LABELS,
  STATUS_LABELS,
  deriveWindowStatus,
  getVisibleWindows,
  type AvailabilityWindow,
} from '@/data/mentor-calendar';
import { SITE_NAME, absoluteUrl } from '@/lib/seo/site';

const MENTOR_CALENDAR_PATH = '/mentor-calendar';

function windowStartDate(window: AvailabilityWindow): string {
  return `${window.startDate}T09:00:00+05:30`;
}

function eventStatus(window: AvailabilityWindow): string {
  const status = deriveWindowStatus(window);
  if (status === 'closed') return 'https://schema.org/EventCancelled';
  return 'https://schema.org/EventScheduled';
}

export function buildMentorCalendarSchema() {
  const windows = getVisibleWindows();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': absoluteUrl(`${MENTOR_CALENDAR_PATH}#webpage`),
        url: absoluteUrl(MENTOR_CALENDAR_PATH),
        name: `Mentor Calendar | ${SITE_NAME}`,
        description:
          'Mentor availability for Approachable team training, 1-1 training, and live AI cohorts. Request an open window — dates are confirmed after the enquiry.',
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
        name: 'Mentor availability windows',
        numberOfItems: windows.length,
        itemListElement: windows.map((window, index) => {
          const status = deriveWindowStatus(window);
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Event',
              name: window.title,
              description: window.summary,
              startDate: windowStartDate(window),
              ...(window.endDate ? { endDate: `${window.endDate}T18:00:00+05:30` } : {}),
              eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
              eventStatus: eventStatus(window),
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
              additionalType: `${OFFERING_LABELS[window.offering]} · ${STATUS_LABELS[status]}`,
            },
          };
        }),
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

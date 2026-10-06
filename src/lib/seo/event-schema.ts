import type { PublicEvent } from "@/lib/events/types";
import { eventDescriptionExcerpt } from "@/lib/events/eventDescriptionExcerpt";
import { eventEndsAt } from "@/lib/events/publicEvents";
import { SITE_URL } from "@/lib/seo/metadata";

function absoluteImage(url: string): string | undefined {
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("http") ? trimmed : `${SITE_URL}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}

export function buildEventSchema(event: PublicEvent): Record<string, unknown> {
  const description = eventDescriptionExcerpt(event.description, 300) || event.title;
  const image = absoluteImage(event.banner_url);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description,
    startDate: new Date(event.start_at).toISOString(),
    endDate: eventEndsAt(event).toISOString(),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: `${SITE_URL}/events/${event.slug}`,
    ...(image ? { image } : {}),
    location: {
      "@type": "VirtualLocation",
      url: `${SITE_URL}/events/${event.slug}`,
    },
    organizer: {
      "@type": "Organization",
      name: "Approachable",
      url: SITE_URL,
    },
    performer: {
      "@type": "Person",
      name: event.host_name,
    },
  };
}

export function buildEventsListSchema(events: { slug: string; title: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: event.title,
      url: `${SITE_URL}/events/${event.slug}`,
    })),
  };
}

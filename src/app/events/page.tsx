import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { eventDescriptionExcerpt } from "@/lib/events/eventDescriptionExcerpt";
import { formatEventDateTime } from "@/lib/events/formatEventDateTime";
import { getPublicEvents, splitPublicEvents } from "@/lib/events/publicEvents";
import type { PublicEvent } from "@/lib/events/types";
import { buildEventsListSchema } from "@/lib/seo/event-schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import catalog from "../courses/courses.module.css";
import styles from "./events.module.css";

export const revalidate = 60;

const EVENTS_DESCRIPTION = "Upcoming and past live sessions from Approachable.";

export const metadata: Metadata = buildPageMetadata({
  title: "Live Events",
  description: EVENTS_DESCRIPTION,
  path: "/events",
  ogImageAlt: "Approachable live events",
});

function EventCard({ event, upcoming }: { event: PublicEvent; upcoming: boolean }) {
  const excerpt = eventDescriptionExcerpt(event.description);
  return (
    <Link
      href={`/events/${event.slug}`}
      className={`${catalog.card} ${styles.card}${upcoming ? ` ${styles.upcoming}` : ""}`}
    >
      <div className={catalog.cardImage}>
        {event.banner_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.banner_url} alt="" />
        ) : null}
      </div>
      <div className={catalog.cardBody}>
        {!upcoming ? (
          <span className={catalog.tag}>
            {event.has_recording ? "Recording available" : "Recording coming soon"}
          </span>
        ) : null}
        <h3>{event.title}</h3>
        {excerpt ? <p>{excerpt}</p> : null}
        <div className={styles.meta}>
          {event.host_name ? <span>{event.host_name}</span> : null}
          <time dateTime={event.start_at}>{formatEventDateTime(event.start_at)}</time>
          <span>{event.rsvp_count} participants</span>
        </div>
        <span className={catalog.cardLink}>View details →</span>
      </div>
    </Link>
  );
}

export default function EventsPage() {
  const { upcoming, past } = splitPublicEvents(getPublicEvents());
  const listSchema = buildEventsListSchema(
    [...upcoming, ...past].map((event) => ({ slug: event.slug, title: event.title })),
  );

  return (
    <>
      <JsonLd data={listSchema} />
      <Header navVariant="events" />
      <main className={catalog.page}>
        <div className={`${catalog.container} ${styles.list}`}>
          <h1 className={styles.title}>Live Events</h1>

          <div className={styles.divider}>Upcoming events</div>
          {upcoming.length > 0 ? (
            <div className={styles.grid}>
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} upcoming />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No upcoming events.</p>
          )}

          {past.length > 0 ? (
            <>
              <div className={styles.divider}>Past Events</div>
              <div className={styles.grid}>
                {past.map((event) => (
                  <EventCard key={event.id} event={event} upcoming={false} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}

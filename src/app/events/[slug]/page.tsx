import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { eventDescriptionExcerpt } from "@/lib/events/eventDescriptionExcerpt";
import { formatEventDateTime, formatEventDuration } from "@/lib/events/formatEventDateTime";
import { getPublicEventBySlug, getPublicEvents, isEventPast, learnerEventUrl } from "@/lib/events/publicEvents";
import type { PublicEvent } from "@/lib/events/types";
import { buildEventSchema } from "@/lib/seo/event-schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import course from "../../courses/[slug]/course.module.css";
import styles from "./event.module.css";
import { getSectionIcon } from "@/lib/course-content";

export const revalidate = 60;
export const dynamicParams = true;

type EventSection = { heading: string | null; html: string };

function splitEventSections(html: string): EventSection[] {
  const pattern = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
  const sections: EventSection[] = [];
  let lastIndex = 0;
  let current: EventSection | null = null;

  for (const match of html.matchAll(pattern)) {
    const index = match.index ?? 0;
    const before = html.slice(lastIndex, index).trim();
    if (!current) {
      if (before) sections.push({ heading: null, html: before });
    } else {
      current.html = before;
      sections.push(current);
    }
    const heading = match[1]
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
      .trim();
    current = { heading, html: "" };
    lastIndex = index + match[0].length;
  }

  const rest = html.slice(lastIndex).trim();
  if (current) {
    current.html = rest;
    sections.push(current);
  } else if (rest) {
    sections.push({ heading: null, html: rest });
  }
  return sections;
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublicEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getPublicEventBySlug(slug);
  if (!event) return {};
  const description =
    eventDescriptionExcerpt(event.description, 160) || `${event.title} — a live session from Approachable.`;
  return buildPageMetadata({
    title: event.title,
    description,
    path: `/events/${event.slug}`,
    ogImage: event.banner_url || undefined,
    ogImageAlt: event.title,
  });
}

function EventPanel({ event, past }: { event: PublicEvent; past: boolean }) {
  const registerUrl = learnerEventUrl(event.slug);
  const facts = [
    { label: "Time", value: formatEventDateTime(event.start_at) },
    { label: "Duration", value: formatEventDuration(event.duration_minutes) },
    { label: "Host", value: event.host_name || "Approachable" },
    { label: "Participants", value: String(event.rsvp_count) },
  ];

  return (
    <aside className="course-info-panel card-elevated">
      {event.host_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.hostImage} src={event.host_image_url} alt={event.host_name} />
      ) : null}
      <div className="panel-body">
        <div className={styles.actions}>
          {!past ? (
            <a className="btn-primary btn-block" href={registerUrl} target="_blank" rel="noopener noreferrer">
              RSVP
            </a>
          ) : null}
          {event.has_recording ? (
            <a className={past ? "btn-primary btn-block" : "btn-secondary"} href={registerUrl}>
              Watch on the learning platform
            </a>
          ) : null}
        </div>
        <ul className="panel-details">
          {facts.map((row) => (
            <li key={row.label}>
              <span className="panel-label">{row.label}</span>
              <strong className="panel-value">{row.value}</strong>
            </li>
          ))}
        </ul>
        {!past ? (
          <p className={styles.note}>
            Sign in on the learning platform to RSVP. The meeting link is shared there.
          </p>
        ) : null}
        {past && !event.has_recording ? <p className={styles.note}>Recording coming soon</p> : null}
      </div>
    </aside>
  );
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getPublicEventBySlug(slug);
  if (!event) notFound();

  const past = isEventPast(event);
  const descriptionHtml = event.description.trim() ? await marked(event.description) : "";
  const sections = descriptionHtml ? splitEventSections(descriptionHtml) : [];

  return (
    <>
      <JsonLd data={buildEventSchema(event)} />
      <Header navVariant="events" showBackToEvents />
      <div className={`${course.page} ${styles.page}`}>
        <main className={course.main}>
          <div className={`${course.container} ${styles.wide}`}>
            <div className={`${course.courseLayout} ${styles.layout}`}>
              <div className={course.headerRow}>
                <div>
                  <h1 className={`${course.title} ${styles.pageTitle}`}>{event.title}</h1>
                  {event.host_name ? <p className={course.mentor}>Hosted by {event.host_name}</p> : null}
                </div>
              </div>

              <EventPanel event={event} past={past} />

              <div className={course.courseBody}>
                {sections.map((section, index) => {
                  const sessionDetails = section.heading?.trim().toLowerCase() === "session details";
                  return (
                  <section
                    className={`${course.sectionCard}${sessionDetails ? ` ${styles.session}` : ""}`}
                    key={section.heading ?? `lead-${index}`}
                  >
                    {section.heading ? (
                      <div className={course.sectionCardHeader}>
                        <span className={course.sectionCardIcon} aria-hidden="true">
                          {getSectionIcon(section.heading)}
                        </span>
                        <h2 className={`${course.sectionCardTitle} ${styles.sectionTitle}`}>{section.heading}</h2>
                      </div>
                    ) : null}
                    {section.html ? (
                      <div
                        className={`${course.sectionCardBody} ${course.prose} ${styles.prose}`}
                        dangerouslySetInnerHTML={{ __html: section.html }}
                      />
                    ) : null}
                  </section>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

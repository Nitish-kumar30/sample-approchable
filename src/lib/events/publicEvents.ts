import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PublicEvent } from "@/lib/events/types";

const EVENTS_DIR = path.join(process.cwd(), "content/events");
const LEARNER_ORIGIN = "https://learn.approachable.dev";

export function learnerEventUrl(slug: string): string {
  return `${LEARNER_ORIGIN}/events/${encodeURIComponent(slug)}`;
}

export function eventEndsAt(event: Pick<PublicEvent, "start_at" | "duration_minutes">): Date {
  return new Date(new Date(event.start_at).getTime() + event.duration_minutes * 60_000);
}

/** Past once start plus duration has elapsed. Matches the learner app. */
export function isEventPast(
  event: Pick<PublicEvent, "start_at" | "duration_minutes">,
  now: Date = new Date(),
): boolean {
  return now.getTime() >= eventEndsAt(event).getTime();
}

export function splitPublicEvents(events: PublicEvent[], now: Date = new Date()) {
  const upcoming = events
    .filter((event) => !isEventPast(event, now))
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
  const past = events
    .filter((event) => isEventPast(event, now))
    .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime());
  return { upcoming, past };
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function readEventFile(filePath: string): PublicEvent | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  if (data.draft === true) return null;

  const slug = asString(data.slug) || path.basename(filePath, ".md");
  const title = asString(data.title);
  const startAt = data.startAt instanceof Date ? data.startAt.toISOString() : asString(data.startAt);
  const duration = asNumber(data.durationMinutes);
  if (!slug || !title || !startAt || duration <= 0) return null;

  return {
    id: slug,
    slug,
    title,
    description: content.trim(),
    banner_url: asString(data.banner),
    host_name: asString(data.hostName),
    host_image_url: asString(data.hostImage),
    start_at: startAt,
    duration_minutes: duration,
    has_recording: data.hasRecording === true,
    rsvp_count: asNumber(data.participants),
  };
}

/** Events checked into content/events. No database and no blob storage. */
export function getPublicEvents(): PublicEvent[] {
  if (!fs.existsSync(EVENTS_DIR)) return [];
  return fs
    .readdirSync(EVENTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .flatMap((name) => {
      const event = readEventFile(path.join(EVENTS_DIR, name));
      return event ? [event] : [];
    });
}

export function getPublicEventBySlug(slug: string): PublicEvent | null {
  return getPublicEvents().find((event) => event.slug === slug) ?? null;
}

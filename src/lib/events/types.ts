/** Published event fields safe to show on the marketing site. Meeting and recording URLs stay on the learner app. */
export type PublicEvent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  banner_url: string;
  host_name: string;
  host_image_url: string;
  /** UTC ISO-8601 timestamp. */
  start_at: string;
  duration_minutes: number;
  has_recording: boolean;
  rsvp_count: number;
};

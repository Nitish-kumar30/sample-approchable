const IST_TIME_ZONE = "Asia/Kolkata";

function part(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((item) => item.type === type)?.value ?? "";
}

function eventParts(isoUtc: string): Intl.DateTimeFormatPart[] {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIME_ZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date(isoUtc));
}

/** Date only in India time, e.g. "Thu, 15 Oct". */
export function formatEventDate(isoUtc: string): string {
  const parts = eventParts(isoUtc);
  return `${part(parts, "weekday")}, ${part(parts, "day")} ${part(parts, "month")}`;
}

/** Clock time only in India time, e.g. "7:00 PM IST". */
export function formatEventTime(isoUtc: string): string {
  const parts = eventParts(isoUtc);
  const hour = part(parts, "hour");
  const minute = part(parts, "minute");
  const dayPeriod = part(parts, "dayPeriod").toUpperCase();
  return `${hour}:${minute} ${dayPeriod} IST`;
}

/** Formats a UTC ISO timestamp in India time, e.g. "Tue, 6 Oct, 2:00 AM IST". */
export function formatEventDateTime(isoUtc: string): string {
  return `${formatEventDate(isoUtc)}, ${formatEventTime(isoUtc)}`;
}

/** Compact label for a duration stored as minutes, e.g. "90m" or "1h 30m". */
export function formatEventDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours === 0) return `${remainder}m`;
  if (remainder === 0) return `${hours}h`;
  return `${hours}h ${remainder}m`;
}

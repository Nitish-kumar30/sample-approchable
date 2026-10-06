const IST_TIME_ZONE = "Asia/Kolkata";

function part(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((item) => item.type === type)?.value ?? "";
}

/** Formats a UTC ISO timestamp in India time, e.g. "Tue, 6 Oct, 2:00 AM IST". */
export function formatEventDateTime(isoUtc: string): string {
  const date = new Date(isoUtc);
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIME_ZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const weekday = part(parts, "weekday");
  const day = part(parts, "day");
  const month = part(parts, "month");
  const hour = part(parts, "hour");
  const minute = part(parts, "minute");
  const dayPeriod = part(parts, "dayPeriod").toUpperCase();

  return `${weekday}, ${day} ${month}, ${hour}:${minute} ${dayPeriod} IST`;
}

/** Compact label for a duration stored as minutes, e.g. "90m" or "1h 30m". */
export function formatEventDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours === 0) return `${remainder}m`;
  if (remainder === 0) return `${hours}h`;
  return `${hours}h ${remainder}m`;
}

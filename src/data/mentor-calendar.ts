import { COHORT } from '@/lib/cohort-config';

export type OfferingId = 'team-training' | 'one-on-one' | 'cohort';

export type WindowStatus = 'open' | 'limited' | 'waitlist' | 'full' | 'closed';

export type OfferingFilter = 'all' | OfferingId;

export type AvailabilityWindow = {
  id: string;
  offering: OfferingId;
  startDate: string;
  endDate?: string;
  title: string;
  summary: string;
  timezone?: string;
  seatsNote?: string;
  featured?: boolean;
  capacity?: Exclude<WindowStatus, 'full' | 'closed'>;
};

export type OfferingMeta = {
  id: OfferingId;
  label: string;
  shortLabel: string;
  href: string;
  ctaLabel: string;
  currentlyTaking: boolean;
  emptyMessage: string;
};

export type MonthCell = {
  date: string;
  dayNumber: number;
  inMonth: boolean;
  offerings: OfferingId[];
};

export type OfferingSnapshot = {
  offering: OfferingMeta;
  status: WindowStatus;
  nextWindow: AvailabilityWindow | null;
  windowCount: number;
};

export type HeroStats = {
  nextOpenLabel: string;
  openOfferingCount: number;
  timezone: string;
  updatedAtLabel: string;
};

export const OFFERING_IDS: OfferingId[] = ['team-training', 'one-on-one', 'cohort'];

export const OFFERING_FILTERS: { id: OfferingFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'team-training', label: 'Team' },
  { id: 'one-on-one', label: '1-1' },
  { id: 'cohort', label: 'Cohort' },
];

export const OFFERING_LABELS: Record<OfferingId, string> = {
  'team-training': 'Team training',
  'one-on-one': '1-1 training',
  cohort: 'Live AI Cohort',
};

export const STATUS_LABELS: Record<WindowStatus, string> = {
  open: 'Open',
  limited: 'Limited',
  waitlist: 'Waitlist',
  full: 'Full',
  closed: 'Closed',
};

export const STATUS_LEGEND: WindowStatus[] = ['open', 'limited', 'waitlist', 'full'];

export const MENTOR_AVAILABILITY = {
  updatedAt: '2026-09-10',
  timezone: 'IST / US Eastern',
};

export const OFFERINGS: OfferingMeta[] = [
  {
    id: 'team-training',
    label: 'Team training',
    shortLabel: 'Team',
    href: '/team-ai-training',
    ctaLabel: 'Enquire about team training',
    currentlyTaking: true,
    emptyMessage: 'Not taking new teams right now — leave a note on Contact.',
  },
  {
    id: 'one-on-one',
    label: '1-1 training',
    shortLabel: '1-1',
    href: '/contact?topic=one-on-one',
    ctaLabel: 'Enquire about 1-1 training',
    currentlyTaking: true,
    emptyMessage: 'Not taking 1-1 right now — leave a note on Contact.',
  },
  {
    id: 'cohort',
    label: 'Live AI Cohort',
    shortLabel: 'Cohort',
    href: '/',
    ctaLabel: 'See the Live AI Cohort',
    currentlyTaking: true,
    emptyMessage: 'The next cohort date is not on the calendar yet — check the cohort page.',
  },
];

const CONFIGURED_WINDOWS: AvailabilityWindow[] = [
  {
    id: 'team-oct-2026',
    offering: 'team-training',
    startDate: '2026-10-06',
    endDate: '2026-11-14',
    title: 'October–November team intake',
    summary:
      'A live working-session series for a company team. Dates are confirmed after we know headcount, timezone, and what the team needs to ship.',
    timezone: MENTOR_AVAILABILITY.timezone,
    seatsNote: '2 company slots',
    featured: true,
    capacity: 'limited',
  },
  {
    id: 'one-on-one-oct',
    offering: 'one-on-one',
    startDate: '2026-10-06',
    endDate: '2026-10-17',
    title: '1-1 sessions from the week of Oct 6',
    summary:
      'Two 90-minute sessions over two weeks. Exact days are set once we know Custom or Standard, and what you need the two weeks to cover.',
    timezone: MENTOR_AVAILABILITY.timezone,
    seatsNote: '2 of 4 slots',
    featured: true,
    capacity: 'limited',
  },
  {
    id: 'one-on-one-nov',
    offering: 'one-on-one',
    startDate: '2026-11-03',
    endDate: '2026-11-14',
    title: '1-1 sessions from the week of Nov 3',
    summary:
      'A second 1-1 window later in the fall. Same Custom and Standard packages — request this window and we confirm dates after the enquiry.',
    timezone: MENTOR_AVAILABILITY.timezone,
    seatsNote: '4 slots',
    capacity: 'open',
  },
];

const WEEKDAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const MONTH_INDEX: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseUtcDate(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00Z`);
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(isoDate: string, days: number): string {
  const date = parseUtcDate(isoDate);
  date.setUTCDate(date.getUTCDate() + days);
  return toIsoDate(date);
}

export function todayIso(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function parseDisplayDate(label: string): string | null {
  const match = label.trim().match(/^([A-Za-z]{3}) (\d{1,2}), (\d{4})$/);
  if (!match) return null;
  const month = MONTH_INDEX[match[1]];
  if (month === undefined) return null;
  const day = Number(match[2]);
  const year = Number(match[3]);
  if (!Number.isInteger(day) || !Number.isInteger(year) || day < 1 || day > 31) return null;
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function windowEnd(window: AvailabilityWindow): string {
  return window.endDate ?? window.startDate;
}

export function windowOverlapsDate(window: AvailabilityWindow, isoDate: string): boolean {
  return window.startDate <= isoDate && windowEnd(window) >= isoDate;
}

export function windowOverlapsMonth(window: AvailabilityWindow, monthKey: string): boolean {
  const monthStart = `${monthKey}-01`;
  const monthEnd = toIsoDate(new Date(Date.UTC(Number(monthKey.slice(0, 4)), Number(monthKey.slice(5, 7)), 0, 12)));
  return window.startDate <= monthEnd && windowEnd(window) >= monthStart;
}

function cohortStatus(state: typeof COHORT.state, seatsLeft: number): WindowStatus {
  if (state === 'soldout') return 'full';
  if (state === 'early') return 'limited';
  if (seatsLeft <= 3) return 'limited';
  return 'open';
}

export function cohortWindowFromConfig(): AvailabilityWindow | null {
  const startDate = parseDisplayDate(COHORT.date);
  if (!startDate) return null;
  const status = cohortStatus(COHORT.state, COHORT.seatsLeft);
  const seatsLine =
    status === 'full'
      ? 'This cohort is full — join the waitlist on the cohort page.'
      : `${COHORT.seatsLeft} of ${COHORT.seatsTotal} seats left.`;

  return {
    id: 'cohort-next',
    offering: 'cohort',
    startDate,
    title: `Live AI Cohort — ${COHORT.date}`,
    summary: `Thursday live sessions at ${COHORT.time}. ${COHORT.seatsTotal} seats in a mentor-led study group. ${seatsLine}`,
    timezone: COHORT.time,
    seatsNote: status === 'full' ? 'Sold out' : `${COHORT.seatsLeft} of ${COHORT.seatsTotal} seats left`,
    featured: true,
    capacity: status === 'full' ? 'waitlist' : status === 'limited' ? 'limited' : 'open',
  };
}

function allWindows(): AvailabilityWindow[] {
  const cohort = cohortWindowFromConfig();
  return cohort ? [...CONFIGURED_WINDOWS, cohort] : CONFIGURED_WINDOWS;
}

export function getOffering(id: OfferingId): OfferingMeta {
  return OFFERINGS.find((offering) => offering.id === id) ?? OFFERINGS[0];
}

export function deriveWindowStatus(window: AvailabilityWindow, today = todayIso()): WindowStatus {
  const offering = getOffering(window.offering);
  if (window.offering === 'cohort') {
    return cohortStatus(COHORT.state, COHORT.seatsLeft);
  }
  if (!offering.currentlyTaking) return 'closed';
  if (windowEnd(window) < today) return 'closed';
  return window.capacity ?? 'open';
}

export function getVisibleWindows(today = todayIso()): AvailabilityWindow[] {
  return allWindows()
    .filter((window) => {
      if (window.offering === 'cohort') return true;
      return windowEnd(window) >= today;
    })
    .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.id.localeCompare(b.id));
}

export function getWindowsForFilter(
  filter: OfferingFilter,
  today = todayIso(),
): AvailabilityWindow[] {
  const windows = getVisibleWindows(today);
  if (filter === 'all') return windows;
  return windows.filter((window) => window.offering === filter);
}

export function getWindowsForMonth(
  windows: AvailabilityWindow[],
  monthKey: string,
  selectedDate?: string | null,
): AvailabilityWindow[] {
  return windows.filter((window) => {
    if (!windowOverlapsMonth(window, monthKey)) return false;
    if (selectedDate) return windowOverlapsDate(window, selectedDate);
    return true;
  });
}

export function monthKeyFromIso(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function shiftMonth(monthKey: string, delta: number): string {
  const year = Number(monthKey.slice(0, 4));
  const month = Number(monthKey.slice(5, 7));
  const date = new Date(Date.UTC(year, month - 1 + delta, 1, 12));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function getDefaultMonthKey(today = todayIso()): string {
  const nextOpen = getVisibleWindows(today).find((window) => {
    const status = deriveWindowStatus(window, today);
    return status === 'open' || status === 'limited';
  });
  if (nextOpen) return monthKeyFromIso(nextOpen.startDate);
  const first = getVisibleWindows(today)[0];
  return first ? monthKeyFromIso(first.startDate) : monthKeyFromIso(today);
}

export function getMonthBounds(today = todayIso()): { min: string; max: string } {
  const windows = getVisibleWindows(today);
  const keys = windows.map((window) => monthKeyFromIso(window.startDate));
  windows.forEach((window) => keys.push(monthKeyFromIso(windowEnd(window))));
  keys.push(monthKeyFromIso(today));
  keys.sort();
  return { min: keys[0], max: keys[keys.length - 1] };
}

export function getMonthGrid(monthKey: string, windows: AvailabilityWindow[]): MonthCell[] {
  const year = Number(monthKey.slice(0, 4));
  const month = Number(monthKey.slice(5, 7));
  const first = `${monthKey}-01`;
  const firstDate = parseUtcDate(first);
  const mondayOffset = (firstDate.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const totalCells = Math.ceil((mondayOffset + daysInMonth) / 7) * 7;
  const start = addDays(first, -mondayOffset);

  return Array.from({ length: totalCells }, (_, index) => {
    const date = addDays(start, index);
    const offerings = OFFERING_IDS.filter((id) =>
      windows.some((window) => window.offering === id && windowOverlapsDate(window, date)),
    );
    return {
      date,
      dayNumber: parseUtcDate(date).getUTCDate(),
      inMonth: date.startsWith(monthKey),
      offerings,
    };
  });
}

export function formatMonthTitle(monthKey: string): string {
  const parsed = parseUtcDate(`${monthKey}-01`);
  return `${MONTH_SHORT[parsed.getUTCMonth()]} ${parsed.getUTCFullYear()}`;
}

export function formatWindowDates(window: AvailabilityWindow): string {
  const start = parseUtcDate(window.startDate);
  const startLabel = `${WEEKDAY_SHORT[(start.getUTCDay() + 6) % 7]}, ${MONTH_SHORT[start.getUTCMonth()]} ${start.getUTCDate()}`;
  if (!window.endDate || window.endDate === window.startDate) return startLabel;
  const end = parseUtcDate(window.endDate);
  if (start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear()) {
    return `${MONTH_SHORT[start.getUTCMonth()]} ${start.getUTCDate()} – ${end.getUTCDate()}`;
  }
  return `${MONTH_SHORT[start.getUTCMonth()]} ${start.getUTCDate()} – ${MONTH_SHORT[end.getUTCMonth()]} ${end.getUTCDate()}`;
}

export function formatShortDate(isoDate: string): string {
  const parsed = parseUtcDate(isoDate);
  return `${MONTH_SHORT[parsed.getUTCMonth()]} ${parsed.getUTCDate()}`;
}

export function getFeaturedWindowId(windows: AvailabilityWindow[]): string | null {
  return windows.find((window) => window.featured)?.id ?? windows[0]?.id ?? null;
}

export function getOfferingSnapshots(today = todayIso()): OfferingSnapshot[] {
  const windows = getVisibleWindows(today);
  return OFFERINGS.map((offering) => {
    const offeringWindows = windows.filter((window) => window.offering === offering.id);
    const nextWindow = offeringWindows[0] ?? null;
    let status: WindowStatus = 'closed';
    if (!offering.currentlyTaking) {
      status = 'closed';
    } else if (!nextWindow) {
      status = 'closed';
    } else {
      status = deriveWindowStatus(nextWindow, today);
    }
    return {
      offering,
      status,
      nextWindow,
      windowCount: offeringWindows.length,
    };
  });
}

export function getHeroStats(today = todayIso()): HeroStats {
  const windows = getVisibleWindows(today);
  const openWindows = windows.filter((window) => {
    const status = deriveWindowStatus(window, today);
    return status === 'open' || status === 'limited';
  });
  const openOfferings = new Set(openWindows.map((window) => window.offering));
  const next = openWindows[0];
  const updated = parseUtcDate(MENTOR_AVAILABILITY.updatedAt);

  return {
    nextOpenLabel: next ? formatShortDate(next.startDate) : 'None open',
    openOfferingCount: openOfferings.size,
    timezone: MENTOR_AVAILABILITY.timezone,
    updatedAtLabel: `${MONTH_SHORT[updated.getUTCMonth()]} ${updated.getUTCDate()}`,
  };
}

export { WEEKDAY_SHORT };

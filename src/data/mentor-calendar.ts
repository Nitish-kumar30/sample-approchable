export type MentorEventType = 'live' | 'office-hours' | 'assignment' | 'capstone';

export type MentorEvent = {
  id: string;
  week: number;
  date: string;
  time: string;
  duration: string;
  type: MentorEventType;
  title: string;
  summary: string;
  topics: string[];
  featured?: boolean;
};

export type MentorWeek = {
  week: number;
  startDate: string;
  endDate: string;
  title: string;
  theme: string;
};

export type MentorCalendarDay = {
  date: string;
  weekday: string;
  dayNumber: number;
  monthShort: string;
  hasEvents: boolean;
};

export const EVENT_TYPE_LABELS: Record<MentorEventType, string> = {
  live: 'Live session',
  'office-hours': 'Office hours',
  assignment: 'Assignment',
  capstone: 'Capstone',
};

export const MENTOR_CALENDAR_NOTE =
  'Dates below are a sample schedule so you can see how a cohort week runs. They are not the live cohort dates.';

export const MENTOR_WEEKS: MentorWeek[] = [
  {
    week: 1,
    startDate: '2026-10-05',
    endDate: '2026-10-11',
    title: 'Foundations',
    theme: 'AI Foundations + The Claude Context',
  },
  {
    week: 2,
    startDate: '2026-10-12',
    endDate: '2026-10-18',
    title: 'Claude Chat & API',
    theme: 'Prompt library, research workflows, and a first API project',
  },
  {
    week: 3,
    startDate: '2026-10-19',
    endDate: '2026-10-25',
    title: 'Claude Cowork',
    theme: 'Build your first agent and automate a real knowledge-work task',
  },
  {
    week: 4,
    startDate: '2026-10-26',
    endDate: '2026-11-01',
    title: 'Claude Code',
    theme: 'Ship a prototype by collaborating with Claude Code',
  },
  {
    week: 5,
    startDate: '2026-11-02',
    endDate: '2026-11-08',
    title: 'Capstone build',
    theme: 'Office hours and independent build time — no full lecture',
  },
  {
    week: 6,
    startDate: '2026-11-09',
    endDate: '2026-11-15',
    title: 'Demos & wrap',
    theme: 'Present your work, get feedback, and close the cohort',
  },
];

export const MENTOR_EVENTS: MentorEvent[] = [
  {
    id: 'w1-live',
    week: 1,
    date: '2026-10-08',
    time: '7:30 PM IST / 10 AM US Eastern',
    duration: '90 min',
    type: 'live',
    title: 'AI Foundations + The Claude Context',
    summary:
      'A clear mental model of how LLMs work, the Claude product map, and the language you need to talk about AI at work.',
    topics: [
      'How LLMs work',
      'Tokens, hallucinations, MCP',
      'Human Capital vs Token Capital',
      'Claude Chat, Code, Cowork, Design, API',
    ],
    featured: true,
  },
  {
    id: 'w1-office',
    week: 1,
    date: '2026-10-10',
    time: '10:00 AM IST',
    duration: '45 min',
    type: 'office-hours',
    title: 'Office hours: get set up',
    summary: 'Drop in with setup questions, access issues, and anything that felt unclear from Session 1.',
    topics: ['Claude access', 'Workspace setup', 'Open Q&A'],
  },
  {
    id: 'w1-assign',
    week: 1,
    date: '2026-10-11',
    time: 'Due 11:59 PM IST',
    duration: 'Self-paced',
    type: 'assignment',
    title: 'Set up Claude and write your first work prompt',
    summary: 'Create your account, pick the right Claude surface for your job, and save one reusable prompt.',
    topics: ['Account setup', 'First prompt', 'Share in the cohort group'],
  },
  {
    id: 'w2-live',
    week: 2,
    date: '2026-10-15',
    time: '7:30 PM IST / 10 AM US Eastern',
    duration: '90 min',
    type: 'live',
    title: 'Claude Chat & API — Deep Dive',
    summary:
      'Build a reusable prompt library, run research and reporting workflows, and get an intro to calling the Claude API.',
    topics: [
      'Prompt library & context management',
      'Web search → deep research',
      'Projects & Artifacts',
      'Calling the Claude API',
    ],
  },
  {
    id: 'w2-assign',
    week: 2,
    date: '2026-10-18',
    time: 'Due 11:59 PM IST',
    duration: 'Self-paced',
    type: 'assignment',
    title: 'Ship a prompt library for your actual job',
    summary: 'Collect 5–8 prompts you will reuse at work, with context notes so a teammate could run them too.',
    topics: ['Prompt library', 'Context notes', 'One live work task'],
  },
  {
    id: 'w3-live',
    week: 3,
    date: '2026-10-22',
    time: '7:30 PM IST / 10 AM US Eastern',
    duration: '90 min',
    type: 'live',
    title: 'Claude Cowork — Agentic Task Automation',
    summary:
      'Build your first AI agent that independently completes a real knowledge-work task, while you stay in control of quality.',
    topics: ['AI Agents', 'Claude Cowork', 'Claude in Chrome', 'Multi-step workflows'],
  },
  {
    id: 'w3-office',
    week: 3,
    date: '2026-10-24',
    time: '10:00 AM IST',
    duration: '45 min',
    type: 'office-hours',
    title: 'Office hours: first agent',
    summary: 'Debug your Cowork workflow, tighten the brief, and get a second pair of eyes before you automate further.',
    topics: ['Agent briefs', 'Quality checks', 'Open Q&A'],
  },
  {
    id: 'w3-assign',
    week: 3,
    date: '2026-10-25',
    time: 'Due 11:59 PM IST',
    duration: 'Self-paced',
    type: 'assignment',
    title: 'Automate one repetitive task',
    summary: 'Pick a task that eats hours every week and leave with a working Cowork workflow you can run again.',
    topics: ['Task selection', 'End-to-end Cowork run', 'Handoff notes'],
  },
  {
    id: 'w4-live',
    week: 4,
    date: '2026-10-29',
    time: '7:30 PM IST / 10 AM US Eastern',
    duration: '90 min',
    type: 'live',
    title: 'Claude Code — Agentic Development',
    summary:
      'Collaborate with Claude Code to ship a real feature or prototype, using CLAUDE.md, skills, MCP, and loop engineering.',
    topics: ['CLAUDE.md', 'Skills, MCP, Hooks', 'Loop engineering', 'Working in unfamiliar code'],
  },
  {
    id: 'w4-assign',
    week: 4,
    date: '2026-11-01',
    time: 'Due 11:59 PM IST',
    duration: 'Self-paced',
    type: 'assignment',
    title: 'Ship a small prototype with Claude Code',
    summary: 'Turn one work idea into a working prototype you can show — not a toy, something you would actually use.',
    topics: ['Prototype scope', 'Claude Code session', 'Demo notes'],
  },
  {
    id: 'w5-office-mid',
    week: 5,
    date: '2026-11-04',
    time: '7:30 PM IST / 10 AM US Eastern',
    duration: '45 min',
    type: 'office-hours',
    title: 'Office hours: capstone scope',
    summary: 'No lecture this week. Bring your capstone brief, unblock the build, and tighten what you will demo.',
    topics: ['Capstone scope', 'Feedback', 'Build blockers'],
  },
  {
    id: 'w5-office-sat',
    week: 5,
    date: '2026-11-07',
    time: '10:00 AM IST',
    duration: '45 min',
    type: 'office-hours',
    title: 'Office hours: build check-in',
    summary: 'A second drop-in before demo week. Polish the workflow and decide what “done” looks like.',
    topics: ['Progress check', 'Quality bar', 'Open Q&A'],
  },
  {
    id: 'w5-assign',
    week: 5,
    date: '2026-11-08',
    time: 'Due 11:59 PM IST',
    duration: 'Self-paced',
    type: 'assignment',
    title: 'Capstone build checkpoint',
    summary: 'Submit a working draft of your capstone — the demo can be rough, but the workflow should run.',
    topics: ['Working draft', 'What you will demo', 'Open questions'],
  },
  {
    id: 'w6-capstone',
    week: 6,
    date: '2026-11-12',
    time: '7:30 PM IST / 10 AM US Eastern',
    duration: '120 min',
    type: 'capstone',
    title: 'Capstone demos + cohort completion',
    summary:
      'Present a live demo of a practical AI project for your role, get personalised feedback, and close the cohort.',
    topics: ['Live demos', 'Peer + mentor feedback', 'Portfolio-ready write-up'],
  },
  {
    id: 'w6-office',
    week: 6,
    date: '2026-11-14',
    time: '10:00 AM IST',
    duration: '45 min',
    type: 'office-hours',
    title: 'Office hours: wrap and next steps',
    summary: 'Optional drop-in to refine your demo notes, talk through what to build next, and stay in the alumni group.',
    topics: ['Demo polish', 'Next projects', 'Alumni group'],
  },
];

const WEEKDAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

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

export function getWeekByNumber(weekNumber: number): MentorWeek | undefined {
  return MENTOR_WEEKS.find((week) => week.week === weekNumber);
}

export function getEventsForWeek(weekNumber: number): MentorEvent[] {
  return MENTOR_EVENTS.filter((event) => event.week === weekNumber);
}

export function getEventsForDate(isoDate: string, weekNumber?: number): MentorEvent[] {
  return MENTOR_EVENTS.filter(
    (event) => event.date === isoDate && (weekNumber === undefined || event.week === weekNumber),
  );
}

export function getFeaturedEventId(weekNumber: number): string | null {
  const events = getEventsForWeek(weekNumber);
  return events.find((event) => event.featured)?.id ?? events.find((event) => event.type === 'live')?.id ?? events[0]?.id ?? null;
}

export function getWeekDays(weekNumber: number): MentorCalendarDay[] {
  const week = getWeekByNumber(weekNumber);
  if (!week) return [];

  const eventDates = new Set(getEventsForWeek(weekNumber).map((event) => event.date));

  return WEEKDAY_SHORT.map((weekday, index) => {
    const date = addDays(week.startDate, index);
    const parsed = parseUtcDate(date);
    return {
      date,
      weekday,
      dayNumber: parsed.getUTCDate(),
      monthShort: MONTH_SHORT[parsed.getUTCMonth()],
      hasEvents: eventDates.has(date),
    };
  });
}

export function formatEventDate(isoDate: string): string {
  const parsed = parseUtcDate(isoDate);
  const weekday = WEEKDAY_SHORT[(parsed.getUTCDay() + 6) % 7];
  return `${weekday}, ${MONTH_SHORT[parsed.getUTCMonth()]} ${parsed.getUTCDate()}`;
}

export function formatWeekRange(week: MentorWeek): string {
  const start = parseUtcDate(week.startDate);
  const end = parseUtcDate(week.endDate);
  const startLabel = `${MONTH_SHORT[start.getUTCMonth()]} ${start.getUTCDate()}`;
  const endLabel = `${MONTH_SHORT[end.getUTCMonth()]} ${end.getUTCDate()}`;
  return `${startLabel} – ${endLabel}`;
}

export type PackageId = 'custom' | 'standard';

export type OneOnOnePackage = {
  id: PackageId;
  name: string;
  tag: string;
  price: string;
  priceNote: string;
  blurb: string;
  bullets: string[];
  cta: string;
  highlighted?: boolean;
};

export type CurriculumItemType = 'live' | 'preread' | 'quiz' | 'assignment' | 'capstone';

export type CurriculumItem = {
  id: string;
  type: CurriculumItemType;
  title: string;
  summary: string;
  topics: string[];
  duration?: string;
  customOnly?: boolean;
  featured?: boolean;
};

export type CurriculumWeek = {
  week: number;
  title: string;
  theme: string;
  items: CurriculumItem[];
};

export const CONTACT_HREF = '/contact?topic=one-on-one';

export const CURRICULUM_NOTE =
  'Standard follows this general curriculum as-is. Custom starts from the same map and is rewritten around your work. Items tagged Custom package are the two capstones.';

export const ITEM_TYPE_LABELS: Record<CurriculumItemType, string> = {
  live: 'Live session',
  preread: 'Pre-read',
  quiz: 'Quiz',
  assignment: 'Mini assignment',
  capstone: 'Capstone',
};

export const ONE_ON_ONE_PACKAGES: OneOnOnePackage[] = [
  {
    id: 'custom',
    name: 'Custom',
    tag: 'Most tailored',
    price: '$1,200',
    priceNote: 'Starts at',
    blurb: 'Curriculum customized to your use case and objectives, with two capstones and support between sessions.',
    bullets: [
      'Curriculum customized to your use case and objectives',
      '2 sessions (90 mins each), one per week over 2 weeks — with live demos',
      'Pre-reads + quizzes between sessions',
      '2 capstone projects with guidance and support',
    ],
    cta: 'Enquire about Custom',
    highlighted: true,
  },
  {
    id: 'standard',
    name: 'Standard',
    tag: 'Cohort curriculum',
    price: '$675',
    priceNote: 'Fixed price',
    blurb: 'The same curriculum covered in the live AI cohorts, compressed into two private 90-minute sessions.',
    bullets: [
      'Same curriculum I cover in my AI Cohorts',
      '2 sessions (90 mins each), one per week over 2 weeks — with live demos',
      'Pre-reads, mini assignments and quizzes',
    ],
    cta: 'Enquire about Standard',
  },
];

export const GENERAL_CURRICULUM: CurriculumWeek[] = [
  {
    week: 1,
    title: 'Foundations + Claude Chat',
    theme: 'Cohort sessions 1–2, compressed into one private 90-minute session with a live demo.',
    items: [
      {
        id: 'w1-live',
        type: 'live',
        title: 'AI Foundations + Claude Chat & API',
        duration: '90 min',
        featured: true,
        summary:
          'A clear mental model of how LLMs work, which Claude product to use for which job, and a reusable prompt library you can run at work the same day.',
        topics: [
          'How LLMs work',
          'Tokens, hallucinations, MCP',
          'Claude Chat, Code, Cowork, Design, API',
          'Prompt library & context management',
          'Live demo: research and reporting in Claude Chat',
        ],
      },
      {
        id: 'w1-preread',
        type: 'preread',
        title: 'Pre-read: Claude ecosystem and key terms',
        duration: 'Before session',
        summary:
          'Short reading so session time is spent building, not defining tokens, hallucinations, or which Claude surface to open.',
        topics: ['Claude product map', 'Key terms', 'Where the industry is heading'],
      },
      {
        id: 'w1-quiz',
        type: 'quiz',
        title: 'Quiz: foundations check',
        duration: 'Between sessions',
        summary:
          'A short check on LLMs, Claude surfaces, and when to use Chat vs Code vs Cowork — so week 2 can go deeper.',
        topics: ['LLM basics', 'Product choice', 'Prompt quality'],
      },
      {
        id: 'w1-assign',
        type: 'assignment',
        title: 'Mini assignment: a prompt library for your job',
        duration: 'Between sessions',
        summary:
          'Standard package: collect 5–8 prompts you will actually reuse at work, with enough context that a teammate could run them.',
        topics: ['Prompt library', 'Context notes', 'One live work task'],
      },
      {
        id: 'w1-capstone',
        type: 'capstone',
        title: 'Capstone 1: a workflow built around your work',
        duration: 'Custom package',
        customOnly: true,
        summary:
          'With guidance between sessions, scope and start a capstone tied to your use case — a research, reporting, or operations workflow you will keep using.',
        topics: ['Use-case brief', 'Working draft', 'Mentor feedback'],
      },
    ],
  },
  {
    week: 2,
    title: 'Cowork + Claude Code',
    theme: 'Cohort sessions 3–4, compressed into one private 90-minute session with a live demo.',
    items: [
      {
        id: 'w2-live',
        type: 'live',
        title: 'Claude Cowork + Claude Code',
        duration: '90 min',
        featured: true,
        summary:
          'Build an agent that completes a real knowledge-work task, then ship a small prototype with Claude Code — CLAUDE.md, skills, MCP, and loop engineering included.',
        topics: [
          'AI agents and Claude Cowork',
          'Multi-step workflows',
          'CLAUDE.md, skills, MCP, hooks',
          'Live demo: agent + prototype',
        ],
      },
      {
        id: 'w2-preread',
        type: 'preread',
        title: 'Pre-read: agents and Claude Code basics',
        duration: 'Before session',
        summary:
          'Skim how agentic workflows differ from chat, and what belongs in a CLAUDE.md before you sit down to build.',
        topics: ['Agent briefs', 'CLAUDE.md', 'Quality and control'],
      },
      {
        id: 'w2-quiz',
        type: 'quiz',
        title: 'Quiz: agents and building with AI',
        duration: 'After session',
        summary:
          'A short check on when to use Cowork vs Code, and how to keep quality high while you delegate the work.',
        topics: ['Agent vs chat', 'Claude Code practices', 'Handoff notes'],
      },
      {
        id: 'w2-assign',
        type: 'assignment',
        title: 'Mini assignment: automate one repetitive task',
        duration: 'After session',
        summary:
          'Standard package: pick a task that eats hours every week and leave with a working Cowork or Claude Code run you can repeat.',
        topics: ['Task selection', 'Working automation', 'Handoff notes'],
      },
      {
        id: 'w2-capstone',
        type: 'capstone',
        title: 'Capstone 2: ship and present the working version',
        duration: 'Custom package',
        customOnly: true,
        summary:
          'Finish the second capstone with mentor support — a demo-ready workflow or prototype built around your objectives, not a sample dataset.',
        topics: ['Working demo', 'Feedback', 'What you keep using'],
      },
    ],
  },
];

export function getWeekByNumber(weekNumber: number): CurriculumWeek | undefined {
  return GENERAL_CURRICULUM.find((week) => week.week === weekNumber);
}

export function getFeaturedItemId(weekNumber: number): string | null {
  const week = getWeekByNumber(weekNumber);
  if (!week) return null;
  return week.items.find((item) => item.featured)?.id ?? week.items[0]?.id ?? null;
}

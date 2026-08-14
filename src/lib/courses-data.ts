export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  duration: number;
  status: string;
  image: string;
  whatYoullLearn: string[];
  format: { duration: string; format: string; prerequisites: string; price: string };
  highlights: string[];
  relatedSlugs: string[];
}

export const courses: Course[] = [
  {
    id: 2,
    title: 'Building AI Agents with n8n',
    slug: 'building-ai-agents-with-n8n',
    description:
      'Deep dive into creating no-code AI agents that can automate complex workflows. Build agents that think, plan, and take action across multiple tools and APIs.',
    tags: ['AI Agents', 'Automation', 'No-Code'],
    duration: 360,
    status: 'launched',
    image: '/img/building-ai-agents-with-n8n.png',
    whatYoullLearn: [
      'n8n fundamentals and workflow building',
      'Creating AI agents with no code',
      'Connecting multiple tools and APIs',
      'Building complex automation workflows',
      'Hands-on: Build and deploy an AI agent',
    ],
    format: {
      duration: '360 minutes',
      format: 'Live session with mentor guidance + hands-on exercises',
      prerequisites: 'None — suitable for all levels',
      price: 'Paid',
    },
    highlights: ['No-code AI agents', 'Live workshop', 'Real-world automations', '360-minute deep dive'],
    relatedSlugs: ['claude-code-deep-dive', 'building-ai-agents-with-open-ai-agents-sdk', 'open-source-llms-deep-dive'],
  },
  {
    id: 1,
    title: 'Claude Code Deep Dive',
    slug: 'claude-code-deep-dive',
    description:
      'Power your daily workflows with Claude Code. Build and ship AI apps confidently with Agentic coding assistant - Claude Code.',
    tags: ['Claude Code', 'Vibe Coding', 'Agentic AI Coding Assistant'],
    duration: 360,
    status: 'coming soon',
    image: '/img/claude-code-course.png',
    whatYoullLearn: [
      'Claude Code fundamentals and capabilities',
      'Agentic coding: letting Claude reason and build',
      'Building full-featured AI applications',
      'Debugging and optimizing Claude Code workflows',
      'Hands-on: Build and ship a complete project',
    ],
    format: {
      duration: '360 minutes',
      format: 'Live session with mentor guidance + hands-on exercises',
      prerequisites: 'None — suitable for all levels',
      price: 'Paid (coming soon)',
    },
    highlights: ['Agentic AI techniques', 'Live coding session', 'Real-world projects', '360-minute deep dive'],
    relatedSlugs: ['building-ai-agents-with-n8n', 'open-source-llms-deep-dive', 'building-ai-agents-with-open-ai-agents-sdk'],
  },
  {
    id: 3,
    title: 'Building AI Agents with Open AI Agents SDK',
    slug: 'building-ai-agents-with-open-ai-agents-sdk',
    description:
      'Deep dive into creating code AI agents that can automate complex workflows. Build agents that think, plan, and take action across multiple tools and APIs.',
    tags: ['AI Agents', 'Automation', 'Code'],
    duration: 360,
    status: 'coming soon',
    image: '/img/building-ai-agents-with-open-ai-agents-sdk.png',
    whatYoullLearn: [
      'OpenAI Agents SDK fundamentals',
      'Building code-based AI agents',
      'Multi-tool orchestration and planning',
      'Agent debugging and testing',
      'Hands-on: Build and deploy an AI agent',
    ],
    format: {
      duration: '360 minutes',
      format: 'Live session with mentor guidance + hands-on exercises',
      prerequisites: 'Basic coding familiarity recommended',
      price: 'Paid (coming soon)',
    },
    highlights: ['Code-based agents', 'OpenAI SDK', 'Real-world automations', '360-minute deep dive'],
    relatedSlugs: ['building-ai-agents-with-n8n', 'claude-code-deep-dive', 'open-source-llms-deep-dive'],
  },
  {
    id: 5,
    title: 'Open Source LLMs Deep Dive',
    slug: 'open-source-llms-deep-dive',
    description:
      'Explore powerful open-source language models from Meta, Mistral, and Deepseek. Learn how to run, fine-tune, and deploy these models locally or in the cloud for maximum control and privacy.',
    tags: ['Open Source LLMs', 'Mistral', 'Llama', 'Self-Hosted'],
    duration: 360,
    status: 'coming soon',
    image: '/img/open-source-llms-deep-dive.png',
    whatYoullLearn: [
      'Open-source LLM landscape (Meta, Mistral, Deepseek)',
      'Running models locally',
      'Fine-tuning for your use case',
      'Cloud deployment strategies',
      'Privacy and control best practices',
    ],
    format: {
      duration: '360 minutes',
      format: 'Live session with mentor guidance + hands-on exercises',
      prerequisites: 'None — suitable for all levels',
      price: 'Paid (coming soon)',
    },
    highlights: ['Self-hosted models', 'Fine-tuning', 'Privacy-first AI', '360-minute deep dive'],
    relatedSlugs: ['claude-code-deep-dive', 'building-ai-agents-with-n8n', 'building-ai-agents-with-open-ai-agents-sdk'],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

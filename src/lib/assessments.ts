import configData from '@/data/assessments/config.json';
import agentsData from '@/data/assessments/agents.json';
import promptingData from '@/data/assessments/prompting.json';
import vibeCodingData from '@/data/assessments/vibe-coding.json';

export type ScoreBandKey = 'low' | 'mid' | 'high';

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  why?: string;
}

export interface QuizRec {
  tag: string;
  title: string;
  desc: string;
  url: string;
}

export interface Assessment {
  slug: string;
  topic: string;
  title: string;
  lede: string;
  level: string;
  minutes: number;
  description: string;
  questions: QuizQuestion[];
  recs: Record<ScoreBandKey, QuizRec[]>;
}

export interface ScoreBand {
  max: number;
  key: ScoreBandKey;
  label: string;
  title: string;
  text: string;
}

export interface AssessmentConfig {
  instantFeedback: boolean;
  bands: ScoreBand[];
}

const ASSESSMENTS: Assessment[] = [
  promptingData as Assessment,
  agentsData as Assessment,
  vibeCodingData as Assessment,
];

const ASSESSMENT_BY_SLUG = new Map(ASSESSMENTS.map((a) => [a.slug, a]));

export const ASSESSMENT_SLUGS = ASSESSMENTS.map((a) => a.slug);

export function getAssessmentConfig(): AssessmentConfig {
  return configData as AssessmentConfig;
}

export function getAllAssessments(): Assessment[] {
  return ASSESSMENTS;
}

export function getAssessment(slug: string): Assessment | undefined {
  return ASSESSMENT_BY_SLUG.get(slug);
}

export function getScoreBand(
  percent: number,
  bands: ScoreBand[],
): ScoreBand {
  return bands.find((b) => percent <= b.max) ?? bands[bands.length - 1];
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuizRunner from '@/components/assessment/QuizRunner';
import Header from '@/components/Header';
import {
  ASSESSMENT_SLUGS,
  getAssessment,
  getAssessmentConfig,
} from '@/lib/assessments';
import { buildPageMetadata } from '@/lib/seo/metadata';

interface QuizPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ASSESSMENT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { slug } = await params;
  const assessment = getAssessment(slug);
  if (!assessment) return {};

  return buildPageMetadata({
    title: `${assessment.title} Assessment`,
    description: assessment.lede,
    path: `/assessment/quiz/${slug}`,
    ogImageAlt: `${assessment.title} skill assessment from Approachable`,
  });
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const assessment = getAssessment(slug);
  if (!assessment) notFound();

  const config = getAssessmentConfig();

  return (
    <>
      <Header navVariant="course" />
      <QuizRunner assessment={assessment} config={config} />
    </>
  );
}

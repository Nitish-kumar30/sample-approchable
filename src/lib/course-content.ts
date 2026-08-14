export interface CurriculumItem {
  number?: number;
  title: string;
  type: 'video' | 'quiz' | 'reading' | 'project';
  locked: boolean;
  previewUrl?: string;
}

export interface CourseSession {
  id: string;
  number: number;
  title: string;
  defaultOpen?: boolean;
  items: CurriculumItem[];
}

export interface CoursePricing {
  inr: { original: string; current: string };
  usd: { original: string; current: string };
  discountPercent: number;
}

export interface CourseContent {
  slug: string;
  title: string;
  heroImage: string;
  instructor: { name: string; email: string };
  pricing: CoursePricing;
  discountLabel: string;
  metadata: {
    type: string;
    skillLevel: string;
    language: string;
    certificateAvailable: boolean;
    sampleCertificateUrl?: string;
    videoCount: number;
    duration: string;
  };
  description: string;
  inclusions: string[];
  tools: string[];
  sessions: CourseSession[];
  faqs: { question: string; answer: string }[];
  purchaseUrl: string;
  ogImage: string;
  ogDescription: string;
  instructorBio?: string;
}

export async function getCourseContent(slug: string): Promise<CourseContent | null> {
  try {
    const data = await import(`@/data/courses/${slug}.json`);
    return data.default as CourseContent;
  } catch {
    return null;
  }
}

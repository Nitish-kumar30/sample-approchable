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

export interface CourseSection {
  heading: string | null;
  html: string;
}

const SECTION_ICONS: Record<string, string> = {
  'about this course': '📖',
  "what you'll learn": '🎯',
  'who is this course for': '🙋',
  "what's included": '📦',
  'tool we use': '🛠️',
  'tools we use': '🛠️',
  "tools we'll explore": '🛠️',
  'tools we will use in this course': '🛠️',
  'course outcome': '🚀',
};

export function getSectionIcon(heading: string | null): string {
  if (!heading) return '📖';
  return SECTION_ICONS[heading.trim().toLowerCase()] ?? '✦';
}

/**
 * Course descriptions are authored as one long HTML blob with `<hr>` used to
 * separate logical sections (About, What You'll Learn, Who It's For, etc.),
 * each starting with an <h1>/<h2> heading. Splitting on those rules lets us
 * render each section as its own card with a consistent, hierarchy-correct
 * heading level instead of one undifferentiated wall of text.
 */
export function getCourseSections(descriptionHtml: string): CourseSection[] {
  const chunks = descriptionHtml.split(/<hr\s*\/?>/i).map((chunk) => chunk.trim()).filter(Boolean);

  return chunks.map((chunk, index) => {
    const headingMatch = chunk.match(/^<h[12]>(.*?)<\/h[12]>/i);
    if (headingMatch) {
      const heading = headingMatch[1].replace(/&#39;/g, "'").replace(/&amp;/g, '&');
      const html = chunk.slice(headingMatch[0].length).trim();
      return { heading, html };
    }
    return { heading: index === 0 ? 'About this Course' : null, html: chunk };
  });
}

export async function getCourseContent(slug: string): Promise<CourseContent | null> {
  try {
    const data = await import(`@/data/courses/${slug}.json`);
    return data.default as CourseContent;
  } catch {
    return null;
  }
}

export interface CourseSummary {
  slug: string;
  title: string;
  shortDescription: string;
  heroImage: string;
  instructor: string;
  type: string;
  duration: string;
  enrolled: boolean;
}

// Sellable courses, in display order. Add a slug here (and a matching JSON
// file in src/data/courses/) whenever a new course goes on sale.
const CATALOG_SLUGS = [
  'ai-mastery-for-working-professionals',
  'no-code-ai-agents-mastery-for-working-professionals',
  'vibe-coding-mastery-for-working-professionals',
];

// Slugs the visitor is already enrolled in. Static for now since the
// marketing site has no auth/session system — wire this up to real
// enrollment data if/when one exists.
const ENROLLED_SLUGS: string[] = [];

export async function getAllCourses(): Promise<CourseSummary[]> {
  const courses = await Promise.all(CATALOG_SLUGS.map((slug) => getCourseContent(slug)));

  return courses
    .filter((course): course is CourseContent => course !== null)
    .map((course) => ({
      slug: course.slug,
      title: course.title,
      shortDescription: course.ogDescription,
      heroImage: course.heroImage,
      instructor: course.instructor.name,
      type: course.metadata.type,
      duration: course.metadata.duration,
      enrolled: ENROLLED_SLUGS.includes(course.slug),
    }));
}

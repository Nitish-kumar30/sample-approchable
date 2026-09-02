import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  body: string;
  tags: string[];
  draft: boolean;
}

export interface MonthGroup {
  year: number;
  month: number;
  label: string;
  posts: Post[];
}

/** Normalises whatever gray-matter/js-yaml gives us for a date field to YYYY-MM-DD */
function normaliseDate(raw: unknown): string {
  if (!raw) return '';
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  return String(raw).slice(0, 10);
}

/** Next.js serves public/ at root — strip accidental /public prefix from CMS paths */
function normaliseCoverImage(raw: unknown): string | undefined {
  if (!raw || typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/^\/public(?=\/)/, '');
}

function normaliseDraft(raw: unknown): boolean {
  if (typeof raw === 'boolean') return raw;
  if (typeof raw === 'string') return raw.trim().toLowerCase() === 'true';
  return false;
}

export function isSeoExcludedPost(post: Pick<Post, 'slug' | 'draft'>): boolean {
  return post.draft || /^test/i.test(post.slug);
}

function ensurePostsDir(): boolean {
  try {
    return fs.existsSync(POSTS_DIR);
  } catch {
    return false;
  }
}

export function getAllPosts(): Post[] {
  if (!ensurePostsDir()) return [];

  let files: string[];
  try {
    files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }

  const posts: Post[] = [];
  for (const filename of files) {
    try {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.md$/, '');
      posts.push({
        slug,
        title: data.title ?? slug,
        date: normaliseDate(data.date),
        excerpt: data.excerpt ?? '',
        coverImage: normaliseCoverImage(data.coverImage),
        tags: Array.isArray(data.tags) ? data.tags : [],
        draft: normaliseDraft(data.draft),
        body: content,
      });
    } catch {
      // skip malformed files
    }
  }

  return posts
    .filter((post) => !isSeoExcludedPost(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(POSTS_DIR, `${slug}.md`);
  try {
    const raw = fs.readFileSync(filepath, 'utf8');
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: normaliseDate(data.date),
      excerpt: data.excerpt ?? '',
      coverImage: normaliseCoverImage(data.coverImage),
      tags: Array.isArray(data.tags) ? data.tags : [],
      draft: normaliseDraft(data.draft),
      body: content,
    };
  } catch {
    return null;
  }
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function getPostsGroupedByMonth(): MonthGroup[] {
  const map = new Map<string, MonthGroup>();
  for (const post of getAllPosts()) {
    if (!post.date) continue;
    const [yearStr, monthStr] = post.date.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const key = `${year}-${String(month).padStart(2, '0')}`;
    if (!map.has(key)) {
      map.set(key, { year, month, label: `${MONTH_NAMES[month - 1]} ${year}`, posts: [] });
    }
    map.get(key)!.posts.push(post);
  }
  return Array.from(map.values());
}

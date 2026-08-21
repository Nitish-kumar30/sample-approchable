import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  body: string;
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
        date: data.date ? String(data.date).slice(0, 10) : '',
        excerpt: data.excerpt ?? '',
        coverImage: data.coverImage,
        body: content,
      });
    } catch {
      // skip malformed files
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(POSTS_DIR, `${slug}.md`);
  try {
    const raw = fs.readFileSync(filepath, 'utf8');
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ? String(data.date).slice(0, 10) : '',
      excerpt: data.excerpt ?? '',
      coverImage: data.coverImage,
      body: content,
    };
  } catch {
    return null;
  }
}

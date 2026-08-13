import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { courses, getCourseBySlug } from '@/lib/courses-data';
import LikeButton from '@/components/LikeButton';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: `${course.title} — Approachable`,
      description: course.description,
      url: `https://approachable.dev/courses/${course.slug}`,
      images: [{ url: `https://approachable.dev${course.image}` }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const relatedCourses = course.relatedSlugs
    .map((s) => getCourseBySlug(s))
    .filter(Boolean);

  return (
    <div className="bg-gray-900 text-gray-100 leading-relaxed antialiased min-h-screen">
      <header className="py-6">
        <div className="mx-auto max-w-[1100px] px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Approachable" width={60} height={60} className="rounded-lg" />
            <div>
              <div className="text-lg font-bold">Approachable</div>
              <div className="text-xs text-gray-400">making learning AI approachable for <em>everyone</em></div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/live-courses" className="hover:text-white font-semibold text-indigo-400">🔥 Live Courses</Link>
            <a href="https://forms.gle/dArAPFpBEqy2512J9" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-indigo-600 rounded text-white font-medium shadow">
              Get early access
            </a>
          </nav>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-[1100px] px-6 py-4">
          <Link href="/live-courses" className="text-indigo-400 hover:text-indigo-300 text-sm">← Back to all courses</Link>
        </div>

        <section className="mx-auto max-w-[1100px] px-6 py-12 grid gap-8 md:grid-cols-3 items-start">
          <div className="md:col-span-2">
            <div className="inline-block text-xs font-semibold text-cyan-400 mb-3">⏱️ {Math.floor(course.duration / 60)} hrs ({Math.ceil(course.duration / 90)} sessions)</div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{course.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {course.tags.map((tag) => (
                <span key={tag} className="text-xs bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded">{tag}</span>
              ))}
            </div>
            <p className="text-lg text-gray-300 mb-6">{course.description}</p>

            <div className="bg-gray-800 p-6 rounded-lg border border-white/10 mb-8">
              <h2 className="text-lg font-semibold mb-4">What You&apos;ll Learn</h2>
              <ul className="space-y-3 text-gray-300">
                {course.whatYoullLearn.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/20 to-cyan-900/20 p-6 rounded-lg border border-indigo-500/30">
              <h2 className="text-lg font-semibold mb-4">Course Format</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><strong>Duration:</strong> {course.format.duration}</li>
                <li><strong>Format:</strong> {course.format.format}</li>
                <li><strong>Prerequisites:</strong> {course.format.prerequisites}</li>
                <li><strong>Price:</strong> {course.format.price}</li>
              </ul>
            </div>
          </div>

          <div className="glass p-6 rounded-lg border border-white/5 h-fit sticky top-6">
            <div className="mb-6 bg-gray-800 p-4 rounded overflow-hidden relative aspect-video">
              <Image src={course.image} alt={course.title} fill className="object-cover rounded" />
            </div>
            <LikeButton courseId={course.id} />
            <a
              href="https://forms.gle/dArAPFpBEqy2512J9"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 border border-gray-700 rounded-lg font-semibold hover:border-gray-600 transition"
            >
              Get early access
            </a>
            <div className="mt-6 text-xs text-gray-400">
              <p className="mb-2 font-semibold">Course highlights:</p>
              <ul className="space-y-1">
                {course.highlights.map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {relatedCourses.length > 0 && (
          <section className="mx-auto max-w-[1100px] px-6 py-12">
            <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedCourses.map((rc) => rc && (
                <Link
                  key={rc.slug}
                  href={`/courses/${rc.slug}`}
                  className="glass p-4 rounded-lg border border-white/5 hover:border-indigo-500/30 transition"
                >
                  <div className="text-xs font-semibold text-cyan-400 mb-2">⏱️ {rc.duration} mins</div>
                  <h3 className="font-semibold mb-2">{rc.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{rc.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-[1100px] px-6 py-12 text-center bg-gradient-to-r from-indigo-600/10 to-cyan-600/10 rounded-lg border border-indigo-500/20">
          <h2 className="text-2xl font-bold">Ready to build with {course.title.split(' ').slice(0, 3).join(' ')}?</h2>
          <p className="mt-3 text-gray-300">Master the skills and ship faster.</p>
          <div className="mt-6">
            <a href="https://forms.gle/dArAPFpBEqy2512J9" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700">
              Get early access
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 mt-12 py-8">
        <div className="mx-auto max-w-[1100px] px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-400">© 2026 Approachable • making AI approachable</div>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="#" className="text-gray-400 text-sm">Privacy</Link>
            <Link href="#" className="text-gray-400 text-sm">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

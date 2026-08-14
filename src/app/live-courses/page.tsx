'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { courses } from '@/lib/courses-data';

export default function LiveCoursesPage() {
  const [likes, setLikes] = useState<Record<number, number>>({});

  useEffect(() => {
    setLikes(JSON.parse(localStorage.getItem('courseLikes') || '{}'));
  }, []);

  async function toggleLike(courseId: number) {
    const currentLiked = likes[courseId] === 1;
    const action = currentLiked ? 'unlike' : 'like';

    // Optimistic update
    setLikes((prev) => ({ ...prev, [courseId]: currentLiked ? 0 : 1 }));

    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, action }),
      });
      if (!res.ok) throw new Error('API call failed');
      const data = await res.json();
      const newLikes = { ...likes, [courseId]: data.userLiked ? 1 : 0 };
      setLikes(newLikes);
      localStorage.setItem('courseLikes', JSON.stringify(newLikes));
    } catch {
      // Fallback to localStorage
      const stored = JSON.parse(localStorage.getItem('courseLikes') || '{}');
      stored[courseId] = stored[courseId] ? 0 : 1;
      localStorage.setItem('courseLikes', JSON.stringify(stored));
      setLikes(stored);
    }
  }

  return (
    <div className="bg-gray-900 text-gray-100 leading-relaxed antialiased min-h-screen">
      <header className="py-6">
        <div className="mx-auto max-w-[1100px] px-6 flex items-center justify-between">
          <Link href="/live-courses" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Approachable" width={60} height={60} className="rounded-lg" />
            <div>
              <div className="text-lg font-bold">Approachable</div>
              <div className="text-xs text-gray-400">making learning AI approachable for <em>everyone</em></div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-gray-300">
            <Link href="/live-courses" className="hover:text-white font-semibold text-indigo-400">🔥 Live Courses</Link>
            <a
              href="https://forms.gle/dArAPFpBEqy2512J9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo-600 rounded text-white font-medium shadow"
            >
              Get early access to Live Courses
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-[1100px] px-6 py-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Live Deep-Dive Courses</h1>
            <p className="mt-4 text-lg text-gray-300">
              Explore our collection of focused courses on AI, automation, and modern tools. Pick what interests you most.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 pb-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const isLiked = likes[course.id] === 1;
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="course-card glass p-5 rounded-lg border border-white/5 overflow-hidden hover:border-indigo-500/30 block no-underline"
                >
                  <div className="mb-4 rounded-lg overflow-hidden bg-gray-800 h-40 relative">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                  </div>
                  <div className="text-xs font-semibold text-cyan-400 mb-2">⏱️ {course.duration} mins</div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{course.title}</h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">{course.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-xs text-green-400 font-medium">✨ {course.status}</div>
                    <button
                      className={`like-btn ${isLiked ? 'liked' : ''}`}
                      title="Mark as interested"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLike(course.id); }}
                    >
                      {isLiked ? '❤️' : '🤍'}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 py-12 text-center bg-gradient-to-r from-indigo-600/10 to-cyan-600/10 rounded-lg border border-indigo-500/20">
          <h2 className="text-2xl font-bold">Ready to dive deep?</h2>
          <p className="mt-3 text-gray-300">Pick a course and level up your AI skills. Classes start weekly.</p>
          <div className="mt-6">
            <a
              href="https://forms.gle/dArAPFpBEqy2512J9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Join a Course
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

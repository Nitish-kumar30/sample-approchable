'use client';

import { useState, useEffect, useCallback } from 'react';

export default function LikeButton({ courseId }: { courseId: number }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('courseLikes') || '{}');
    setLiked(stored[courseId] === 1);
  }, [courseId]);

  const toggle = useCallback(async () => {
    const newLiked = !liked;
    setLiked(newLiked);

    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, action: newLiked ? 'like' : 'unlike' }),
      });
      if (!res.ok) throw new Error('API call failed');
      const data = await res.json();
      setLiked(data.userLiked);

      const stored = JSON.parse(localStorage.getItem('courseLikes') || '{}');
      stored[courseId] = data.userLiked ? 1 : 0;
      localStorage.setItem('courseLikes', JSON.stringify(stored));
    } catch {
      const stored = JSON.parse(localStorage.getItem('courseLikes') || '{}');
      stored[courseId] = newLiked ? 1 : 0;
      localStorage.setItem('courseLikes', JSON.stringify(stored));
    }
  }, [courseId, liked]);

  return (
    <button
      onClick={toggle}
      className={`w-full px-6 py-3 rounded-lg font-semibold transition mb-3 ${
        liked ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
      }`}
    >
      {liked ? '❤️ Interested!' : '❤️ Mark as interested'}
    </button>
  );
}

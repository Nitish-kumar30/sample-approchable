'use client';

import { useState, useCallback, useEffect } from 'react';

export default function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);

  const open = useCallback((imgSrc: string) => {
    setSrc(imgSrc);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setSrc(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  // Expose open function globally so server-rendered onClick handlers can call it
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__openLightbox = open;
    return () => {
      delete (window as unknown as Record<string, unknown>).__openLightbox;
    };
  }, [open]);

  if (!src) return null;

  return (
    <div className="li-lightbox open" onClick={close}>
      <button className="li-lightbox-close" onClick={close}>
        ×
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="LinkedIn Review" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

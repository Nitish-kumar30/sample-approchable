'use client';

import { useEffect, useRef, useCallback } from 'react';

interface VideoPreviewModalProps {
  title: string;
  src: string;
  onClose: () => void;
}

export default function VideoPreviewModal({ title, src, onClose }: VideoPreviewModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);

  const cleanup = useCallback(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    if (iframeRef.current) {
      iframeRef.current.src = '';
    }
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      cleanup();
    };
  }, [onClose, cleanup]);

  useEffect(() => {
    if (!src) return;
    cleanup();

    const youTubeMatch = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (youTubeMatch) {
      if (iframeRef.current) {
        iframeRef.current.style.display = 'block';
        iframeRef.current.src = `https://www.youtube.com/embed/${youTubeMatch[1]}?autoplay=1&rel=0`;
      }
      return;
    }

    const gumletEmbedMatch = src.match(/play\.gumlet\.io\/embed\/([a-f0-9]+)/i);
    const gumletHlsMatch = src.match(/video\.gumlet\.io\/[^/]+\/([a-f0-9]+)\/main\.m3u8/i);
    const gumletAssetId = gumletEmbedMatch?.[1] || gumletHlsMatch?.[1];
    if (gumletAssetId) {
      if (iframeRef.current) {
        iframeRef.current.style.display = 'block';
        iframeRef.current.src = `https://play.gumlet.io/embed/${gumletAssetId}?autoplay=true`;
        iframeRef.current.title = title || 'Gumlet video player';
      }
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    video.style.display = 'block';

    const isHls = /\.m3u8(\?|$)/i.test(src);
    if (isHls) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.play().catch(() => {});
      } else {
        import('hls.js').then(({ default: Hls }) => {
          if (!Hls.isSupported()) {
            video.src = src;
            return;
          }
          const hls = new Hls({ enableWorker: true });
          hlsRef.current = hls;
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {});
          });
        }).catch(() => {
          video.src = src;
        });
      }
    } else {
      video.src = src;
      video.play().catch(() => {});
    }
  }, [src, title, cleanup]);

  return (
    <div
      className="modal-overlay open"
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="video-wrap">
            <video ref={videoRef} controls playsInline crossOrigin="anonymous" style={{ display: 'none' }} />
            <iframe
              ref={iframeRef}
              title="Video preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import type { CourseSession } from '@/lib/course-content';
import Accordion from './Accordion';
import VideoPreviewModal from './VideoPreviewModal';

// SVG icons as components to avoid repetition
function LockIcon() {
  return (
    <svg className="icon icon-sm text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="icon icon-sm text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 4H20v16H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="icon icon-sm text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function getItemIcon(type: string, locked: boolean) {
  if (type === 'reading') return <BookIcon />;
  if (type === 'project') return <FolderIcon />;
  if (locked) return <LockIcon />;
  return null;
}

interface CurriculumSectionProps {
  sessions: CourseSession[];
}

export default function CurriculumSection({ sessions }: CurriculumSectionProps) {
  const [preview, setPreview] = useState<{ title: string; src: string } | null>(null);

  return (
    <section className='curriculum-section'>
      <h2 className="section-title">
        <span className="section-icon" aria-hidden="true">📚</span>
        Course Content
      </h2>
      <div className="accordion">
        {sessions.map((session) => (
          <Accordion key={session.id} title={session.title} defaultOpen={session.defaultOpen}>
            <ul className="curriculum-list">
              {session.items.map((item, idx) => {
                const isClickable = !item.locked && item.previewUrl;
                return (
                  <li
                    key={idx}
                    className={`curriculum-row${isClickable ? ' clickable' : ''}${item.locked ? ' locked' : ''}`}
                    onClick={isClickable ? () => setPreview({ title: item.title, src: item.previewUrl! }) : undefined}
                  >
                    <div className="curriculum-row-left">
                      <span className="row-num">{item.number ?? ''}</span>
                      {getItemIcon(item.type, item.locked)}
                      <span className="truncate">{item.title}</span>
                      {item.isNew && <span className="curriculum-new-badge">New</span>}
                    </div>
                    {isClickable && (
                      <button
                        type="button"
                        className="btn-preview"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview({ title: item.title, src: item.previewUrl! });
                        }}
                      >
                        Preview
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </Accordion>
        ))}
      </div>
      {preview && (
        <VideoPreviewModal
          title={preview.title}
          src={preview.src}
          onClose={() => setPreview(null)}
        />
      )}
    </section>
  );
}

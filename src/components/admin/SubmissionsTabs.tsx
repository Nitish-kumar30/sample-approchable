'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SubmissionsList from '@/components/admin/SubmissionsList';
import type { CorporateInquiryRecord } from '@/lib/corporate-inquiry';
import type { ContactInquiryRecord } from '@/lib/contact-inquiry';

type TabId = 'contact' | 'corporate';

type SubmissionsTabsProps = {
  contactSubmissions: ContactInquiryRecord[];
  corporateSubmissions: CorporateInquiryRecord[];
};

const TABS: { id: TabId; label: string }[] = [
  { id: 'contact', label: 'Contact Us' },
  { id: 'corporate', label: 'Team Training' },
];

export default function SubmissionsTabs({
  contactSubmissions,
  corporateSubmissions,
}: SubmissionsTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabId>('contact');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeSubmissions = activeTab === 'contact' ? contactSubmissions : corporateSubmissions;
  const activeCount = activeSubmissions.length;
  const adminSecret = searchParams.get('secret');

  const handleDelete = async (id: string, formType: string) => {
    setDeletingId(id);
    setError(null);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (adminSecret) {
        headers['x-admin-secret'] = adminSecret;
      }

      const response = await fetch('/api/admin/submissions/delete', {
        method: 'POST',
        headers,
        body: JSON.stringify({ id, formType }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to delete submission');
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete submission');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-submissions-tabs">
      <div className="admin-tabs" role="tablist" aria-label="Submission types">
        {TABS.map((tab) => {
          const count = tab.id === 'contact' ? contactSubmissions.length : corporateSubmissions.length;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              className={`admin-tab${isActive ? ' admin-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="admin-tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="admin-submissions-count">
        {activeCount} submission{activeCount === 1 ? '' : 's'}
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="admin-tab-panel"
      >
        <SubmissionsList
          key={activeTab}
          submissions={activeSubmissions}
          variant={activeTab}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

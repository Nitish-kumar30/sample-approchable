'use client';

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
  const [activeTab, setActiveTab] = useState<TabId>('contact');

  const activeSubmissions = activeTab === 'contact' ? contactSubmissions : corporateSubmissions;
  const activeCount = activeSubmissions.length;

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

      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="admin-tab-panel"
      >
        <SubmissionsList submissions={activeSubmissions} variant={activeTab} />
      </div>
    </div>
  );
}

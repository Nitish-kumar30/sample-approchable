import type { CorporateInquiryRecord } from '@/lib/corporate-inquiry';

function formatSubmittedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="admin-field">
      <dt className="admin-field-label">{label}</dt>
      <dd className="admin-field-value">{value}</dd>
    </div>
  );
}

export default function SubmissionsList({ submissions }: { submissions: CorporateInquiryRecord[] }) {
  if (submissions.length === 0) {
    return <p className="admin-empty">No inquiries yet. Submissions from the corporate training form will appear here.</p>;
  }

  return (
    <ul className="admin-submissions-list">
      {submissions.map((submission, index) => (
        <li key={submission.id} className="admin-submission-card">
          <div className="admin-submission-header">
            <div className="admin-submission-num">{index + 1}</div>
            <div>
              <div className="admin-submission-company">{submission.company || 'Unknown company'}</div>
              <div className="admin-submission-meta">
                {submission.contactName && <span>{submission.contactName}</span>}
                {submission.email && (
                  <a href={`mailto:${submission.email}`} className="admin-submission-email">
                    {submission.email}
                  </a>
                )}
              </div>
            </div>
            <time className="admin-submission-date" dateTime={submission.submittedAt}>
              {formatSubmittedAt(submission.submittedAt)}
            </time>
          </div>

          <dl className="admin-submission-body">
            <Field label="Phone" value={submission.phone} />
            <Field label="Team size" value={submission.teamSize} />
            <Field label="Industry" value={submission.industry} />
            <Field label="Timing" value={submission.timing} />
          </dl>

          {submission.tiers.length > 0 && (
            <div className="admin-submission-tags">
              {submission.tiers.map((tier) => (
                <span key={tier} className="curriculum-tag highlight">{tier}</span>
              ))}
            </div>
          )}

          {submission.requirements && (
            <div className="admin-submission-requirements">
              <div className="admin-field-label">Requirements</div>
              <p>{submission.requirements}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

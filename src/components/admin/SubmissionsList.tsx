import { enquiryTypeLabel } from '@/lib/contact-inquiry';
import type { SubmissionRecord } from '@/lib/submissions-types';
import { isContactSubmission, isCorporateSubmission } from '@/lib/submissions-types';

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

function SubmissionBadge({ label }: { label: string }) {
  return <span className="admin-submission-badge">{label}</span>;
}

function ContactSubmissionCard({
  submission,
  index,
}: {
  submission: Extract<SubmissionRecord, { formType: 'contact-inquiry' }>;
  index: number;
}) {
  return (
    <li className="admin-submission-card">
      <div className="admin-submission-header">
        <div className="admin-submission-num">{index + 1}</div>
        <div>
          <div className="admin-submission-company">{submission.name || 'Unknown contact'}</div>
          <div className="admin-submission-meta">
            <SubmissionBadge label={enquiryTypeLabel(submission.enquiryType)} />
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
        <Field label="Organization" value={submission.organization} />
      </dl>

      {submission.message && (
        <div className="admin-submission-requirements">
          <div className="admin-field-label">Message</div>
          <p>{submission.message}</p>
        </div>
      )}
    </li>
  );
}

function CorporateSubmissionCard({
  submission,
  index,
}: {
  submission: Extract<SubmissionRecord, { formType: 'corporate-training-inquiry' }>;
  index: number;
}) {
  return (
    <li className="admin-submission-card">
      <div className="admin-submission-header">
        <div className="admin-submission-num">{index + 1}</div>
        <div>
          <div className="admin-submission-company">{submission.company || 'Unknown company'}</div>
          <div className="admin-submission-meta">
            <SubmissionBadge label="Team Training" />
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

      {submission.requirements && (
        <div className="admin-submission-requirements">
          <div className="admin-field-label">Requirements</div>
          <p>{submission.requirements}</p>
        </div>
      )}
    </li>
  );
}

export default function SubmissionsList({
  submissions,
  variant,
}: {
  submissions: SubmissionRecord[];
  variant: 'contact' | 'corporate';
}) {
  if (submissions.length === 0) {
    return (
      <p className="admin-empty">
        {variant === 'contact'
          ? 'No contact form submissions yet.'
          : 'No team training inquiries yet.'}
      </p>
    );
  }

  return (
    <ul className="admin-submissions-list">
      {submissions.map((submission, index) => {
        if (variant === 'contact' && isContactSubmission(submission)) {
          return <ContactSubmissionCard key={submission.id} submission={submission} index={index} />;
        }
        if (variant === 'corporate' && isCorporateSubmission(submission)) {
          return <CorporateSubmissionCard key={submission.id} submission={submission} index={index} />;
        }
        return null;
      })}
    </ul>
  );
}

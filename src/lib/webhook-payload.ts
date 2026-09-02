import { enquiryTypeLabel, type ContactInquiryRecord } from '@/lib/contact-inquiry';
import type { CorporateInquiryRecord } from '@/lib/corporate-inquiry';
import type { SubmissionRecord } from '@/lib/submissions-types';
import { isContactSubmission } from '@/lib/submissions-types';

/**
 * Normalizes submission records for n8n email templates that were built
 * around the corporate training form field names.
 */
export function toWebhookPayload(record: SubmissionRecord): Record<string, unknown> {
  if (isContactSubmission(record)) {
    return toContactWebhookPayload(record);
  }

  return { ...record };
}

function toContactWebhookPayload(record: ContactInquiryRecord): Record<string, unknown> {
  const enquiryLabel = enquiryTypeLabel(record.enquiryType);

  return {
    ...record,
    contactName: record.name,
    company: record.organization,
    requirements: `Enquiry type: ${enquiryLabel}\n\n${record.message}`,
    enquiryTypeLabel: enquiryLabel,
    teamSize: '',
    industry: '',
    timing: '',
  };
}

export type { CorporateInquiryRecord, ContactInquiryRecord };

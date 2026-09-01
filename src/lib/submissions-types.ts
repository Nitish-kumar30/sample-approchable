import type { CorporateInquiryRecord } from '@/lib/corporate-inquiry';
import type { ContactInquiryRecord } from '@/lib/contact-inquiry';

export type SubmissionRecord = CorporateInquiryRecord | ContactInquiryRecord;

export function isContactSubmission(record: SubmissionRecord): record is ContactInquiryRecord {
  return record.formType === 'contact-inquiry';
}

export function isCorporateSubmission(record: SubmissionRecord): record is CorporateInquiryRecord {
  return record.formType === 'corporate-training-inquiry';
}

import { get, list } from '@vercel/blob';
import type { CorporateInquiryRecord } from '@/lib/corporate-inquiry';
import { blobOptions } from '@/lib/blob-client';

async function readSubmission(pathname: string): Promise<CorporateInquiryRecord | null> {
  const result = await get(pathname, { access: 'private', ...blobOptions() });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  const text = await new Response(result.stream).text();
  return JSON.parse(text) as CorporateInquiryRecord;
}

export async function getSubmissions(): Promise<CorporateInquiryRecord[]> {
  const { blobs } = await list({ prefix: 'submissions/', ...blobOptions() });

  const submissions = await Promise.all(
    blobs.map(async (blob) => {
      const record = await readSubmission(blob.pathname);
      if (record) return record;

      return {
        id: blob.pathname,
        formType: 'corporate-training-inquiry',
        submittedAt: blob.uploadedAt.toISOString(),
        company: '',
        contactName: '',
        email: '',
        phone: '',
        teamSize: '',
        tiers: [],
        industry: '',
        timing: '',
        requirements: '',
        meta: { source: 'unknown' },
      } satisfies CorporateInquiryRecord;
    }),
  );

  submissions.sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt));
  return submissions;
}

import { get, list } from '@vercel/blob';
import type { CorporateInquiryRecord } from '@/lib/corporate-inquiry';

async function readSubmission(pathname: string): Promise<CorporateInquiryRecord | null> {
  const result = await get(pathname, { access: 'private' });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  const text = await new Response(result.stream).text();
  return JSON.parse(text) as CorporateInquiryRecord;
}

export async function getSubmissions(): Promise<CorporateInquiryRecord[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Blob storage is not configured');
  }

  const { blobs } = await list({ prefix: 'submissions/' });

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

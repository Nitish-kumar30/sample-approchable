import { randomUUID } from 'crypto';
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { isHoneypotTriggered } from '@/lib/corporate-inquiry';
import { FORM_TYPE, validateContactInquiry, type ContactInquiryRecord } from '@/lib/contact-inquiry';
import { blobOptions } from '@/lib/blob-client';
import { submissionBlobPath } from '@/lib/blob-paths';
import { toWebhookPayload } from '@/lib/webhook-payload';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (isHoneypotTriggered(body)) {
      return NextResponse.json({ success: true, message: 'Submission received' });
    }

    const validation = validateContactInquiry(body);
    if (!validation.ok) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 },
      );
    }

    const id = randomUUID();
    const record: ContactInquiryRecord = {
      id,
      formType: FORM_TYPE,
      submittedAt: new Date().toISOString(),
      ...validation.data,
      meta: {
        source: 'contact',
        userAgent: req.headers.get('user-agent') ?? undefined,
      },
    };

    await put(submissionBlobPath('contact', id), JSON.stringify(record, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      ...blobOptions(),
    });

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const n8nResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(toWebhookPayload(record)),
          signal: AbortSignal.timeout(5000),
        });

        if (!n8nResponse.ok) {
          console.error(
            `n8n webhook responded with ${n8nResponse.status} ${n8nResponse.statusText}`,
          );
        }
      } catch (n8nError) {
        console.error('n8n webhook notification failed:', n8nError);
      }
    }

    return NextResponse.json({ success: true, message: 'Submission received' });
  } catch (error) {
    console.error('Error in submit-contact handler:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save submission' },
      { status: 500 },
    );
  }
}

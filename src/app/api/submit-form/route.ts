import { randomUUID } from 'crypto';
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import {
  FORM_TYPE,
  isHoneypotTriggered,
  validateCorporateInquiry,
} from '@/lib/corporate-inquiry';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is not configured');
      return NextResponse.json(
        { success: false, error: 'Form storage is not configured' },
        { status: 500 },
      );
    }

    const body = await req.json();

    if (isHoneypotTriggered(body)) {
      return NextResponse.json({ success: true, message: 'Submission received' });
    }

    const validation = validateCorporateInquiry(body);
    if (!validation.ok) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 },
      );
    }

    const id = randomUUID();
    const record = {
      id,
      formType: FORM_TYPE,
      submittedAt: new Date().toISOString(),
      ...validation.data,
      meta: {
        source: 'corporate-training/inquiry',
        userAgent: req.headers.get('user-agent') ?? undefined,
      },
    };

    await put(`submissions/${id}.json`, JSON.stringify(record, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    });

    return NextResponse.json({ success: true, message: 'Submission received' });
  } catch (error) {
    console.error('Error in submit-form handler:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save submission' },
      { status: 500 },
    );
  }
}

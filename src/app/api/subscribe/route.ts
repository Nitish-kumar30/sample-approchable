import { NextRequest } from 'next/server';
import { put, list } from '@vercel/blob';

const BLOB_PATH = 'subscribers/emails.json';

interface Subscriber {
  email: string;
  subscribedAt: string;
}

async function getSubscribers(): Promise<Subscriber[]> {
  const { blobs } = await list({ prefix: BLOB_PATH });
  if (!blobs.length) return [];
  const res = await fetch(blobs[0].url, {
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
  });
  return res.json();
}

export async function GET() {
  try {
    const subscribers = await getSubscribers();
    return Response.json({ count: subscribers.length });
  } catch {
    return Response.json({ count: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log('[subscribe] POST request received', { email });

    if (!email || typeof email !== 'string') {
      console.log('[subscribe] Rejected: missing or invalid email field');
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('[subscribe] Rejected: failed regex validation', { email });
      return Response.json({ error: 'Invalid email format' }, { status: 400 });
    }

    console.log('[subscribe] Fetching existing subscribers...');
    const subscribers = await getSubscribers();
    console.log('[subscribe] Current subscriber count:', subscribers.length);

    const exists = subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());

    if (!exists) {
      subscribers.push({ email: email.toLowerCase(), subscribedAt: new Date().toISOString() });
      console.log('[subscribe] Adding new subscriber, writing to blob...');
      await put(BLOB_PATH, JSON.stringify(subscribers), {
        access: 'private',
        addRandomSuffix: false,
      });
      console.log('[subscribe] Blob write successful, new count:', subscribers.length);
    } else {
      console.log('[subscribe] Email already exists, skipping');
    }

    return Response.json({ success: true, count: subscribers.length });
  } catch (error) {
    console.error('[subscribe] Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

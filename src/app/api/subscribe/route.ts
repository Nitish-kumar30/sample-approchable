import { NextRequest } from 'next/server';
import { put, list, getDownloadUrl } from '@vercel/blob';

const BLOB_PATH = 'subscribers/emails.json';

interface Subscriber {
  email: string;
  subscribedAt: string;
}

async function getSubscribers(): Promise<Subscriber[]> {
  const { blobs } = await list({ prefix: BLOB_PATH });
  if (!blobs.length) return [];
  const downloadUrl = await getDownloadUrl(blobs[0].url);
  const res = await fetch(downloadUrl);
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

    if (!email || typeof email !== 'string') {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const subscribers = await getSubscribers();
    const exists = subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());

    if (!exists) {
      subscribers.push({ email: email.toLowerCase(), subscribedAt: new Date().toISOString() });
      await put(BLOB_PATH, JSON.stringify(subscribers), {
        access: 'private',
        addRandomSuffix: false,
      });
    }

    return Response.json({ success: true, count: subscribers.length });
  } catch (error) {
    console.error('Subscribe error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

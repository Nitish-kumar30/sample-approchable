import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.COURSE_LIKES_KV_REST_API_URL!,
  token: process.env.COURSE_LIKES_KV_REST_API_TOKEN!,
});

function getUserId(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

async function getCourseLikes(courseId: string): Promise<Record<string, unknown>> {
  const key = `likes:${courseId}`;
  const data = await redis.get<string>(key);
  return data ? JSON.parse(data) : {};
}

async function saveLikes(courseId: string, likes: Record<string, unknown>) {
  const key = `likes:${courseId}`;
  await redis.set(key, JSON.stringify(likes));
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: NextRequest) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { courseId, action } = await req.json();

    if (!courseId || !['like', 'unlike'].includes(action)) {
      return NextResponse.json({ error: 'Invalid courseId or action' }, { status: 400, headers });
    }

    const userId = getUserId(req);
    const userLikeKey = `${userId}:${courseId}`;

    const likes = await getCourseLikes(courseId);

    if (action === 'like') {
      likes[userLikeKey] = { userId, courseId, timestamp: Date.now() };
    } else {
      delete likes[userLikeKey];
    }

    await saveLikes(courseId, likes);

    const totalLikes = Object.keys(likes).length;
    const userLiked = action === 'like';

    return NextResponse.json(
      { success: true, courseId, userLiked, totalLikes, message: action === 'like' ? 'Course liked' : 'Course unliked' },
      { status: 200, headers },
    );
  } catch (error) {
    console.error('Error in likes handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers },
    );
  }
}

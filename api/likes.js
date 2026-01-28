import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.COURSE_LIKES_KV_REST_API_URL,
  token: process.env.COURSE_LIKES_KV_REST_API_TOKEN
});

/**
 * Get user identifier from request (IP address)
 */
function getUserId(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['cf-connecting-ip'] || 
         req.socket?.remoteAddress || 
         'unknown';
}

/**
 * Get current like status and count for a course
 */
async function getCourseLikes(courseId) {
  const key = `likes:${courseId}`;
  const data = await redis.get(key);
  return data ? JSON.parse(data) : {};
}

/**
 * Save course likes to Redis
 */
async function saveLikes(courseId, likes) {
  const key = `likes:${courseId}`;
  await redis.set(key, JSON.stringify(likes));
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { courseId, action } = req.body;

    // Validate input
    if (!courseId || !['like', 'unlike'].includes(action)) {
      return res.status(400).json({ error: 'Invalid courseId or action' });
    }

    const userId = getUserId(req);
    const userLikeKey = `${userId}:${courseId}`;

    // Get current likes
    let likes = await getCourseLikes(courseId);

    // Update like status
    if (action === 'like') {
      likes[userLikeKey] = { userId, courseId, timestamp: Date.now() };
    } else if (action === 'unlike') {
      delete likes[userLikeKey];
    }

    // Save to Redis
    await saveLikes(courseId, likes);

    // Calculate total likes for this course
    const totalLikes = Object.keys(likes).length;
    const userLiked = action === 'like';

    return res.status(200).json({
      success: true,
      courseId,
      userLiked,
      totalLikes,
      message: action === 'like' ? 'Course liked' : 'Course unliked'
    });
  } catch (error) {
    console.error('Error in likes handler:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getProvidedAdminSecret, isAdminAuthorized } from '@/lib/admin-auth';
import { getSubmissions } from '@/lib/submissions';

export async function GET(req: NextRequest) {
  if (!process.env.ADMIN_SECRET) {
    console.warn('ADMIN_SECRET is not set — /api/admin/submissions is unprotected');
  }

  if (!isAdminAuthorized(getProvidedAdminSecret(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const submissions = await getSubmissions();
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error in admin submissions handler:', error);
    return NextResponse.json({ error: 'Failed to load submissions' }, { status: 500 });
  }
}

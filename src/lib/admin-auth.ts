import type { NextRequest } from 'next/server';

export function getProvidedAdminSecret(req: NextRequest): string | null {
  const querySecret = req.nextUrl.searchParams.get('secret');
  const headerSecret = req.headers.get('x-admin-secret');
  const authHeader = req.headers.get('authorization');
  const bearerSecret = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length).trim() : null;
  return querySecret || headerSecret || bearerSecret || null;
}

export function isAdminAuthorized(provided?: string | null): boolean {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return true;
  }

  return provided === adminSecret;
}

export function adminSecretRequired(): boolean {
  return Boolean(process.env.ADMIN_SECRET);
}

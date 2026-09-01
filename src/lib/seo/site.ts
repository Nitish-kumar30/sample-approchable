export const SITE_URL = 'https://approachable.dev';
export const SITE_NAME = 'Approachable';
export const DEFAULT_OG_IMAGE = '/img/og-image.png';

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
}

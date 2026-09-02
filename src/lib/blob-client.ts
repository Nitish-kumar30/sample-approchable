/**
 * Blob auth on Vercel uses OIDC when only BLOB_STORE_ID is set.
 * Locally, BLOB_READ_WRITE_TOKEN is used instead.
 * Bracket access avoids Next.js inlining env vars at build time.
 */
export function blobOptions(): { token?: string } {
  const token = process.env['BLOB_READ_WRITE_TOKEN'];
  return token ? { token } : {};
}

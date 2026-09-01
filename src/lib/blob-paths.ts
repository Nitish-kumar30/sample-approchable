export const BLOB_FOLDERS = {
  contact: 'submissions/contact',
  corporate: 'submissions/corporate',
  legacy: 'submissions',
} as const;

export type SubmissionFolder = keyof typeof BLOB_FOLDERS;

export function submissionBlobPath(folder: SubmissionFolder, id: string): string {
  if (folder === 'legacy') {
    return `${BLOB_FOLDERS.legacy}/${id}.json`;
  }
  return `${BLOB_FOLDERS[folder]}/${id}.json`;
}

/** Legacy flat files saved before folder separation, e.g. submissions/uuid.json */
export function isLegacyFlatBlobPath(pathname: string): boolean {
  return /^submissions\/[^/]+\.json$/.test(pathname);
}

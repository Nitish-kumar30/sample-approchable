import type { Metadata } from 'next';
import Header from '@/components/Header';
import AdminSecretForm from '@/components/admin/AdminSecretForm';
import SubmissionsList from '@/components/admin/SubmissionsList';
import { adminSecretRequired, isAdminAuthorized } from '@/lib/admin-auth';
import { getSubmissions } from '@/lib/submissions';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'Form submissions',
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ secret?: string }>;
};

export default async function AdminSubmissionsPage({ searchParams }: PageProps) {
  const { secret } = await searchParams;
  const authorized = isAdminAuthorized(secret);

  if (adminSecretRequired() && !authorized) {
    return (
      <>
        <Header coursePage />
        <main>
          <section className="courses-page admin-submissions-page">
            <div className="container-max">
              <div className="courses-hero">
                <div className="section-label">Admin</div>
                <h1 className="section-title">Corporate training inquiries</h1>
                <p className="section-sub" style={{ margin: '0 auto' }}>
                  Submissions from the team inquiry form, newest first.
                </p>
              </div>

              <div className="admin-gate">
                <p className="admin-gate-text">Enter the admin secret to view form submissions.</p>
                <AdminSecretForm />
                {secret ? <p className="admin-error">Invalid secret. Try again.</p> : null}
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  let submissions: Awaited<ReturnType<typeof getSubmissions>> = [];
  let loadError: string | null = null;

  try {
    submissions = await getSubmissions();
  } catch (error) {
    console.error('Failed to load submissions:', error);
    loadError =
      'Could not load submissions. Connect Vercel Blob to this project (Storage → Blob → Connect), or set BLOB_READ_WRITE_TOKEN in Vercel environment variables.';
  }

  return (
    <>
      <Header coursePage />
      <main>
        <section className="courses-page admin-submissions-page">
          <div className="container-max">
            <div className="courses-hero">
              <div className="section-label">Admin</div>
              <h1 className="section-title">Corporate training inquiries</h1>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                Submissions from the team inquiry form, newest first.
              </p>
            </div>

            {loadError ? (
              <p className="admin-error">{loadError}</p>
            ) : (
              <div className="admin-submissions-wrap">
                <div className="admin-submissions-count">
                  {submissions.length} submission{submissions.length === 1 ? '' : 's'}
                </div>
                <SubmissionsList submissions={submissions} />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

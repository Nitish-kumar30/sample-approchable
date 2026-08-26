import type { Metadata } from 'next';
import Header from '@/components/Header';
import SubmissionsList from '@/components/admin/SubmissionsList';
import { getSubmissions } from '@/lib/submissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Form submissions',
  robots: { index: false, follow: false },
};

export default async function AdminSubmissionsPage() {
  let submissions: Awaited<ReturnType<typeof getSubmissions>> = [];
  let loadError: string | null = null;

  try {
    submissions = await getSubmissions();
  } catch (error) {
    console.error('Failed to load submissions:', error);
    loadError = 'Could not load submissions. Check that blob storage is configured.';
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

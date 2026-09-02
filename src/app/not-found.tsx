import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header navVariant="course" />
      <main>
        <section className="courses-page" style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}>
          <div className="container-max" style={{ maxWidth: 560 }}>
            <h1 className="section-title">Page not found</h1>
            <p className="section-sub" style={{ margin: '0 auto 24px' }}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link href="/" className="btn-primary">
              Go to homepage
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

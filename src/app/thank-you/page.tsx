import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for signing up for the Approachable AI learning cohort.',
};

export default function ThankYouPage() {
  return (
    <>
      <Script id="ga-conversion" strategy="afterInteractive">{`
        if (typeof gtag !== 'undefined') {
          gtag('event', 'conversion', {
            event_category: 'Funnel',
            event_label: 'Form Submitted',
            value: 399,
            currency: 'INR'
          });
        }
      `}</Script>

      <Header />

      <div className="bg-gray-900 text-gray-100 leading-relaxed antialiased min-h-screen flex flex-col">
        <main className="flex-1">
          <section className="mx-auto max-w-[1100px] px-6 py-20 flex items-center justify-center min-h-screen">
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 md:p-12 border-2 border-indigo-500/40 text-center max-w-2xl">
              <div className="mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">You&apos;re In!</h1>
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/40 rounded-lg p-6 mb-6">
                  <p className="text-lg text-gray-200 font-semibold mb-3">Welcome to the Approachable community!</p>
                  <p className="text-gray-300">We&apos;ll email you within <strong>24-48 hours</strong> with:</p>
                  <ul className="mt-4 text-gray-300 space-y-2 text-sm">
                    {[
                      'Next steps for onboarding',
                      'Payment link for commitment fee',
                      'Access to your study group workspace',
                      'Week 1 cohort materials and schedule',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-green-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-8 mt-8">
                <p className="text-gray-400 mb-4">Questions before we onboard you?</p>
                <div className="flex flex-col md:flex-row gap-3 justify-center">
                  <a href="mailto:ranbeer@gmail.com" className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
                    Email Us
                  </a>
                  <Link href="/" className="px-6 py-3 border-2 border-gray-600 rounded-lg font-semibold hover:border-indigo-500 hover:bg-gray-800 transition-all">
                    Back to Home
                  </Link>
                </div>
              </div>

              <div className="mt-8 text-xs text-gray-500">
                <p>Thank you for being part of our mission to make AI learning approachable for everyone!</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

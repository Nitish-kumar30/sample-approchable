import type { Metadata } from 'next';
import Header from '@/components/Header';
import ContactForm from '@/components/contact/ContactForm';
import { enquiryTypeFromTopic } from '@/lib/contact-inquiry';

const CONTACT_OG_IMAGE = '/img/og-image.png';
const CONTACT_DESCRIPTION =
  'Get in touch about team AI training, live cohorts, courses, or general questions. We typically respond within a few business days.';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact Us — Approachable',
    description: CONTACT_DESCRIPTION,
    url: '/contact',
    siteName: 'Approachable',
    images: [
      {
        url: CONTACT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Contact Approachable',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — Approachable',
    description: CONTACT_DESCRIPTION,
    images: [CONTACT_OG_IMAGE],
  },
};

type PageProps = {
  searchParams: Promise<{ topic?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const { topic } = await searchParams;
  const defaultEnquiryType = enquiryTypeFromTopic(topic);

  return (
    <>
      <Header navVariant="course" />
      <main>
        <section className="courses-page contact-page">
          <div className="container-max">
            <div className="courses-hero">
              <div className="section-label">Get in touch</div>
              <h1 className="section-title">Contact us</h1>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                Whether you&apos;re interested in team training, joining a live AI cohort, exploring
                courses, or have a general question — send us a message and we&apos;ll get back to you.
              </p>
            </div>

            <div className="contact-form-wrap">
              <ContactForm defaultEnquiryType={defaultEnquiryType} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

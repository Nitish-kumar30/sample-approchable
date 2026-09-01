import type { Metadata } from 'next';
import Header from '@/components/Header';
import ContactForm from '@/components/contact/ContactForm';
import JsonLd from '@/components/JsonLd';
import { enquiryTypeFromTopic } from '@/lib/contact-inquiry';
import { buildContactPageSchema } from '@/lib/seo/contact-schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const CONTACT_DESCRIPTION =
  'Get in touch about team AI training, live cohorts, courses, or general questions. We typically respond within a few business days.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us',
  description: CONTACT_DESCRIPTION,
  path: '/contact',
  ogImageAlt: 'Contact Approachable',
});

type PageProps = {
  searchParams: Promise<{ topic?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const { topic } = await searchParams;
  const defaultEnquiryType = enquiryTypeFromTopic(topic);

  return (
    <>
      <JsonLd data={buildContactPageSchema()} />
      <Header navVariant="contact" />
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

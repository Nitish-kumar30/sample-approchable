import Accordion from './Accordion';

interface FAQSectionProps {
  faqs: { question: string; answer: string }[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className='faq-section'>
      <h2 className="section-title">
        <span className="section-icon" aria-hidden="true">❓</span>
        Frequently Asked Questions
      </h2>
      <div className="accordion">
        {faqs.map((faq, i) => (
          <Accordion key={i} title={faq.question}>
            <div className="faq-answer">{faq.answer}</div>
          </Accordion>
        ))}
      </div>
    </section>
  );
}

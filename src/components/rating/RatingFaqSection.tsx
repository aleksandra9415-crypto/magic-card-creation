import { RATING_FAQ } from "@/data/rating";

function FaqItem({ q, a, open }: { q: string; a: string; open?: boolean }) {
  return (
    <details className="faq__item" open={open}>
      <summary className="faq__sum">{q}</summary>
      <div className="faq__body">{a}</div>
    </details>
  );
}

export default function RatingFaqSection() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <h2 className="section__title" style={{ marginBottom: '24px' }}>Частые вопросы</h2>
        <div className="faq">
          {RATING_FAQ.map((item) => (
            <FaqItem key={item.q} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

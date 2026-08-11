import { RATING_FAQ } from "@/data/rating";

function FaqItem({ q, a, open }: { q: string; a: string; open?: boolean }) {
  return (
    <details open={open}>
      <summary>{q}</summary>
      <div className="body">{a}</div>
    </details>
  );
}

export default function RatingFaqSection() {
  return (
    <section className="sec" id="faq">
      <h2>Частые вопросы</h2>
      {RATING_FAQ.map((item) => (
        <FaqItem key={item.q} {...item} />
      ))}
    </section>
  );
}

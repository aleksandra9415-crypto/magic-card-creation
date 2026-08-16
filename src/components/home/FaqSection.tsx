import { FAQ_ITEMS } from "@/data/home";

export function FaqItem({
  q,
  a,
  open,
}: {
  q: string;
  a: string;
  open?: boolean;
}) {
  return (
    <details className="faq__item" open={open}>
      <summary className="faq__sum">{q}</summary>
      <div className="faq__body">{a}</div>
    </details>
  );
}

export default function FaqSection() {
  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section__head section__head--centered">
          <h2 className="section__title">Отвечаем на ваши вопросы</h2>
          <p className="section__sub" style={{ marginInline: 'auto' }}>
            Если не нашли ответ — напишите в наш Telegram, отвечаем в течение
            часа.
          </p>
        </div>
        <div className="faq">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

import type { FaqItem } from "@/data/landing/types";

/* Большой блок вопросов из ТЗ — 10+ штук по теме страницы.
   Оформление полностью повторяет блок «Отвечаем на ваши вопросы» на главной. */
export default function LandingFaq({
  faq,
  subjectIn,
  title,
  sub,
}: {
  faq: FaqItem[];
  /** Тема в позиции дополнения: «ChatGPT», но «в Турции». */
  subjectIn: string;
  /** Заголовок и подзаголовок страницы обзора — на посадочных не задаются. */
  title?: string;
  sub?: string;
}) {
  return (
    <section className="lp-faq" id="faq" aria-labelledby="faq-title">
      <div className="section__head section__head--centered">
        <h2 id="faq-title" className="section__title">
          {title ?? `Отвечаем на вопросы об оплате ${subjectIn}`}
        </h2>
        <p className="section__sub" style={{ marginInline: "auto" }}>
          {sub ??
            "Собрали то, что чаще всего спрашивают в нашем Telegram. Не нашли ответ — напишите, отвечаем в течение часа."}
        </p>
      </div>

      <div className="faq">
        {faq.map((item, i) => (
          <details className="faq__item" key={item.q} open={i === 0}>
            <summary className="faq__sum">{item.q}</summary>
            <div className="faq__body">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

import type { FaqItem } from "@/data/landing/types";

/* Большой блок вопросов из ТЗ — 10+ штук по теме страницы.

   Первый вопрос открыт: это самый частый запрос, и закрытый он выглядит как
   пустая секция. Остальные свёрнуты — <details> работают без JS, поэтому
   блок остаётся кликабельным даже до гидрации. */
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
      <div className="lp-sec__head">
        <h2 id="faq-title">{title ?? `Отвечаем на вопросы об оплате ${subjectIn}`}</h2>
        <p className="lp-sec__sub">
          {sub ??
            "Собрали то, что чаще всего спрашивают в нашем Telegram. Не нашли ответ — напишите, отвечаем в течение часа."}
        </p>
      </div>

      <div className="lp-faq__list">
        {faq.map((item, i) => (
          <details key={item.q} open={i === 0}>
            <summary>
              {item.q}
              <span className="lp-faq__sign" aria-hidden="true" />
            </summary>
            <div className="lp-faq__a">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

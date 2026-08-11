import type { Methodology } from "@/data/landing/types";

/* Блок 5 нижней части ТЗ: методология «ключ» нашей редакцией.

   Веса приходят из контента темы — ТЗ прямо требует пересматривать формулу
   в зависимости от назначения платежа. Сверху — что редакция сделала руками
   до всякой формулы, шагами; ниже — сама формула на всю ширину. */
export default function MethodologyBlock({
  methodology,
  subjectIn,
  title,
}: {
  methodology: Methodology;
  /** Тема в позиции дополнения: «ChatGPT», но «в Турции». */
  subjectIn: string;
  /** Свой заголовок темы; без него собирается по шаблону. */
  title?: string;
}) {
  const max = Math.max(...methodology.criteria.map((c) => c.pct));

  return (
    <section className="lp-method" id="methodology" aria-labelledby="methodology-title">
      <div className="lp-sec__head">
        <h2 id="methodology-title">
          {title ?? `Методология рейтинга карт для оплаты ${subjectIn}`}
        </h2>
        <p className="lp-sec__sub">{methodology.lead}</p>
      </div>

      <div className="lp-method__steps">
        {methodology.checks.map((c, i) => (
          <div className="lp-method__step" key={c.b}>
            <span className="lp-method__stepn">Шаг {i + 1}</span>
            <h4>{c.b}</h4>
            <p>{c.p}</p>
          </div>
        ))}
      </div>

      <div className="lp-formula">
        <div className="lp-formula__title">{methodology.formulaTitle ?? "Формула итогового балла"}</div>
        {methodology.criteria.map((c) => (
          <div className="lp-formula__row" key={c.lbl}>
            <div className="lp-formula__head">
              <span className="lp-formula__lbl">{c.lbl}</span>
              <span className="lp-formula__pct">{c.pct}%</span>
            </div>
            {/* Ширина считается от максимума, а не от 100%: иначе самый
                весомый критерий занимает четверть шкалы и разница между
                соседними позициями на глаз неразличима. */}
            <span className="lp-formula__bar">
              <span style={{ width: `${Math.round((c.pct / max) * 100)}%` }} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

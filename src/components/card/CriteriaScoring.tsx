import type { CriteriaScore } from "@/data/cards";

/** Оценки по критериям формулы рейтинга — весовая полоса на карточку,
 *  ширина = value/5. Внизу — взвешенный итог. */
export default function CriteriaScoring({
  criteria,
  score,
  sub,
}: {
  criteria: CriteriaScore[];
  /** Итоговый балл карты по шкале рейтинга — он округлён и может не совпадать
   *  со взвешенной суммой до десятых. */
  score: number | null;
  sub?: string;
}) {
  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);
  const weighted = criteria.reduce((s, c) => s + c.value * c.weight, 0) / (totalWeight || 1);
  const final = score ?? weighted;

  return (
    <section className="sec" id="scores">
      <h2>Оценки по критериям</h2>
      <p className="ssub">
        {sub ??
          "Балл по каждому пункту нашей формулы — видно, за счёт чего сервис оказался на своём месте в рейтинге и где просел."}
      </p>
      <div className="crit">
        {criteria.map((c) => (
          <div className="crit__r" key={c.label}>
            <span className="crit__l">
              {c.label}
              <span>{c.note}</span>
            </span>
            <span className="crit__w">вес {c.weight}%</span>
            <span className="crit__bar">
              <i
                className={c.value >= 4.5 ? "hi" : c.value < 4 ? "lo" : undefined}
                style={{ width: `${Math.round((c.value / 5) * 100)}%` }}
              />
            </span>
            <span className="crit__v">{c.value.toFixed(1)}</span>
          </div>
        ))}
        <div className="crit__foot">
          <b>{weighted.toFixed(2)}</b>
          <span>
            взвешенный балл → {final.toFixed(1)} после округления до десятых по
            шкале рейтинга
          </span>
        </div>
      </div>
    </section>
  );
}

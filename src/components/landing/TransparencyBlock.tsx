import { TRANSPARENCY_STATS } from "@/data/home";

/* Блок 3 нижней части ТЗ: прозрачность рейтинга. Без переопределения берём
   общие цифры сайта (data/home), чтобы не разъезжались с главной — тема
   может задать свою полосу статистики (напр. «26 карт проверили на
   ChatGPT»), тогда title/stats замещают общие целиком. */
export default function TransparencyBlock({
  title,
  stats,
}: {
  title?: string;
  stats?: { n: string; l: string }[];
}) {
  return (
    <section className="lp-transp" id="transparency" aria-labelledby="transparency-title">
      <div className="lp-transp__head">
        <span className="lp-eyebrow lp-eyebrow--on-dark">Прозрачность</span>
        <h2 id="transparency-title">
          {title ?? "Не верьте на слово — мы оплатили своими деньгами"}
        </h2>
      </div>

      <div className="lp-transp__grid">
        {(stats ?? TRANSPARENCY_STATS).map((s) => (
          <div key={s.l}>
            <div className="lp-transp__n">{s.n}</div>
            <div className="lp-transp__l">{s.l}</div>
          </div>
        ))}
      </div>

      <p className="lp-transp__foot">
        Партнёрские ссылки помечены <code>rel=&quot;sponsored&quot;</code>. Они не
        влияют на позицию в рейтинге: место в топе не продаётся, порядок считает
        формула выше.
      </p>
    </section>
  );
}

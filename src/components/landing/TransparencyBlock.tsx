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
    <section className="lp-transp transp-card" id="transparency" aria-labelledby="transparency-title">
      <h2 id="transparency-title" className="transp-card__title">
        {title ?? "Не верьте на слово — мы оплатили своими деньгами"}
      </h2>

      <div className="transp-card__grid">
        {(stats ?? TRANSPARENCY_STATS).map((s, idx) => (
          <div key={s.l} className="transp-card__stat-wrapper">
            <div className="transp-card__stat">
              <div className="transp-card__stat-n">{s.n}</div>
              <div className="transp-card__stat-l">{s.l}</div>
            </div>
            {idx < (stats ?? TRANSPARENCY_STATS).length - 1 && (
              <div className="transp-card__divider" />
            )}
          </div>
        ))}
      </div>

      <p className="transp-card__bottom">
        Партнёрские ссылки помечены <code className="transp-card__code">rel="sponsored"</code>. Они не
        влияют на позицию в рейтинге: место в топе не продаётся, порядок считает
        формула выше.
      </p>
    </section>
  );
}

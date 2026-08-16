import Link from "@/components/shared/Link";
import type { RelatedLink } from "@/data/landing/types";

/* Блок 4 нижней части ТЗ: похожие материалы. Правило перелинковки — 80%
   ссылок на темы с наибольшим спросом, 20% на смежные с текущей. Признак
   `kind` теперь не делит список на две группы (в макете он один), а рисует
   у трендовых ссылок плашку «Тренд» прямо в заголовке. */
export default function RelatedSection({ related }: { related: RelatedLink[] }) {
  return (
    <section className="lp-related" id="related" aria-labelledby="related-title">
      <div className="lp-sec__head">
        <h2 id="related-title">Похожие материалы</h2>
        <p className="lp-sec__sub">Что чаще всего смотрят вместе с этой страницей.</p>
      </div>

      <div className="lp-related__grid">
        {related.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className={`lp-related__card${r.icon ? " lp-related__card--icon" : ""}`}
          >
            {r.kind === "trend" ? <span className="lp-hot">Тренд</span> : null}
            {r.icon ? <span className="lp-related__ic">{r.icon}</span> : null}
            <span className="lp-related__body">
              <span className="lp-related__t">{r.title}</span>
              <span className="lp-related__s">{r.sub}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

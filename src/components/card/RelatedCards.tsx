import Link from "@/components/shared/Link";
import { getCardBySlug } from "@/data/cards";
import { initials } from "./CardHero";

/** «Похожие обзоры» — только карты, которые реально есть в каталоге:
 *  слаг без карточки тихо выпадает, а не ведёт на 404. */
export default function RelatedCards({ slugs }: { slugs: string[] }) {
  const cards = slugs.map(getCardBySlug).filter((c): c is NonNullable<typeof c> => !!c);
  if (!cards.length) return null;

  return (
    <section className="sec" id="related-reviews">
      <h2>Обзоры других сервисов</h2>
      <p className="ssub">
        Ближайшие места в рейтинге и те, что чаще всего сравнивают с этим
        сервисом.
      </p>
      <div className="rel">
        {cards.map((c) => (
          <Link key={c.slug} href={`/cards/${c.slug}`} className="rel__a">
            <span className="rel__ic" style={{ background: c.color }}>
              {initials(c.name)}
            </span>
            <span>
              <span className="rel__t">{c.name} — обзор</span>
              <span className="rel__m">
                {[
                  c.rank ? `${c.rank} место` : null,
                  c.display?.issue ?? (c.issueRub !== null ? `${c.issueRub.toLocaleString("ru-RU")} ₽` : null),
                  c.cats.includes("crypto") ? "крипта есть" : c.geo,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </span>
            {c.score !== null ? <span className="rel__sc">{c.score.toFixed(1)}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

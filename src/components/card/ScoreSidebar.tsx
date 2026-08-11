import type { Card } from "@/data/cards";
import ApplyLink from "@/components/shared/ApplyLink";
import PromoCode from "./PromoCode";

/** Sticky-карточка «оценка + вердикт + CTA + промокод» — верх правой
 *  колонки обзора, над TocSidebar (см. CardReview в page.tsx). */
export default function ScoreSidebar({ card }: { card: Card }) {
  const d = card.detail;
  const stars = card.score === null ? "" : "★".repeat(Math.round(card.score));
  const reviewsTotal = d?.reviewsSummary?.total ?? card.reviews;

  return (
    <aside className="score">
      <div className="score__top">
        {card.score !== null ? <span className="score__n">{card.score.toFixed(1)}</span> : null}
        <div>
          {stars ? <span className="score__stars">{stars}</span> : null}
          {reviewsTotal ? (
            <div className="score__rev">
              <a href="#reviews">{reviewsTotal} отзывов</a>
              {d?.paymentsNote ? ` · ${d.paymentsNote}` : null}
            </div>
          ) : null}
        </div>
      </div>

      {d?.verdictNote ? (
        <div className="score__verdict">
          {d.verdictNote}
          {d.verdictSub ? <span>{d.verdictSub}</span> : null}
        </div>
      ) : null}

      <div className="score__cta">
        <ApplyLink
          className="btn btn-primary btn-lg"
          href={card.applyUrl}
          card={card.slug}
          place="sidebar"
        >
          Оформить карту →
        </ApplyLink>
        {d?.plans?.length || d?.tariffTable?.length ? (
          <a className="btn btn-ghost" href="#tariffs">
            Сначала посмотреть тарифы
          </a>
        ) : null}
      </div>

      {d?.promo ? <PromoCode text={d.promo.text} code={d.promo.code} /> : null}

      <p className="score__note">Партнёрская ссылка. Позиция в рейтинге не продаётся.</p>
    </aside>
  );
}

import type { CardDetail, CardReview } from "@/data/cards";

/** «Дмитрий М.» → «ДМ»: по первой букве имени и инициала фамилии. */
const avatar = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();

/** Один отзыв: аватар-инициалы, звёзды, теги и — у критичных — ответ редакции. */
export function ReviewItem({ review: r }: { review: CardReview }) {
  return (
    <div className="rev">
      <div className="rev-head">
        <span className="rev-ava">{avatar(r.name)}</span>
        <div>
          <div className="rev-name">{r.name}</div>
          <div className="rev-mail">{r.mail}</div>
        </div>
        <div className="rev-stars-sm">
          {"★".repeat(r.score)}
          {"☆".repeat(5 - r.score)}
        </div>
      </div>
      <p>{r.text}</p>
      {r.tags?.length ? (
        <div className="rev-tags">
          {r.tags.map((t) => (
            <span className="rtag" key={t}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
      {r.reply ? (
        <div className="rev-ans">
          <b>Ответ NHcard</b>
          <p>{r.reply}</p>
        </div>
      ) : null}
    </div>
  );
}

/** Распределение оценок 5→1 звёзд, барами относительно самого частого. */
function DistributionBars({ distribution }: { distribution: [number, number, number, number, number] }) {
  const max = Math.max(...distribution, 1);
  return (
    <div className="rev-bars">
      {distribution.map((count, i) => {
        const stars = 5 - i;
        return (
          <div className="rev-bar" key={stars}>
            <span>{stars} ★</span>
            <em>
              <i style={{ width: `${Math.round((count / max) * 100)}%` }} />
            </em>
            <span>{count}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ReviewsSection({
  score,
  reviews,
  sub,
  source,
  summary,
}: {
  score: number;
  reviews: CardReview[];
  sub?: string;
  source?: string;
  summary?: NonNullable<CardDetail["reviewsSummary"]>;
}) {
  const bigScore = summary?.avg ?? score;
  const stars = "★".repeat(Math.round(bigScore));
  const total = summary?.total ?? reviews.length;

  return (
    <section className="sec" id="reviews">
      <h2>Отзывы пользователей</h2>
      {sub ? <p className="ssub">{sub}</p> : null}
      <div className="rev-summary">
        <span className="rev-score">{bigScore.toFixed(1)}</span>
        <div>
          <div className="rev-stars">{stars}</div>
          <div className="rev-count">
            {summary ? `Средняя оценка по ${total} отзывам` : `${total} отзывов`}
            {!summary && source ? ` · ${source}` : ""}
          </div>
        </div>
      </div>
      {summary ? <DistributionBars distribution={summary.distribution} /> : null}
      {summary?.mostPraised || summary?.mostComplained ? (
        <p className="rev-meta">
          {summary.mostPraised ? <>Чаще всего хвалят: {summary.mostPraised}. </> : null}
          {summary.mostComplained ? <>Чаще всего жалуются: {summary.mostComplained}.</> : null}
        </p>
      ) : null}
      <a className="btn btn-ghost rev-leave" href="#review-form">
        Оставить отзыв
      </a>
      <div className="reviews">
        {reviews.map((r) => (
          <ReviewItem key={r.name + r.mail} review={r} />
        ))}
      </div>
    </section>
  );
}

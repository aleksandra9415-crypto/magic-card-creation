import Link from "@/components/shared/Link";
import type { HomeServiceCard } from "@/data/home";
import { VerifiedShield } from "@/components/shared/icons";

/** Карточка сервиса в сетке .services — полностью рендерится из данных */
export default function ServiceCard({ card }: { card: HomeServiceCard }) {
  const logoClass =
    "svc__logo" + (card.logoVariant ? ` svc__logo--${card.logoVariant}` : "");

  return (
    <article className={`svc${card.top ? " svc--top" : ""}`}>
      {card.rankLabel ? <span className="svc__rank">{card.rankLabel}</span> : null}
      <header className="svc__head">
        <div className={logoClass}>{card.logo}</div>
        <div>
          <div className="svc__name">{card.name}</div>
          <div className="svc__meta">
            {card.verified ? (
              <span className="verified">
                <VerifiedShield />
                Проверено
              </span>
            ) : null}
            {" · "}
            {card.geo}
          </div>
        </div>
        <div className="svc__rating">
          <div className="svc__score">{card.score}</div>
          <div className="svc__rev">{card.reviewsLabel}</div>
        </div>
      </header>

      <div className="svc__row">
        {card.cells.map((cell) => (
          <div className="svc__cell" key={cell.lbl}>
            <div className="lbl">{cell.lbl}</div>
            <div className="val">
              {cell.freeText ? (
                <span className="free">{cell.freeText}</span>
              ) : (
                cell.val
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="svc__features">
        {card.tags.map((t) => (
          <span
            key={t.label}
            className={`tagchip${t.mute ? " tagchip--mute" : ""}`}
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="svc__svcs">
        <span className="lbl-row">Работает с:</span>
        {card.appIcons.map((ic) => (
          <span
            key={ic.label}
            className={`appicon${ic.variant ? ` appicon--${ic.variant}` : ""}`}
          >
            {ic.label}
          </span>
        ))}
      </div>

      <div className="svc__cta">
        {card.reviewHref ? (
          <Link className="btn btn--ghost" href={card.reviewHref}>
            Обзор
          </Link>
        ) : (
          <a className="btn btn--ghost" href="#">
            Обзор
          </a>
        )}
        <a
          className="btn btn--primary"
          href={card.applyUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Оформить
        </a>
      </div>
    </article>
  );
}

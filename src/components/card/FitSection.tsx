import Link from "@/components/shared/Link";
import { CARDS, type Card } from "@/data/cards";
import ApplyLink from "@/components/shared/ApplyLink";
import { ArrowRight16 } from "@/components/shared/icons";

/** «Кому подойдёт / не подойдёт» — главный вывод обзора двумя списками,
 *  чтобы не читать всё, если сервис явно не подходит. */
export default function FitSection({
  fit,
  card,
}: {
  fit: { yes: string[]; no: string[]; ctaLabel?: string };
  card: Card;
}) {
  const others = CARDS.length - 1;

  return (
    <section className="sec" id="fit">
      <h2>Кому подойдёт и кому нет</h2>
      <p className="ssub">
        Главный вывод обзора в двух списках — чтобы не читать всё, если сервис
        вам не подходит.
      </p>
      <div className="fit">
        <div className="fit__c">
          <div className="fit__t">
            <span className="fit__ic fit__ic--y">✓</span>Подойдёт, если
          </div>
          <ul>
            {fit.yes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <ApplyLink className="fit__cta" href={card.applyUrl} card={card.slug} place="fit">
            <span>
              <b>{fit.ctaLabel ?? "Оформить карту"}</b>
              <span>Оформить на сайте сервиса</span>
            </span>
            <ArrowRight16 />
          </ApplyLink>
        </div>
        <div className="fit__c">
          <div className="fit__t">
            <span className="fit__ic fit__ic--n">✕</span>Не подойдёт, если
          </div>
          <ul>
            {fit.no.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <Link className="fit__cta fit__cta--muted" href="/cards">
            <span>
              <b>Посмотреть {others} других сервисов</b>
              <span>Вернуться в рейтинг</span>
            </span>
            <ArrowRight16 />
          </Link>
        </div>
      </div>
    </section>
  );
}

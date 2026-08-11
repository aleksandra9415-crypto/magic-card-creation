import Link from "@/components/shared/Link";
import type { Card } from "@/data/cards";
import ApplyLink from "@/components/shared/ApplyLink";

/** Нижняя CTA-полоса обзора — последний шанс отправить читателя оформлять
 *  карту, плюс запасная ссылка сравнить с другими. */
export default function EndCta({ card }: { card: Card }) {
  const d = card.detail;
  return (
    <section className="endcta">
      <div>
        <h2>Оформить карту «{card.name}»</h2>
        <p>{d?.endCtaText ?? d?.tagline}</p>
      </div>
      <div className="endcta__b">
        <ApplyLink className="btn btn-orange" href={card.applyUrl} card={card.slug} place="endcta">
          Перейти на сайт сервиса →
        </ApplyLink>
        <Link className="btn btn-ghost" href="/cards">
          Сравнить с другими картами
        </Link>
        <p className="endcta__note">Партнёрская ссылка. Позиция в рейтинге не продаётся.</p>
      </div>
    </section>
  );
}

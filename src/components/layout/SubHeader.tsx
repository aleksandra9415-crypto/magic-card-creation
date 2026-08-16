import Link from "@/components/shared/Link";
import logoAsset from "@/assets/nhcard-logo.svg.asset.json";

/**
 * Компактная шапка внутренних страниц (рейтинг, обзор карты).
 * variant="rating" — навигация с якорями рейтинга и кнопкой "Подобрать карту";
 * variant="review" — навигация ведёт на страницу рейтинга.
 */
export default function SubHeader({ variant }: { variant: "rating" | "review" }) {
  return (
    <header className="hdr">
      <div className="container hdr-in">
        <Link className="logo" href="/">
          <img src={logoAsset.url} alt="NHcard" className="logo__img" />
        </Link>
        {variant === "rating" ? (
          <nav className="hdr-nav">
            <a href="#" className="active">
              Рейтинг карт
            </a>
            <a href="#checklist">Как выбрать</a>
            <a href="#faq">FAQ</a>
            <a href="#">Чёрный список</a>
          </nav>
        ) : (
          <nav className="hdr-nav">
            <Link href="/cards">Рейтинг карт</Link>
            <Link href="/cards#checklist">Как выбрать</Link>
            <Link href="/cards#faq">FAQ</Link>
          </nav>
        )}
        <div className="hdr-cta">
          {variant === "rating" ? (
            <button className="btn btn--orange">Подобрать карту</button>
          ) : (
            <Link className="btn btn--primary" href="/cards">
              Рейтинг карт
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

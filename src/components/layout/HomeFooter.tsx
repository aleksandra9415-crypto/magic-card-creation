import Link from "@/components/shared/Link";
import { NHLogoSvg } from "@/components/shared/icons";

type FooterLink = { label: string; href: string };

const ratingHref = (params: Record<string, string>) =>
  `/cards?${new URLSearchParams(params).toString()}`;

/* Структура подвала — 1:1 из референса, ссылки на реальные страницы */
const FOOTER_COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Рейтинги карт",
    links: [
      { label: "Виртуальные иностранные карты", href: "/cards" },
      { label: "Карты для подписок", href: "/#collections" },
      { label: "Зарубежные виртуальные карты", href: "/" },
      { label: "Карты для путешествий", href: "/countries" },
      { label: "Банковские карты РФ", href: "#" },
    ],
  },
  {
    title: "Карты для сервисов",
    links: [
      { label: "Для ChatGPT", href: ratingHref({ service: "ChatGPT" }) },
      { label: "Для Claude", href: ratingHref({ service: "Claude" }) },
      { label: "Для Midjourney", href: ratingHref({ category: "Нейросети" }) },
      { label: "Для Netflix · Spotify", href: ratingHref({ category: "Стриминг и медиа" }) },
      { label: "Для Steam · PlayStation", href: ratingHref({ category: "Игры и сторы" }) },
      { label: "Для Booking · Airbnb", href: ratingHref({ category: "Путешествия" }) },
    ],
  },
  {
    title: "Гайды и разделы",
    links: [
      { label: "Как оплатить ChatGPT", href: "/blog/chatgpt-russia" },
      { label: "Как платить в Турции", href: "/countries/turkey" },
      { label: "Как платить в Таиланде", href: "/countries/thailand" },
      { label: "Блог", href: "/blog" },
      { label: "Крипта: обменники и биржи", href: "#" },
      { label: "Нейросети: рейтинги", href: ratingHref({ category: "Нейросети" }) },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О проекте", href: "#" },
      { label: "Редакция", href: "#" },
      { label: "Контакты", href: "#" },
      { label: "Реклама", href: "#" },
      { label: "Правовая информация", href: "#" },
    ],
  },
];

export default function HomeFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link className="logo" href="/">
              <span className="logo__mark" aria-hidden="true">
                <NHLogoSvg gradientId="nhRedF" />
              </span>
              <span>NHcard</span>
            </Link>
            <p className="footer__about">
              Независимый мониторинг зарубежных виртуальных карт для россиян. С
              2024 года.
            </p>
            <div className="footer__social">
              <a
                className="chip"
                href="https://t.me/nhcard"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21 5L2 12l6 2 2 6 4-3 6 4 1-16z" />
                </svg>
                Telegram
              </a>
              <a
                className="chip"
                href="https://youtube.com/@nhcard"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12s0-4-1-5c-.6-.6-1.3-.7-2-.7C16 6 12 6 12 6s-4 0-7 .3c-.7 0-1.4.1-2 .7C2 8 2 12 2 12s0 4 1 5c.6.6 1.4.7 2.1.8 2.4.2 6.9.3 6.9.3s4 0 7-.3c.7-.1 1.4-.2 2-.8 1-1 1-5 1-5zM10 15V9l5 3-5 3z" />
                </svg>
                YouTube
              </a>
            </div>
          </div>
          {/* На мобильном разделы — аккордеоны, свёрнутые по умолчанию.
              Раскрытие на чекбоксе: без JS, без мигания при гидрации;
              на десктопе media-запрос держит списки всегда открытыми. */}
          {FOOTER_COLS.map((col, i) => (
            <div className="footer__col" key={col.title}>
              <input
                type="checkbox"
                className="footer__toggle"
                id={`footer-col-${i}`}
              />
              <label className="footer__col-head" htmlFor={`footer-col-${i}`}>
                <h4>{col.title}</h4>
                <span className="footer__chev" aria-hidden="true" />
              </label>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span>© 2024–2026 NHcard. Независимый мониторинг.</span>
          <span>
            NHcard не выпускает карты и не оказывает банковских услуг — мы
            агрегируем публичную информацию о сторонних сервисах.
          </span>
        </div>
      </div>
    </footer>
  );
}

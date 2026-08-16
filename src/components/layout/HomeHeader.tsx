
import { useEffect, useState } from "react";
import Link from "@/components/shared/Link";
import { usePathname } from "@/lib/next-compat";
import logoAsset from "@/assets/logo-nhcard.svg.asset.json";

/* Разделы бургер-меню — те же, что в таб-баре, плюс «Крипта»: спека требует
   от мобильной навигации полного набора, а не урезанного. */
const MENU = [
  { href: "/cards", label: "Рейтинг карт" },
  { href: "/#collections", label: "Для подписок" },
  { href: "/#countries", label: "По странам" },
  { href: "/#howto", label: "Гайды" },
  { href: "/blog", label: "Блог" },
];

export default function HomeHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* Переход по ссылке внутри того же маршрута (якорь) не размонтирует шапку —
     закрываем меню руками и на смене адреса, и по Escape. */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* С открытым меню шапка поднимается над подложкой и таб-баром */}
      <header className={`hdr${open ? " is-menu" : ""}`}>
      <div className="container hdr__inner">
        <Link className="logo" href="/" aria-label="NHcard">
          <img src={logoAsset.url} alt="NHcard" className="logo__img" />
        </Link>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Главное меню">
          {MENU.map((m) => (
            <Link key={m.href} href={m.href} onClick={() => setOpen(false)}>
              {m.label}
            </Link>
          ))}
          <a href="#" onClick={() => setOpen(false)}>
            Крипта <span className="tag-new">NEW</span>
          </a>
          <Link
            className="btn btn--orange nav__cta"
            href="/cards"
            onClick={() => setOpen(false)}
          >
            Подобрать карту
          </Link>
        </nav>
        <div className="hdr__spacer"></div>
        <div className="hdr__cta">
          <Link className="btn btn--orange" href="/cards">
            Подобрать карту
          </Link>
        </div>
        <button
          className="burger"
          aria-label={open ? "Закрыть меню" : "Меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path
                d="M1 1h18M1 7h18M1 13h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
      </header>
      {/* Подложка живёт вне шапки: backdrop-filter на .hdr делает её
          containing block'ом, и fixed-элемент внутри схлопывался бы до
          высоты шапки. */}
      {open ? (
        <button
          className="nav-veil"
          aria-label="Закрыть меню"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

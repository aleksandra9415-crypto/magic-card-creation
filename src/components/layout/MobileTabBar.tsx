
import Link from "@/components/shared/Link";
import { usePathname } from "@/lib/next-compat";

/* Sticky таб-бар мобильной версии: четыре раздела из спеки. Показывается
   только на мобильном (см. .tabbar в home.css), на десктопе его роль играет
   меню в шапке. */
const TABS = [
  {
    href: "/cards",
    label: "Рейтинг",
    match: (p: string) => p.startsWith("/cards"),
    icon: (
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
    ),
  },
  {
    href: "/#collections",
    label: "Подписки",
    match: (p: string) => p === "/collections",
    icon: (
      <>
        <rect x="3" y="4" width="7" height="7" rx="2" />
        <rect x="14" y="4" width="7" height="7" rx="2" />
        <rect x="3" y="13" width="7" height="7" rx="2" />
        <rect x="14" y="13" width="7" height="7" rx="2" />
      </>
    ),
  },
  {
    href: "/countries",
    label: "Страны",
    match: (p: string) => p.startsWith("/countries"),
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />
      </>
    ),
  },
  {
    href: "/blog",
    label: "Гайды",
    match: (p: string) => p.startsWith("/blog"),
    icon: (
      <>
        <path d="M5 4h11l3 3v13H5z" />
        <path d="M8 10h8M8 14h5" />
      </>
    ),
  },
];

export default function MobileTabBar() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="tabbar" aria-label="Разделы сайта">
      {TABS.map((t) => {
        const on = t.match(pathname);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`tabbar__item${on ? " is-on" : ""}`}
            aria-current={on ? "page" : undefined}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {t.icon}
            </svg>
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

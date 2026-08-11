
import Link from "@/components/shared/Link";
import { usePathname } from "@/lib/next-compat";
import { useRouter } from "@/lib/next-compat";
import { ToastProvider } from "./Toast";

/* Общий каркас всех страниц админки: сайдбар с разделами + шапка с заголовком.
   Проверка доступа делается на сервере (app/admin/layout.tsx) — сюда попадает
   только уже авторизованный пользователь. */

const NAV = [
  { href: "/admin", label: "Дашборд", icon: "▦" },
  { href: "/admin/cards", label: "Карты", icon: "▤" },
  { href: "/admin/blog", label: "Блог", icon: "✎" },
  { href: "/admin/countries", label: "Страны", icon: "◈" },
  { href: "/admin/home", label: "Главная", icon: "⌂" },
  { href: "/admin/rating", label: "Рейтинг", icon: "★" },
  { href: "/admin/settings", label: "Настройки", icon: "⚙" },
];

export default function AdminShell({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <ToastProvider>
      <div className="admin">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <span className="admin-brand-mark">N</span>
            <span>NHcard</span>
          </div>

          <nav className="admin-nav">
            {NAV.map((item) => {
              /* «/admin» подсвечиваем только на точном совпадении,
                 иначе он был бы активен на всех вложенных разделах. */
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-link${active ? " is-active" : ""}`}
                >
                  <span className="admin-nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="admin-sidebar-foot">
            <Link className="admin-nav-link" href="/" target="_blank">
              <span className="admin-nav-icon">↗</span>
              Открыть сайт
            </Link>
            <button className="admin-nav-link" type="button" onClick={logout}>
              <span className="admin-nav-icon">⏻</span>
              Выйти
            </button>
          </div>
        </aside>

        <div className="admin-main">
          <header className="admin-header">
            <h1>{title}</h1>
            {actions ? <div className="admin-header-actions">{actions}</div> : null}
          </header>
          <div className="admin-content">{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}

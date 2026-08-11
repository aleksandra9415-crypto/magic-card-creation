import Link from "@/components/shared/Link";
import type { NavGroup } from "@/data/landing/types";

/* Замыкающие блоки навигации из ТЗ. Стоят последними намеренно: это выход
   со страницы, и предлагать его раньше, чем прочитан рейтинг и ответы на
   вопросы, — терять читателя на полпути. */
export default function NavBlocks({
  groups,
  currentHref,
}: {
  groups: NavGroup[];
  /** Ссылку на саму себя гасим — она никуда не ведёт. */
  currentHref: string;
}) {
  return (
    <nav className="lp-nav" aria-label="Другие страницы рейтинга">
      {groups.map((g) => (
        <div className="lp-nav__col" key={g.title}>
          <div className="lp-nav__title">{g.title}</div>
          <ul>
            {g.items.map((it) =>
              it.href === currentHref ? (
                <li key={it.href}>
                  <span className="lp-nav__current">{it.label}</span>
                </li>
              ) : (
                <li key={it.href}>
                  <Link href={it.href}>{it.label}</Link>
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </nav>
  );
}

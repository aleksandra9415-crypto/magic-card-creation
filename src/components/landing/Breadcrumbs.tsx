import Link from "@/components/shared/Link";

/** Без href — промежуточный уровень таксономии без своей страницы
 *  (напр. «Карты для подписок» → «Нейросети» перед темой ChatGPT). */
export type Crumb = { href?: string; label: string };

/* Хлебные крошки (блок 2 ТЗ). Последний элемент — текущая страница, он не
   ссылка. Разметку BreadcrumbList страница отдаёт отдельно, JSON-LD-ом:
   дублировать её микроданными в разметке смысла нет. */
export default function Breadcrumbs({
  trail,
  current,
}: {
  trail: Crumb[];
  current: string;
}) {
  return (
    <nav className="lp-crumbs" aria-label="Хлебные крошки">
      <ol>
        {trail.map((c) => (
          <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</li>
        ))}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

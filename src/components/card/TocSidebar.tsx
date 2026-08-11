
import { useEffect, useState } from "react";

export type TocSection = { id: string; label: string };

/** Sticky-оглавление с подсветкой активного раздела при скролле.
    Список секций генерируется страницей из фактически показанных блоков. */
export default function TocSidebar({ sections }: { sections: TocSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const onScroll = () => {
      let cur = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - 100 <= 0) cur = s.id;
      }
      setActive(cur);
    };
    document.addEventListener("scroll", onScroll);
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <nav className="toc">
      <div className="toc-label">На странице</div>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={active === s.id ? "on" : undefined}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

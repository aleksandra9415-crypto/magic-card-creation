import { EEAT_AUTHORS } from "@/data/home";
import type { Editorial } from "@/data/landing/types";

/* Блоки 1 и 2 нижней части ТЗ: кто составляет рейтинг и что обновилось.
   Это два разных вопроса читателя — «кому верить» и «насколько свежо», —
   но отвечают они на одно сомнение, поэтому стоят одной полосой. */
export default function EditorialStrip({
  editorial,
  authors,
  authorsTitle,
  changelogTitle,
}: {
  editorial: Editorial;
  /** Авторы конкретного обзора; без них — общая редакция рейтинга. */
  authors?: typeof EEAT_AUTHORS;
  authorsTitle?: string;
  changelogTitle?: string;
}) {
  const people = authors ?? EEAT_AUTHORS;
  return (
    <section className="lp-eeat eeat-experts" id="editorial" aria-labelledby="editorial-title">
      <div className="eeat-experts__header">
        <h3 id="editorial-title" className="eeat-experts__title">
          {authorsTitle ?? "Кто составляет рейтинги"}
        </h3>
      </div>
      
      <div className="eeat-experts__grid">
        {people.map((a) => (
          <div className="expert-card" key={a.name}>
            <div className="expert-card__img-wrapper">
              <img 
                src={a.name.includes("Никита") 
                  ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=250&auto=format&fit=crop" 
                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=250&auto=format&fit=crop"} 
                alt={a.name}
                className="expert-card__img"
              />
            </div>
            <div className="expert-card__content">
              <div className={`expert-card__role ${a.fc ? 'expert-card__role--fc' : ''}`}>
                {a.role}
              </div>
              <div className="expert-card__name">{a.name}</div>
              <div className="expert-card__meta">{a.meta}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="eeat-changelog">
        <div className="eeat-changelog__title">
          <span className="dot" />
          {changelogTitle ?? "ЧТО ОБНОВИЛОСЬ"}
        </div>
        <ul className="changelog-list">
          {editorial.changelog.map((c) => (
            <li key={c.date + c.text} className="changelog-item">
              <time className="changelog-date">{c.date}</time>
              <span className="changelog-text">{c.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { EEAT_AUTHORS } from "@/data/home";
import type { ChangelogTag, Editorial } from "@/data/landing/types";

const CHANGELOG_TAG_LABEL: Record<ChangelogTag, string> = {
  price: "Тарифы",
  new: "Новое",
  check: "Перепроверка",
  list: "Состав",
  content: "Контент",
  score: "Оценка",
};

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
    <section className="lp-eeat" id="editorial" aria-labelledby="editorial-title">
      <div className="lp-eeat__col">
        <h2 id="editorial-title" className="lp-eeat__title">
          {authorsTitle ?? "Кто составляет рейтинги"}
        </h2>
        {people.map((a) => (
          <div className="lp-author" key={a.name}>
            <span className={`lp-author__ava${a.fc ? " lp-author__ava--fc" : ""}`}>
              {a.ava}
            </span>
            <div>
              <span className={`lp-author__role${a.fc ? " lp-author__role--fc" : ""}`}>
                {a.role}
              </span>
              <div className="lp-author__name">{a.name}</div>
              <p className="lp-author__meta">{a.meta}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="lp-eeat__col">
        <h2 className="lp-eeat__title">
          <span className="lp-eeat__dot" />
          {changelogTitle ?? "Что обновлено и когда"}
        </h2>
        <ul className="lp-changelog">
          {editorial.changelog.map((c) => (
            <li key={c.date + c.text}>
              <time>{c.date}</time>
              <span>
                {c.tag ? (
                  <span className={`lp-changelog__k lp-changelog__k--${c.tag}`}>
                    {CHANGELOG_TAG_LABEL[c.tag]}
                  </span>
                ) : null}
                {c.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

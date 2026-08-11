import Link from "@/components/shared/Link";
import type { Prose } from "@/data/landing/types";
import ProsConsGrid from "./ProsConsGrid";
import Callout from "./Callout";

/* Универсальный текстовый блок под H3. Из него собраны блоки 2, 3, 5 и 12
   ТЗ: у них одна форма — заголовок, лид, пара абзацев и список зацепок.
   Отдельные компоненты на каждый смысл дали бы четыре копии одной вёрстки.

   `prose.cards` переключает блок в 3-колоночную раскладку-объяснение
   («что такое виртуальная карта простыми словами») — paragraphs/bullets в
   этом режиме не читаются, это разные формы одного и того же блока. */
export default function TextBlock({
  prose,
  as: Heading = "h3",
  /** Номер в кружке у заголовка — для блоков способа оплаты (2, 3, …). */
  n,
}: {
  prose: Prose;
  /* Внутри «как оплачивать» блоки идут H3, а «что такое виртуальная карта»
     живёт самостоятельной секцией — там нужен H2. */
  as?: "h2" | "h3";
  n?: number;
}) {
  const { id, title, tag, lead, paragraphs, bullets, prosCons, cards, link, note } = prose;

  if (cards?.length) {
    return (
      <article className="lp-simple" id={id}>
        {cards.map((c) => (
          <div className="lp-simple__c" key={c.title}>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </div>
        ))}
      </article>
    );
  }

  return (
    <article className="lp-prose" id={id}>
      {n || tag ? (
        <div className="lp-mblock__head">
          {n ? <span className="lp-mnum">{n}</span> : null}
          <Heading className="lp-prose__title">{title}</Heading>
          {tag ? <span className="lp-tag lp-tag--alt">{tag}</span> : null}
        </div>
      ) : (
        <Heading className="lp-prose__title">{title}</Heading>
      )}

      {lead ? <p className="lp-prose__lead">{lead}</p> : null}

      {paragraphs?.map((p) => (
        <p key={p.slice(0, 40)} className="lp-prose__p">
          {p}
        </p>
      ))}

      {bullets?.length ? (
        <ul className="lp-prose__list">
          {bullets.map((b) => (
            <li key={b.b}>
              <b>{b.b}</b>
              <span>{b.p}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {prosCons ? <ProsConsGrid prosCons={prosCons} /> : null}

      {note ? (
        <Callout>
          {note.text}
          {note.link ? (
            <>
              {" "}
              <Link href={note.link.href}>{note.link.label}</Link>.
            </>
          ) : null}
        </Callout>
      ) : null}

      {link ? (
        link.external ? (
          <a
            className="lp-prose__link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {link.label}
            <Arrow />
          </a>
        ) : (
          <Link className="lp-prose__link" href={link.href}>
            {link.label}
            <Arrow />
          </Link>
        )
      ) : null}
    </article>
  );
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M1 7h12M8 2l5 5-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

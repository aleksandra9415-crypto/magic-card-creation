import type { LandingContent } from "@/data/landing/types";
import TextBlock from "./TextBlock";
import ProsConsGrid from "./ProsConsGrid";
import Callout from "./Callout";

type Mistakes = NonNullable<LandingContent["mistakes"]>;

/* Способ 5 в «как оплачивать» — где чаще всего ломается платёж. По макету это
   блок-карточка внутри той же секции: абзац + два списка «что сделать / что
   ломает» + предупреждение.

   `sections` остаётся запасной формой для тем, где нужен развёрнутый разбор:
   тогда блок рендерит подразделы вместо двух списков. Для стран блок не
   вызывается вовсе (mistakes: null в данных). */
export default function MistakesBlock({
  mistakes,
  n,
}: {
  mistakes: Mistakes;
  n: number;
}) {
  const { title, tag, lead, prosCons, sections, closingNote } = mistakes;

  return (
    <article className="lp-prose" id="mistakes">
      <div className="lp-mblock__head">
        <span className="lp-mnum">{n}</span>
        <h3 className="lp-prose__title">{title}</h3>
        <span className="lp-tag lp-tag--no">{tag ?? "Здесь чаще всего ломается"}</span>
      </div>

      <p className="lp-prose__lead">{lead}</p>

      {prosCons ? <ProsConsGrid prosCons={prosCons} /> : null}

      {!prosCons && sections?.length ? (
        <div className="lp-mistakes__list">
          {sections.map((s) => (
            <TextBlock key={s.id} prose={s} />
          ))}
        </div>
      ) : null}

      {closingNote ? <Callout variant="warn">{closingNote}</Callout> : null}
    </article>
  );
}

import Link from "@/components/shared/Link";
import type { Walkthrough } from "@/data/landing/types";
import Callout from "./Callout";

/* Способ 4 в «как оплачивать» — оформление карты по шагам на примере лидера
   рейтинга. По макету это такой же блок-карточка, как остальные способы, а не
   отдельная секция: четыре компактные плитки 2×2 со скрином, номером шага и
   парой строк текста.

   Скрины ещё не отсняты — до тех пор плитка держит пустой слот той же высоты,
   поэтому подстановка картинки не сдвинет вёрстку. */
export default function WalkBlock({ walk, n }: { walk: Walkthrough; n: number }) {
  return (
    <article className="lp-prose" id="how-to-issue">
      <div className="lp-mblock__head">
        <span className="lp-mnum">{n}</span>
        <h3 className="lp-prose__title">{walk.title}</h3>
        {walk.tag ? <span className="lp-tag lp-tag--best">{walk.tag}</span> : null}
      </div>

      <p className="lp-prose__lead">
        Показываем на{" "}
        <Link href={`/cards/${walk.example.slug}`}>«{walk.example.name}»</Link> —{" "}
        {walk.lead}
      </p>

      <div className="lp-shots">
        {walk.steps.map((step, i) => (
          <div className="lp-shotc" key={step.title}>
            <div className="lp-shotc__img">
              {step.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={step.image.src} alt={step.image.alt} loading="lazy" />
              ) : (
                <span className="lp-shotc__slot">
                  {step.placeholder ?? `Скриншот: ${step.title.toLowerCase()}`}
                </span>
              )}
            </div>
            <div className="lp-shotc__b">
              <span className="lp-shotc__n">
                Шаг {i + 1}
                {step.time ? ` · ${step.time}` : null}
              </span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout variant="warn">{walk.foot}</Callout>
    </article>
  );
}

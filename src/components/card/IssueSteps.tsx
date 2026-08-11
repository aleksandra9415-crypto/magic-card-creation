import type { IssueStep } from "@/data/cards";

/** Один шаг: скрин сверху, номер с таймингом и текст снизу. Пустой слот
 *  держит высоту будущего скриншота, чтобы подстановка не сдвинула сетку. */
export function StepItem({ n, step }: { n: number; step: IssueStep }) {
  return (
    <div className="shot">
      <div className="shot__img">
        {step.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={step.image.src} alt={step.image.alt} loading="lazy" />
        ) : (
          <span className="shot__slot">
            {step.placeholder ?? `Скриншот: ${step.title.toLowerCase()}`}
          </span>
        )}
      </div>
      <div className="shot__b">
        <span className="shot__n">
          Шаг {n}
          {step.time ? ` · ${step.time}` : null}
        </span>
        <h4>{step.title}</h4>
        <p>{step.text}</p>
      </div>
    </div>
  );
}

export default function IssueSteps({
  steps,
  sub,
}: {
  steps: IssueStep[];
  sub?: string;
}) {
  return (
    <section className="sec" id="issue">
      <h2>Как оформить карту — по шагам</h2>
      {sub ? <p className="ssub">{sub}</p> : null}
      <div className="shots">
        {steps.map((s, i) => (
          <StepItem key={s.title} n={i + 1} step={s} />
        ))}
      </div>
    </section>
  );
}

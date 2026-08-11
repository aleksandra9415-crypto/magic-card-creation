import Link from "@/components/shared/Link";
import { HOWTO_STEPS } from "@/data/home";

function HowToStep({
  title,
  text,
  duration,
}: (typeof HOWTO_STEPS)[number]) {
  return (
    <li className="howto-step">
      <h4>{title}</h4>
      <p>{text}</p>
      <span className="duration">{duration}</span>
    </li>
  );
}

export default function HowToSection() {
  return (
    <section className="section" id="howto" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section__head section__head--centered">
          <span className="eyebrow-pro">Инструкция · ~15 минут</span>
          <h2 className="section__title--pro">
            Как оформить зарубежную карту за 6 шагов
          </h2>
          <p className="section__sub--pro">
            Универсальная последовательность для всех сервисов из топа.
            Реальные сроки указаны для самого быстрого — Плати по миру.
          </p>
        </div>

        <ol className="howto-steps">
          {HOWTO_STEPS.map((s) => (
            <HowToStep key={s.title} {...s} />
          ))}
        </ol>

        <div className="center mt-32">
          <Link className="btn btn--ghost btn--lg" href="/cards/plati-po-miru">
            Подробная инструкция по открытию карты
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { METHOD_STEPS, FORMULA_ROWS } from "@/data/home";
import SectionWrapper from "@/components/shared/SectionWrapper";

function MethodStep({ n, title, text }: (typeof METHOD_STEPS)[number]) {
  return (
    <div className="method-step">
      <span className="method-step__n">{n}</span>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function FormulaRow({ lbl, pct }: (typeof FORMULA_ROWS)[number]) {
  return (
    <div className="formula__row">
      <span className="formula__lbl">{lbl}</span>
      <span className="formula__bar">
        <span style={{ width: `${pct}%` }}></span>
      </span>
      <span className="formula__pct">{pct}%</span>
    </div>
  );
}

export default function MethodologySection() {
  return (
    <SectionWrapper
      id="methodology"
      centered
      eyebrow="Методология"
      title="Как мы строим рейтинг 2026"
      description="Не «по личным ощущениям». Формализованные веса, реальные тесты, публичные источники. Пересчитываем раз в месяц."
    >
      <div className="method">
        <div className="method__steps">
          {METHOD_STEPS.map((s) => (
            <MethodStep key={s.n} {...s} />
          ))}
        </div>

        <div className="formula card-padding">
          <div className="formula__title">Формула итогового балла</div>
          {FORMULA_ROWS.map((r) => (
            <FormulaRow key={r.lbl} {...r} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}


import { METHOD_STEPS, FORMULA_ROWS } from "@/data/home";

function MethodStep({ n, title, text }: (typeof METHOD_STEPS)[number]) {
  return (
    <div className="method-step">
      <span className="method-step__n">{n}</span>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default function MethodologySection() {
  return (
    <section className="section" id="methodology" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section__head section__head--centered">
          <span className="eyebrow-pro">Методология</span>
          <h2 className="section__title--pro">Как мы строим рейтинг 2026</h2>
          <p className="section__sub--pro">
            Не «по личным ощущениям». Формализованные веса, реальные тесты,
            публичные источники. Пересчитываем раз в месяц.
          </p>
        </div>

        <div className="method">
          <div className="method__steps">
            {METHOD_STEPS.map((s) => (
              <MethodStep key={s.n} {...s} />
            ))}
          </div>

          <div className="formula-box">
            <div className="formula-box__title">Формула итогового балла</div>
            
            <div className="formula-scale">
              <div className="formula-scale__bar">
                {FORMULA_ROWS.map((row, i) => (
                  <div 
                    key={row.lbl} 
                    className={`formula-scale__segment segment-${i}`}
                    style={{ width: `${row.pct}%` }}
                  >
                    <span className="formula-scale__pct">{row.pct}%</span>
                    <div className="formula-scale__line"></div>
                    <div className="formula-scale__ref">{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="formula-legend">
              {FORMULA_ROWS.map((row, i) => (
                <div key={row.lbl} className="formula-legend__item">
                  <span className="formula-legend__num">{i + 1}</span>
                  <span className="formula-legend__text">{row.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

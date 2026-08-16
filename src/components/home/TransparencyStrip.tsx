import { TRANSPARENCY_STATS } from "@/data/home";

export default function TransparencyStrip() {
  return (
    <section className="section" style={{ paddingTop: 0, paddingBottom: 64 }}>
      <div className="container">
        <div className="transp">
          <div className="transp__head">
            <span className="transp__tag">Прозрачность</span>
            <h2 className="transp__title">
              Не верьте на слово — мы оплатили своими деньгами
            </h2>
          </div>
          <div className="transp__grid">
            {TRANSPARENCY_STATS.map((s) => (
              <div key={s.l}>
                <div className="transp-stat__n">{s.n}</div>
                <div className="transp-stat__l">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="transp__bottom">
            Партнёрские ссылки помечены{" "}
            <code className="transp-card__code">от спонсора</code>
            . Партнёрство не влияет на место в рейтинге: формула считается
            одинаково для всех.
          </p>
        </div>
      </div>
    </section>
  );
}

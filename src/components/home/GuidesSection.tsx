import Link from "@/components/shared/Link";
import { GUIDES_SERVICES, GUIDES_COUNTRIES } from "@/data/home";

function GoArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GuidesSection() {
  return (
    <section className="section" id="guides">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Гайды по оплате</h2>
          <p className="section__sub">
            Пошаговые инструкции: как оплатить конкретный сервис и чем платить в
            конкретной стране.
          </p>
        </div>
        <div className="guides-cols">
          <div className="guide-col">
            <div className="guide-col__head">
              <h3>Как оплатить сервис</h3>
              <span className="muted">{GUIDES_SERVICES.length} гайдов</span>
            </div>
            <div className="guide-chips">
              {GUIDES_SERVICES.map((g) => (
                <Link className="gchip" href={g.href} key={g.label}>
                  {g.label}
                </Link>
              ))}
              <Link className="gchip gchip--more" href="#">
                Все гайды <GoArrow />
              </Link>
            </div>
          </div>
          <div className="guide-col">
            <div className="guide-col__head">
              <h3>Как платить в стране</h3>
              <span className="muted">{GUIDES_COUNTRIES.length} гайдов</span>
            </div>
            <div className="guide-chips">
              {GUIDES_COUNTRIES.map((g) => (
                <Link className="gchip" href={g.href} key={g.label}>
                  {g.label}
                </Link>
              ))}
              <Link className="gchip gchip--more" href="#">
                Все страны <GoArrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

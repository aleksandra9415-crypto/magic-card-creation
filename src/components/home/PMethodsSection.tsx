import type { ReactNode } from "react";
import { PMETHODS, type PMethod } from "@/data/home";

const ICONS: Record<PMethod["variant"], ReactNode> = {
  sbp: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M11 2l6 5v8l-6 5-6-5V7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
  crypto: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 8h5a2 2 0 010 4H8m0 0h5.5a2 2 0 010 4H8m0-8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  swift: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M3 11h16M3 11l5-5M3 11l5 5M19 11l-5-5M19 11l-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  p2p: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="7" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="15" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M2 18c0-2.8 2.2-5 5-5s5 2.2 5 5M10 18c0-2.8 2.2-5 5-5s5 2.2 5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
};

function PMethodCard({ method }: { method: PMethod }) {
  return (
    <div className={`pmethod pmethod--${method.variant}`}>
      <div className="pmethod__icon">{ICONS[method.variant]}</div>
      <h4>{method.title}</h4>
      <div className="pmethod__rate">{method.rate}</div>
      <div className="pmethod__time">{method.time}</div>
      <ul>
        {method.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default function PMethodsSection() {
  return (
    <section className="section" id="pmethods" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section__head section__head--centered">
          <span className="eyebrow-pro">4 способа пополнения</span>
          <h2 className="section__title--pro">
            Как закидывать деньги на зарубежную карту
          </h2>
          <p className="section__sub--pro">
            Большая часть переплат — это комиссия пополнения. Сравните каналы,
            прежде чем оформлять карту.
          </p>
        </div>

        <div className="pmethods">
          {PMETHODS.map((m) => (
            <PMethodCard key={m.variant} method={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

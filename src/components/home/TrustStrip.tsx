import { TRUST_LINKS } from "@/data/home";
import { ExternalIcon } from "@/components/shared/icons";

export default function TrustStrip() {
  return (
    <section className="trust">
      <div className="container">
        <div className="trust__inner">
          <span className="trust__lbl">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 4.5 3.4 8.7 8 10 4.6-1.3 8-5.5 8-10V6l-8-4z"
                fill="#2660FF"
              />
              <path
                d="M8 12l2.5 2.5L16 9"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Нам доверяют
          </span>
          {TRUST_LINKS.map((t) => (
            <a
              key={t.label}
              className="trust__chip"
              href={t.href}
              target="_blank"
              rel="noopener"
            >
              {t.label} <ExternalIcon />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

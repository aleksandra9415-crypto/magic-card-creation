import { TRUST_LINKS } from "@/data/home";
import { ExternalIcon } from "@/components/shared/icons";

export default function TrustStrip() {
  return (
    <section className="trust">
      <div className="container">
        <div className="trust__inner">
          <div className="trust__lbl">Нам доверяют</div>
          <div className="trust__divider" />
          <div className="trust__list">
            {TRUST_LINKS.map((t) => (
              <a
                key={t.label}
                className="trust__chip"
                href={t.href}
                target="_blank"
                rel="noopener"
              >
                {t.label}
                <ExternalIcon className="trust__chip-icon" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

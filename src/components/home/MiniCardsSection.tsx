import Link from "@/components/shared/Link";
import { MINI_CARDS, type MiniCard } from "@/data/home";

function MiniIcon({ icon }: { icon: MiniCard["icon"] }) {
  if (icon === "crypto") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M9 8h5a2.5 2.5 0 010 5H9m0-5v10m0-5h5.5a2.5 2.5 0 010 5H9M8 8h2M8 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "ai") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="7" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7V3M8 12h.01M16 12h.01M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GoArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MiniCardsSection() {
  return (
    <section className="section" id="more">
      <div className="container">
        <div className="mini-grid">
          {MINI_CARDS.map((m) => (
            <Link className="mini-card" href={m.href} key={m.title}>
              <div className="mini-card__ic">
                <MiniIcon icon={m.icon} />
              </div>
              <div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
              <span className="mini-card__go">
                <GoArrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

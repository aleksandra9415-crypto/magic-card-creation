import Link from "@/components/shared/Link";
import { HUB_TILES, type HubTile } from "@/data/home";

function HubIcon({ icon }: { icon: HubTile["icon"] }) {
  if (icon === "star") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l2.5 5.3 5.5.7-4 4 1 5.7-5-2.8-5 2.8 1-5.7-4-4 5.5-.7L12 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === "grid") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (icon === "globe") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 19a2 2 0 012-2h13" stroke="currentColor" strokeWidth="2" />
      <path d="M9 7h6M9 11h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

export default function HubSection() {
  return (
    <section className="section" id="hub">
      <div className="container">
        <div className="hub-grid">
          {HUB_TILES.map((t) => (
            <Link className="hub-tile" href={t.href} key={t.title}>
              <div className="hub-tile__ic">
                <HubIcon icon={t.icon} />
              </div>
              <div className="hub-tile__t">{t.title}</div>
              <div className="hub-tile__s">{t.sub}</div>
              <span className="hub-tile__go">
                {t.go} <GoArrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

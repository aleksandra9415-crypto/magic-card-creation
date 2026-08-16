import type { ReactNode } from "react";
import Link from "@/components/shared/Link";
import { COUNTRIES, type Country } from "@/data/countries";
import { COUNTRY_GROUPS } from "@/data/rating-form";

/* Декоративные глифы стран — 1:1 из исходной вёрстки */
const GLYPHS: Record<Country["id"], ReactNode> = {
  kz: (
    <svg className="ctr-glyph" viewBox="0 0 120 80" aria-hidden="true">
      <circle cx="60" cy="34" r="14" fill="#FFE16B" opacity=".75" />
      <path
        d="M20 60 Q40 48 60 56 T100 52"
        stroke="#FFE16B"
        strokeWidth="2"
        fill="none"
        opacity=".7"
      />
    </svg>
  ),
  am: (
    <svg className="ctr-glyph" viewBox="0 0 120 80" aria-hidden="true">
      <path
        d="M10 65 L40 30 L55 50 L70 20 L95 55 L110 40 L110 65 Z"
        fill="#fff"
        opacity=".25"
      />
    </svg>
  ),
  ge: (
    <svg className="ctr-glyph" viewBox="0 0 120 80" aria-hidden="true">
      <path
        d="M55 8 H65 V32 H88 V42 H65 V72 H55 V42 H32 V32 H55 Z"
        fill="#D90012"
        opacity=".18"
      />
    </svg>
  ),
  tr: (
    <svg className="ctr-glyph" viewBox="0 0 120 80" aria-hidden="true">
      <circle cx="70" cy="40" r="22" fill="#fff" opacity=".22" />
      <circle cx="78" cy="40" r="18" fill="#E30A17" opacity=".7" />
      <path
        d="M92 33 L96 40 L92 47 L98 44 L104 47 L100 40 L104 33 L98 36 Z"
        fill="#fff"
        opacity=".55"
      />
    </svg>
  ),
  ae: (
    <svg className="ctr-glyph" viewBox="0 0 120 80" aria-hidden="true">
      <path d="M0 60 Q30 50 60 55 T120 50 V80 H0 Z" fill="#fff" opacity=".22" />
      <path
        d="M40 55 L48 35 L56 55 Z M58 55 L70 28 L82 55 Z"
        fill="#fff"
        opacity=".35"
      />
    </svg>
  ),
  eu: (
    <svg className="ctr-glyph" viewBox="0 0 120 80" aria-hidden="true">
      <g fill="#FFCC00" opacity=".85">
        <circle cx="60" cy="20" r="2.4" />
        <circle cx="80" cy="26" r="2.4" />
        <circle cx="92" cy="42" r="2.4" />
        <circle cx="88" cy="60" r="2.4" />
        <circle cx="72" cy="68" r="2.4" />
        <circle cx="52" cy="68" r="2.4" />
        <circle cx="36" cy="60" r="2.4" />
        <circle cx="28" cy="42" r="2.4" />
        <circle cx="32" cy="26" r="2.4" />
        <circle cx="48" cy="22" r="2.4" />
      </g>
    </svg>
  ),
  us: (
    <svg className="ctr-glyph" viewBox="0 0 120 80" aria-hidden="true">
      <g fill="#fff" opacity=".55">
        <rect x="0" y="10" width="120" height="6" />
        <rect x="0" y="26" width="120" height="6" />
        <rect x="0" y="42" width="120" height="6" />
        <rect x="0" y="58" width="120" height="6" />
      </g>
      <rect x="0" y="0" width="55" height="42" fill="#002868" opacity=".7" />
    </svg>
  ),
  th: (
    <svg className="ctr-glyph" viewBox="0 0 120 80" aria-hidden="true">
      <path d="M60 14 L70 32 L60 50 L50 32 Z" fill="#fff" opacity=".4" />
      <path d="M40 56 L60 40 L80 56 L60 72 Z" fill="#fff" opacity=".25" />
    </svg>
  ),
};

function CountryHero({ country }: { country: Country }) {
  const images: Record<string, string> = {
    kz: "https://images.unsplash.com/photo-1558588942-ad3332be7bd5?q=80&w=800&auto=format&fit=crop", // Kazakhstan (Astana)
    am: "https://images.unsplash.com/photo-1549420078-43d52678c18c?q=80&w=800&auto=format&fit=crop", // Armenia (Yerevan)
    ge: "https://images.unsplash.com/photo-1565008518504-56968724f2d5?q=80&w=800&auto=format&fit=crop", // Georgia (Tbilisi)
    tr: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop", // Turkey
    ae: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop", // UAE
    eu: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop", // Europe
    us: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop", // USA
    th: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop", // Thailand
  };

  return (
    <div className="coll__hero">
      <img 
        src={images[country.id] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"} 
        alt={country.title} 
        className="coll__img" 
        loading="lazy" 
      />
      <div className="coll__overlay" style={{ opacity: 0.4 }} />
      <div className="coll__content" style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: '12px' }}>
        <span style={{ 
          fontSize: '24px', 
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' 
        }}>
          {country.flag}
        </span>
      </div>
    </div>
  );
}

/* Мобильный вариант той же секции: вместо сетки 4×2 — сгруппированные по
   регионам строки с флагом, названием и счётчиком карт. Какая версия видна,
   решает media-запрос: обе ведут на одни и те же страницы. */
function CountryList() {
  const bySlug = new Map(COUNTRIES.map((c) => [c.slug, c]));

  return (
    <div className="ctr-list">
      {COUNTRY_GROUPS.map((group) => {
        const rows = group.items
          .map((i) => ({ ...i, country: bySlug.get(i.slug) }))
          .filter((i) => i.country);
        if (!rows.length) return null;

        return (
          <div key={group.name}>
            <div className="ctr-list__grp">{group.name}</div>
            {rows.map((row) => (
              <Link key={row.slug} className="ctr-row" href={row.country!.href}>
                <span className="ctr-row__flag" aria-hidden="true">
                  {row.flag}
                </span>
                <span className="ctr-row__name">{row.name}</span>
                <span className="ctr-row__cnt">{row.country!.count}</span>
                <span className="ctr-row__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function CountriesSection() {
  return (
    <section className="section countries-section" id="countries">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Лучшие карты для{"\u00a0"}путешествий</h2>
          <p className="section__sub">
            Ниже мы подобрали лучшие карты для каждой страны, протестировали
            их{"\u00a0"}в{"\u00a0"}реальных поездках и{"\u00a0"}собрали
            максимально полный гайд по{"\u00a0"}оплате: какие карты принимают,
            в{"\u00a0"}какой валюте платить, как снимать наличные и{"\u00a0"}на
            {"\u00a0"}что обращать внимание.
          </p>
        </div>

        <div className="collections-grid countries-grid">
          {COUNTRIES.map((c) => (
            <Link className="coll" href={c.href} key={c.id}>
              <CountryHero country={c} />
              <div className="coll__body">
                <h3 className="coll__title">{c.title}</h3>
                <p className="coll__list">{c.list}</p>
              </div>
            </Link>
          ))}
        </div>

        <CountryList />

        <div className="center mt-32">
          <Link className="btn btn--ghost btn--lg" href="/countries">
            Перейти к рейтингу карт для путешествий
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

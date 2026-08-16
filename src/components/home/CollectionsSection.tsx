import Link from "@/components/shared/Link";
import type { CSSProperties, ReactNode } from "react";

const catHref = (category: string) =>
  `/cards?category=${encodeURIComponent(category)}`;

/** Плитки-хиро подборок — 1:1 из референса */
type Coll = {
  href: string;
  title: string;
  list: string;
  heroClass?: string;
  heroStyle?: CSSProperties;
  hero: ReactNode;
};

function CategoryHero({ imageUrl, overlay = true, children }: { imageUrl: string; overlay?: boolean; children?: ReactNode }) {
  return (
    <>
      <img src={imageUrl} alt="" className="coll__img" loading="lazy" />
      {overlay && <div className="coll__overlay" />}
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </>
  );
}

const COLLS: Coll[] = [

  {
    href: catHref("Нейросети"),
    title: "Нейросети",
    list: "ChatGPT · Claude · Midjourney · Gemini · Cursor · Suno · Sora",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800">
        <div style={{ background: "rgba(255,255,255,0.9)", padding: "8px 16px", borderRadius: 8, fontWeight: 800, fontSize: 14 }}>ChatGPT</div>
      </CategoryHero>
    ),
  },
  {
    href: catHref("Стриминг и медиа"),
    title: "Стриминг и медиа",
    list: "Netflix · Spotify · YouTube Premium · Apple ID · Google Play · HBO",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800">
        <div style={{ color: "#fff", fontSize: 40 }}>▶</div>
      </CategoryHero>
    ),
  },
  {
    href: catHref("Реклама и маркетинг"),
    title: "Реклама и финансы",
    list: "Google Ads · Facebook Ads · TikTok Ads · PayPal",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800">
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: "40%" }}>
          <div style={{ background: "#2660FF", width: 12, height: "60%", borderRadius: 2 }} />
          <div style={{ background: "#FF7A1A", width: 12, height: "90%", borderRadius: 2 }} />
          <div style={{ background: "#0EA372", width: 12, height: "75%", borderRadius: 2 }} />
        </div>
      </CategoryHero>
    ),
  },
  {
    href: catHref("Игры и сторы"),
    title: "Игры и сторы",
    list: "Steam · PlayStation · Xbox · Nintendo · Epic Games · Roblox · Genshin",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800">
        <div style={{ background: "#171a21", color: "#66c0f4", fontWeight: 800, padding: "8px 14px", borderRadius: 8, fontSize: 13 }}>STEAM</div>
      </CategoryHero>
    ),
  },
  {
    href: catHref("Маркетплейсы"),
    title: "Шопинг",
    list: "Amazon · eBay · AliExpress · iHerb · Shein · Temu · Etsy",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800">
        <div style={{ background: "#fff", borderRadius: 8, padding: "8px 16px", fontWeight: 800, color: "#FF9900", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>amazon</div>
      </CategoryHero>
    ),
  },
  {
    href: catHref("Путешествия"),
    title: "Путешествия",
    list: "Booking · Airbnb · Agoda · Uber · Ryanair · Turkish Airlines",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=800">
        <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.2)", borderRadius: "50%", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </div>
      </CategoryHero>
    ),
  },
  {
    href: "/cards",
    title: "Софт для работы",
    list: "Adobe · Figma · Notion · Canva · Microsoft 365 · Zoom · Envato",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800">
        <div style={{ background: "#fff", padding: "8px 16px", borderRadius: 8, fontWeight: 700 }}>Figma</div>
      </CategoryHero>
    ),
  },
  {
    href: "/cards",
    title: "Соцсети и подписки",
    list: "Telegram Premium · Discord Nitro · Duolingo · LinkedIn · Tinder · Patreon",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800">
        <div style={{ background: "#0088cc", color: "#fff", padding: "8px 16px", borderRadius: 8, fontWeight: 700 }}>Telegram</div>
      </CategoryHero>
    ),
  },
];


export default function CollectionsSection() {
  return (
    <section className="section" id="collections">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">
            Виртуальные карты для оплаты иностранных подписок
          </h2>
          <p className="section__sub">
            Подборки в 8 категориях — под каждый сервис своя страница с
            рейтингом карт и инструкцией по оплате.
          </p>
        </div>

        <div className="collections-grid">
          {COLLS.map((c) => (
            <Link className="coll" href={c.href} key={c.title}>
              <div
                className={`coll__hero${c.heroClass ? ` ${c.heroClass}` : ""}`}
                style={c.heroStyle}
              >
                {c.hero}
              </div>
              <div className="coll__body">
                <h3 className="coll__title">{c.title}</h3>
                <p className="coll__list">{c.list}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="center mt-32">
          <Link className="btn btn--ghost btn--lg" href="/cards">
            Перейти к рейтингу карт для подписок
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

import Link from "@/components/shared/Link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import type { CSSProperties, ReactNode } from "react";

const catHref = (category: string) =>
  `/cards?category=${encodeURIComponent(category)}`;

/** Плитки-хиро подборок — 1:1 из референса */
function Tiles({ tiles }: { tiles: { label: string; cls: string }[] }) {
  return (
    <div className="coll-tiles">
      {tiles.map((t) => (
        <div key={t.cls + t.label} className={`coll-tile ${t.cls}`}>
          {t.label}
        </div>
      ))}
    </div>
  );
}

type Coll = {
  href: string;
  title: string;
  list: string;
  heroClass?: string;
  heroStyle?: CSSProperties;
  hero: ReactNode;
};

const COLLS: Coll[] = [
  {
    href: catHref("Нейросети"),
    title: "Нейросети",
    list: "ChatGPT · Claude · Midjourney · Gemini · Cursor · Suno · Sora",
    heroClass: "coll__hero--ai",
    hero: (
      <Tiles
        tiles={[
          { label: "ChatGPT", cls: "coll-tile--green coll-tile--wide" },
          { label: "Claude", cls: "coll-tile--orange" },
          { label: "Perplexity", cls: "coll-tile--ink" },
          { label: "Higgsfield", cls: "coll-tile--purple" },
          { label: "Gemini", cls: "coll-tile--blue" },
        ]}
      />
    ),
  },
  {
    href: catHref("Стриминг и медиа"),
    title: "Стриминг и медиа",
    list: "Netflix · Spotify · YouTube Premium · Apple ID · Google Play · HBO",
    heroClass: "coll__hero--media",
    hero: (
      <Tiles
        tiles={[
          { label: "Netflix", cls: "coll-tile--red coll-tile--wide" },
          { label: "♪", cls: "coll-tile--green" },
          { label: "Disney+", cls: "coll-tile--ink" },
          { label: "HBO", cls: "coll-tile--dark" },
          { label: "▶", cls: "coll-tile--red" },
        ]}
      />
    ),
  },
  {
    href: catHref("Реклама и маркетинг"),
    title: "Реклама и финансы",
    list: "Google Ads · Facebook Ads · TikTok Ads · PayPal",
    heroClass: "coll__hero--ads",
    hero: (
      <>
        <svg
          className="bg-pattern"
          viewBox="0 0 400 225"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="collAdsG" x1="0" x2="1">
              <stop offset="0" stopColor="#2660FF" />
              <stop offset="1" stopColor="#0EA372" />
            </linearGradient>
          </defs>
          <path
            d="M0 180 C 60 120 120 200 200 140 S 340 80 400 100 L 400 225 L 0 225 Z"
            fill="url(#collAdsG)"
            opacity=".25"
          />
          <path
            d="M0 200 C 80 160 140 220 220 170 S 340 130 400 150 L 400 225 L 0 225 Z"
            fill="#2660FF"
            opacity=".18"
          />
        </svg>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
            padding: 14,
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ background: "#2660FF", width: "18%", borderRadius: "4px 4px 0 0", height: "55%" }} />
          <div style={{ background: "#FF7A1A", width: "18%", borderRadius: "4px 4px 0 0", height: "75%" }} />
          <div style={{ background: "#0B1530", width: "18%", borderRadius: "4px 4px 0 0", height: "40%" }} />
          <div style={{ background: "#0EA372", width: "18%", borderRadius: "4px 4px 0 0", height: "85%" }} />
          <div style={{ background: "#6E55FF", width: "18%", borderRadius: "4px 4px 0 0", height: "60%" }} />
        </div>
      </>
    ),
  },
  {
    href: catHref("Игры и сторы"),
    title: "Игры и сторы",
    list: "Steam · PlayStation · Xbox · Nintendo · Epic Games · Roblox · Genshin",
    heroClass: "coll__hero--games",
    hero: (
      <>
        <svg
          className="bg-pattern"
          viewBox="0 0 400 225"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <circle cx="80" cy="60" r="40" fill="#FF7A1A" opacity=".4" />
          <circle cx="320" cy="170" r="60" fill="#2660FF" opacity=".5" />
          <circle cx="200" cy="120" r="20" fill="#fff" opacity=".15" />
        </svg>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            padding: 14,
          }}
        >
          <div style={{ background: "#171a21", color: "#66c0f4", fontWeight: 800, padding: "8px 14px", borderRadius: 8, fontSize: 13, letterSpacing: "-.02em" }}>STEAM</div>
          <div style={{ background: "#000", color: "#fff", fontWeight: 800, padding: "8px 14px", borderRadius: 8, fontSize: 13 }}>EPIC</div>
          <div style={{ background: "#003791", color: "#fff", fontWeight: 800, padding: "8px 14px", borderRadius: 8, fontSize: 13 }}>PS</div>
          <div style={{ background: "#107C10", color: "#fff", fontWeight: 800, padding: "8px 14px", borderRadius: 8, fontSize: 13 }}>XBOX</div>
        </div>
      </>
    ),
  },
  {
    href: catHref("Маркетплейсы"),
    title: "Шопинг",
    list: "Amazon · eBay · AliExpress · iHerb · Shein · Temu · Etsy",
    heroClass: "coll__hero--shop",
    hero: (
      <div style={{ position: "relative", display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: "12px 16px", boxShadow: "0 8px 20px rgba(11,21,48,.1)", fontWeight: 800, letterSpacing: "-.03em", fontSize: 18, color: "#FF9900" }}>
          amazon
        </div>
        <div style={{ background: "#0B1530", color: "#fff", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, boxShadow: "0 8px 20px rgba(11,21,48,.2)", transform: "rotate(-6deg)" }}>
          e
        </div>
        <div style={{ background: "#fff", borderRadius: 8, padding: "8px 12px", fontWeight: 800, fontSize: 12, color: "#E5484D", boxShadow: "0 8px 20px rgba(11,21,48,.1)", transform: "rotate(4deg)" }}>
          Etsy
        </div>
      </div>
    ),
  },
  {
    href: catHref("Путешествия"),
    title: "Путешествия",
    list: "Booking · Airbnb · Agoda · Uber · Ryanair · Turkish Airlines",
    heroClass: "coll__hero--travel",
    hero: (
      <svg
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <path
          d="M0 160 Q 100 100 200 130 T 400 110"
          stroke="#2660FF"
          strokeWidth="2"
          strokeDasharray="6 8"
          fill="none"
          opacity=".7"
        />
        <circle cx="60" cy="155" r="6" fill="#2660FF" />
        <circle cx="200" cy="130" r="6" fill="#FF7A1A" />
        <circle cx="340" cy="115" r="6" fill="#2660FF" />
        <path
          d="M280 70 l 30 -12 l 6 6 l -10 14 l 14 14 l -8 8 l -22 -10 l -10 14 l -6 -2 l 4 -16 l -10 -6 z"
          fill="#0B1530"
          opacity=".85"
        />
        <ellipse cx="220" cy="200" rx="180" ry="14" fill="#fff" opacity=".4" />
      </svg>
    ),
  },
  {
    href: "/cards",
    title: "Софт для работы",
    list: "Adobe · Figma · Notion · Canva · Microsoft 365 · Zoom · Envato",
    heroStyle: { background: "linear-gradient(135deg,#EAF0FF 0%,#DDE7FA 100%)" },
    hero: (
      <Tiles
        tiles={[
          { label: "Adobe", cls: "coll-tile--red coll-tile--wide" },
          { label: "Figma", cls: "coll-tile--dark" },
          { label: "Notion", cls: "coll-tile--ink" },
          { label: "Canva", cls: "coll-tile--green" },
          { label: "Zoom", cls: "coll-tile--blue" },
        ]}
      />
    ),
  },
  {
    href: "/cards",
    title: "Соцсети и подписки",
    list: "Telegram Premium · Discord Nitro · Duolingo · LinkedIn · Tinder · Patreon",
    heroStyle: { background: "linear-gradient(135deg,#E8F4FF 0%,#EDE8FF 100%)" },
    hero: (
      <Tiles
        tiles={[
          { label: "Telegram", cls: "coll-tile--blue coll-tile--wide" },
          { label: "Discord", cls: "coll-tile--purple" },
          { label: "Duolingo", cls: "coll-tile--green" },
          { label: "LinkedIn", cls: "coll-tile--ink" },
          { label: "Patreon", cls: "coll-tile--orange" },
        ]}
      />
    ),
  },
];

export default function CollectionsSection() {
  return (
    <SectionWrapper
      id="collections"
      title="Виртуальные карты для оплаты иностранных подписок"
      description="Подборки в 8 категориях — под каждый сервис своя страница с рейтингом карт и инструкцией по оплате."
    >
      <div className="collections-grid grid-spacing">
        {COLLS.map((c) => (
          <Link className="coll" href={c.href} key={c.title}>
            <div
              className={`coll__hero${c.heroClass ? ` ${c.heroClass}` : ""}`}
              style={c.heroStyle}
            >
              {c.hero}
            </div>
            <div className="coll__body card-padding">
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
    </SectionWrapper>
  );
}

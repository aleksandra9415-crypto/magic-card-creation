import Link from "@/components/shared/Link";
import type { CSSProperties, ReactNode } from "react";
import { 
  Cpu, 
  Play, 
  Target, 
  Gamepad, 
  ShoppingBag, 
  Globe, 
  Layout, 
  Users 
} from "lucide-react";

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
      <div className="coll__content">
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
        <div className="coll__icon-box">
          <Cpu size={28} strokeWidth={2.5} />
        </div>
      </CategoryHero>
    ),
  },
  {
    href: catHref("Стриминг и медиа"),
    title: "Стриминг и медиа",
    list: "Netflix · Spotify · YouTube Premium · Apple ID · Google Play · HBO",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800">
        <div className="coll__icon-box">
          <Play size={28} strokeWidth={2.5} fill="currentColor" />
        </div>
      </CategoryHero>
    ),
  },
  {
    href: catHref("Реклама и маркетинг"),
    title: "Реклама и финансы",
    list: "Google Ads · Facebook Ads · TikTok Ads · PayPal",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800">
        <div className="coll__icon-box">
          <Target size={28} strokeWidth={2.5} />
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
        <div className="coll__icon-box">
          <Gamepad size={28} strokeWidth={2.5} />
        </div>
      </CategoryHero>
    ),
  },
  {
    href: catHref("Маркетплейсы"),
    title: "Шопинг",
    list: "Amazon · eBay · AliExpress · iHerb · Shein · Temu · Etsy",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800">
        <div className="coll__icon-box">
          <ShoppingBag size={28} strokeWidth={2.5} />
        </div>
      </CategoryHero>
    ),
  },
  {
    href: catHref("Путешествия"),
    title: "Путешествия",
    list: "Booking · Airbnb · Agoda · Uber · Ryanair · Turkish Airlines",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800">
        <div className="coll__icon-box">
          <Globe size={28} strokeWidth={2.5} />
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
        <div className="coll__icon-box">
          <Layout size={28} strokeWidth={2.5} />
        </div>
      </CategoryHero>
    ),
  },
  {
    href: "/cards",
    title: "Соцсети и подписки",
    list: "Telegram Premium · Discord Nitro · Duolingo · LinkedIn · Tinder · Patreon",
    hero: (
      <CategoryHero imageUrl="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=800">
        <div className="coll__icon-box">
          <Users size={28} strokeWidth={2.5} />
        </div>
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

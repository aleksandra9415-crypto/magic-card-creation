/* ============================================================
   Контент главной страницы.
   Литеральный контент вынесен в data/home.json — его правит админка.
   В этом файле остаются типы и вычисляемые из CARDS данные.
   ============================================================ */

import { CARDS, byRating, fmtRub, type Card } from "./cards";
import homeData from "./home.json";

/** Единственный источник правды для количества карт в рейтинге.
 *  Используйте эту константу везде, где на сайте называется общее число
 *  карт (Hero, метатеги, Schema.org, блок прозрачности) — так цифры
 *  никогда не разойдутся между собой при добавлении новых карт. */
export const CARDS_TOTAL = CARDS.length;

export type AppIcon = { label: string; variant?: "n" | "s" | "a" | "g" | "y" | "p" | "more" };

export type HomeServiceCard = {
  top?: boolean;
  rankLabel?: string;
  logo: string;
  logoVariant?: "orange" | "dark" | "mint";
  name: string;
  verified: boolean;
  geo: string;
  score: string;
  reviewsLabel: string;
  cells: { lbl: string; val: string; free?: boolean; freeText?: string }[];
  tags: { label: string; mute?: boolean }[];
  appIcons: AppIcon[];
  reviewHref?: string;
  applyUrl?: string;
};

const serviceIcon = (service: string): AppIcon => {
  const map: Record<string, AppIcon> = {
    ChatGPT: { label: "OAI", variant: "n" },
    Claude: { label: "C" },
    Netflix: { label: "N", variant: "n" },
    Steam: { label: "S", variant: "s" },
    Spotify: { label: "Sp", variant: "s" },
    Booking: { label: "B" },
    Adobe: { label: "A", variant: "a" },
    PayPal: { label: "P", variant: "p" },
    "Google Ads": { label: "Ad", variant: "g" },
    "TikTok Ads": { label: "TT" },
    "Google Play": { label: "G", variant: "g" },
    Figma: { label: "F" },
  };

  return map[service] ?? { label: service.slice(0, 2) };
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const homeTags = (card: Card) => {
  const tags: HomeServiceCard["tags"] = [];
  if (card.applepay) tags.push({ label: "Apple Pay" });
  tags.push({ label: "3-D Secure" });
  if (card.cats.includes("sbp")) tags.push({ label: "СБП", mute: true });
  if (card.cats.includes("crypto")) tags.push({ label: "Крипта", mute: true });
  if (card.cur.length) tags.push({ label: card.cur.join(" · "), mute: true });
  return tags.slice(0, 4);
};

const homeAppIcons = (card: Card) => {
  const icons = card.services.slice(0, 4).map(serviceIcon);
  const rest = card.services.length - icons.length;
  return rest > 0 ? [...icons, { label: `+${rest}`, variant: "more" as const }] : icons;
};

const toHomeServiceCard = (card: Card, index: number): HomeServiceCard => ({
  top: index === 0,
  rankLabel: index === 0 ? "★ Лучшее предложение" : undefined,
  logo: initials(card.name),
  name: card.name,
  verified: true,
  geo: card.geo,
  score: card.score === null ? "—" : card.score.toFixed(1),
  reviewsLabel: card.score === null ? "рейтинг не указан" : "оценка NHcard",
  cells: [
    { lbl: "Выпуск", val: card.display?.issue ?? (card.issueRub === null ? "не указано" : card.issueRub ? `от ${fmtRub(card.issueRub)}` : "0 ₽") },
    {
      lbl: "Обслуживание",
      val: card.display?.monthly ?? (card.monthlyRub === null ? "не указано" : card.monthlyRub ? `от ${fmtRub(card.monthlyRub)}/мес` : ""),
      freeText: card.display?.monthly || card.monthlyRub === null || card.monthlyRub ? undefined : "0 ₽",
    },
    {
      lbl: "Пополнение",
      val: card.display?.topupFee ?? (card.topupFee === null ? "не указано" : card.topupFee ? `от ${card.topupFee}%` : ""),
      freeText: card.display?.topupFee || card.topupFee === null || card.topupFee ? undefined : "0%",
    },
    { lbl: "Срок", val: card.term },
  ],
  tags: homeTags(card),
  appIcons: homeAppIcons(card),
  reviewHref: `/cards/${card.slug}`,
  applyUrl: card.applyUrl,
});

/* Топ-3 карточки на главной: управляется полем "on-main" в data/cards.json */
export const HOME_SERVICES: HomeServiceCard[] = CARDS.filter(
  (card) => card["on-main"] === 1,
)
  .sort(
    (a, b) =>
      (a.rank ?? Number.POSITIVE_INFINITY) -
        (b.rank ?? Number.POSITIVE_INFINITY) ||
      (b.score ?? -1) - (a.score ?? -1),
  )
  .slice(0, 3)
  .map(toHomeServiceCard);

/* Trust strip */
export type TrustLink = { label: string; href: string };

export const TRUST_LINKS: TrustLink[] = homeData.trustLinks;

/* Прозрачность */
export type TransparencyStat = { n: string; l: string };

/* Значение "{{CARDS_TOTAL}}" в data/home.json — плейсхолдер под число карт
   в рейтинге, подставляется здесь из CARDS_TOTAL, чтобы не разойтись с
   реальным списком. Остальные показатели (кандидатов изучили, платежей
   сделали и т.п.) — обычный редактируемый в админке текст. */
export const TRANSPARENCY_STATS: TransparencyStat[] = homeData.transparencyStats.map(
  (s) => (s.n === "{{CARDS_TOTAL}}" ? { ...s, n: String(CARDS_TOTAL) } : s),
);

/* Подборки карт для подписок; hero-визуал задаётся вариантом */
export type Collection = {
  heroVariant: "ai" | "media" | "ads" | "games" | "shop" | "travel";
  cat: string;
  title: string;
  list: string;
  count: string;
  pill: string;
  href: string;
};

export const COLLECTIONS: Collection[] = homeData.collections as Collection[];

/* Методология */
export type MethodStep = { n: string; title: string; text: string };

export const METHOD_STEPS: MethodStep[] = homeData.methodSteps;

export type FormulaRow = { lbl: string; pct: number };

export const FORMULA_ROWS: FormulaRow[] = homeData.formulaRows;

/* Почему NHcard */
export type Feature = {
  icon: "card" | "arrow-up" | "spark" | "refresh";
  title: string;
  desc: string;
};

export const FEATURES: Feature[] = homeData.features as Feature[];

/* Способы пополнения */
export type PMethod = {
  variant: "sbp" | "crypto" | "swift" | "p2p";
  title: string;
  rate: string;
  time: string;
  points: string[];
};

export const PMETHODS: PMethod[] = homeData.pmethods as PMethod[];

/* HowTo — 6 шагов */
export type HowToStep = { title: string; text: string; duration: string };

export const HOWTO_STEPS: HowToStep[] = homeData.howtoSteps;

/* Безопасность и закон */
export type GuardCard = {
  variant: "tax" | "sec";
  title: string;
  sub: string;
  intro: { text: string; bold?: string[] };
  items: { b: string; text: string }[];
};

/* FAQ — полный набор из референса */
export type FaqItem = { q: string; a: string; open?: boolean };

export const FAQ_ITEMS: FaqItem[] = homeData.faqItems;

/* ============================================================
   Данные для секций редизайна (rank-table, hub, guides, mini, eeat)
   ============================================================ */

export type HomeRankRow = {
  slug: string;
  logo: string;
  color: string;
  name: string;
  geo: string;
  issue: string;
  monthly: string;
  monthlyFree: boolean;
  appIcons: AppIcon[];
  score: string;
  reviews: number | null;
  promo?: { code: string; text: string };
  applyUrl?: string;
  reviewHref: string;
  /* поля для фильтров таблицы на главной */
  cur: string[];
  cats: string[];
  applepay: boolean;
  search: string;
};

const issueStr = (c: Card) =>
  c.display?.issue ??
  (c.issueRub === null ? "не указано" : c.issueRub ? `от ${fmtRub(c.issueRub)}` : "0 ₽");

const monthlyStr = (c: Card) =>
  c.display?.monthly ??
  (c.monthlyRub === null ? "не указано" : c.monthlyRub ? `от ${fmtRub(c.monthlyRub)}/мес` : "0 ₽");

const toRankRow = (c: Card): HomeRankRow => ({
  slug: c.slug,
  logo: initials(c.name),
  color: c.color,
  name: c.name,
  geo: c.geo,
  issue: issueStr(c),
  monthly: monthlyStr(c),
  monthlyFree: !c.display?.monthly && c.monthlyRub === 0,
  appIcons: homeAppIcons(c),
  score: c.score === null ? "—" : c.score.toFixed(1),
  reviews: c.reviews,
  promo: c.detail?.promo,
  applyUrl: c.applyUrl,
  reviewHref: `/cards/${c.slug}`,
  cur: c.cur,
  cats: c.cats,
  applepay: c.applepay === true,
  search: [c.name, c.geo, ...c.services].join(" ").toLowerCase(),
});

/* Все карты для таблицы-рейтинга на главной (сортировка по рейтингу).
   Без активных фильтров показываются первые 6. */
export const HOME_RANK: HomeRankRow[] = [...CARDS]
  .sort(byRating)
  .map(toRankRow);

/* Hub-плитки */
export type HubTile = {
  href: string;
  icon: "star" | "grid" | "globe" | "book";
  title: string;
  sub: string;
  go: string;
};

export const HUB_TILES: HubTile[] = homeData.hubTiles as HubTile[];

/* Гайды — чипсы */
export type GuideChip = { label: string; href: string };

export const GUIDES_SERVICES: GuideChip[] = homeData.guidesServices;

export const GUIDES_COUNTRIES: GuideChip[] = homeData.guidesCountries;

/* Мини-карточки разделов */
export type MiniCard = {
  href: string;
  icon: "crypto" | "ai" | "bank";
  title: string;
  desc: string;
};

export const MINI_CARDS: MiniCard[] = homeData.miniCards as MiniCard[];

/* EEAT — авторы и чейнджлог */
export type EeatAuthor = { ava: string; fc: boolean; role: string; name: string; meta: string };

export const EEAT_AUTHORS: EeatAuthor[] = homeData.eeatAuthors;

export type EeatChangelogEntry = { date: string; text: string };

export const EEAT_CHANGELOG: EeatChangelogEntry[] = homeData.eeatChangelog;

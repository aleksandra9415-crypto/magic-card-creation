/* Адаптер каталога под контракт формы-рейтинга (см. референс rating-form).
   Виджет ждёт плоскую карточку с готовыми подписями; здесь мы собираем её из
   data/cards.json и data/countries, не таща в компонент знание о наших полях. */

import { CARDS, SERVICES, serviceSlug, fmtRub, type Card } from "./cards";
import cardsData from "./cards.json";
import { cardsLabel, servicesLabel } from "@/lib/plural";

/* Страны подключаем файлами, а не через data/countries: тот модуль читает
   каталог через node:fs и в клиентский бандл виджета не собирается. */
import armenia from "./countries/armenia.json";
import europe from "./countries/europe.json";
import georgia from "./countries/georgia.json";
import kazakhstan from "./countries/kazakhstan.json";
import thailand from "./countries/thailand.json";
import turkey from "./countries/turkey.json";
import uae from "./countries/uae.json";
import usa from "./countries/usa.json";

type CountryJson = {
  slug: string;
  published: boolean;
  rank: number;
  flag: string;
  title: string;
  list: string;
};

const COUNTRIES: CountryJson[] = [
  armenia,
  europe,
  georgia,
  kazakhstan,
  thailand,
  turkey,
  uae,
  usa,
]
  .filter((c) => c.published)
  .sort((a, b) => a.rank - b.rank);

export type ServiceGroup = { name: string; items: string[] };
export type CountryItem = { slug: string; name: string; flag: string };
export type CountryGroup = { name: string; items: CountryItem[] };

/** Основной сценарий карты — для подбора в AI-блоке. */
export type UseCase = "ai" | "subs" | "games" | "ads";

export type RatingCard = {
  id: string;
  slug: string;
  name: string;
  /** подпись под названием: чем карта является */
  tag: string;
  logo: { txt: string; bg: string };
  rank: number;
  issue: number | null;
  issueTxt: string;
  maint: number | null;
  maintTxt: string;
  topupFee: string;
  rating: number | null;
  reviews: number | null;
  verified: boolean;
  promo: string | null;
  promoText: string | null;
  cur: string[];
  crypto: boolean;
  topup: string;
  sbp: boolean;
  /** пополнение картой РФ — для подбора */
  cardRu: boolean;
  ap: boolean;
  gpay: boolean;
  services: string[];
  svcTotal: number;
  regions: string[];
  /** лимиты пока не собраны редакцией — показываем срок действия */
  limits: string;
  pros: string[];
  cons: string[];
  cat: UseCase;
  applyUrl?: string;
};

/* ---------- справочник сервисов для выпадашки ---------- */

const CATEGORIES: { name: string; services: string[] }[] = (
  cardsData as { categories: { name: string; services: string[] }[] }
).categories;

const covered = new Set(CARDS.flatMap((c) => c.services));

/** Группы как в референсе: сначала осмысленные категории, затем всё остальное. */
export const SVC_GROUPS: ServiceGroup[] = (() => {
  const used = new Set<string>();
  const groups: ServiceGroup[] = [];
  for (const cat of CATEGORIES) {
    const items = cat.services.filter((s) => covered.has(s));
    if (!items.length) continue;
    items.forEach((s) => used.add(s));
    groups.push({ name: cat.name, items });
  }
  const rest = SERVICES.filter((s) => !used.has(s));
  if (rest.length) groups.push({ name: "Все сервисы", items: rest });
  return groups;
})();

export const POPULAR = [
  "ChatGPT",
  "Adobe",
  "Netflix",
  "Spotify",
  "Steam",
  "Apple Pay",
].filter((s) => covered.has(s));

export const SVC_CAT: Record<string, string> = Object.fromEntries(
  SVC_GROUPS.flatMap((g) => g.items.map((s) => [s, g.name])),
);

/* ---------- страны ---------- */

/* Регион страны берём из её гайда: поле `list` перечисляет карты через «·». */
const REGION_BY_CARD = new Map<string, string[]>();
const norm = (s: string) => s.toLowerCase().replace(/[\s.\-_'’`]/g, "");
const CARD_BY_NORM = new Map(CARDS.map((c) => [norm(c.name), c.slug]));

for (const country of COUNTRIES) {
  for (const raw of (country.list ?? "").split("·")) {
    const slug = CARD_BY_NORM.get(norm(raw.trim()));
    if (!slug) continue;
    REGION_BY_CARD.set(slug, [...(REGION_BY_CARD.get(slug) ?? []), country.slug]);
  }
}

const COUNTRY_REGION: Record<string, string> = {
  armenia: "СНГ и соседи",
  georgia: "СНГ и соседи",
  kazakhstan: "СНГ и соседи",
  turkey: "Азия",
  uae: "Азия",
  thailand: "Азия",
  europe: "Европа",
  usa: "Другое",
};

/* В гайдах заголовок стоит в предложном падеже («Как платить в Турции»),
   а в фильтре нужен именительный. */
const COUNTRY_NAME: Record<string, string> = {
  armenia: "Армения",
  georgia: "Грузия",
  kazakhstan: "Казахстан",
  turkey: "Турция",
  uae: "ОАЭ",
  thailand: "Таиланд",
  europe: "Европа",
  usa: "США",
};

export const COUNTRY_GROUPS: CountryGroup[] = (() => {
  const order = ["СНГ и соседи", "Азия", "Европа", "Другое"];
  const byRegion = new Map<string, CountryItem[]>();
  for (const c of COUNTRIES) {
    const region = COUNTRY_REGION[c.slug] ?? "Другое";
    byRegion.set(region, [
      ...(byRegion.get(region) ?? []),
      { slug: c.slug, name: COUNTRY_NAME[c.slug] ?? c.title, flag: c.flag },
    ]);
  }
  return order
    .filter((r) => byRegion.has(r))
    .map((name) => ({ name, items: byRegion.get(name)! }));
})();

export const COUNTRY_NAMES: Record<string, CountryItem> = Object.fromEntries(
  COUNTRY_GROUPS.flatMap((g) => g.items.map((i) => [i.slug, i])),
);

/* ---------- карточки ---------- */

const AI_SERVICES = ["ChatGPT", "Claude", "Midjourney", "Gemini Pro", "Grok"];
const GAME_SERVICES = ["Steam", "PlayStation", "Xbox", "Epic Games", "Roblox"];

const useCase = (c: Card): UseCase => {
  if (c.cats.includes("ads")) return "ads";
  if (AI_SERVICES.some((s) => c.services.includes(s))) return "ai";
  if (GAME_SERVICES.some((s) => c.services.includes(s))) return "games";
  return "subs";
};

const initials = (name: string) =>
  name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const hasFeat = (c: Card, re: RegExp) =>
  (c.detail?.feats ?? []).some((f) => re.test(f));

const issueTxt = (c: Card) =>
  c.display?.issue ??
  (c.issueRub === null
    ? "не указано\n"
    : c.issueRub === 0
      ? "Бесплатно"
      : "от " + fmtRub(c.issueRub));

const maintTxt = (c: Card) =>
  c.display?.monthly ??
  (c.monthlyRub === null
    ? "не указано\n"
    : c.monthlyRub === 0
      ? "0 ₽ / мес"
      : fmtRub(c.monthlyRub) + " / мес");

/* Виджет подписывает значение словом «комиссия», поэтому убираем его из
   редакционного текста, где оно уже есть («комиссия 0 ₽»). */
const topupFeeTxt = (c: Card) =>
  (c.display?.topupFee ?? (c.topupFee === null || c.topupFee === "не указано\n" ? "не указана" : c.topupFee + "%"))
    .replace(/^комиссия\s+/i, "");

export const RATING_CARDS: RatingCard[] = CARDS.map((c, i) => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  tag: c.geo,
  logo: { txt: initials(c.name), bg: c.color },
  rank: c.rank ?? 100 + i,
  issue: c.issueRub,
  issueTxt: issueTxt(c),
  maint: c.monthlyRub,
  maintTxt: maintTxt(c),
  topupFee: topupFeeTxt(c),
  rating: c.score,
  reviews: c.reviews,
  verified: true,
  promo: c.detail?.promo?.code ?? null,
  promoText: c.detail?.promo?.text ?? null,
  cur: c.cur,
  crypto: c.cats.includes("crypto"),
  topup: c.topup,
  sbp: c.cats.includes("sbp"),
  cardRu: /карт/i.test(c.topup),
  ap: c.applepay === true,
  gpay: hasFeat(c, /google\s*pay/i),
  services: c.services,
  svcTotal: c.services.length,
  regions: REGION_BY_CARD.get(c.slug) ?? [],
  limits: c.term,
  pros: c.detail?.feats ?? [],
  cons: [],
  cat: useCase(c),
  applyUrl: c.applyUrl,
}));

export const CARD_TOTAL = RATING_CARDS.length;

export const svcCount = (service: string) =>
  RATING_CARDS.filter((c) => c.services.includes(service)).length;

export const ctyCount = (country: string) =>
  RATING_CARDS.filter((c) => c.regions.includes(country)).length;

/** «1 карта / 2 карты / 5 карт» — счётчик стоит в каждой строке выпадашек. */
export const cardsCountLabel = cardsLabel;

/** «21 сервис / 24 сервиса / 26 сервисов» — кнопка «Показать все N». */
export const servicesCountLabel = servicesLabel;

export { serviceSlug };

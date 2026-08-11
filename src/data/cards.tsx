import cardsData from "./cards.json";
import type { FaqItem } from "./landing/types";

/* ============================================================
   ДАННЫЕ КАРТОЧЕК теперь правятся в `data/cards.json`.
   Этот файл оставляет типы, расчёты и публичные экспорты для компонентов.
   ============================================================ */

export type Plan = {
  title: string;
  desc: string;
  price: string;
  note?: string;
  popular?: boolean;
  popularLabel?: string;
};

export type IssueStep = {
  title: string;
  text: string;
  /** «~1 мин» — приписка к номеру шага. */
  time?: string;
  /** Подпись пустого слота, пока скрин шага не отснят. */
  placeholder?: string;
  image?: { src: string; alt: string };
};

export type CardReview = {
  name: string;
  mail: string;
  score: number;
  text: string;
  /** Короткие теги под отзывом, напр. "ChatGPT", "СБП". */
  tags?: string[];
  /** Редакционный ответ на отзыв (обычно у критичного). */
  reply?: string;
};

/** Одна строка весовой шкалы «Оценки по критериям» — value 0–5, ширина
 *  полосы = value/5; weight — вес критерия в формуле (для справки). */
export type CriteriaScore = { label: string; note: string; weight: number; value: number };

export type TariffRow = {
  param: string;
  value: string;
  /** Уточнение под значением, напр. цена по промокоду. */
  valueNote?: string;
  note?: string;
};

export type TestLogEntry = { service: string; result: "pass" | "retry" | "fail"; note: string };

/** Плитка сервиса: `ic` — двухбуквенный значок. Имя, начинающееся с «+»,
 *  рендерится как счётчик «ещё N», а не как отдельный сервис. */
export type ServiceTile = { name: string; ic?: string };

export type ServiceGroup = { label: string; items: ServiceTile[] };

export type Competitor = {
  name: string;
  /** Место в рейтинге, напр. "2 место" — подпись под названием. */
  rank?: string;
  score: number;
  issue: string;
  monthly: string;
  fee: string;
  crypto: boolean;
  kyc: "да" | "нет" | "иногда" | "частично" | "не указано";
};

/** Совпадает по форме с EeatAuthor: обзор может переопределить редакцию
 *  на свою пару «автор + фактчек» с описанием под конкретный сервис. */
export type ReviewAuthor = {
  ava: string;
  fc: boolean;
  role: string;
  name: string;
  meta: string;
};

export type SafetyCard = { title: string; text: string };

export type ChangelogEntry = { date: string; tag?: "price" | "new" | "check"; text: string };

export type CardDetail = {
  /** Официальный источник, по которому обновлялись данные. */
  sourceUrl?: string;
  /** Дата проверки публичной информации. */
  verifiedAt?: string;
  /** плашка над названием, напр. "★ Выбор NHcard в рейтинге" */
  rank?: string;
  /** короткое описание сервиса под названием */
  tagline: string;
  /** развёрнутый вводный абзац обзора; вытесняет tagline в hero (`.rv-lead`) */
  lead?: string;
  /** строки в блоке рейтинга hero, после звёзд и кол-ва отзывов */
  ratingMeta?: string[];
  /** значки-плашки в hero, напр. "Visa", "Без KYC" (`.rv-badges`) */
  badges?: { text: string; kind?: "ok" | "v" }[];
  /** 4-колоночная строка ключевых фактов под hero (`.rv-key`) */
  keyFacts?: { label: string; value: string; note?: string; free?: boolean }[];
  /** подпись у цены в hero (по умолчанию "Выпуск от") */
  priceLabel?: string;
  /** фичи-чипы под hero, напр. "Пополнение СБП" */
  feats?: string[];
  /** промокод */
  promo?: { text: string; code: string };
  /** Короткий вердикт + пояснение в sticky-сайдбаре (`.score__verdict`) */
  verdictNote?: string;
  verdictSub?: string;
  /** Приписка к числу отзывов в сайдбаре, напр. "41 наш платёж" */
  paymentsNote?: string;
  /** «Кому подойдёт / не подойдёт»; ctaLabel — заголовок кнопки в колонке «подойдёт» */
  fit?: { yes: string[]; no: string[]; ctaLabel?: string };
  /** Оценки по критериям формулы — весовые полосы */
  criteriaSub?: string;
  criteria?: CriteriaScore[];
  /** тарифы карточками (быстрое сравнение) */
  plansSub?: string;
  plans?: Plan[];
  /** тарифы таблицей (параметр/значение/комментарий) */
  tariffSub?: string;
  tariffTable?: TariffRow[];
  tariffNote?: string;
  /** как оформить */
  issueSub?: string;
  issueSteps?: IssueStep[];
  /** как пополнить */
  topupText?: string;
  /** наш тест: стат-плитки + результаты по сервисам */
  testSub?: string;
  testStats?: { n: string; label: string; tone?: "green" | "orange" }[];
  testLog?: TestLogEntry[];
  /** что оплачивает — сгруппировано по категориям + что не работает */
  servicesSub?: string;
  serviceGroups?: ServiceGroup[];
  brokenServices?: { name: string; ic?: string; note: string }[];
  /** сравнение с конкурентами */
  compareSub?: string;
  competitors?: Competitor[];
  /** вывод под таблицей сравнения */
  compareNote?: string;
  /** отзывы */
  reviewsSub?: string;
  reviewsSource?: string;
  reviews?: CardReview[];
  reviewsSummary?: {
    total: number;
    avg: number;
    distribution: [number, number, number, number, number];
    mostPraised: string;
    mostComplained: string;
  };
  /** документы и безопасность */
  safetySub?: string;
  safety?: SafetyCard[];
  /** FAQ карточки */
  faqTitle?: string;
  faqSub?: string;
  faq?: FaqItem[];
  /** авторы именно этого обзора; без них берётся общая редакция (EEAT_AUTHORS) */
  authors?: ReviewAuthor[];
  /** журнал изменений обзора */
  changelog?: ChangelogEntry[];
  /** текст нижней CTA-полосы; без него берётся tagline */
  endCtaText?: string;
  /** похожие обзоры — слаги карт; несуществующие тихо отбрасываются при рендере */
  relatedCards?: string[];
};

export type Card = {
  id: string;
  /** url подробной страницы: /cards/[slug] */
  slug: string;
  /** показывать карточку в топ-3 на главной */
  "on-main"?: 0 | 1;
  /** ссылка на оформление карты */
  applyUrl?: string;
  /** фиксированное место в рейтинге */
  rank?: number;
  name: string;
  geo: string;
  color: string;
  score: number | null;
  reviews: number | null;
  issueRub: number | null;
  monthlyRub: number | null;
  topup: string;
  topupFee: number | null;
  /** наценка на курс, % к ЦБ */
  fx: number | null;
  txFeeUsd: number | null;
  term: string;
  termShort: boolean;
  kyc: "да" | "нет" | "частично" | "не указано";
  applepay: boolean | null;
  /** поддержка 3-D Secure; по умолчанию считается, что есть (значок в таблице показывается, пока не задано false) */
  threeDs?: boolean;
  cur: string[];
  cats: string[];
  services: string[];
  bonus: string | null;
  /** Текстовые значения для условий, которые нельзя выразить одним числом в рублях. */
  display?: {
    issue?: string;
    monthly?: string;
    topupFee?: string;
    fx?: string;
  };
  detail?: CardDetail;
};

type Category = { name: string; services: string[] };

type CardsData = {
  usd: number;
  defaultSpendUsd: number;
  defaultTxPerMonth: number;
  services: string[];
  categories: Category[];
  cards: Card[];
};

const DATA = cardsData as CardsData;

export const USD = DATA.usd;
export const DEFAULT_SPEND_USD = DATA.defaultSpendUsd;
export const DEFAULT_TX_PER_MONTH = DATA.defaultTxPerMonth;
export const CARDS = DATA.cards;

/* Сервисы и категории без единой карты дают пустую таблицу — не показываем их в фильтрах. */
const coveredServices = new Set(CARDS.flatMap((c) => c.services));
export const SERVICES = DATA.services.filter((s) => coveredServices.has(s));
export const CATEGORIES = DATA.categories.filter((cat) =>
  cat.services.some((s) => coveredServices.has(s)),
);

/** Адрес сервиса в URL: "Google Ads" → "google-ads", "X (Twitter)" → "x-twitter".
    Имя сервиса как есть в путь не годится — пробелы и скобки ломают маршрут.
    "+" разворачивается в "-plus", иначе "Apple TV+" и "Apple TV" дали бы один адрес. */
export const serviceSlug = (service: string) =>
  service
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\+/g, "-plus-")
    .replace(/[^a-z0-9а-я]+/g, "-")
    .replace(/^-+|-+$/g, "");

const SERVICE_BY_SLUG = new Map(SERVICES.map((s) => [serviceSlug(s), s]));

/** Сервис по адресу страницы; регистр не важен — старые ссылки вида
    /cards/ChatGPT продолжают работать. */
export const getServiceBySlug = (slug: string) =>
  SERVICE_BY_SLUG.get(serviceSlug(slug)) ?? null;

/** Порядок рейтинга по умолчанию: фиксированный rank, затем оценка и число отзывов. */
export const byRating = (a: Card, b: Card) =>
  (a.rank ?? Number.POSITIVE_INFINITY) - (b.rank ?? Number.POSITIVE_INFINITY) ||
  (b.score ?? -1) - (a.score ?? -1) ||
  (b.reviews ?? -1) - (a.reviews ?? -1);

/** Самая свежая дата проверки тарифов по всем картам (ISO), либо null. */
export const LAST_VERIFIED = CARDS.reduce<string | null>((acc, c) => {
  const v = c.detail?.verifiedAt;
  return v && (!acc || v > acc) ? v : acc;
}, null);

const MONTHS_RU = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

/** "2026-07-10" → "10 июля 2026" */
const fmtDateRu = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_RU[m - 1]} ${y}`;
};

export const VERIFIED_LABEL = LAST_VERIFIED
  ? `Тарифы проверены ${fmtDateRu(LAST_VERIFIED)}`
  : "Тарифы проверены редакцией";

/** Склонение "N сервисов/сервиса/сервис" для подзаголовков рейтинга. */
export const cardsPlural = (n: number) =>
  n % 10 === 1 && n % 100 !== 11
    ? "сервис"
    : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? "сервиса"
      : "сервисов";

export function yearCost(c: Card, spendUsd: number, txPerMonth: number) {
  if (
    c.issueRub === null ||
    c.monthlyRub === null ||
    c.topupFee === null ||
    c.fx === null ||
    c.txFeeUsd === null
  ) {
    return null;
  }
  const vol = spendUsd * USD * 12;
  return Math.round(
    c.issueRub +
      c.monthlyRub * 12 +
      vol * (c.topupFee / 100) +
      vol * (c.fx / 100) +
      c.txFeeUsd * USD * txPerMonth * 12,
  );
}

export const fmtRub = (v: number) => v.toLocaleString("ru-RU") + " ₽";

export const getCardBySlug = (slug: string) =>
  CARDS.find((c) => c.slug === slug);

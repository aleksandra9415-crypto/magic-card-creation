/* Контент посадочной страницы рейтинга (/cards/{сервис}, /cards/{страна}).

   ТЗ описывает страницу как шаблон: «95% контента от страницы к странице не
   меняется». Поэтому общая часть лежит в defaults.ts одним экземпляром, а
   файл сервиса переопределяет только то, что действительно зависит от темы.
   Типы ниже — контракт между этими двумя половинами. */

export type LandingKind = "service" | "country";

/** Пункт списка внутри текстового блока: жирная зацепка + пояснение. */
export type Bullet = { b: string; p: string };

/** Плюсы/минусы двухколоночным списком — блок `.pc` в способах оплаты.
 *  `yesTitle`/`noTitle` переопределяют подписи колонок: в блоке про отказы
 *  это «Что сделать до оплаты» / «Что ломает оплату», а не плюсы/минусы. */
export type ProsCons = {
  yes: string[];
  no: string[];
  yesTitle?: string;
  noTitle?: string;
};

/** Одна карточка 3-колоночного объяснения («что такое виртуальная карта»). */
export type ExplainerCard = { title: string; text: string };

/** Текстовый блок под H3 — из него собраны блоки 2, 3, 5 и 12 ТЗ. */
export type Prose = {
  id: string;
  title: string;
  /** Статус-плашка у заголовка блока способа оплаты, напр. «Рекомендуем». */
  tag?: string;
  lead?: string;
  paragraphs?: string[];
  bullets?: Bullet[];
  prosCons?: ProsCons;
  /** Заменяет paragraphs/bullets 3-колоночной раскладкой (см. TextBlock). */
  cards?: ExplainerCard[];
  /** Перелинковка: внутренняя статья блога или официальный источник. */
  link?: { label: string; href: string; external?: boolean };
  /** Плашка-примечание в конце блока — как `.mnote` в макете. */
  note?: { text: string; link?: { label: string; href: string } };
};

/* ---------- блок 4: как оформить карту, со скринами ---------- */

/* Скрины процесса ещё не отсняты. До тех пор шаг рисует мокап экрана
   средствами CSS: он занимает то же место и ту же пропорцию, что будущий
   скриншот, поэтому подстановка картинки не поедет по вёрстке. Заполните
   `image` — мокап уступит место фотографии, править компонент не нужно. */
export type MockVariant = "form" | "kyc" | "topup" | "card" | "pay";

export type Mock = {
  variant: MockVariant;
  /** подпись в шапке телефона — какой это экран приложения */
  screen: string;
  /** активное поле или строка, на которую смотрит пользователь */
  field?: string;
  /** подпись кнопки на экране */
  cta?: string;
};

export type WalkStep = {
  title: string;
  text: string;
  /** Приписка к номеру шага в карточке — «~1 мин», «мгновенно». */
  time?: string;
  /** Подпись пустого слота, пока скрин не отснят. */
  placeholder?: string;
  mock?: Mock;
  image?: { src: string; alt: string };
};

export type Walkthrough = {
  title: string;
  /** Статус-плашка у заголовка блока, напр. «На примере лидера». */
  tag?: string;
  lead: string;
  /** Лидер рейтинга, на котором показываем процесс. */
  example: { name: string; slug: string; note: string };
  steps: WalkStep[];
  foot: string;
};

/* ---------- блок 5: методология ---------- */

export type MethodologyCriterion = { lbl: string; pct: number; note: string };

export type Methodology = {
  lead: string;
  /** Что редакция сделала руками до того, как считать формулу. */
  checks: Bullet[];
  /** Заголовок таблицы весов, если он уточняется под тему. */
  formulaTitle?: string;
  /** Веса формулы. Пересматриваются под назначение платежа — см. ТЗ. */
  criteria: MethodologyCriterion[];
};

/* ---------- навигация и доверие ---------- */

export type RelatedLink = {
  href: string;
  title: string;
  sub: string;
  /** trend — 80% спроса, near — 20% смежного по теме (правило из ТЗ) */
  kind: "trend" | "near";
  /** 2-буквенная плашка-лого, напр. "Cl" для Claude. */
  icon?: string;
};

export type NavGroup = {
  title: string;
  items: { href: string; label: string }[];
};

export type FaqItem = { q: string; a: string };

export type ChangelogTag = "price" | "new" | "check" | "list" | "content" | "score";

export type Editorial = {
  updatedAt: string;
  changelog: { date: string; text: string; tag?: ChangelogTag }[];
};

/* ---------- блок «коротко для занятых» в hero ---------- */

export type VerdictPick = {
  /** best/cheaper — карточка сервиса с партнёрской ссылкой; note — просто
   *  важная оговорка со ссылкой на секцию страницы, без rel=sponsored. */
  kind: "best" | "cheaper" | "note";
  label: string;
  value: string;
  note: string;
  sponsHint?: string;
  href: string;
  sponsored: boolean;
  /** slug карты — для ApplyLink-трекинга у sponsored-строк. */
  cardSlug?: string;
};

export type Verdict = {
  title: string;
  picks: VerdictPick[];
  ctaLabel: string;
  ctaHref: string;
};

export type AiBlock = {
  title: string;
  sub: string;
  placeholder: string;
  /** Готовые формулировки запроса — подставляются в поле по клику. */
  presets: { label: string; q: string }[];
};

/* ---------- собранная страница ---------- */

export type LandingContent = {
  kind: LandingKind;
  /** Тема страницы как её называет пользователь: «ChatGPT», «Турция». */
  subject: string;
  /** Та же тема в позиции дополнения — «ChatGPT», но «в Турции».
   *  Нужна там, где заголовок строится как «для оплаты …». */
  subjectIn: string;
  /** H1 по шаблону семантики из ТЗ. */
  h1: string;
  /** Слово внутри h1, которое hero выделяет акцентным цветом — «ChatGPT». */
  h1Accent?: string;
  lead: string;
  /** Три цифры под лидом hero: «11 карт прошли тест на ChatGPT» и т.п.
   *  Без них hero показывает общие чипы (число карт и дисклеймер). */
  heroStats?: { n: string; l: string }[];
  /** Блок «Коротко для занятых» — сайдбар hero с 2 партнёрскими пиками и
   *  одной важной оговоркой. Без него hero остаётся одноколоночным. */
  verdict?: Verdict;
  /** Промежуточные уровни хлебных крошек между «Рейтинг карт» и текущей
   *  страницей, напр. «Карты для подписок» → «Нейросети». Без ссылок. */
  breadcrumbExtra?: { label: string }[];
  /** Текст последней (некликабельной) крошки, если он отличается от subject
   *  — напр. «Оплата ChatGPT» вместо просто «ChatGPT». */
  breadcrumbCurrent?: string;
  /** Заголовок и подпись над таблицей рейтинга. */
  ratingTitle: string;
  ratingIntro: string;
  /** H2: «Как оплачивать X из России в 2026 году». */
  h2: string;
  intro: string;
  ai: AiBlock;
  /** Блоки 2 и 3 ТЗ: маркетплейсы, пластиковая карта, прочие методы. */
  methods: Prose[];
  /** Плашка-примечание сразу под способом 1 (виртуальная карта) — обычно
   *  цифра теста темы, напр. «11 из 26 сервисов прошли оплату ChatGPT». */
  methodNote?: string;
  walkthrough: Walkthrough;
  /** Блок 5. Для стран ТЗ велит его скрывать — тогда null. Основная форма —
   *  два списка `prosCons`; `sections` остаётся для тем, где нужен развёрнутый
   *  разбор. closingNote — предупреждение в конце блока. */
  mistakes: {
    title: string;
    tag?: string;
    lead: string;
    prosCons?: ProsCons;
    sections?: Prose[];
    closingNote?: string;
  } | null;
  whatIs: Prose;
  /** Свой заголовок блока методологии, если шаблонный звучит криво. */
  methodologyTitle?: string;
  methodology: Methodology;
  /** Полоса статистики прозрачности. Без переопределения берутся общие
   *  цифры сайта (data/home) — здесь можно задать тему-специфичные. */
  transparency?: { title?: string; stats: { n: string; l: string }[] };
  related: RelatedLink[];
  nav: NavGroup[];
  faq: FaqItem[];
  /** Авторы именно этой страницы; без них — общая редакция сайта. */
  authors?: { ava: string; fc: boolean; role: string; name: string; meta: string }[];
  editorial: Editorial;
};

/** Переопределения в файле темы: всё необязательно, остальное берётся из
 *  defaults. `mistakes: null` — осознанное скрытие блока (страны). */
export type LandingOverride = Partial<LandingContent> & {
  subject: string;
  h1: string;
  h2: string;
};

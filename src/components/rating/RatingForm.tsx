
/* Форма-рейтинг — главный конверсионный элемент (порт референса rating-form).
   Смешанная модель фильтрации, одинаковая на всех страницах: сервис и страна
   уводят на свою страницу рейтинга — у неё свои заголовок и метатеги. Валюта,
   крипта, СБП/Apple Pay/Google Pay и поиск фильтруют таблицу на месте:
   отдельных страниц у них нет. Визуально пункты и чипы обоих типов
   одинаковы — для пользователя это один живой фильтр. */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "@/components/shared/Link";
import { useRouter } from "@/lib/next-compat";
import ApplyLink from "@/components/shared/ApplyLink";
import {
  RATING_CARDS,
  SVC_GROUPS,
  POPULAR,
  SVC_CAT,
  COUNTRY_GROUPS,
  COUNTRY_NAMES,
  CARD_TOTAL,
  svcCount,
  ctyCount,
  cardsCountLabel,
  servicesCountLabel,
  serviceSlug,
  type RatingCard,
} from "@/data/rating-form";

const COLLAPSED = 6;

/* Ниже этой ширины таблица разбирается в карточки, а выпадашки открываются
   шторками снизу — правила из раздела «Мобильная версия» спеки. */
const MOBILE_Q = "(max-width: 899px)";

const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE_Q);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Мобильный режим нужен там, где меняется поведение, а не только вид:
 *  шторка сортировки, блокировка прокрутки, автофокус поиска. */
const useIsMobile = () =>
  useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_Q).matches,
    () => false,
  );

export type NavFilter =
  | { kind: "service"; slug: string; label: string }
  | { kind: "country"; slug: string; label: string }
  | { kind: "currency"; slug: string; label: string }
  | { kind: "crypto"; label: string };

const navKey = (n: NavFilter) =>
  n.kind === "crypto" ? "crypto" : `${n.kind}-${n.slug}`;

/* Свой адрес с собственным заголовком и метатегами есть только у сервисов и
   стран. У валюты и крипты страниц нет — эти чипы всегда фильтруют таблицу. */
type PagedFilter = Extract<NavFilter, { kind: "service" | "country" }>;

const hasPage = (n: NavFilter): n is PagedFilter =>
  n.kind === "service" || n.kind === "country";

/* Оба адреса — в разделе рейтинга: там таблица, отфильтрованная под сервис
   или страну. Гайд по стране живёт отдельно, на /countries/{страна}. */
const navHref = (n: PagedFilter) =>
  n.kind === "service" ? `/cards/${serviceSlug(n.slug)}` : `/cards/${n.slug}`;

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

/* Часть карт публикует цену только в валюте, в рублях у них null. Такие
   строки держим в конце ценовой сортировки в обе стороны, иначе «дешёвые
   сначала» открывалось бы картами с неизвестной ценой. */
const byPrice =
  (get: (c: RatingCard) => number | null, dir: 1 | -1) =>
  (a: RatingCard, b: RatingCard) => {
    const x = get(a);
    const y = get(b);
    if (x === null || y === null) return x === y ? 0 : x === null ? 1 : -1;
    return (x - y) * dir;
  };

/* Рейтинг красим порогами из референса. */
const ratingColor = (r: number | null) =>
  r === null ? "muted" : r >= 4.8 ? "good" : r >= 4.4 ? "warn" : "bad";

/* Уточнение к цене («первый год», «в месяц») спека выносит отдельной строкой
   под значением. Разбираем только те формулировки, где это однозначно: всё
   остальное показываем целиком — числа на мобильном и десктопе должны
   совпадать с редакционным текстом. */
const splitMetric = (txt: string): [value: string, note: string | null] => {
  if (txt.includes("\n")) {
    const [val, ...rest] = txt.split("\n");
    return [val.trim(), rest.join("\n").trim()];
  }
  const lead = /^(первый год|первый месяц)\s+(.+)$/i.exec(txt);
  if (lead) return [lead[2], lead[1].toLowerCase()];
  const per = /^(.+?)\s*\/\s*мес\.?$/i.exec(txt);
  if (per) return [per[1].trim(), "в месяц"];
  return [txt, null];
};

/** Нулевая цена — зелёным. Диапазоны вроде «0 - 399 ₽» нулевыми не считаем. */
const isFree = (txt: string) => /^0\s*(₽|%|\$|€)?$/.test(txt.trim());

type SortKey = "rank" | "issue" | "maint" | "reviews";

/* Порядок сортировки на мобильном выбирается в шторке, а не кликами по шапке
   таблицы: шапки на мобильном нет. */
const SORT_SHEET: { id: string; label: string; key: SortKey; dir: 1 | -1 }[] = [
  { id: "rank", label: "Наш рейтинг", key: "rank", dir: 1 },
  { id: "issue-asc", label: "Выпуск: сначала дешевле", key: "issue", dir: 1 },
  { id: "issue-desc", label: "Выпуск: сначала дороже", key: "issue", dir: -1 },
  { id: "maint-asc", label: "Обслуживание: сначала дешевле", key: "maint", dir: 1 },
  { id: "maint-desc", label: "Обслуживание: сначала дороже", key: "maint", dir: -1 },
  { id: "reviews", label: "Отзывы: сначала высокая оценка", key: "reviews", dir: 1 },
];

export default function RatingForm({
  initialNav = null,
}: {
  initialNav?: NavFilter | null;
}) {
  const router = useRouter();

  const [nav, setNav] = useState<NavFilter | null>(initialNav);
  const [pending, setPending] = useState<string | null>(null);
  const [sbp, setSbp] = useState(false);
  const [ap, setAp] = useState(false);
  const [gp, setGp] = useState(false);
  const [q, setQ] = useState("");
  const [sugOn, setSugOn] = useState(false);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "rank",
    dir: 1,
  });
  const [open, setOpen] = useState<"services" | "countries" | null>(null);
  const [sheet, setSheet] = useState<"sort" | null>(null);
  const [ddq, setDdq] = useState("");
  const [popRow, setPopRow] = useState<string | null>(null);
  const [popq, setPopq] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [ai, setAi] = useState<{
    pay: string | null;
    cur: string | null;
    top: string | null;
  }>({ pay: null, cur: null, top: null });

  const rootRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ddInput = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  /* Страница сервиса задаёт активный фильтр — держим стейт в синхронизации. */
  useEffect(() => setNav(initialNav), [initialNav]);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element)?.closest?.("[data-nh-dd]")) {
        setOpen(null);
        setPopRow(null);
        setSugOn(false);
        setDdq("");
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  /* Escape закрывает и выпадашки, и шторки — на планшете с клавиатурой это
     единственный способ выйти из шторки, кроме крестика. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setPopRow(null);
      setSheet(null);
      setSugOn(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* На десктопе поиск в выпадашке получает фокус сразу. На мобильном шторка
     этого не делает: клавиатура закрыла бы список, ради которого её открыли. */
  useEffect(() => {
    if (open && !isMobile) ddInput.current?.focus();
  }, [open, isMobile]);

  /* Под открытой шторкой страница не должна прокручиваться. */
  const sheetOpen = isMobile && (!!open || !!popRow || !!sheet);
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const closeSheets = useCallback(() => {
    setOpen(null);
    setPopRow(null);
    setSheet(null);
    setDdq("");
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const showToast = (m: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(m);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const reset = () => {
    setNav(null);
    setSbp(false);
    setAp(false);
    setGp(false);
    setQ("");
    setSugOn(false);
    setOpen(null);
    setSheet(null);
    setDdq("");
    setExpanded(null);
    setPopRow(null);
    setShowAll(false);
    setAi({ pay: null, cur: null, top: null });
    /* Уходим на общий рейтинг, только если сама страница задаёт фильтр
       (/cards/{сервис}): иначе состояние уже очищено и уводить некуда. */
    if (initialNav) router.push("/cards");
  };

  /* У сервиса и страны есть своя страница — открываем её. Валюта и крипта
     страниц не имеют, их выбор меняет выборку прямо здесь. */
  const goNav = (n: NavFilter) => {
    setOpen(null);
    setDdq("");
    setSugOn(false);
    setShowAll(false);

    if (!hasPage(n)) {
      setNav(n);
      return;
    }

    /* Пункт получает активное состояние сразу, переход — следом. */
    setPending(navKey(n));
    router.push(navHref(n));
  };

  useEffect(() => setPending(null), [initialNav]);

  const base = useMemo(() => {
    if (!nav) return RATING_CARDS;
    if (nav.kind === "service")
      return RATING_CARDS.filter((c) => c.services.includes(nav.slug));
    if (nav.kind === "country")
      return RATING_CARDS.filter((c) => c.regions.includes(nav.slug));
    if (nav.kind === "currency")
      return RATING_CARDS.filter((c) => c.cur.includes(nav.slug));
    return RATING_CARDS.filter((c) => c.crypto);
  }, [nav]);

  const qn = q.trim().toLowerCase();
  const rows = useMemo(() => {
    let r = base;
    if (sbp) r = r.filter((c) => c.sbp);
    if (ap) r = r.filter((c) => c.ap);
    if (gp) r = r.filter((c) => c.gpay);
    if (qn) r = r.filter((c) => c.name.toLowerCase().includes(qn));
    return r;
  }, [base, sbp, ap, gp, qn]);

  /* Подбор: три ответа сужают каталог и подсвечивают подходящие строки. */
  const aiDone = !!(ai.pay && ai.cur && ai.top);
  const { aiIds, aiWhy } = useMemo(() => {
    if (!aiDone) return { aiIds: [] as string[], aiWhy: "" };
    const catMap: Record<string, RatingCard["cat"]> = {
      Подписки: "subs",
      "ИИ-сервисы": "ai",
      Игры: "games",
      Реклама: "ads",
    };
    const byTopup = (c: RatingCard) =>
      ai.top === "СБП" ? c.sbp : ai.top === "USDT" ? c.crypto : c.cardRu;
    let cand = RATING_CARDS.filter(
      (c) => (ai.cur === "Крипто" ? c.crypto : c.cur.includes(ai.cur!)) && byTopup(c),
    );
    const strict = cand.filter((c) => c.cat === catMap[ai.pay!]);
    if (strict.length >= 2) cand = strict;
    cand = cand
      .slice()
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 3);
    return {
      aiIds: cand.map((c) => c.id),
      aiWhy: cand.length
        ? `Почему эти: ${cand.map((c) => c.name).join(", ")} — принимают пополнение через ${ai.top}, работают с ${ai.cur === "Крипто" ? "криптовалютой" : ai.cur} и лучше всего показали себя в категории «${ai.pay}» по отзывам и комиссиям.`
        : "Под такие условия карт не нашлось — попробуйте другой способ пополнения.",
    };
  }, [aiDone, ai]);

  const sorted = useMemo(() => {
    const { key, dir } = sort;
    if (key === "issue") return rows.slice().sort(byPrice((c) => c.issue, dir));
    if (key === "maint") return rows.slice().sort(byPrice((c) => c.maint, dir));
    return rows.slice().sort((a, b) => {
      if (key === "rank") return a.rank - b.rank;
      return ((b.rating ?? -1) - (a.rating ?? -1)) * dir;
    });
  }, [rows, sort]);

  const shown = showAll ? sorted : sorted.slice(0, COLLAPSED);
  const togSort = (k: SortKey) =>
    setSort((s) =>
      s.key !== k
        ? { key: k, dir: -1 }
        : s.dir === -1
          ? { key: k, dir: 1 }
          : { key: "rank", dir: 1 },
    );

  const dq = norm(ddq.trim());
  const navSvc = nav?.kind === "service" ? nav.slug : null;
  const navCty = nav?.kind === "country" ? nav.slug : null;

  const svcGroups = useMemo(
    () =>
      SVC_GROUPS.map((g) => ({
        name: g.name,
        items: g.items.filter((s) => !dq || norm(s).includes(dq)),
      })).filter((g) => g.items.length),
    [dq],
  );
  const ctyGroups = useMemo(
    () =>
      COUNTRY_GROUPS.map((g) => ({
        name: g.name,
        items: g.items.filter((c) => !dq || norm(c.name).includes(dq)),
      })).filter((g) => g.items.length),
    [dq],
  );

  const isNav = (k: string) => !!nav && navKey(nav) === k;
  const noFilter = !nav && !sbp && !ap && !gp && !qn;

  const chips = [
    { label: "Все", active: noFilter, mark: false, pending: false, on: reset },
    ...(
      [
        { label: "USD", n: { kind: "currency", slug: "USD", label: "USD" } as NavFilter },
        { label: "EUR", n: { kind: "currency", slug: "EUR", label: "EUR" } as NavFilter },
      ] as const
    ).map(({ label, n }) => ({
      label,
      active: isNav(navKey(n)),
      mark: isNav(navKey(n)),
      pending: pending === navKey(n),
      on: () => (isNav(navKey(n)) ? reset() : goNav(n)),
    })),
    {
      label: "СБП",
      active: sbp,
      mark: sbp,
      pending: false,
      on: () => {
        setSbp((v) => !v);
        setShowAll(false);
      },
    },
    {
      label: "Крипто",
      active: isNav("crypto"),
      mark: isNav("crypto"),
      pending: pending === "crypto",
      on: () =>
        isNav("crypto") ? reset() : goNav({ kind: "crypto", label: "Крипто" }),
    },
    {
      label: "Apple Pay",
      active: ap,
      mark: ap,
      pending: false,
      on: () => {
        setAp((v) => !v);
        setShowAll(false);
      },
    },
    {
      label: "Google Pay",
      active: gp,
      mark: gp,
      pending: false,
      on: () => {
        setGp((v) => !v);
        setShowAll(false);
      },
    },
  ];

  const sugCards = qn
    ? RATING_CARDS.filter((c) => c.name.toLowerCase().includes(qn)).slice(0, 4)
    : [];
  const sugSvcs = qn
    ? SVC_GROUPS.flatMap((g) => g.items)
        .filter((s) => s.toLowerCase().includes(qn))
        .slice(0, 4)
    : [];

  const summaryMain = !nav
    ? "Полный рейтинг виртуальных карт"
    : nav.kind === "service"
      ? `Показаны карты для оплаты ${nav.label}`
      : nav.kind === "country"
        ? `Карты для страны: ${nav.label}`
        : nav.kind === "crypto"
          ? "Карты с пополнением криптовалютой"
          : `Карты с валютой ${nav.label}`;

  const summaryCount =
    (rows.length !== base.length
      ? `${base.length} → ${rows.length}`
      : `${rows.length}`) + ` из ${CARD_TOTAL} сервисов`;

  const SORT_LABELS: Record<SortKey, string> = {
    rank: "наш рейтинг",
    issue: "выпуск карты",
    maint: "обслуживание",
    reviews: "отзывы",
  };
  const sortLabel =
    SORT_LABELS[sort.key] +
    " " +
    (sort.key === "rank" ? "↓" : sort.dir === 1 ? "↑" : "↓");
  const arrow = (k: SortKey) =>
    sort.key === k ? (sort.dir === 1 ? "↑" : "↓") : "↕";

  const isEmpty = rows.length === 0;
  const alts = RATING_CARDS.slice()
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 3);

  const copyPromo = (e: React.MouseEvent, c: RatingCard) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(c.promo!).catch(() => {});
    showToast(`Промокод ${c.promo} скопирован ✓`);
  };

  const AI_QUESTIONS: [keyof typeof ai, string, string[]][] = [
    ["pay", "1 · Что оплачиваете?", ["Подписки", "ИИ-сервисы", "Игры", "Реклама"]],
    ["cur", "2 · Какая валюта?", ["USD", "EUR", "Крипто"]],
    ["top", "3 · Как пополняете?", ["СБП", "Карта РФ", "USDT"]],
  ];

  return (
    <div className="rf" ref={rootRef}>
      {/* ---- панель фильтров ---- */}
      <div className="rf-panel" data-nh-dd="root">
        <div className="rf-panel-row">
          <div className="rf-dd">
            <button
              type="button"
              className={`rf-dd-btn${open === "services" || navSvc ? " on" : ""}`}
              aria-expanded={open === "services"}
              onClick={() => {
                setOpen(open === "services" ? null : "services");
                setDdq("");
                setPopRow(null);
                setSugOn(false);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
              </svg>
              {navSvc ?? "Сервисы"}
              <span className={`rf-caret${open === "services" ? " up" : ""}`} />
            </button>

            {open === "services" ? (
              <>
                <SheetVeil onClose={closeSheets} />
                <div className="rf-pop rf-pop--svc">
                  <SheetHead title="Выберите сервис" onClose={closeSheets} />
                  <div className="rf-pop-head">
                    <div className="rf-pop-search">
                      <SearchIcon />
                      <input
                        ref={ddInput}
                        value={ddq}
                        onChange={(e) => setDdq(e.target.value)}
                        placeholder="Найти сервис — Adobe, ChatGPT…"
                        aria-label="Найти сервис"
                      />
                    </div>
                  </div>
                  <div className="rf-pop-list">
                    {!dq && POPULAR.length ? (
                      <>
                        <div className="rf-grp">Популярное</div>
                        <div className="rf-pop-chips">
                          {POPULAR.map((s) => (
                            <NavOption
                              key={s}
                              href={`/cards/${serviceSlug(s)}`}
                              className="rf-pop-chip"
                              onSelect={() =>
                                goNav({ kind: "service", slug: s, label: s })
                              }
                            >
                              {s}
                            </NavOption>
                          ))}
                        </div>
                      </>
                    ) : null}

                    {svcGroups.map((g) => (
                      <div key={g.name}>
                        <div className="rf-grp">{g.name}</div>
                        {g.items.map((s) => (
                          <NavOption
                            key={s}
                            href={`/cards/${serviceSlug(s)}`}
                            className={`rf-opt${navSvc === s ? " on" : ""}`}
                            onSelect={() =>
                              goNav({ kind: "service", slug: s, label: s })
                            }
                          >
                            <span className="rf-opt-ic">{s.slice(0, 2)}</span>
                            <span className="rf-opt-name">{s}</span>
                            <span className="rf-opt-cnt">{cardsCountLabel(svcCount(s))}</span>
                            {navSvc === s ? <span className="rf-opt-check">✓</span> : null}
                          </NavOption>
                        ))}
                      </div>
                    ))}

                    {!svcGroups.length ? (
                      <div className="rf-pop-empty">Сервис не нашли — попробуйте иначе</div>
                    ) : null}
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="rf-dd">
            <button
              type="button"
              className={`rf-dd-btn${open === "countries" || navCty ? " on" : ""}`}
              aria-expanded={open === "countries"}
              onClick={() => {
                setOpen(open === "countries" ? null : "countries");
                setDdq("");
                setPopRow(null);
                setSugOn(false);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              {navCty ? COUNTRY_NAMES[navCty]?.name : "Страны"}
              <span className={`rf-caret${open === "countries" ? " up" : ""}`} />
            </button>

            {open === "countries" ? (
              <>
                <SheetVeil onClose={closeSheets} />
                <div className="rf-pop rf-pop--cty">
                  <SheetHead title="Выберите страну" onClose={closeSheets} />
                  <div className="rf-pop-head">
                    <div className="rf-pop-search">
                      <SearchIcon />
                      <input
                        ref={ddInput}
                        value={ddq}
                        onChange={(e) => setDdq(e.target.value)}
                        placeholder="Найти страну…"
                        aria-label="Найти страну"
                      />
                    </div>
                  </div>
                  <div className="rf-pop-list">
                    {ctyGroups.map((g) => (
                      <div key={g.name}>
                        <div className="rf-grp">{g.name}</div>
                        {g.items.map((c) => (
                          <NavOption
                            key={c.slug}
                            href={`/cards/${c.slug}`}
                            className={`rf-opt${navCty === c.slug ? " on" : ""}`}
                            onSelect={() =>
                              goNav({ kind: "country", slug: c.slug, label: c.name })
                            }
                          >
                            <span className="rf-opt-flag">{c.flag}</span>
                            <span className="rf-opt-name">{c.name}</span>
                            <span className="rf-opt-cnt">{cardsCountLabel(ctyCount(c.slug))}</span>
                            {navCty === c.slug ? <span className="rf-opt-check">✓</span> : null}
                          </NavOption>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="rf-search-wrap">
            <div className="rf-search">
              <SearchIcon />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSugOn(true);
                  setShowAll(false);
                }}
                onFocus={() => {
                  setSugOn(true);
                  setOpen(null);
                }}
                placeholder={
                  isMobile
                    ? "Сервис карт — WantToPay…"
                    : "Поиск: сервис карт или что оплатить — WantToPay, Netflix…"
                }
                aria-label="Поиск по названию"
              />
              {q ? (
                <button
                  type="button"
                  className="rf-search-clear"
                  aria-label="Очистить поиск"
                  onClick={() => {
                    setQ("");
                    setSugOn(false);
                  }}
                >
                  ✕
                </button>
              ) : null}
            </div>

            {sugOn && qn ? (
              <div className="rf-pop rf-pop--sug">
                {sugCards.length ? (
                  <>
                    <div className="rf-grp">Сервисы карт — фильтр таблицы</div>
                    {sugCards.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className="rf-sug"
                        onClick={() => {
                          setQ(c.name);
                          setSugOn(false);
                          setShowAll(false);
                        }}
                      >
                        <span className="rf-logo rf-logo--sm" style={{ background: c.logo.bg }}>
                          {c.logo.txt}
                        </span>
                        <span className="rf-sug-name">{c.name}</span>
                        <span className="rf-sug-kind">карта</span>
                      </button>
                    ))}
                  </>
                ) : null}

                {sugSvcs.length ? (
                  <>
                    <div className="rf-grp">
                      Оплатить сервис — переход на страницу
                    </div>
                    {sugSvcs.map((s) => (
                      <NavOption
                        key={s}
                        href={`/cards/${serviceSlug(s)}`}
                        className="rf-sug rf-sug--link"
                        onSelect={() => goNav({ kind: "service", slug: s, label: s })}
                      >
                        <span className="rf-opt-ic">{s.slice(0, 2)}</span>
                        <span className="rf-sug-name">{s}</span>
                        <span className="rf-sug-kind">· {cardsCountLabel(svcCount(s))}</span>
                        <span className="rf-sug-arrow">→</span>
                      </NavOption>
                    ))}
                  </>
                ) : null}

                {!sugCards.length && !sugSvcs.length ? (
                  <div className="rf-pop-empty">
                    Ничего не нашли — покажем альтернативы под таблицей
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="rf-chips">
          {chips.map((c) => (
            <button
              key={c.label}
              type="button"
              className={`rf-chip${c.active || c.pending ? " on" : ""}`}
              aria-pressed={c.active}
              onClick={c.on}
            >
              {c.label}
              {c.pending ? <span className="rf-spin" /> : null}
              {c.mark && !c.pending ? <span className="rf-chip-x">✕</span> : null}
            </button>
          ))}
        </div>
      </div>

      {/* ---- панель состояния ---- */}
      <div className="rf-state">
        {nav ? (
          <span className="rf-navchip">
            {nav.label}
            <button type="button" onClick={reset} title="Сбросить фильтр" aria-label="Сбросить фильтр">
              ✕
            </button>
          </span>
        ) : null}
        {/* Без активного фильтра эта строка на мобильном не нужна: в прототипе
            в панели состояния только счётчик и ссылка сортировки. */}
        <span className={`rf-state-main${nav ? "" : " rf-state-main--idle"}`}>
          {summaryMain}
        </span>
        <span className="rf-state-count">{summaryCount}</span>
        <span className="rf-state-dot">·</span>
        {/* На мобильном сортировка живёт в шторке: кликать по шапке таблицы
            там негде. Тултип методики уезжает в ту же шторку. */}
        {isMobile ? (
          <button
            type="button"
            className="rf-state-sort rf-state-sort--btn"
            onClick={() => setSheet("sort")}
            aria-label={`Сортировка: ${SORT_LABELS[sort.key]}`}
          >
            <SortIcon />
            <strong>{SORT_LABELS[sort.key]}</strong>
          </button>
        ) : (
          <span className="rf-state-sort">
            сортировка: <strong>{sortLabel}</strong>
            <InfoDot onShow={() => setTip("method")} onHide={() => setTip(null)} />
            {tip === "method" ? (
              <span className="rf-tip" style={{ width: 300 }}>
                <strong>Как мы считаем рейтинг:</strong> отзывы пользователей (40%),
                комиссии и тарифы (30%), скорость выпуска (15%), проверка редакцией —
                реальный выпуск и тестовый платёж (15%).
              </span>
            ) : null}
          </span>
        )}
        {!noFilter ? (
          <button type="button" className="rf-reset" onClick={reset}>
            Сбросить всё ✕
          </button>
        ) : null}
      </div>

      {/* ---- таблица ---- */}
      <div className="rf-table">
        <div className="rf-table-scroll">
          <div className="rf-table-inner">
            <div className="rf-head">
              <div>№</div>
              <div>Сервис</div>
              <div className="rf-th">
                <button type="button" className={sort.key === "issue" ? "on" : ""} onClick={() => togSort("issue")}>
                  Выпуск карты <span className="rf-arr">{arrow("issue")}</span>
                </button>
                <div className="rf-th-sep" />
                <InfoDot small onShow={() => setTip("issue")} onHide={() => setTip(null)} />
                {tip === "issue" ? (
                  <span className="rf-tip" style={{ width: 240 }}>
                    Разовая цена выпуска одной виртуальной карты, включая комиссию
                    платформы. Без учёта пополнения.
                  </span>
                ) : null}
              </div>
              <div className="rf-th">
                <button type="button" className={sort.key === "maint" ? "on" : ""} onClick={() => togSort("maint")}>
                  Обслуживание <span className="rf-arr">{arrow("maint")}</span>
                </button>
                <div className="rf-th-sep" />
                <InfoDot small onShow={() => setTip("maint")} onHide={() => setTip(null)} />
                {tip === "maint" ? (
                  <span className="rf-tip" style={{ width: 230 }}>
                    Регулярная плата за месяц. «0 ₽ первый год» — далее по тарифу
                    сервиса.
                  </span>
                ) : null}
              </div>
              <div className="rf-th">
                Комиссия
                <div className="rf-th-sep" />
                <InfoDot small onShow={() => setTip("fee")} onHide={() => setTip(null)} />
                {tip === "fee" ? (
                  <span className="rf-tip" style={{ width: 230 }}>
                    Комиссия сервиса за пополнение карты. Считается сверх суммы
                    пополнения, курс конвертации в неё не входит.
                  </span>
                ) : null}
              </div>
              <div className="rf-th">Оплачивает</div>
              <div className="rf-th">
                <button type="button" className={sort.key === "reviews" ? "on" : ""} onClick={() => togSort("reviews")}>
                  Отзывы <span className="rf-arr">{arrow("reviews")}</span>
                </button>
              </div>

              <div />
              <div />
            </div>

            {isEmpty ? (
              <div className="rf-empty">
                <div className="rf-empty-emoji">🔍</div>
                <div className="rf-empty-title">Ничего не нашли</div>
                <div className="rf-empty-sub">
                  {qn
                    ? `По запросу «${q}» с текущими фильтрами карт нет. Посмотрите похожие:`
                    : "С такими фильтрами карт нет. Посмотрите похожие:"}
                </div>
                <div className="rf-empty-alts">
                  {alts.map((c) => (
                    <button key={c.id} type="button" className="rf-alt" onClick={reset}>
                      <span className="rf-logo rf-logo--md" style={{ background: c.logo.bg }}>
                        {c.logo.txt}
                      </span>
                      <span className="rf-alt-name">
                        {c.name}
                        <span className="rf-alt-rating">★ {c.rating?.toFixed(1) ?? "—"}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <button type="button" className="rf-btn rf-btn--primary" onClick={reset}>
                  Показать весь рейтинг
                </button>
              </div>
            ) : (
              shown.map((c, i) => {
                const exp = expanded === c.id;
                const pop = popRow === c.id;
                const isTop = i === 0 && sort.key === "rank" && !qn;
                const aiHit = aiIds.includes(c.id);
                const pq = popq.trim().toLowerCase();
                const popItems = c.services.filter(
                  (s) => !pq || s.toLowerCase().includes(pq),
                );

                return (
                  <div
                    key={c.id}
                    className={`rf-row${isTop ? " rf-row--top" : ""}${aiHit ? " rf-row--ai" : ""}`}
                  >
                    {isTop ? (
                      <div className="rf-badge-wrap">
                        <button
                          type="button"
                          className="rf-badge"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTip(tip === "best" ? null : "best");
                          }}
                        >
                          ★ Лучшее предложение
                        </button>
                        {tip === "best" ? (
                          <span className="rf-tip rf-tip--badge" style={{ width: 290 }}>
                            Лучшее сочетание цены, отзывов и надёжности по нашей
                            методике. Не реклама: позиция не продаётся.
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    {aiHit ? (
                      <div className="rf-badge-wrap">
                        <span className="rf-badge rf-badge--ai">✦ Подходит по вашему подбору</span>
                      </div>
                    ) : null}

                    <div
                      className="rf-grid"
                      onClick={() => {
                        setExpanded(exp ? null : c.id);
                        setPopRow(null);
                      }}
                    >
                      <div>
                        <span className="rf-num rf-num--plain">{i + 1}</span>
                      </div>

                      <div className="rf-name-cell">
                        <span className="rf-logo" style={{ background: c.logo.bg }}>
                          {c.logo.txt}
                        </span>
                        <span className="rf-name-box">
                          <span className="rf-name">
                            {c.name}
                            {c.verified ? (
                              <span className="rf-verified-icon" title="Сервис нами проверен">
                                <ShieldIcon />
                              </span>
                            ) : null}
                          </span>
                          <span className="rf-tag">{c.tag}</span>
                        </span>
                      </div>


                      <Metric
                        cls="rf-issue"
                        label="Выпуск карты"
                        txt={c.issueTxt}
                        free={c.issue === 0}
                      />
                      <Metric
                        cls="rf-maint"
                        label="Обслуживание"
                        txt={c.maintTxt}
                        free={c.maint === 0}
                      />
                      <Metric
                        cls="rf-fee"
                        label="Комиссия"
                        txt={c.topupFee}
                        free={isFree(c.topupFee)}
                      />

                      <div className="rf-svcs">
                        <span className="rf-svcs-lbl">Оплачивает</span>
                        <button
                          type="button"
                          className="rf-more-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPopRow(pop ? null : c.id);
                            setPopq("");
                          }}
                        >
                          <span className="rf-more-val">{c.svcTotal}</span>
                          <span className="rf-more-lbl">сервиса</span>
                        </button>


                        {pop ? (
                          <>
                            <SheetVeil
                              onClose={(e) => {
                                e.stopPropagation();
                                setPopRow(null);
                              }}
                            />
                            <div
                              className="rf-pop rf-pop--svcs"
                              data-nh-dd="pop"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <SheetHead
                                title={`Что оплачивает ${c.name}`}
                                onClose={(e) => {
                                  e.stopPropagation();
                                  setPopRow(null);
                                }}
                              />
                              <div className="rf-pop-head">
                                <input
                                  value={popq}
                                  onChange={(e) => setPopq(e.target.value)}
                                  placeholder="Поиск по сервисам…"
                                  aria-label="Поиск по сервисам карты"
                                  className="rf-pop-input"
                                />
                              </div>
                              <div className="rf-pop-list">
                                {popItems.map((s) => (
                                  <NavOption
                                    key={s}
                                    href={`/cards/${serviceSlug(s)}`}
                                    className="rf-opt"
                                    onSelect={(e) => {
                                      e.stopPropagation();
                                      goNav({ kind: "service", slug: s, label: s });
                                    }}
                                  >
                                    <span className="rf-opt-ic">{s.slice(0, 2)}</span>
                                    <span className="rf-opt-name">{s}</span>
                                    <span className="rf-opt-cnt">{SVC_CAT[s]}</span>
                                  </NavOption>
                                ))}
                              </div>
                              <div className="rf-pop-foot">
                                Всего поддерживается — {servicesCountLabel(c.svcTotal)}
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className="rf-reviews">
                        <span className="rf-star" aria-hidden="true">
                          ★
                        </span>
                        <span className={`rf-rating rf-rating--${ratingColor(c.rating)}`}>
                          {c.rating?.toFixed(1) ?? "—"}
                        </span>
                        {/* Счётчик отзывов показываем, только когда он есть:
                            у части карт редакция их не собирает. */}
                        {c.reviews !== null ? (
                          <Link
                            href={`/cards/${c.slug}`}
                            className="rf-reviews-cnt"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ReviewIcon />
                            {c.reviews}
                          </Link>
                        ) : null}
                      </div>

                      <div className="rf-actions">
                        {c.promo ? (
                          <button
                            type="button"
                            className="rf-promo"
                            title={`Скопировать промокод${c.promoText ? " — " + c.promoText : ""}`}
                            aria-label="Скопировать промокод"
                            onClick={(e) => copyPromo(e, c)}
                          >
                            <GiftIcon />
                          </button>
                        ) : null}
                        {/* На мобильном первая кнопка раскрывает карточку —
                            «Полный обзор» лежит внутри раскрытия. */}
                        <button
                          type="button"
                          className="rf-btn rf-btn--ghost rf-btn--toggle"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(exp ? null : c.id);
                            setPopRow(null);
                          }}
                        >
                          {exp ? "Свернуть" : "Обзор"}
                        </button>
                        <Link
                          href={`/cards/${c.slug}`}
                          className="rf-btn rf-btn--ghost rf-btn--review"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Обзор
                        </Link>
                        <ApplyLink
                          className="rf-btn rf-btn--primary"
                          href={c.applyUrl}
                          card={c.slug}
                          place="rating-form"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Оформить
                        </ApplyLink>
                      </div>

                      <div className="rf-chev-cell">
                        <span className={`rf-chev${exp ? " up" : ""}`}>
                          <ChevronIcon />
                        </span>
                      </div>

                      {/* Разрыв строки мобильной карточки: держит шапку и
                          метрики на разных строках при любой ширине. */}
                      <span className="rf-break" aria-hidden="true" />
                    </div>

                    {exp ? (
                      <div className="rf-exp">
                        <div className="rf-exp-grid">
                          <div>
                            <div className="rf-exp-lbl">Валюты</div>
                            <div className="rf-exp-val">{c.cur.join(" · ")}</div>
                          </div>
                          <div>
                            <div className="rf-exp-lbl">Пополнение</div>
                            <div className="rf-exp-val">{c.topup}</div>
                            <div className="rf-exp-sub">комиссия {c.topupFee}</div>
                          </div>
                          <div>
                            <div className="rf-exp-lbl">Срок действия</div>
                            <div className="rf-exp-val">{c.limits}</div>
                          </div>
                          <div>
                            <div className="rf-exp-lbl">Промокод</div>
                            {c.promo ? (
                              <button
                                type="button"
                                className="rf-promo-code"
                                onClick={(e) => copyPromo(e, c)}
                              >
                                {c.promo} ⧉
                              </button>
                            ) : (
                              <div className="rf-exp-none">Нет активных</div>
                            )}
                          </div>

                          {c.pros.length ? (
                            <div className="rf-exp-pros">
                              <div className="rf-exp-h rf-exp-h--good">✓ Плюсы</div>
                              {c.pros.map((p) => (
                                <div key={p} className="rf-exp-item">
                                  · {p}
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {c.cons.length ? (
                            <div className="rf-exp-cons">
                              <div className="rf-exp-h rf-exp-h--bad">− Минусы</div>
                              {c.cons.map((p) => (
                                <div key={p} className="rf-exp-item">
                                  · {p}
                                </div>
                              ))}
                            </div>
                          ) : null}

                          <div className="rf-exp-cta">
                            <Link href={`/cards/${c.slug}`} className="rf-btn rf-btn--ghost">
                              Полный обзор
                            </Link>
                            <ApplyLink
                              className="rf-btn rf-btn--primary"
                              href={c.applyUrl}
                              card={c.slug}
                              place="rating-form-exp"
                            >
                              Оформить карту →
                            </ApplyLink>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}

            {!isEmpty && sorted.length > COLLAPSED ? (
              <div className="rf-showall">
                <button
                  type="button"
                  className={showAll ? "rf-collapse" : ""}
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll
                    ? "Свернуть ↑"
                    : `Показать все ${servicesCountLabel(sorted.length)} ↓`}
                </button>
              </div>
            ) : null}
            <div className="rf-footer-note">
              <span className="rf-verified-icon"><ShieldIcon /></span> — сервис нами проверен
            </div>
          </div>
        </div>
      </div>


      {/* ---- подбор карты ---- */}
      <div className="rf-ai">
        <div className="rf-ai-head">
          <span className="rf-ai-ic">✦</span>
          <div>
            <div className="rf-ai-title">Подобрать карту за 10 секунд</div>
            <div className="rf-ai-sub">
              Ответьте на 3 вопроса — подсветим подходящие строки в рейтинге
            </div>
          </div>
          {ai.pay || ai.cur || ai.top ? (
            <button
              type="button"
              className="rf-ai-reset"
              onClick={() => setAi({ pay: null, cur: null, top: null })}
            >
              Сбросить
            </button>
          ) : null}
        </div>

        <div className="rf-ai-grid">
          {AI_QUESTIONS.map(([field, title, opts]) => (
            <div key={field}>
              <div className="rf-ai-q">{title}</div>
              <div className="rf-ai-opts">
                {opts.map((o) => (
                  <button
                    key={o}
                    type="button"
                    className={`rf-ai-opt${ai[field] === o ? " on" : ""}`}
                    onClick={() =>
                      setAi({ ...ai, [field]: ai[field] === o ? null : o })
                    }
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {aiDone ? <div className="rf-ai-why">{aiWhy}</div> : null}
      </div>

      {/* ---- шторка сортировки (мобильный) ---- */}
      {sheet === "sort" ? (
        <>
          <div
            className="rf-veil rf-veil--always"
            onClick={() => setSheet(null)}
            aria-hidden="true"
          />
          <div
            className="rf-pop rf-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Сортировка"
            data-nh-dd="sheet"
          >
            <SheetHead title="Сортировка" onClose={() => setSheet(null)} />
            <div className="rf-pop-list">
              {SORT_SHEET.map((o) => {
                const on =
                  sort.key === o.key && (o.key === "rank" || sort.dir === o.dir);
                return (
                  <button
                    key={o.id}
                    type="button"
                    className={`rf-sheet-opt${on ? " on" : ""}`}
                    onClick={() => {
                      setSort({ key: o.key, dir: o.dir });
                      setSheet(null);
                    }}
                  >
                    <span className="rf-opt-name">{o.label}</span>
                    {on ? <span className="rf-opt-check">✓</span> : null}
                  </button>
                );
              })}
            </div>
            <div className="rf-pop-foot">
              <strong>Как мы считаем рейтинг:</strong> отзывы пользователей (40%),
              комиссии и тарифы (30%), скорость выпуска (15%), проверка редакцией —
              реальный выпуск и тестовый платёж (15%). Позиция в рейтинге не
              продаётся.
            </div>
          </div>
        </>
      ) : null}

      {toast ? (
        <div className="rf-toast" role="status">
          <span>✓</span>
          {toast}
        </div>
      ) : null}
    </div>
  );
}

/* ---------- мелкие элементы ---------- */

/* Пункт выпадашки. На страницах рейтинга это настоящая ссылка на отдельный
   адрес, на главной — кнопка: там выбор только фильтрует таблицу, и ссылка
   давала бы уйти со страницы кликом средней кнопкой или из контекстного меню. */
/** Пункт-переход: настоящая ссылка, чтобы работали новая вкладка и обход
    краулером, но клик перехватываем — он же меняет состояние виджета. */
function NavOption({
  href,
  className,
  onSelect,
  children,
}: {
  href: string;
  className: string;
  onSelect: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={onSelect}>
      {children}
    </Link>
  );
}

/* Шапка и подложка шторки. На десктопе оба элемента скрыты стилями: там та же
   разметка работает обычной выпадашкой. */
function SheetHead({
  title,
  onClose,
}: {
  title: string;
  onClose: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="rf-sheet-head">
      <span className="rf-sheet-grip" aria-hidden="true" />
      <div className="rf-sheet-title">{title}</div>
      <button
        type="button"
        className="rf-sheet-x"
        onClick={onClose}
        aria-label="Закрыть"
      >
        ✕
      </button>
    </div>
  );
}

function SheetVeil({ onClose }: { onClose: (e: React.MouseEvent) => void }) {
  return <div className="rf-veil" onClick={onClose} aria-hidden="true" />;
}

/* Ячейка метрики: подпись нужна только на мобильном — в таблице её роль
   играет шапка колонки. */
function Metric({
  cls,
  label,
  txt,
  free,
}: {
  cls: string;
  label: string;
  txt: string;
  free: boolean;
}) {
  const [val, note] = splitMetric(txt);
  return (
    <div className={`rf-m ${cls}${free ? " free" : ""}`}>
      <span className="rf-m-lbl">{label}</span>
      {/* 13 знаков — предел, при котором значение ещё влезает в треть карточки
          крупным кеглем; замер по самым длинным формулировкам каталога. */}
      <span className={`rf-m-val${val.length > 13 ? " long" : ""}`}>{val}</span>
      {note ? <span className="rf-m-note">{note}</span> : null}
    </div>
  );
}

function SortIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M7 12h10M10 17h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg
      className="rf-rev-ic"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.2-4.2A8 8 0 1 1 21 12z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L4 6v6c0 4.5 3.4 8.7 8 10 4.6-1.3 8-5.5 8-10V6l-8-4z" fill="#2660FF" />
      <path
        d="M8 12l2.5 2.5L16 9"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 12v8h14v-8M12 8v12M12 8c-2-.5-4-2-4-3.5C8 3 9 2.5 10 2.5c1.5 0 2 2.5 2 5.5zm0 0c2-.5 4-2 4-3.5 0-1.5-1-2-2-2-1.5 0-2 2.5-2 5.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoDot({
  onShow,
  onHide,
  small,
}: {
  onShow: () => void;
  onHide: () => void;
  small?: boolean;
}) {
  return (
    <span
      className={`rf-info${small ? " rf-info--sm" : ""}`}
      onMouseEnter={onShow}
      onMouseLeave={onHide}
      aria-hidden="true"
    >
      i
    </span>
  );
}

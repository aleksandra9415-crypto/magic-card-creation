/* H1 по семантике темы (блок 3 ТЗ) плюс строка доверия: дата проверки,
   число карт и то, чем мы не являемся. Всё, что читатель должен узнать до
   таблицы, стоит здесь — ниже начинается уже сама таблица.

   Если тема задала verdict («Коротко для занятых»), hero становится
   2-колоночным и сайдбар с топ-пиками встаёт справа — без него разметка
   остаётся такой же одноколоночной, как раньше. */

import type { Verdict } from "@/data/landing/types";
import VerdictBox from "./VerdictBox";

const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

/** "2026-07-29" → "29 июля 2026" */
export const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

/** Оборачивает первое вхождение `accent` в h1 акцентным `<em>`. Слово ищем
 *  как есть (без учёта регистра не нужно — тема задаёт его тем же текстом,
 *  что и в h1); не нашли — просто ничего не подсвечиваем. */
const renderH1 = (h1: string, accent?: string) => {
  if (!accent) return h1;
  const i = h1.indexOf(accent);
  if (i === -1) return h1;
  return (
    <>
      {h1.slice(0, i)}
      <em>{accent}</em>
      {h1.slice(i + accent.length)}
    </>
  );
};

export default function LandingHero({
  h1,
  h1Accent,
  lead,
  cardsLine,
  updatedAt,
  verdict,
  stats,
}: {
  h1: string;
  /** Слово внутри h1, выделяемое акцентным цветом. */
  h1Accent?: string;
  lead: string;
  /** «19 карт Visa и Mastercard» — считается из каталога на странице. */
  cardsLine: string;
  updatedAt: string;
  verdict?: Verdict;
  /** Три цифры темы под лидом. Без них — общие чипы про каталог. */
  stats?: { n: string; l: string }[];
}) {
  const content = (
    <div className="lp-hero__col">
      <span className="lp-hero__badge">
        <i />
        Проверено {fmtDate(updatedAt)} · оплату тестировали лично
      </span>
      <h1>{renderH1(h1, h1Accent)}</h1>
      <p className="lp-hero__lead">{lead}</p>
      {stats?.length ? (
        <div className="lp-hero__stats lp-transp__grid lp-transp__grid--3col">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="lp-transp__n">{s.n}</div>
              <div className="lp-transp__l">{s.l}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="lp-hero__meta">
          <span className="lp-hero__chip">{cardsLine}</span>
          <span className="lp-hero__chip">Независимый мониторинг, карты не выпускаем</span>
        </div>
      )}
    </div>
  );

  return (
    <header className="lp-hero">
      {verdict ? (
        <div className="lp-hero__grid">
          {content}
          <VerdictBox verdict={verdict} />
        </div>
      ) : (
        content
      )}
    </header>
  );
}

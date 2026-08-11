import Link from "@/components/shared/Link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { ArrowRight } from "@/components/shared/icons";
import { CARDS_TOTAL } from "@/data/home";
import { COUNTRIES } from "@/data/countries";

/* Полоса статов из спеки: «N сервисов · от 0 ₽ выпуск · …». Подписи короткие,
   иначе на мобильном строка ломается на две. Третий стат — число стран с
   гайдами: счётчиков отзывов в каталоге нет, выдумывать их нельзя. */
const STATS = [
  { num: String(CARDS_TOTAL), lbl: "сервисов" },
  { num: "от 0 ₽", lbl: "выпуск" },
  { num: String(COUNTRIES.length), lbl: "стран" },
];

export default function Hero() {
  return (
    <SectionWrapper
      id="hero"
      titleAs="h1"
      eyebrow={
        <>
          <span className="eyebrow__dot"></span>
          <span>
            <span className="hide-sm">Независимый мониторинг · </span>
            обновлено сегодня
          </span>
        </>
      }
      title={
        <>
          Зарубежные виртуальные карты —{" "}
          <span className="accent">рейтинг 2026</span>
        </>
      }
      description={
        <>
          NHcard не выпускает карты — мы их{" "}
          <strong style={{ color: "var(--ink)" }}>
            мониторим, сравниваем и тестируем
          </strong>
          . {CARDS_TOTAL} проверенных сервисов Visa и Mastercard
          <span className="hide-sm">
            , актуальные тарифы и пошаговые инструкции: как оплатить подписки,
            рекламу и покупки в любой стране мира
          </span>
          .
        </>
      }
    >
      <div className="hero__grid-content">
        <div className="hero__main">
          <div className="hero__cta">
            <Link className="btn btn--primary btn--lg" href="/cards">
              Сравнить карты
              <ArrowRight />
            </Link>
            <a className="btn btn--ghost btn--lg" href="#howto">
              Как оформить
            </a>
          </div>
          <div className="hero__stats">
            {STATS.map((s) => (
              <div key={s.lbl}>
                <div className="stat__num tabular-nums">{s.num}</div>
                <div className="stat__lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="cardstack">
            <div className="vcard vcard--1">
              <span className="vcard__bg-ring"></span>
              <div className="vcard__row">
                <span className="vcard__brand">
                  <span className="vcard__brand-mark" aria-hidden="true">
                    <span className="nhmini">NH</span>
                  </span>
                  card
                </span>
                <span className="vcard__chip"></span>
              </div>
              <div className="vcard__num">4929 ···· ···· 2026</div>
              <div className="vcard__row">
                <span style={{ opacity: 0.7, fontSize: 11 }}>VIRTUAL · EUR</span>
                <span className="vcard__net">VISA</span>
              </div>
            </div>
            <div className="vcard vcard--2">
              <span className="vcard__bg-ring"></span>
              <div className="vcard__row">
                <span className="vcard__brand">Global Pay</span>
                <span className="vcard__chip"></span>
              </div>
              <div className="vcard__num">5375 ···· ···· 4118</div>
              <div className="vcard__row">
                <span style={{ opacity: 0.8, fontSize: 11 }}>USD · INSTANT</span>
                <span className="vcard__net">Mastercard</span>
              </div>
            </div>
            <div className="vcard vcard--3">
              <div className="vcard__row">
                <span className="vcard__brand" style={{ color: "var(--ink)" }}>
                  Cardly
                </span>
                <span className="vcard__chip"></span>
              </div>
              <div className="vcard__num" style={{ color: "var(--ink-2)" }}>
                ···· ···· ···· 0142
              </div>
              <div className="vcard__row">
                <span
                  style={{ opacity: 0.7, fontSize: 11, color: "var(--muted)" }}
                >
                  EUR · ЕС
                </span>
                <span className="vcard__net" style={{ color: "var(--ink)" }}>
                  VISA
                </span>
              </div>
            </div>
          </div>
          <div className="float-badge float-badge--tr">
            <span className="dot"></span>
            <div>
              <div style={{ fontWeight: 700 }}>Все карты онлайн</div>
              <div className="muted" style={{ fontSize: 11 }}>
                выпуск за 5 минут
              </div>
            </div>
          </div>
          <div className="float-badge float-badge--bl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7v5c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z"
                stroke="#2660FF"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="#2660FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div style={{ fontWeight: 700 }}>0% комиссии</div>
              <div className="muted" style={{ fontSize: 11 }}>
                на пополнение
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

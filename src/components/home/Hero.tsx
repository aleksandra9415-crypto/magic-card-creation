import Link from "@/components/shared/Link";
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
    <section className="hero">
      <div className="container">
        <div className="hero__grid">
          <div>
            {/* На мобильном подпись сокращается до «обновлено сегодня»:
                в две строки она съедала первый экран. */}
            <span className="eyebrow eyebrow--plain">
              <span className="hide-sm">Независимый мониторинг · </span>
              обновлено сегодня
            </span>
            <h1 className="h1">
              Зарубежные виртуальные карты —{" "}
              <span className="accent">рейтинг 2026</span>
            </h1>
            {/* Лид на мобильном — три строки: хвост про тарифы и инструкции
                показываем только на широких экранах. */}
            <p className="hero__lead">
              NHcard не выпускает карты — мы их{" "}
              <strong style={{ color: "var(--foreground)" }}>
                мониторим, сравниваем и тестируем
              </strong>
              . {CARDS_TOTAL} проверенных сервисов Visa и Mastercard
              <span className="hide-sm">
                , актуальные тарифы и пошаговые инструкции: как оплатить
                подписки, рекламу и покупки в любой стране мира
              </span>
              .
            </p>
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
                  <div className="stat__num">{s.num}</div>
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
                  <span style={{ opacity: 0.7, fontSize: 11 }}>
                    VIRTUAL · EUR
                  </span>
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
                  <span style={{ opacity: 0.8, fontSize: 11 }}>
                    USD · INSTANT
                  </span>
                  <span className="vcard__net">Mastercard</span>
                </div>
              </div>
              <div className="vcard vcard--3">
                <div className="vcard__row">
                  <span className="vcard__brand" style={{ color: "var(--foreground)" }}>
                    Cardly
                  </span>
                  <span className="vcard__chip"></span>
                </div>
                <div className="vcard__num" style={{ color: "var(--foreground)" }}>
                  ···· ···· ···· 0142
                </div>
                <div className="vcard__row">
                  <span
                    style={{ opacity: 0.7, fontSize: 11, color: "var(--muted-foreground)" }}
                  >
                    EUR · ЕС
                  </span>
                  <span className="vcard__net" style={{ color: "var(--foreground)" }}>
                    VISA
                  </span>
                </div>
              </div>
            </div>
            <div className="float-badge float-badge--tr">
              <span className="dot dot--green"></span>
              <div>
                <div style={{ fontWeight: 700, lineHeight: 1.2 }}>Все карты онлайн</div>
                <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>
                  выпуск за 5 минут
                </div>
              </div>
            </div>
            <div className="float-badge float-badge--bl">
              <span className="dot dot--dark"></span>
              <div>
                <div style={{ fontWeight: 700, lineHeight: 1.2 }}>0% комиссии</div>
                <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>
                  на пополнение
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

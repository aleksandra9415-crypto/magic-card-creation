import type { Card } from "@/data/cards";
import { CheckBadge } from "@/components/shared/icons";

/** Инициалы для логотипа-плашки. Предлоги пропускаем, иначе «Плати по миру»
 *  даёт «ПП» вместо «ПМ». Слитные названия режем по заглавным, чтобы
 *  «WantToPay» и «Wayment» не превратились в одинаковые «WA». Из одного
 *  слова берём две первые буквы. */
export const initials = (name: string) => {
  const words = name
    .split(/[\s.]+|(?<=[a-zа-яё])(?=[A-ZА-ЯЁ])/)
    .filter((w) => w.length > 2);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const Star = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3 6.6 7 .9-5.1 5 1.3 7.1L12 18.2 5.8 21.6 7.1 14.5 2 9.5l7-.9L12 2z" />
  </svg>
);

/**
 * Hero обзора: логотип с местом в рейтинге и заголовком, значки, вводный
 * абзац и строка ключевых фактов. Оценка, CTA и промокод живут в правой
 * колонке (ScoreSidebar) — здесь их намеренно нет, чтобы не дублировать
 * кнопку оформления дважды на первом экране.
 *
 * Работает и без detail: тогда вместо lead идёт tagline, вместо значков —
 * фичи-чипы, а вместо ключевых фактов — строка меты из базовых полей.
 */
export default function CardHero({ card }: { card: Card }) {
  const d = card.detail;
  const lead =
    d?.lead ??
    d?.tagline ??
    `Виртуальная карта для оплаты зарубежных сервисов. Пополнение: ${card.topup}. Срок жизни карты — ${card.term}.`;
  const ratingMeta = d?.ratingMeta ?? [card.geo, `Карта живёт ${card.term}`];

  return (
    <section className="rv-hero" id="about">
      <div className="rv-id">
        <span
          className="rv-logo"
          style={{ background: `linear-gradient(135deg, ${card.color}, #1b2e6e)` }}
        >
          {initials(card.name)}
        </span>
        <div>
          {d?.rank ? (
            /* Звезда только у настоящего места в рейтинге: у большинства
               карточек в этом поле лежит «Официальные тарифы сервиса». */
            <span className="rv-place">
              {/место/i.test(d.rank) ? <Star /> : null}
              {d.rank}
            </span>
          ) : null}
          {/* Галочки у заголовка нет намеренно: её роль играет значок
              «Проверено редакцией» в строке ниже. */}
          <h1 className="rv-h1">{card.name} — обзор</h1>
        </div>
      </div>

      {d?.badges?.length ? (
        <div className="rv-badges">
          <span className="bdg bdg--v">
            <CheckBadge size={11} />
            Проверено редакцией
          </span>
          {d.badges.map((b) => (
            <span className={b.kind ? `bdg bdg--${b.kind}` : "bdg"} key={b.text}>
              {b.text}
            </span>
          ))}
        </div>
      ) : d?.feats?.length ? (
        /* У карточек без значков их роль играют фичи-чипы из старых данных. */
        <div className="rv-badges">
          {d.feats.map((f) => (
            <span className="bdg" key={f}>
              {f}
            </span>
          ))}
        </div>
      ) : null}

      <p className="rv-lead">{lead}</p>

      {d?.keyFacts?.length ? (
        <dl className="rv-key">
          {d.keyFacts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd className={f.free ? "free" : undefined}>
                {f.value}
                {f.note ? <small>{f.note}</small> : null}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        /* Без ключевых фактов гео и срок жизни карты больше нигде на первом
           экране не показаны — оставляем их строкой меты. */
        <div className="rv-meta">
          {ratingMeta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      )}
    </section>
  );
}

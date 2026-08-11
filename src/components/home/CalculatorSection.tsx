
import { useMemo, useState } from "react";
import ApplyLink from "@/components/shared/ApplyLink";

type FundingMethod = { key: string; label: string; fee: number };

const FUNDING_METHODS: FundingMethod[] = [
  { key: "sbp0", label: "СБП · 0%", fee: 0 },
  { key: "sbp2", label: "СБП · 2%", fee: 2 },
  { key: "sbp4", label: "СБП · 4%", fee: 4 },
  { key: "usdt", label: "USDT · 1.5%", fee: 1.5 },
];

type CardTier = {
  key: string;
  label: string;
  issue: number;
  monthly: number;
  name: string;
  slug: string;
  applyUrl: string;
  meta: string;
};

/* Три реальные карты из каталога (data/cards.json), закрывающие диапазон
   «бесплатный выпуск / стандартная / именная премиум» — числа issue/monthly
   взяты из полей issueRub/monthlyRub этих карточек, без выдумывания. */
const CARD_TIERS: CardTier[] = [
  {
    key: "free",
    label: "Бесплатный выпуск",
    issue: 0,
    monthly: 0,
    name: "WantToPay",
    slug: "wanttopay",
    applyUrl: "https://wanttopay.net/?pid=SCMUI",
    meta: "Prepaid-тариф, обслуживание 0 ₽.",
  },
  {
    key: "standard",
    label: "Стандартная (2 990 ₽)",
    issue: 2990,
    monthly: 0,
    name: "Плати по миру",
    slug: "plati-po-miru",
    applyUrl:
      "https://platipomiru.com/payment-abroad/?utm_source=igor&utm_medium=cpa&utm_content=igor_pl2_ncard",
    meta: "Обслуживание 0 ₽ первый год.",
  },
  {
    key: "premium",
    label: "Именная премиум (19 990 ₽)",
    issue: 19990,
    monthly: 0,
    name: "Easy Payments",
    slug: "easy-payments",
    applyUrl: "https://easypayments.online/bank-accounts/cards?refLinkId=209113",
    meta: "Именная карта банка, доставка курьером.",
  },
];

const fmt = (n: number) => `${Math.round(n).toLocaleString("ru-RU")} ₽`;

export default function CalculatorSection() {
  const [turnover, setTurnover] = useState(15000);
  const [method, setMethod] = useState<FundingMethod>(FUNDING_METHODS[0]);
  const [tier, setTier] = useState<CardTier>(CARD_TIERS[0]);

  const { fees, monthlyTotal, total } = useMemo(() => {
    const fees = turnover * 12 * (method.fee / 100);
    const monthlyTotal = tier.monthly * 12;
    return { fees, monthlyTotal, total: tier.issue + monthlyTotal + fees };
  }, [turnover, method, tier]);

  return (
    <section className="section section--soft" id="calc" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section__head section__head--centered">
          <span className="eyebrow-pro">Калькулятор · единственный в рынке</span>
          <h2 className="section__title--pro">Сколько реально стоит карта за год</h2>
          <p className="section__sub--pro">
            Цена выпуска — не вся стоимость. Добавьте обслуживание и комиссию
            пополнения с учётом вашего оборота — и решение часто оказывается
            неочевидным.
          </p>
        </div>

        <div className="calc">
          <div className="calc__form">
            <div className="calc__field">
              <div className="calc__lbl">
                <span>Месячный оборот</span>
                <span className="calc__val">{fmt(turnover)}</span>
              </div>
              <input
                type="range"
                className="calc__range"
                min={1000}
                max={200000}
                step={1000}
                value={turnover}
                onChange={(e) => setTurnover(Number(e.target.value))}
              />
            </div>

            <div className="calc__field">
              <div className="calc__lbl">Сценарий пополнения</div>
              <div className="calc__chips">
                {FUNDING_METHODS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    className={`calc__chip${method.key === m.key ? " is-active" : ""}`}
                    onClick={() => setMethod(m)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="calc__field">
              <div className="calc__lbl">Тип карты</div>
              <div className="calc__chips">
                {CARD_TIERS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    className={`calc__chip${tier.key === t.key ? " is-active" : ""}`}
                    onClick={() => setTier(t)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="calc__result">
            <div className="calc__result-tag">Реальная стоимость за год</div>
            <div className="calc__result-num">{fmt(total)}</div>
            <div className="calc__result-sub">
              При обороте <span>{fmt(turnover)}</span>/мес
            </div>

            <div className="calc__breakdown">
              <div className="calc__breakdown-row">
                <span>Выпуск</span>
                <span>{fmt(tier.issue)}</span>
              </div>
              <div className="calc__breakdown-row">
                <span>Обслуживание (12 мес)</span>
                <span>{fmt(monthlyTotal)}</span>
              </div>
              <div className="calc__breakdown-row">
                <span>Комиссия пополнения</span>
                <span>{fmt(fees)}</span>
              </div>
              <div className="calc__breakdown-row calc__breakdown-row--total">
                <span>Итого за год</span>
                <span>{fmt(total)}</span>
              </div>
            </div>

            <div className="calc__pick">
              <div className="calc__pick-lbl">Под ваши параметры</div>
              <div className="calc__pick-name">{tier.name}</div>
              <div className="calc__pick-meta">{tier.meta}</div>
              <ApplyLink
                className="btn btn--primary btn--sm mt-24"
                href={tier.applyUrl}
                card={tier.slug}
                place="calc"
              >
                Оформить
              </ApplyLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

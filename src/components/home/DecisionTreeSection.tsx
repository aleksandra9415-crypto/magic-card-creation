
import { useState } from "react";
import ApplyLink from "@/components/shared/ApplyLink";
import { 
  BrainCircuit, 
  Play, 
  Target, 
  Gamepad, 
  ShoppingBag, 
  Globe 
} from "lucide-react";

type Option = {
  key: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  pick: string;
  meta: string;
  slug: string;
  applyUrl: string;
};

/* Каждый пункт — реальная карта из каталога (data/cards.json), выбранная по
   пересечению с её полем services[] / категорией из data.categories. */
const OPTIONS: Option[] = [
  {
    key: "ai",
    icon: <BrainCircuit size={20} />,
    label: "ChatGPT, Claude",
    sub: "Нейросети",
    pick: "Плати по миру",
    meta: "СБП 0%, выпуск от 2 990 ₽, Apple Pay. Флагман рейтинга — сервисы указаны в тарифе напрямую.",
    slug: "plati-po-miru",
    applyUrl:
      "https://platipomiru.com/payment-abroad/?utm_source=igor&utm_medium=cpa&utm_content=igor_pl2_ncard",
  },
  {
    key: "media",
    icon: <Play size={20} fill="currentColor" />,
    label: "Netflix, Spotify",
    sub: "Стриминг и медиа",
    pick: "WantToPay",
    meta: "Prepaid-карта от 0 ₽, СБП и крипта 0%. Управление в Telegram Mini App.",
    slug: "wanttopay",
    applyUrl: "https://wanttopay.net/?pid=SCMUI",
  },
  {
    key: "ads",
    icon: <Target size={20} />,
    label: "Google Ads, TikTok Ads",
    sub: "Реклама и маркетинг",
    pick: "FlexCard",
    meta: "Выпуск от 2 $, без верификации, пополнение USDT. Для рекламных кабинетов.",
    slug: "flexcard",
    applyUrl: "https://flexcard.cards",
  },
  {
    key: "games",
    icon: <Gamepad size={20} />,
    label: "Steam, Google Play",
    sub: "Игры и сторы",
    pick: "Card.Club",
    meta: "Карта в USD от 30 $, Apple Pay и Google Pay, лимит платежа до 30 000 $.",
    slug: "cardclub",
    applyUrl: "https://card.club/?utm_campaign=igor_pl2_ncard",
  },
  {
    key: "market",
    icon: <ShoppingBag size={20} />,
    label: "Amazon, eBay, AliExpress",
    sub: "Маркетплейсы",
    pick: "GoGoCard",
    meta: "Visa/MasterCard in USD from $39, works in 180+ countries, Apple Pay and Google Pay.",
    slug: "gogocard",
    applyUrl: "https://www.gogocard.me",
  },
  {
    key: "travel",
    icon: <Globe size={20} />,
    label: "Booking, поездки",
    sub: "Путешествия",
    pick: "Wayment",
    meta: "Выпуск от 2 990 ₽, первый год обслуживания 0 ₽, пополнение по СБП без комиссии, срок 5 лет. Apple Pay и Google Pay, без KYC.",
    slug: "wayment",
    applyUrl: "https://wayment.net/?pid=Y3Bh_A6_NFORT7",
  },
];

export default function DecisionTreeSection() {
  const [active, setActive] = useState<Option | null>(null);

  return (
    <section className="section" id="decision" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section__head">
          <span className="eyebrow-pro">Подбор за 10 секунд</span>
          <h2 className="section__title--pro">Что вы хотите оплачивать?</h2>
          <p className="section__sub--pro" style={{ marginInline: '0' }}>
            Выберите главный сценарий — покажем карту, которая точно
            подходит по услугам из её собственного тарифа.
          </p>
        </div>

        <div className="dtree">
          <div className="dtree__q">Главный сценарий оплаты:</div>
          <div className="dtree__opts">
            {OPTIONS.map((o) => (
              <button
                key={o.key}
                type="button"
                className={`dtree-opt${active?.key === o.key ? " is-active" : ""}`}
                onClick={() => setActive(o)}
              >
                <span>
                  <span className="dtree-opt__label">{o.label}</span>
                  <span className="dtree-opt__sub">{o.sub}</span>
                </span>
              </button>
            ))}
          </div>

          <div className={`dtree__result${active ? " is-shown" : ""}`}>
            {active ? (
              <>
                <div className="dtree__result-tag">Рекомендация</div>
                <div className="dtree__result-pick">{active.pick}</div>
                <div className="dtree__result-meta">{active.meta}</div>
                <ApplyLink
                  className="btn btn--primary btn--sm mt-24"
                  href={active.applyUrl}
                  card={active.slug}
                  place="dtree"
                >
                  Оформить
                </ApplyLink>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

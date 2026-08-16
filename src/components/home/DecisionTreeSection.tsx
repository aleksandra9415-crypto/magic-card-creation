
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
        <div className="dtree-wrapper">
          <div className="dtree-header">
            <div className="dtree-header__icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M12 3L14.5 9L21 12L14.5 15L12 21L9.5 15L3 12L9.5 9L12 3Z" fill="white" />
              </svg>
            </div>
            <div className="dtree-header__text">
              <h2 className="dtree-header__title">Подобрать карту за 10 секунд</h2>
              <p className="dtree-header__sub">Ответьте на 3 вопроса — подсветим подходящие строки в рейтинге</p>
            </div>
          </div>

          <div className="dtree-grid">
            <div className="dtree-col">
              <div className="dtree-col__title">1 · Что оплачиваете?</div>
              <div className="dtree-col__chips">
                <button className="dtree-chip">Подписки</button>
                <button className="dtree-chip">ИИ-сервисы</button>
                <button className="dtree-chip">Игры</button>
                <button className="dtree-chip">Реклама</button>
              </div>
            </div>
            
            <div className="dtree-col">
              <div className="dtree-col__title">2 · Какая валюта?</div>
              <div className="dtree-col__chips">
                <button className="dtree-chip">USD</button>
                <button className="dtree-chip">EUR</button>
                <button className="dtree-chip">Крипто</button>
              </div>
            </div>

            <div className="dtree-col">
              <div className="dtree-col__title">3 · Как пополняете?</div>
              <div className="dtree-col__chips">
                <button className="dtree-chip">СБП</button>
                <button className="dtree-chip">Карта РФ</button>
                <button className="dtree-chip">USDT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

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

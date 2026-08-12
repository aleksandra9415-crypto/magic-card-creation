/* Секция «Контекст 2026» — два ctx-карда: что произошло и что такое
   зарубежная виртуальная карта. Объяснение для тех, кто оформляет впервые. */

function Tips({
  items,
}: {
  items: { tone: "bad" | "good" | "hint"; b: string; text: string }[];
}) {
  return (
    <div className="ctx-tips">
      {items.map((it) => (
        <div key={it.b} className={`ctx-tip ctx-tip--${it.tone}`}>
          <b>{it.b}</b>
          {it.text}
        </div>
      ))}
    </div>
  );
}

const BLOCKED_TIPS = [
  {
    tone: "bad" as const,
    b: "Что не работает",
    text: "Карты Тинькофф, Сбера, Альфы, ВТБ за рубежом. МИР на Netflix или ChatGPT. UnionPay от российских банков — почти везде.",
  },
  {
    tone: "good" as const,
    b: "Что работает",
    text: "Зарубежные виртуальные карты Visa/Mastercard финтехов Армении, Казахстана, Турции, Грузии. USDT для разовых платежей.",
  },
];

const WHAT_TIPS = [
  {
    tone: "good" as const,
    b: "Что оплачивает",
    text: "ChatGPT, Claude, Midjourney, Netflix, Spotify, App Store, Google Play, Steam, PSN, Booking, Airbnb, Uber, Adobe, Figma, Notion, Amazon, eBay.",
  },
  {
    tone: "hint" as const,
    b: "Что не оплачивает",
    text: "Санкционные сервисы OFAC. Госуслуги РФ. Крупные операции на российских маркетплейсах с конвертацией.",
  },
];

export default function ContextSection() {
  return (
    <section className="section" id="context">
      <div className="container">
        <div className="section__head section__head--centered">
          <span className="eyebrow-pro">Контекст 2026</span>
          <h2 className="section__title--pro">Уточнить фильтр таблицы</h2>
          <p className="section__sub--pro">
            Короткое объяснение для тех, кто оформляет зарубежную карту впервые.
            Если уже разбираетесь — пролистайте.
          </p>
        </div>

        <div className="ctx">
          <div className="ctx-card">
            <span className="eyebrow">Что произошло</span>
            <h3>Почему карты российских банков не принимают за рубежом</h3>
            <p>
              <b>10 марта 2022</b> Visa и Mastercard приостановили обслуживание
              карт российских банков за пределами РФ. Это техническое отключение
              на стороне платёжных систем: BIN российского банка перестал
              маршрутизироваться через зарубежные эквайеры — сайты получают «do
              not honour» и отклоняют оплату.
            </p>
            <p>
              НСПК работает только внутри РФ и нескольких стран СНГ с
              ограничениями. UnionPay через российские банки фактически перестал
              работать к концу 2023 из-за вторичных санкций.
            </p>
            <Tips items={BLOCKED_TIPS} />
          </div>

          <div className="ctx-card">
            <span className="eyebrow">Что это такое</span>
            <h3>Зарубежная виртуальная карта — простыми словами</h3>
            <p>
              Карта Visa, Mastercard или UnionPay, выпущенная иностранным банком
              или его финтех-партнёром. Только цифровая форма: номер, срок, CVV.
              Хранится в приложении, привязывается к Apple/Google Pay в один тап.
            </p>
            <p>
              От российской карты отличают три параметра: <b>BIN</b> (антифрод
              видит «нероссийский» эмитент), <b>счёт</b> (привязан к иностранному
              IBAN), <b>пополнение</b> (через СБП-партнёра или криптомост).
            </p>
            <Tips items={WHAT_TIPS} />
          </div>
        </div>
      </div>
    </section>
  );
}

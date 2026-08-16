/* Секция «Безопасность и закон» — два guard-карда: налоги и KYC/AML */

function TaxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M5 3h12v16l-3-2-3 2-3-2-3 2V3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 8h6M8 12h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SecIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M11 2l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V5l8-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 11l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GuardList({ items }: { items: { b: string; text: string }[] }) {
  return (
    <ul className="guard-list">
      {items.map((it) => (
        <li key={it.b}>
          <b>{it.b}</b>
          {it.text}
        </li>
      ))}
    </ul>
  );
}

const TAX_ITEMS = [
  {
    b: "Когда уведомлять",
    text: "При открытии счёта в банке-нерезиденте (например, армянский Ameria, казахстанский Forte). Финтех-обёртки без отдельного IBAN — серая зона; уточняйте у налогового консультанта.",
  },
  {
    b: "Когда платить НДФЛ",
    text: "На остаток на счёте начислены проценты — да, 13–15%. Просто оплата покупок — нет.",
  },
  {
    b: "Штраф за неуведомление",
    text: "от 4 000 до 5 000 ₽ за каждый эпизод. Намного дешевле подать заявление через личный кабинет ФНС за 5 минут.",
  },
];

const SEC_ITEMS = [
  {
    b: "Пополняйте только со своих карт",
    text: "Бан № 1 в индустрии — пополнение со счёта родственника или друга. Любая транзакция «с третьего лица» — повод для проверки.",
  },
  {
    b: "Не платите за санкционные сервисы",
    text: "Список OFAC обновляется. Карта блокируется без предупреждения и денег обычно не возвращают.",
  },
  {
    b: "Не делайте крупных операций сразу",
    text: "Первая транзакция в день получения карты на $3 000 — почти гарантированная блокировка. Растяните оборот на 2 недели.",
  },
  {
    b: "Храните не более $500–1 000",
    text: "Если сервис закроется или счёт заморозят, остаток выводится сложно. Держите карту как «расходный кошелёк».",
  },
];

export default function GuardSection() {
  return (
    <section className="section" id="guard" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section__head section__head--centered">
          <span className="eyebrow-pro">Безопасность и закон</span>
          <h2 className="section__title--pro">
            Что важно знать перед оформлением
          </h2>
          <p className="section__sub--pro">
            Два вопроса, которые задают чаще всего: налоги и риски блокировки.
          </p>
        </div>

        <div className="guard">
          <div className="guard-card guard-card--tax">
            <div className="guard-card__head">
              <div className="guard-card__icon">
                <TaxIcon />
              </div>
              <div>
                <h3>Налоги и ФНС</h3>
                <div className="guard-card__sub">Что декларировать и когда</div>
              </div>
            </div>
            <p>
              По закону <b>173-ФЗ</b> резидент РФ обязан уведомить ФНС о счёте в
              иностранном банке в течение <b>30 дней</b> с момента открытия и
              подавать отчёт о движении средств до <b>1 июня</b> следующего
              года.
            </p>
            <GuardList items={TAX_ITEMS} />
          </div>

          <div className="guard-card guard-card--sec">
            <div className="guard-card__head">
              <div className="guard-card__icon">
                <SecIcon />
              </div>
              <div>
                <h3>Безопасность · KYC/AML</h3>
                <div className="guard-card__sub">Как не попасть на блокировку</div>
              </div>
            </div>
            <p>
              Карты блокируют не из-за гражданства, а из-за нарушений
              AML-процедур: пополнение с чужого счёта, переводы P2P, оплата
              санкционных сервисов. Соблюдайте пять правил — и риск минимальный.
            </p>
            <GuardList items={SEC_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  );
}

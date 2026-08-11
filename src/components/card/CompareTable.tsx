import type { Card, Competitor } from "@/data/cards";

/** Сравнение с ближайшими конкурентами по рейтингу — строка текущей карты
 *  подсвечена. Конкуренты не обязаны быть карточками в каталоге: это
 *  самостоятельные строки сравнения, а не ссылки. */
export default function CompareTable({
  card,
  competitors,
  note,
  sub,
}: {
  card: Card;
  competitors: Competitor[];
  note?: string;
  sub?: string;
}) {
  return (
    <section className="sec" id="compare">
      <h2>Сравнение с альтернативами</h2>
      <p className="ssub">
        {sub ??
          "Ближайшие конкуренты из рейтинга — по параметрам, которые чаще всего решают выбор."}
      </p>
      <div className="tw">
        <table className="t t--cmp">
          <thead>
            <tr>
              <th>Сервис</th>
              <th>Оценка</th>
              <th>Выпуск</th>
              <th>Обслуживание</th>
              <th>Комиссия</th>
              <th>Крипта</th>
              <th>KYC</th>
            </tr>
          </thead>
          <tbody>
            <tr className="me">
              <td>
                <b>{card.name}</b>
                <small>этот обзор</small>
              </td>
              <td>
                <b>{card.score !== null ? card.score.toFixed(1) : "—"}</b>
              </td>
              <td>{card.display?.issue ?? (card.issueRub !== null ? `${card.issueRub.toLocaleString("ru-RU")} ₽` : "—")}</td>
              <td>{card.display?.monthly ?? (card.monthlyRub !== null ? `${card.monthlyRub.toLocaleString("ru-RU")} ₽` : "—")}</td>
              {/* Числом, а не строкой витрины: в колонке «Комиссия» текст
                  «комиссия 0 ₽» читается как масло масляное. */}
              <td>{card.topupFee !== null ? `${card.topupFee}%` : card.display?.topupFee ?? "—"}</td>
              <td>
                <span className={`pill ${card.cats.includes("crypto") ? "pill--y" : "pill--n"}`}>
                  {card.cats.includes("crypto") ? "Да" : "Нет"}
                </span>
              </td>
              <td>
                <span className={`pill ${card.kyc === "нет" ? "pill--y" : "pill--m"}`}>
                  {card.kyc === "нет" ? "Не нужен" : card.kyc}
                </span>
              </td>
            </tr>
            {competitors.map((c) => (
              <tr key={c.name}>
                <td>
                  {c.name}
                  {c.rank ? <small>{c.rank}</small> : null}
                </td>
                <td>{c.score.toFixed(1)}</td>
                <td>{c.issue}</td>
                <td>{c.monthly}</td>
                <td>{c.fee}</td>
                <td>
                  <span className={`pill ${c.crypto ? "pill--y" : "pill--n"}`}>{c.crypto ? "Да" : "Нет"}</span>
                </td>
                <td>
                  <span className={`pill ${c.kyc === "нет" ? "pill--y" : c.kyc === "да" ? "pill--n" : "pill--m"}`}>
                    {c.kyc === "нет" ? "Не нужен" : c.kyc === "да" ? "Нужен" : c.kyc}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="cmp-note">{note}</p> : null}
    </section>
  );
}

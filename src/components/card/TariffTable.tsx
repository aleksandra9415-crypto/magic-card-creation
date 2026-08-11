import type { TariffRow } from "@/data/cards";

/** Детальная таблица параметр/значение/комментарий — дополняет карточки
 *  TariffPlans, а не заменяет их: карточки для беглого сравнения тарифов,
 *  таблица для полного разбора условий. */
export default function TariffTable({
  rows,
  note,
  sub,
  /* Когда карточек тарифов на странице нет, якорь #tariffs принадлежит
     таблице — на неё ведёт кнопка «Сначала посмотреть тарифы». */
  id = "tariffs",
}: {
  rows: TariffRow[];
  note?: string;
  sub?: string;
  id?: string;
}) {
  return (
    <section className="sec" id={id}>
      <h2>Тарифы и лимиты</h2>
      <p className="ssub">
        {sub ??
          "Все цифры сверены с личным кабинетом сервиса и реальными списаниями. Скрытых комиссий, кроме конвертации, не нашли."}
      </p>
      <div className="tw">
        <table className="t">
          <thead>
            <tr>
              <th>Параметр</th>
              <th>Значение</th>
              <th>Комментарий редакции</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.param}>
                <td>{r.param}</td>
                <td>
                  {r.value}
                  {r.valueNote ? <small>{r.valueNote}</small> : null}
                </td>
                <td>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="tw-note">{note}</p> : null}
    </section>
  );
}

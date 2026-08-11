import type { ServiceGroup } from "@/data/cards";

/** Что можно оплатить этой картой — сгруппировано по категориям, плюс
 *  честный список того, что не работает. Независим от плоского services[]
 *  (тот используется для фильтра рейтинга, этот — только для витрины). */
export default function ServiceCoverage({
  groups,
  broken,
  sub,
}: {
  groups: ServiceGroup[];
  broken?: { name: string; ic?: string; note: string }[];
  sub?: string;
}) {
  return (
    <section className="sec" id="services">
      <h2>Что можно оплатить этой картой</h2>
      <p className="ssub">
        {sub ??
          "Ниже — сервисы, по которым у нас есть подтверждение: свой платёж или отзыв читателя с чеком."}
      </p>
      <div className="svcs">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="svcs__grp">{g.label}</div>
            <div className="svcs__row">
              {g.items.map((item) => (
                <span
                  className={item.name.startsWith("+") ? "stile stile--m" : "stile"}
                  key={item.name}
                >
                  {item.ic ? <i>{item.ic}</i> : null}
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        {broken?.length ? (
          <div>
            <div className="svcs__grp">Не работает</div>
            <div className="svcs__row">
              {broken.map((b) => (
                <span className="stile stile--broken" key={b.name}>
                  {b.ic ? <i>{b.ic}</i> : null}
                  {b.name} — {b.note}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

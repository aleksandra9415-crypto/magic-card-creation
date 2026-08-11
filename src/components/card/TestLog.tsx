import type { TestLogEntry } from "@/data/cards";

const RESULT_LABEL: Record<TestLogEntry["result"], string> = {
  pass: "Прошло",
  retry: "Прошло со 2-й",
  fail: "Не прошло",
};

const RESULT_CLASS: Record<TestLogEntry["result"], string> = {
  pass: "pill--y",
  retry: "pill--m",
  fail: "pill--n",
};

/** Наш тест: стат-плитки + построчный результат по сервисам — честный
 *  журнал с неудачами, не только успехами. */
export default function TestLog({
  stats,
  log,
  sub,
}: {
  stats?: { n: string; label: string; tone?: "green" | "orange" }[];
  log?: TestLogEntry[];
  sub?: string;
}) {
  return (
    <section className="sec" id="test">
      <h2>Наш тест: что оплатилось, а что нет</h2>
      <p className="ssub">
        {sub ??
          "Мы выпустили карту и с тех пор платим ей за реальные подписки редакции. Ниже — полный отчёт, включая неудачи."}
      </p>
      {stats?.length ? (
        <div className="test">
          {stats.map((s) => (
            <div className="test__c" key={s.label}>
              <div className={s.tone ? `test__n test__n--${s.tone}` : "test__n"}>{s.n}</div>
              <div className="test__l">{s.label}</div>
            </div>
          ))}
        </div>
      ) : null}
      {log?.length ? (
        <div className="tw">
          <table className="t">
            <thead>
              <tr>
                <th>Сервис</th>
                <th>Результат</th>
                <th>Что было</th>
              </tr>
            </thead>
            <tbody>
              {log.map((l) => (
                <tr key={l.service}>
                  <td>{l.service}</td>
                  <td>
                    <span className={`pill ${RESULT_CLASS[l.result]}`}>{RESULT_LABEL[l.result]}</span>
                  </td>
                  <td>{l.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

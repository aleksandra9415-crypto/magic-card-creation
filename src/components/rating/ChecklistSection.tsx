import { CHECKLIST } from "@/data/rating";

function CheckCard({ b, p }: { b: string; p: string }) {
  return (
    <div className="ck">
      <b>{b}</b>
      <p>{p}</p>
    </div>
  );
}

export default function ChecklistSection() {
  return (
    <section className="sec" id="checklist">
      <h2>Что проверить до оплаты выпуска</h2>
      <p className="ssub">
        Шесть пунктов, на которых чаще всего теряют деньги — из сотен отзывов
        на Хабре, VC, Отзовике и в профильных чатах.
      </p>
      <div className="check-grid">
        {CHECKLIST.map((c) => (
          <CheckCard key={c.b} {...c} />
        ))}
      </div>
    </section>
  );
}

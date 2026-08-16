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
    <section className="section" id="checklist">
      <h2 className="section__title">Что <span className="text-accent-orange">проверить до оплаты</span> выпуска</h2>
      <p className="section__sub" style={{ maxWidth: 'none', marginBottom: '32px' }}>
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

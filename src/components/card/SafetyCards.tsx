import type { SafetyCard } from "@/data/cards";

/** Документы и безопасность — 3 карточки: кто выпускает, верификация,
 *  риски. Иконка чередуется по индексу, в данных не хранится. */
export default function SafetyCards({
  items,
  sub,
}: {
  items: SafetyCard[];
  sub?: string;
}) {
  return (
    <section className="sec" id="safety">
      <h2>Документы и безопасность</h2>
      <p className="ssub">
        {sub ??
          "Что мы проверили в открытых реестрах перед тем, как поставить сервису оценку."}
      </p>
      <div className="safe">
        {items.map((s) => (
          <div className="safe__c" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import type { Plan } from "@/data/cards";
import ApplyLink from "@/components/shared/ApplyLink";

/** Одна карточка тарифа */
export function PlanCard({
  plan,
  applyUrl,
  cardSlug,
}: {
  plan: Plan;
  applyUrl?: string;
  cardSlug: string;
}) {
  return (
    <div className={`plan${plan.popular ? " pop" : ""}`}>
      {plan.popular && plan.popularLabel ? (
        <span className="plan-badge">{plan.popularLabel}</span>
      ) : null}
      <h3>{plan.title}</h3>
      <p>{plan.desc}</p>
      <div className="price">
        {plan.price} {plan.note ? <small>{plan.note}</small> : null}
      </div>
      <ApplyLink
        className={`btn ${plan.popular ? "btn-orange" : "btn-ghost"}`}
        href={applyUrl}
        card={cardSlug}
        place="tariff"
      >
        Выбрать
      </ApplyLink>
    </div>
  );
}

export default function TariffPlans({
  plans,
  sub,
  applyUrl,
  cardSlug,
}: {
  plans: Plan[];
  sub?: string;
  applyUrl?: string;
  cardSlug: string;
}) {
  return (
    <section className="sec" id="tariffs">
      <h2>Тарифы</h2>
      {sub ? <p className="ssub">{sub}</p> : null}
      <div className="plans">
        {plans.map((p) => (
          <PlanCard key={p.title} plan={p} applyUrl={applyUrl} cardSlug={cardSlug} />
        ))}
      </div>
    </section>
  );
}

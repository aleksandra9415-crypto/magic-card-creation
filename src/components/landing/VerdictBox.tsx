import Link from "@/components/shared/Link";
import type { Verdict, VerdictPick } from "@/data/landing/types";
import { ArrowRight } from "@/components/shared/icons";
import ApplyLink from "@/components/shared/ApplyLink";

/* Сайдбар hero «Коротко для занятых»: 2 партнёрских пика + одна важная
   оговорка. Отдельный компонент, а не часть LandingHero — так read-only
   верстальщик темы решает сам, показывать ли его вовсе (verdict опционален). */
export default function VerdictBox({ verdict }: { verdict: Verdict }) {
  return (
    <aside className="verdict">
      <div className="verdict__t">{verdict.title}</div>
      {verdict.picks.map((p) => (
        <VerdictRow key={p.label} pick={p} />
      ))}
      <div className="verdict__cta">
        <Link className="lp-btn lp-btn--primary" href={verdict.ctaHref} style={{ width: "100%" }}>
          {verdict.ctaLabel}
        </Link>
      </div>
    </aside>
  );
}

function VerdictRow({ pick }: { pick: VerdictPick }) {
  const body = (
    <>
      <span className="verdict__k">{pick.label}</span>
      <span className="verdict__v">
        {pick.value}
        <span>{pick.note}</span>
        {pick.sponsHint ? <span className="verdict__spons">{pick.sponsHint}</span> : null}
      </span>
      <span className="verdict__go">
        <ArrowRight size={16} />
      </span>
    </>
  );

  if (pick.sponsored) {
    return (
      <ApplyLink
        className="verdict__row"
        href={pick.href}
        card={pick.cardSlug ?? pick.label}
        place="verdict"
      >
        {body}
      </ApplyLink>
    );
  }

  return (
    <Link className="verdict__row" href={pick.href}>
      {body}
    </Link>
  );
}

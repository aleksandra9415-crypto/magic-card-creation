import type { ProsCons } from "@/data/landing/types";

/** Двухколоночный список «плюсы/минусы» — блок `.pc` в способах оплаты. */
export default function ProsConsGrid({ prosCons }: { prosCons: ProsCons }) {
  return (
    <div className="lp-pc">
      <div className="lp-pc__col lp-pc__col--y">
        <div className="lp-pc__t">{prosCons.yesTitle ?? "Плюсы"}</div>
        <ul>
          {prosCons.yes.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="lp-pc__col lp-pc__col--n">
        <div className="lp-pc__t">{prosCons.noTitle ?? "Минусы"}</div>
        <ul>
          {prosCons.no.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

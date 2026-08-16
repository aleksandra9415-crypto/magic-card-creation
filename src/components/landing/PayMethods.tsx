import type { ServiceGuide } from "@/data/service-guides";
import type { LandingContent, Prose, Walkthrough } from "@/data/landing/types";
import GuideBlock from "./GuideBlock";
import TextBlock from "./TextBlock";
import WalkBlock from "./WalkBlock";
import MistakesBlock from "./MistakesBlock";

/* Единственная секция «как оплачивать X» — внутри неё все способы одинаковыми
   блоками-карточками с общей сквозной нумерацией:

     1. иностранная виртуальная карта (редакционный гайд сервиса)
     2..N. остальные способы из контента темы
     N+1. как оформить карту по шагам
     N+2. как избежать ошибок (только сервисы — у стран mistakes: null)

   Пошаговое оформление и разбор отказов раньше жили отдельными секциями во всю
   ширину; по макету они такие же способы, как остальные, поэтому собраны сюда.
   Номер считается по позиции, а не зашит в тексте: гайда может не быть, тогда
   первый метод из `methods` получает «1». */
/** Подсвечивает оранжевым фрагмент «оплачивать <сервис>» в заголовке. */
function renderH2(h2: string) {
  const m = h2.match(/оплачивать\s+\S+/i);
  if (!m) return h2;
  const start = m.index ?? 0;
  return (
    <>
      {h2.slice(0, start)}
      <span className="text-accent-orange" style={{ color: "var(--lp-orange)" }}>
        {m[0]}
      </span>
      {h2.slice(start + m[0].length)}
    </>
  );
}

export default function PayMethods({
  h2,
  intro,
  guide,
  methods,
  methodNote,
  walkthrough,
  mistakes,
}: {
  h2: string;
  intro: string;
  guide: ServiceGuide | null;
  methods: Prose[];
  /** Плашка-примечание внутри способа 1, напр. цифра теста темы. */
  methodNote?: string;
  walkthrough: Walkthrough;
  mistakes: LandingContent["mistakes"];
}) {
  const guideCount = guide ? 1 : 0;
  const walkN = guideCount + methods.length + 1;

  return (
    <section className="lp-methods" id="how-to-pay" aria-labelledby="how-to-pay-title">
      <div className="lp-sec__head">
        <h2 id="how-to-pay-title">{renderH2(h2)}</h2>
        <p className="lp-sec__sub">{intro}</p>
      </div>

      <div className="lp-methods__list">
        {guide ? <GuideBlock guide={guide} n={1} note={methodNote} /> : null}

        {methods.map((m, i) => (
          <TextBlock key={m.id} prose={m} n={guideCount + i + 1} />
        ))}

        <WalkBlock walk={walkthrough} n={walkN} />

        {mistakes ? <MistakesBlock mistakes={mistakes} n={walkN + 1} /> : null}
      </div>
    </section>
  );
}

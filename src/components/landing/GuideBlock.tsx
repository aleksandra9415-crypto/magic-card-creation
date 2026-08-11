import type { ReactNode } from "react";
import type { ServiceGuide } from "@/data/service-guides";
import { fmtDate } from "./LandingHero";
import ProsConsGrid from "./ProsConsGrid";
import Callout from "./Callout";

/* Способ 1 — «иностранная виртуальная карта», первый блок в «как оплачивать».
   Текст берём из data/service-guides: он написан редакцией и сверен с
   официальным источником.

   Две формы блока. Основная (макет): два абзаца + плюсы/минусы + плашка с
   цифрой теста — пошаговое оформление и разбор отказов вынесены в отдельные
   блоки 4 и 5 этой же секции. Развёрнутая (шаги + «где спотыкаются») остаётся
   для сервисов, которым ещё не написали plusCons, — иначе они потеряли бы
   половину гайда. */
export default function GuideBlock({
  guide,
  n = 1,
  note,
}: {
  guide: ServiceGuide;
  n?: number;
  /** Плашка внизу блока — обычно цифра теста темы. */
  note?: ReactNode;
}) {
  const short = !!guide.prosCons;

  return (
    <article className="lp-prose lp-prose--best" id="method-cards">
      <div className="lp-mblock__head">
        <span className="lp-mnum">{n}</span>
        <h3 className="lp-prose__title">Иностранная виртуальная карта</h3>
        <span className="lp-tag lp-tag--best">Рекомендуем</span>
      </div>

      <p className="lp-prose__lead">{guide.lead}</p>
      {guide.body ? <p className="lp-prose__p">{guide.body}</p> : null}

      {guide.price && !short ? (
        <div className="lp-guide__price">
          <span className="lp-guide__price-lbl">{guide.price.label}</span>
          <span className="lp-guide__price-val">{guide.price.value}</span>
          {guide.price.note ? (
            <span className="lp-guide__price-note">{guide.price.note}</span>
          ) : null}
        </div>
      ) : null}

      {guide.prosCons ? <ProsConsGrid prosCons={guide.prosCons} /> : null}

      {short ? null : (
        <>
          <ol className="lp-guide__steps">
            {guide.steps.map((s) => (
              <li key={s.title}>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>

          <div className="lp-guide__pitfalls">
            <div className="lp-guide__pitfalls-t">Где обычно спотыкаются</div>
            <ul>
              {guide.pitfalls.map((p) => (
                <li key={p.title}>
                  <b>{p.title}</b>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {note ? <Callout>{note}</Callout> : null}

      {/* Ссылку на официальный источник в короткой форме не показываем: дата
          проверки уже стоит в hero, а блок по макету заканчивается плашкой. */}
      {short ? null : (
        <p className="lp-guide__foot">
          Условия сверены {fmtDate(guide.verifiedAt)} с официальным источником:{" "}
          <a
            href={guide.official.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {guide.official.label}
          </a>
          .{" "}
          {guide.price
            ? "Тарифы сервисов меняются — перед оплатой сверьте цену там же."
            : "Условия и цены сервис меняет без предупреждения — перед оплатой загляните туда же."}
        </p>
      )}
    </article>
  );
}

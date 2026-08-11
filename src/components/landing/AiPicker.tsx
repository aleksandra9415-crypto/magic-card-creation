
import { useState } from "react";
import ApplyLink from "@/components/shared/ApplyLink";
import type { AiBlock } from "@/data/landing/types";

/* Блок 5 ТЗ: подбор карты под задачу и ответы на вопросы. Отвечает
   /api/assistant — та же ручка, что на главной, но пресеты и placeholder
   приходят из контента темы, а к вопросу подмешивается сама тема. Ответ
   всегда заканчивается партнёрской ссылкой на оформление: это требование
   ТЗ и одновременно единственный способ довести подбор до действия. */

type CardView = {
  name: string;
  geo: string;
  slug: string;
  issue: string | null;
  monthly: string | null;
  applyUrl: string | null;
};

type Answer = {
  answer: string;
  reason: string;
  recommended: CardView;
  alternative: CardView | null;
};

type State = "empty" | "loading" | "answer" | "error";

export default function AiPicker({
  block,
  subject,
  cardsTotal,
}: {
  block: AiBlock;
  subject: string;
  cardsTotal: number;
}) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>("empty");
  const [result, setResult] = useState<Answer | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => {
    const asked = value.trim();
    if (asked.length < 3 || state === "loading") return;

    setState("loading");
    setErrorMsg("");

    /* Тему подмешиваем в вопрос: пользователь на странице ChatGPT редко
       пишет «для ChatGPT» — он считает это очевидным из контекста. */
    const question = asked.toLowerCase().includes(subject.toLowerCase())
      ? asked
      : `${asked}. Речь про оплату: ${subject}.`;

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error ?? "Не удалось получить ответ.");
        setState("error");
        return;
      }
      setResult(data as Answer);
      setState("answer");
    } catch {
      setErrorMsg("Проблема с сетью. Попробуйте ещё раз.");
      setState("error");
    }
  };

  return (
    <section className="lp-ai" id="ai-picker" aria-labelledby="ai-picker-title">
      <div className="lp-ai__head">
        <span className="lp-eyebrow lp-eyebrow--on-dark">AI-подбор · ответ за ~10 секунд</span>
        <h2 id="ai-picker-title">{block.title}</h2>
        <p>{block.sub}</p>
      </div>

      <div className="lp-ai__grid">
        <div className="lp-ai__form">
          <div className="lp-ai__chips">
            {block.presets.map((p) => (
              <button
                key={p.label}
                type="button"
                className="lp-ai__chip"
                onClick={() => setValue(p.q)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <textarea
            className="lp-ai__input"
            rows={3}
            value={value}
            maxLength={500}
            placeholder={block.placeholder}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Опишите задачу"
          />

          <div className="lp-ai__actions">
            <button
              className="lp-btn lp-btn--primary"
              type="button"
              onClick={submit}
              disabled={state === "loading" || value.trim().length < 3}
            >
              {state === "loading" ? "Подбираю…" : "Подобрать карту"}
            </button>
            <span className="lp-ai__hint">Бесплатно, без регистрации</span>
          </div>
        </div>

        <div className="lp-ai__result" aria-live="polite">
          {state === "empty" ? (
            <div className="lp-ai__empty">
              <p>
                Здесь появится рекомендация: карта из рейтинга выше, почему она
                подходит под вашу задачу и ссылка на оформление.
              </p>
            </div>
          ) : null}

          {state === "loading" ? (
            <div className="lp-ai__empty">
              <span className="lp-ai__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <p>Сравниваю тарифы {cardsTotal} сервисов…</p>
            </div>
          ) : null}

          {state === "error" ? (
            <div className="lp-ai__empty">
              <p>{errorMsg}</p>
              <button className="lp-btn" type="button" onClick={submit}>
                Повторить
              </button>
            </div>
          ) : null}

          {state === "answer" && result ? (
            <div className="lp-ai__answer">
              <span className="lp-ai__answer-lbl">Рекомендация под ваш запрос</span>
              <div className="lp-ai__card">{result.recommended.name}</div>
              <p>{result.answer}</p>
              {result.reason ? <p>{result.reason}</p> : null}

              {result.alternative ? (
                <div className="lp-ai__alt">
                  <b>Альтернатива:</b> {result.alternative.name} —{" "}
                  {result.alternative.geo}
                  {result.alternative.issue
                    ? `, выпуск ${result.alternative.issue.toLowerCase()}`
                    : ""}
                  .
                </div>
              ) : null}

              <ApplyLink
                className="lp-btn lp-btn--primary"
                href={result.recommended.applyUrl ?? undefined}
                card={result.recommended.slug}
                place="ai-landing"
              >
                Оформить {result.recommended.name}
              </ApplyLink>

              <p className="lp-ai__disclaimer">
                Ответ сгенерирован на основе данных рейтинга NHcard. Ссылка на
                оформление — партнёрская, на позицию в рейтинге это не влияет.
                Тарифы перед оплатой сверяйте на сайте сервиса.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

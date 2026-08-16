
import { useState } from "react";
import { CARDS_TOTAL } from "@/data/home";
import ApplyLink from "@/components/shared/ApplyLink";

const QUICK = [
  { label: "Нейросети", q: "ChatGPT Plus и другие нейросети" },
  { label: "Стриминг", q: "Netflix, Spotify и стриминги" },
  { label: "Игры", q: "Steam и игровые платформы" },
  { label: "Путешествия", q: "Booking, Airbnb и путешествия" },
  { label: "Реклама", q: "Google Ads и рекламные кабинеты" },
];

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

export default function AiAssistantSection() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"empty" | "loading" | "answer" | "error">(
    "empty",
  );
  const [result, setResult] = useState<Answer | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => {
    const question = value.trim();
    if (question.length < 3 || state === "loading") return;
    setState("loading");
    setErrorMsg("");
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
    <section className="section section--compact" id="ai-assistant">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title--pro">
            Спросите AI, какая карта подойдёт — <span className="text-orange">подбор за 30 секунд</span>
          </h2>
          <p className="section__sub--pro">
            Опишите, что хотите оплачивать — помощник сравнит {CARDS_TOTAL}{" "}
            сервисов из нашего рейтинга и порекомендует лучший под вашу задачу.
          </p>
        </div>

        <div className="ai-ask">
          <div className="ai-ask__form">
            <div className="calc__field">
              <div className="calc__lbl">Что хотите оплачивать?</div>
              <div className="calc__chips">
                {QUICK.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    className="calc__chip rounded-[6px]"
                    onClick={() => setValue(`Хочу оплачивать: ${c.q}`)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              className="ai-ask__input"
              rows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              maxLength={500}
              placeholder="Например: плачу за ChatGPT Plus и Netflix, около 3 000 ₽ в месяц, хочу пополнять по СБП без комиссии"
            />
            <span className="ai-ask__hint">
              Бесплатно · без регистрации · ответ ~10 секунд
            </span>
            <div className="ai-ask__actions">
              <button
                className="btn btn--primary btn--lg"
                type="button"
                onClick={submit}
                disabled={state === "loading" || value.trim().length < 3}
              >
                {state === "loading" ? "Подбираю…" : "Подобрать карту"}
              </button>
            </div>
          </div>

          <div className="ai-ask__result">
            {state === "empty" ? (
              <div className="ai-ask__empty">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="4" y="7" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 7V3M8 12h.01M16 12h.01M9 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <p>
                  Здесь появится рекомендация: карта из рейтинга, почему она
                  подходит именно вам, и ссылка на оформление.
                </p>
              </div>
            ) : null}

            {state === "loading" ? (
              <div className="ai-ask__loading">
                <span className="ai-dot" />
                <span className="ai-dot" />
                <span className="ai-dot" />
                <p>Сравниваю тарифы {CARDS_TOTAL} сервисов…</p>
              </div>
            ) : null}

            {state === "error" ? (
              <div className="ai-ask__empty">
                <p>{errorMsg}</p>
                <button
                  className="btn btn-ghost btn-sm"
                  type="button"
                  onClick={submit}
                >
                  Повторить
                </button>
              </div>
            ) : null}

            {state === "answer" && result ? (
              <div className="ai-ask__answer">
                <div className="calc__pick-lbl">Рекомендация под ваш запрос</div>
                <div className="ai-ask__card">{result.recommended.name}</div>
                <p className="ai-ask__reason">{result.answer}</p>
                {result.reason ? (
                  <p className="ai-ask__reason">{result.reason}</p>
                ) : null}
                {result.alternative ? (
                  <div className="ai-ask__alt">
                    <b>Альтернатива:</b> {result.alternative.name} —{" "}
                    {result.alternative.geo}
                    {result.alternative.issue
                      ? `, выпуск ${result.alternative.issue.toLowerCase()}`
                      : ""}
                    .
                  </div>
                ) : null}
                <ApplyLink
                  className="btn btn--primary"
                  href={result.recommended.applyUrl ?? undefined}
                  card={result.recommended.slug}
                  place="ai"
                >
                  Оформить карту
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ApplyLink>
                <div className="ai-ask__disclaimer">
                  Ответ сгенерирован AI на основе данных рейтинга NHcard.
                  Проверяйте тарифы на сайте сервиса.
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

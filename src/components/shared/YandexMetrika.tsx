import { useEffect } from "react";

/**
 * Яндекс.Метрика. Подключается только если задан номер счётчика в
 * переменной окружения VITE_YM_COUNTER_ID — иначе ничего не рендерит.
 *
 * Цель типа «JavaScript-событие» с идентификатором `apply`
 * — на неё отправляется клик по кнопкам «Оформить».
 */
const YM_ID = import.meta.env.VITE_YM_COUNTER_ID as string | undefined;

export default function YandexMetrika() {
  useEffect(() => {
    if (!YM_ID) return;
    const w = window as unknown as Record<string, unknown>;
    if (w["ym"]) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    script.onload = () => {
      const ym = (window as unknown as { ym?: (...a: unknown[]) => void }).ym;
      ym?.(Number(YM_ID), "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    };
    document.head.appendChild(script);
  }, []);

  if (!YM_ID) return null;

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${YM_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}

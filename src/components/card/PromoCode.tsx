
import { useState } from "react";

/** Плашка промокода в сайдбаре обзора: подпись и код слева, кнопка копирования
 *  справа, а расшифровка скидки — отдельной строкой под плашкой (так в макете:
 *  внутри рамки остаётся только сам код, его видно с одного взгляда). */
export default function PromoCode({ text, code }: { text: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <div className="promo">
        <span>
          <span className="promo__l">Промокод NHcard</span>
          <span className="promo__v">{code}</span>
        </span>
        <button className="promo__b" type="button" onClick={copy}>
          {copied ? "Скопировано ✓" : "Копировать"}
        </button>
      </div>
      <p className="promo__d">{text}</p>
    </>
  );
}

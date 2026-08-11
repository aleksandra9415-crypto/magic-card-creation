
import type { ReactNode } from "react";

const YM_ID = process.env.NEXT_PUBLIC_YM_COUNTER_ID;

type YmWindow = Window & {
  ym?: (id: number, action: string, goal: string, params?: unknown) => void;
};

/**
 * Ссылка «Оформить» на партнёрский URL сервиса. Помимо перехода
 * отправляет в Яндекс.Метрику цель `apply` с меткой карты и места клика
 * (hero / table / tariff), чтобы считать конверсию платного трафика.
 */
export default function ApplyLink({
  href,
  card,
  place,
  className,
  children,
  onClick: onClickProp,
}: {
  href?: string;
  /** slug карты — для атрибуции клика */
  card: string;
  /** где нажали: hero | table | tariff */
  place: string;
  className?: string;
  children: ReactNode;
  /** доп. обработчик — например, чтобы клик не всплыл в строку таблицы */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClickProp?.(e);
    if (!YM_ID) return;
    const w = window as YmWindow;
    if (typeof w.ym === "function") {
      w.ym(Number(YM_ID), "reachGoal", "apply", { card, place });
    }
  };

  return (
    <a
      className={className}
      href={href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      data-apply-card={card}
      data-apply-place={place}
    >
      {children}
    </a>
  );
}

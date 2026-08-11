import type { ReactNode } from "react";

/** Универсальная плашка-примечание (`.mnote` в референсе). `warn` — то же,
 *  но оранжевой рамкой, для предупреждений про отказы/просрочки. */
export default function Callout({
  variant = "info",
  children,
}: {
  variant?: "info" | "warn";
  children: ReactNode;
}) {
  return (
    <div className={`lp-callout${variant === "warn" ? " lp-callout--warn" : ""}`}>
      <p>{children}</p>
    </div>
  );
}

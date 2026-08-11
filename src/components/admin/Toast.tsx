
import { createContext, useCallback, useContext, useState } from "react";

/* Мини-замена sonner: всплывающие уведомления об успехе/ошибке сохранения.
   Отдельная библиотека ради трёх строк текста проекту не нужна. */

type Toast = { id: number; text: string; kind: "ok" | "err" };

const ToastCtx = createContext<(text: string, kind?: Toast["kind"]) => void>(
  () => {},
);

export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const push = useCallback((text: string, kind: Toast["kind"] = "ok") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, text, kind }]);
    setTimeout(
      () => setItems((prev) => prev.filter((t) => t.id !== id)),
      kind === "err" ? 6000 : 3000,
    );
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="admin-toasts">
        {items.map((t) => (
          <div key={t.id} className={`admin-toast is-${t.kind}`}>
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

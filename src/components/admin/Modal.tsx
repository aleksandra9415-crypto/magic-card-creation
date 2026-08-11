
import { useEffect } from "react";

/* Модалка редактирования — один компонент на все разделы (в референсе этот
   паттерн был скопирован в каждый роут; здесь он вынесен). */

export default function Modal({
  title,
  size = "md",
  onClose,
  footer,
  children,
}: {
  title: string;
  size?: "md" | "lg";
  onClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  /* Esc закрывает, фон под модалкой не скроллится. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`admin-modal is-${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="admin-modal-head">
          <h2>{title}</h2>
          <button
            className="admin-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </header>

        <div className="admin-modal-body">{children}</div>

        {footer ? <footer className="admin-modal-foot">{footer}</footer> : null}
      </div>
    </div>
  );
}

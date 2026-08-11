
import { useRef, useState } from "react";

/* ============================================================
   Минимальный текстовый редактор: обычный textarea + две кнопки,
   которые проставляют/убирают markdown-разметку у текущей строки
   или выделенного блока строк. Никакого WYSIWYG и HTML — сайт
   рендерит текст как обычные строки, поэтому важно остаться
   на простом тексте без разметки, которую нужно было бы санитайзить.
   ============================================================ */

export default function MarkdownField({
  label,
  hint,
  value,
  onChange,
  rows = 18,
  preview,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  /** Отрендеренное превью текущего значения — переключается кнопкой «Превью». */
  preview?: React.ReactNode;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  /** Добавляет `prefix` каждой строке текущего выделения (или текущей строке,
   *  если ничего не выделено). Если разметка уже стоит везде — снимает её. */
  const toggleLinePrefix = (prefix: string, placeholder: string) => {
    const ta = ref.current;
    if (!ta) return;

    const { selectionStart: s, selectionEnd: e } = ta;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    const nextBreak = value.indexOf("\n", e);
    const lineEnd = nextBreak === -1 ? value.length : nextBreak;
    const segment = value.slice(lineStart, lineEnd);

    /* Пустая строка — подставляем плейсхолдер и сразу выделяем его,
       чтобы можно было напечатать текст поверх, не расставляя разметку руками. */
    if (!segment.trim()) {
      const insert = prefix + placeholder;
      onChange(value.slice(0, lineStart) + insert + value.slice(lineEnd));
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(lineStart + prefix.length, lineStart + insert.length);
      });
      return;
    }

    const lines = segment.split("\n");
    const nonEmpty = lines.filter((l) => l.trim());
    const allPrefixed = nonEmpty.every((l) => l.startsWith(prefix));

    const patched = lines
      .map((line) => {
        if (!line.length) return line;
        if (allPrefixed) return line.startsWith(prefix) ? line.slice(prefix.length) : line;
        return line.startsWith(prefix) ? line : prefix + line;
      })
      .join("\n");

    onChange(value.slice(0, lineStart) + patched + value.slice(lineEnd));
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(s, e + (patched.length - segment.length));
    });
  };

  return (
    <div className="admin-field is-wide">
      <div className="admin-md-head">
        <span className="admin-field-label">{label}</span>
        <div className="admin-md-toolbar">
          <button
            type="button"
            className="admin-btn is-small"
            onClick={() => toggleLinePrefix("## ", "Заголовок раздела")}
          >
            Заголовок
          </button>
          <button
            type="button"
            className="admin-btn is-small"
            onClick={() => toggleLinePrefix("- ", "Пункт списка")}
          >
            Список
          </button>
          {preview ? (
            <button
              type="button"
              className="admin-btn is-small"
              onClick={() => setShowPreview((v) => !v)}
            >
              {showPreview ? "Редактировать" : "Превью"}
            </button>
          ) : null}
        </div>
      </div>

      {hint ? <span className="admin-field-hint">{hint}</span> : null}

      {showPreview && preview ? (
        <div className="admin-md-preview">{preview}</div>
      ) : (
        <textarea
          ref={ref}
          className="admin-input admin-textarea admin-md-textarea"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

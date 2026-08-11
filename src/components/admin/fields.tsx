
import { useMemo, useState } from "react";

/* ============================================================
   Примитивы форм админки. Один визуальный стиль на все разделы:
   подпись сверху, контрол снизу, необязательная подсказка.
   Все — controlled: значение и onChange приходят снаружи.
   ============================================================ */

type Base = { label: string; hint?: string; wide?: boolean };

const Wrap = ({
  label,
  hint,
  wide,
  children,
}: Base & { children: React.ReactNode }) => (
  <label className={`admin-field${wide ? " is-wide" : ""}`}>
    <span className="admin-field-label">{label}</span>
    {children}
    {hint ? <span className="admin-field-hint">{hint}</span> : null}
  </label>
);

export function Field({
  value,
  onChange,
  placeholder,
  ...base
}: Base & {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Wrap {...base}>
      <input
        className="admin-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Wrap>
  );
}

/** Числовое поле. Пустая строка означает `null` — в данных это «не указано»,
 *  и оно отличается от нуля (0 ₽ — это бесплатно, null — условие неизвестно). */
export function NumField({
  value,
  onChange,
  ...base
}: Base & { value: number | null; onChange: (v: number | null) => void }) {
  return (
    <Wrap {...base}>
      <input
        className="admin-input"
        type="number"
        value={value ?? ""}
        placeholder="не указано"
        onChange={(e) =>
          onChange(e.target.value === "" ? null : Number(e.target.value))
        }
      />
    </Wrap>
  );
}

export function BoolField({
  value,
  onChange,
  label,
  hint,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="admin-field admin-field-bool">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        <span className="admin-field-label">{label}</span>
        {hint ? <span className="admin-field-hint">{hint}</span> : null}
      </span>
    </label>
  );
}

export function TextAreaField({
  value,
  onChange,
  rows = 4,
  placeholder,
  ...base
}: Base & {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <Wrap {...base}>
      <textarea
        className="admin-input admin-textarea"
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Wrap>
  );
}

export function SelectField<T extends string>({
  value,
  onChange,
  options,
  ...base
}: Base & {
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
}) {
  return (
    <Wrap {...base}>
      <select
        className="admin-input"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrap>
  );
}

const normalize = (s: string) => s.toLowerCase().replace(/ё/g, "е");

/** Порог, после которого без поиска в списке уже не сориентироваться. */
const SEARCHABLE_FROM = 20;

/** Список строк как чекбоксы — для полей `services`, `cats`, `cur`.
    В справочнике сервисов сотни позиций, поэтому длинные списки получают
    поиск и счётчик выбранного. */
export function CheckListField({
  value,
  onChange,
  options,
  ...base
}: Base & {
  value: string[];
  onChange: (v: string[]) => void;
  options: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const searchable = options.length >= SEARCHABLE_FROM;

  const shown = useMemo(() => {
    const q = normalize(query.trim());
    if (!searchable || !q) return options;
    return options.filter((o) => normalize(o).includes(q));
  }, [options, query, searchable]);

  const toggle = (o: string) =>
    onChange(
      value.includes(o) ? value.filter((v) => v !== o) : [...value, o],
    );

  return (
    <Wrap {...base} wide>
      {searchable ? (
        <div className="admin-checklist-bar">
          <input
            className="admin-input"
            type="search"
            value={query}
            placeholder="Поиск в списке"
            aria-label="Поиск в списке"
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="admin-checklist-count">
            выбрано {value.length} из {options.length}
          </span>
        </div>
      ) : null}

      <div className="admin-checklist">
        {shown.length ? (
          shown.map((o) => (
            <label key={o} className="admin-chip">
              <input
                type="checkbox"
                checked={value.includes(o)}
                onChange={() => toggle(o)}
              />
              <span>{o}</span>
            </label>
          ))
        ) : (
          <span className="admin-field-hint">Ничего не найдено</span>
        )}
      </div>
    </Wrap>
  );
}

/** Произвольный список строк: одна строка на элемент. Пустые строки отбрасываются. */
export function LinesField({
  value,
  onChange,
  rows = 4,
  ...base
}: Base & { value: string[]; onChange: (v: string[]) => void; rows?: number }) {
  return (
    <Wrap {...base} wide>
      <textarea
        className="admin-input admin-textarea"
        rows={rows}
        value={value.join("\n")}
        placeholder="По одному значению на строку"
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
      />
    </Wrap>
  );
}

/** Ряд полей в сетке — обёртка для форм в модалках. */
export const FieldGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="admin-field-grid">{children}</div>
);

/** Заголовок группы полей внутри длинной формы. */
export const FieldSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="admin-form-section">
    <h3>{title}</h3>
    <div className="admin-field-grid">{children}</div>
  </section>
);

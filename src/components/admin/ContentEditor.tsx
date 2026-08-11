
import { useRouter } from "@/lib/next-compat";
import { useState } from "react";
import Repeater from "./Repeater";
import { useToast } from "./Toast";
import {
  BoolField,
  Field,
  LinesField,
  NumField,
  TextAreaField,
} from "./fields";

/* ============================================================
   Редактор data/home.json и data/rating.json.

   Оба файла — это набор секций, каждая секция — массив плоских объектов
   с одинаковым набором полей. Поэтому вместо восемнадцати рукописных форм
   здесь один редактор: тип контрола выводится из типа значения, а подписи
   берутся из карты `labels`.
   ============================================================ */

type Row = Record<string, unknown>;
type Data = Record<string, Row[]>;

export type SectionMeta = {
  /** Ключ в JSON-файле. */
  key: string;
  title: string;
  hint?: string;
  /** Поле, чьё значение показывать заголовком элемента в списке. */
  titleField?: string;
  /** Поля, которым нужен textarea вместо однострочного input. */
  multiline?: string[];
};

/** Человеческие подписи для коротких ключей вроде `n`, `l`, `b`, `p`. */
const FIELD_LABELS: Record<string, string> = {
  a: "Ответ",
  ava: "Аватар",
  b: "Заголовок",
  cat: "Категория",
  count: "Счётчик",
  date: "Дата",
  desc: "Описание",
  f: "Ключ фильтра",
  fc: "Проверено фактчекером",
  go: "Текст ссылки",
  heroVariant: "Вариант картинки",
  href: "Ссылка",
  icon: "Иконка",
  l: "Подпись",
  label: "Подпись",
  lbl: "Подпись",
  list: "Перечисление",
  meta: "Подпись под именем",
  n: "Значение",
  name: "Имя",
  open: "Раскрыт по умолчанию",
  p: "Текст",
  pct: "Вес, %",
  pill: "Плашка",
  points: "Пункты",
  q: "Вопрос",
  rate: "Комиссия",
  role: "Роль",
  sub: "Подзаголовок",
  text: "Текст",
  time: "Срок",
  title: "Заголовок",
  variant: "Вариант",
  duration: "Длительность",
};

const labelFor = (key: string) => FIELD_LABELS[key] ?? key;

export default function ContentEditor({
  file,
  initial,
  sections,
}: {
  file: "home" | "rating";
  initial: Data;
  sections: SectionMeta[];
}) {
  const router = useRouter();
  const toast = useToast();

  const [data, setData] = useState<Data>(initial);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);

  const setSection = (key: string, rows: Row[]) => {
    setData((d) => ({ ...d, [key]: rows }));
    setDirty(true);
  };

  const save = async () => {
    setBusy(true);

    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file, data }),
    });

    setBusy(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      toast(body.error ?? "Не удалось сохранить", "err");
      return;
    }

    toast("Сохранено");
    setDirty(false);
    router.refresh();
  };

  /** Контрол под значение: тип берём из того, что уже лежит в JSON. */
  const renderField = (
    section: SectionMeta,
    row: Row,
    key: string,
    patch: (next: Partial<Row>) => void,
  ) => {
    const value = row[key];
    const label = labelFor(key);

    if (typeof value === "boolean") {
      return (
        <BoolField
          key={key}
          label={label}
          value={value}
          onChange={(v) => patch({ [key]: v })}
        />
      );
    }

    if (typeof value === "number") {
      return (
        <NumField
          key={key}
          label={label}
          value={value}
          onChange={(v) => patch({ [key]: v ?? 0 })}
        />
      );
    }

    if (Array.isArray(value)) {
      return (
        <LinesField
          key={key}
          label={label}
          hint="По одному значению на строку"
          value={value as string[]}
          onChange={(v) => patch({ [key]: v })}
        />
      );
    }

    const text = String(value ?? "");

    if (section.multiline?.includes(key)) {
      return (
        <TextAreaField
          key={key}
          label={label}
          wide
          rows={4}
          value={text}
          onChange={(v) => patch({ [key]: v })}
        />
      );
    }

    return (
      <Field
        key={key}
        label={label}
        value={text}
        onChange={(v) => patch({ [key]: v })}
      />
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <button
          className="admin-btn is-primary"
          type="button"
          disabled={busy || !dirty}
          onClick={save}
        >
          {busy ? "Сохраняю…" : "Сохранить всё"}
        </button>
        {dirty ? (
          <span className="admin-cell-sub">Есть несохранённые изменения</span>
        ) : null}
      </div>

      {sections.map((section) => {
        const rows = data[section.key] ?? [];
        /* Набор полей берём из первой строки — все элементы секции однотипны.
           Для пустой секции есть образец в `blank`. */
        const template = rows[0];

        return (
          <div className="admin-panel" key={section.key}>
            <h2>{section.title}</h2>
            {section.hint ? (
              <p className="admin-panel-sub">{section.hint}</p>
            ) : null}

            <Repeater<Row>
              label={`${rows.length} шт.`}
              addLabel="элемент"
              items={rows}
              onChange={(next) => setSection(section.key, next)}
              /* Новый элемент — копия структуры существующего с пустыми значениями. */
              create={() =>
                Object.fromEntries(
                  Object.entries(template ?? {}).map(([k, v]) => [
                    k,
                    typeof v === "boolean"
                      ? false
                      : typeof v === "number"
                        ? 0
                        : Array.isArray(v)
                          ? []
                          : "",
                  ]),
                )
              }
              itemTitle={(row, i) =>
                String(row[section.titleField ?? "title"] ?? "") ||
                `Элемент ${i + 1}`
              }
              renderItem={(row, patch) =>
                Object.keys(row).map((key) =>
                  renderField(section, row, key, patch),
                )
              }
            />
          </div>
        );
      })}
    </>
  );
}

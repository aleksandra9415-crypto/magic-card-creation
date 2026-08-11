
import { useMemo, useState } from "react";

/* ============================================================
   Таблица списка сущностей: поиск + сортировка по колонке.
   Пагинации нет намеренно — сущностей десятки, не тысячи.
   ============================================================ */

export type Column<T> = {
  key: string;
  title: string;
  /** Что показать в ячейке. */
  render: (row: T) => React.ReactNode;
  /** Значение для сортировки. Если не задано — колонка не сортируется. */
  sortBy?: (row: T) => string | number;
  width?: string;
};

export default function DataTable<T>({
  rows,
  columns,
  search,
  searchPlaceholder = "Поиск…",
  empty = "Пока пусто",
  rowKey,
}: {
  rows: T[];
  columns: Column<T>[];
  /** Строка, по которой фильтруем. Если не задана — поле поиска не показываем. */
  search?: (row: T) => string;
  searchPlaceholder?: string;
  empty?: string;
  rowKey: (row: T) => string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: string; desc: boolean } | null>(null);

  const visible = useMemo(() => {
    let out = rows;

    if (search && query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter((r) => search(r).toLowerCase().includes(q));
    }

    const col = sort && columns.find((c) => c.key === sort.key);
    if (col?.sortBy) {
      const by = col.sortBy;
      out = [...out].sort((a, b) => {
        const av = by(a);
        const bv = by(b);
        const cmp =
          typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv), "ru");
        return sort!.desc ? -cmp : cmp;
      });
    }

    return out;
  }, [rows, columns, query, sort, search]);

  const toggleSort = (key: string) =>
    setSort((prev) =>
      prev?.key === key ? { key, desc: !prev.desc } : { key, desc: false },
    );

  return (
    <div className="admin-table-wrap">
      {search ? (
        <div className="admin-table-toolbar">
          <input
            className="admin-input admin-search"
            value={query}
            placeholder={searchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="admin-table-count">
            {visible.length} из {rows.length}
          </span>
        </div>
      ) : null}

      <div className="admin-table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} style={c.width ? { width: c.width } : undefined}>
                  {c.sortBy ? (
                    <button
                      type="button"
                      className="admin-th-sort"
                      onClick={() => toggleSort(c.key)}
                    >
                      {c.title}
                      <span className="admin-th-arrow">
                        {sort?.key === c.key ? (sort.desc ? "↓" : "↑") : "↕"}
                      </span>
                    </button>
                  ) : (
                    c.title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td className="admin-table-empty" colSpan={columns.length}>
                  {empty}
                </td>
              </tr>
            ) : (
              visible.map((row) => (
                <tr key={rowKey(row)}>
                  {columns.map((c) => (
                    <td key={c.key}>{c.render(row)}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

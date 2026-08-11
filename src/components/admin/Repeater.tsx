
/* ============================================================
   Редактор списка однотипных объектов: тарифы карты, секции статьи,
   вопросы FAQ, шаги оформления. Умеет добавлять, удалять и менять порядок.
   Поля каждого элемента рисует вызывающая сторона через `renderItem`.
   ============================================================ */

export default function Repeater<T>({
  label,
  items,
  onChange,
  create,
  renderItem,
  itemTitle,
  addLabel = "Добавить",
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  /** Как выглядит новый пустой элемент. */
  create: () => T;
  renderItem: (item: T, patch: (next: Partial<T>) => void) => React.ReactNode;
  /** Заголовок карточки элемента (обычно первое осмысленное поле). */
  itemTitle?: (item: T, index: number) => string;
  addLabel?: string;
}) {
  const replace = (index: number, next: T) =>
    onChange(items.map((it, i) => (i === index ? next : it)));

  const move = (index: number, dir: -1 | 1) => {
    const to = index + dir;
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    [next[index], next[to]] = [next[to], next[index]];
    onChange(next);
  };

  return (
    <div className="admin-repeater">
      <div className="admin-repeater-head">
        <span className="admin-field-label">{label}</span>
        <button
          className="admin-btn is-small"
          type="button"
          onClick={() => onChange([...items, create()])}
        >
          + {addLabel}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="admin-repeater-empty">Нет элементов</p>
      ) : (
        <div className="admin-repeater-list">
          {items.map((item, i) => (
            <div className="admin-repeater-item" key={i}>
              <div className="admin-repeater-item-head">
                <span className="admin-repeater-item-title">
                  {itemTitle?.(item, i) || `Элемент ${i + 1}`}
                </span>
                <div className="admin-repeater-item-actions">
                  <button
                    type="button"
                    className="admin-icon-btn"
                    title="Выше"
                    disabled={i === 0}
                    onClick={() => move(i, -1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn"
                    title="Ниже"
                    disabled={i === items.length - 1}
                    onClick={() => move(i, 1)}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn is-danger"
                    title="Удалить"
                    onClick={() => onChange(items.filter((_, j) => j !== i))}
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="admin-field-grid">
                {renderItem(item, (next) =>
                  replace(i, { ...item, ...next } as T),
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

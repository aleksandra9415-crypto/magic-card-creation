
import Modal from "./Modal";

/* Подтверждение удаления. В референсе здесь стоял голый window.confirm —
   заменён нормальным диалогом, потому что удаление тут необратимо стирает файл. */

export default function Confirm({
  title = "Удалить запись?",
  text,
  confirmLabel = "Удалить",
  busy,
  onConfirm,
  onCancel,
}: {
  title?: string;
  text: string;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      footer={
        <>
          <button className="admin-btn" type="button" onClick={onCancel}>
            Отмена
          </button>
          <button
            className="admin-btn is-danger"
            type="button"
            disabled={busy}
            onClick={onConfirm}
          >
            {busy ? "Удаляю…" : confirmLabel}
          </button>
        </>
      }
    >
      <p className="admin-confirm-text">{text}</p>
    </Modal>
  );
}

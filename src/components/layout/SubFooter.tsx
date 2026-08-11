/** Футер внутренних страниц. Дисклеймер показывается на странице рейтинга. */
export default function SubFooter({ disclaimer }: { disclaimer?: string }) {
  return (
    <footer className="ftr">
      <div className="container">
        {disclaimer ? <div className="disclaimer">{disclaimer}</div> : null}
        <div className="ftr-row">
          <span>© 2026 NHcard · Мониторинг зарубежных виртуальных карт</span>
          <span>support@nhcard.ru · Telegram: @nhcard_support</span>
        </div>
      </div>
    </footer>
  );
}

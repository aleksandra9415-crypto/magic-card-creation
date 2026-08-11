import { EEAT_AUTHORS, EEAT_CHANGELOG } from "@/data/home";

export default function EeatStrip() {
  return (
    <section className="section" style={{ paddingTop: 32, paddingBottom: 0 }}>
      <div className="container">
        <div className="eeat">
          <div>
            <div className="eeat__col-title">Кто составляет рейтинги</div>
            {EEAT_AUTHORS.map((a) => (
              <div className="eeat-author" key={a.name}>
                <span
                  className={`eeat-author__ava${a.fc ? " eeat-author__ava--fc" : ""}`}
                >
                  {a.ava}
                </span>
                <div>
                  <span
                    className={`eeat-author__role${a.fc ? " eeat-author__role--fc" : ""}`}
                  >
                    {a.role}
                  </span>
                  <div className="eeat-author__name">{a.name}</div>
                  <div className="eeat-author__meta">{a.meta}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="changelog__title">
              <span className="dot" />
              Что обновилось 27 апреля
            </div>
            <ul className="changelog">
              {EEAT_CHANGELOG.map((c) => (
                <li key={c.date + c.text}>
                  <time>{c.date}</time>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

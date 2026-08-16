import { EEAT_AUTHORS, EEAT_CHANGELOG, TRANSPARENCY_STATS } from "@/data/home";
import { LucideShieldCheck } from "lucide-react";

export default function EeatStrip() {
  return (
    <section className="section" style={{ paddingTop: 32, paddingBottom: 0 }}>
      <div className="container">
        <div className="eeat-container">
          {/* Transparency Card */}
          <div className="transp-card">
            <h2 className="transp-card__title">Не верьте на слово — мы оплатили своими деньгами</h2>
            
            <div className="transp-card__grid">
              {TRANSPARENCY_STATS.map((s, idx) => (
                <div key={s.l} className="transp-card__stat-wrapper">
                  <div className="transp-card__stat">
                    <div className="transp-card__stat-n">{s.n}</div>
                    <div className="transp-card__stat-l">{s.l}</div>
                  </div>
                  {idx < TRANSPARENCY_STATS.length - 1 && (
                    <div className="transp-card__divider" />
                  )}
                </div>
              ))}
            </div>

            <p className="transp-card__bottom">
              Партнёрские ссылки помечены <code className="transp-card__code">rel="sponsored"</code>. 
              Партнёрство не влияет на место в рейтинге: формула считается одинаково для всех.
            </p>
          </div>

          {/* Experts Section */}
          <div className="eeat-experts">
            <div className="eeat-experts__header">
              <h3 className="eeat-experts__title">Кто составляет рейтинги</h3>
            </div>
            
            <div className="eeat-experts__grid">
              {EEAT_AUTHORS.map((a) => (
                <div className="expert-card" key={a.name}>
                  <div className="expert-card__img-wrapper">
                    <img 
                      src={a.name.includes("Никита") 
                        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=250&auto=format&fit=crop" 
                        : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=250&auto=format&fit=crop"} 
                      alt={a.name}
                      className="expert-card__img"
                    />
                  </div>
                  <div className="expert-card__content">
                    <div className={`expert-card__role ${a.fc ? 'expert-card__role--fc' : ''}`}>
                      {a.role}
                    </div>
                    <div className="expert-card__name">{a.name}</div>
                    <div className="expert-card__meta">{a.meta}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Changelog */}
            <div className="eeat-changelog">
              <div className="eeat-changelog__title">
                <span className="dot" />
                Что обновилось 27 апреля
              </div>
              <ul className="changelog-list">
                {EEAT_CHANGELOG.map((c) => (
                  <li key={c.date + c.text} className="changelog-item">
                    <time className="changelog-date">{c.date}</time>
                    <span className="changelog-text">{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

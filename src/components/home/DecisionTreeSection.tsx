import { useState } from "react";
import ApplyLink from "@/components/shared/ApplyLink";

export default function DecisionTreeSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="section" id="decision" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="dtree-wrapper">
          <div className="dtree-header">
            <div className="dtree-header__icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M12 3L14.5 9L21 12L14.5 15L12 21L9.5 15L3 12L9.5 9L12 3Z" fill="white" />
              </svg>
            </div>
            <div className="dtree-header__text">
              <h2 className="dtree-header__title">Подобрать карту за 10 секунд</h2>
              <p className="dtree-header__sub">Ответьте на 3 вопроса — подсветим подходящие строки в рейтинге</p>
            </div>
          </div>

          <div className="dtree-grid">
            <div className="dtree-col">
              <div className="dtree-col__title">1 · Что оплачиваете?</div>
              <div className="dtree-col__chips">
                <button className="dtree-chip">Подписки</button>
                <button className="dtree-chip">ИИ-сервисы</button>
                <button className="dtree-chip">Игры</button>
                <button className="dtree-chip">Реклама</button>
              </div>
            </div>
            
            <div className="dtree-col">
              <div className="dtree-col__title">2 · Какая валюта?</div>
              <div className="dtree-col__chips">
                <button className="dtree-chip">USD</button>
                <button className="dtree-chip">EUR</button>
                <button className="dtree-chip">Крипто</button>
              </div>
            </div>

            <div className="dtree-col">
              <div className="dtree-col__title">3 · Как пополняете?</div>
              <div className="dtree-col__chips">
                <button className="dtree-chip">СБП</button>
                <button className="dtree-chip">Карта РФ</button>
                <button className="dtree-chip">USDT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

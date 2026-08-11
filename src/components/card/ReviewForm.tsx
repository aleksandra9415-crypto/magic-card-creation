/** Форма отзыва — статичная вёрстка (без бэкенда), 1:1 к оригиналу */
export default function ReviewForm() {
  return (
    <section className="sec" id="review-form">
      <div className="rev-form">
        <h3>Оставить отзыв о карте</h3>
        <p className="ssub">
          Поделитесь опытом — что оплачивали, как прошёл выпуск и пополнение.
          Отзыв опубикуем после проверки.
        </p>
        <div className="ff-grid">
          <div>
            <label>Имя</label>
            <input type="text" placeholder="Как вас представить" />
          </div>
          <div>
            <label>Telegram</label>
            <input type="text" placeholder="@username" />
          </div>
          <div className="ff-full">
            <label>Что и где оплачивали</label>
            <input type="text" placeholder="Например, ChatGPT Plus" />
          </div>
          <div className="ff-full">
            <label>Текст отзыва</label>
            <textarea placeholder="Расскажите, насколько быстро прошёл выпуск, удобно ли пополнять и работала ли карта в нужных сервисах"></textarea>
          </div>
        </div>
        <button className="btn btn-primary">Отправить отзыв</button>
      </div>
    </section>
  );
}

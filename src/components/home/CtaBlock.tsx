export default function CtaBlock() {
  return (
    <section className="section" id="cta" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="cta-block">
          <div className="cta-block__inner">
            <h2>
              Подберём карту под ваш сервис
              <br />
              за 2 минуты
            </h2>
            <p>
              Скажите, что планируете оплачивать — OpenAI, Booking, рекламу,
              подписки — и мы покажем 2–3 карты, которые точно сработают.
              Бесплатно.
            </p>
            <div className="cta-block__actions">
              <a className="btn btn--orange btn--lg" href="#">
                Подобрать карту
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

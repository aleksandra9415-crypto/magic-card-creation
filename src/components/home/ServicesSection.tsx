import { CARDS_TOTAL } from "@/data/home";
import RatingForm from "@/components/rating/RatingForm";

/* Блок #services главной — сюда смонтирована форма-рейтинг.
   В референсе это <div id="rating-form-root">: заголовок и лид принадлежат
   странице, всё остальное живёт внутри виджета. */
export default function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">
            Лучшие иностранные виртуальные карты для россиян
          </h2>
        </div>
        {/* Размеры лида — в CSS (.services-lead): на мобильном отступ до
            панели фильтров меньше, чем на десктопе. */}
        <p className="section__sub services-lead">
          ТОП-{CARDS_TOTAL} сервисов
          <span className="hide-sm"> по выпуску виртуальных карт</span> для
          пользователей из России — для подписок и оплат в путешествиях.
          <span className="hide-sm">
            {" "}
            Выберите сервис или страну — откроем страницу с подходящими
            картами. Или спросите у подбора ниже, какая карта подойдёт именно
            вам.
          </span>
        </p>

        <RatingForm />
      </div>
    </section>
  );
}

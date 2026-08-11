import { CARDS_TOTAL } from "@/data/home";
import RatingForm from "@/components/rating/RatingForm";
import SectionWrapper from "@/components/shared/SectionWrapper";

/* Блок #services главной — сюда смонтирована форма-рейтинг.
   В референсе это <div id="rating-form-root">: заголовок и лид принадлежат
   странице, всё остальное живёт внутри виджета. */
export default function ServicesSection() {
  return (
    <SectionWrapper
      id="services"
      title="Лучшие иностранные виртуальные карты для россиян"
      description={
        <>
          ТОП-{CARDS_TOTAL} сервисов
          <span className="hide-sm"> по выпуску виртуальных карт</span> для
          пользователей из России — для подписок и оплат в путешествиях.
          <span className="hide-sm">
            {" "}
            Выберите сервис или страну — откроем страницу с подходящими
            картами. Или спросите у подбора ниже, какая карта подойдёт именно
            вам.
          </span>
        </>
      }
    >
      <RatingForm />
    </SectionWrapper>
  );
}

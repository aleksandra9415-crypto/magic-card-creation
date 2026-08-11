import { FAQ_ITEMS } from "@/data/home";
import SectionWrapper from "@/components/shared/SectionWrapper";

export function FaqItem({
  q,
  a,
  open,
}: {
  q: string;
  a: string;
  open?: boolean;
}) {
  return (
    <details className="faq__item" open={open}>
      <summary className="faq__sum">{q}</summary>
      <div className="faq__body">{a}</div>
    </details>
  );
}

export default function FaqSection() {
  return (
    <SectionWrapper
      id="faq"
      centered
      title="Отвечаем на ваши вопросы"
      description="Если не нашли ответ — напишите в наш Telegram, отвечаем в течение часа."
    >
      <div className="faq">
        {FAQ_ITEMS.map((item) => (
          <FaqItem key={item.q} {...item} />
        ))}
      </div>
    </SectionWrapper>
  );
}

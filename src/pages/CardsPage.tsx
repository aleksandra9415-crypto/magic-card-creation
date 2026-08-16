import { redirect } from "@/lib/next-compat";
import RatingForm from "@/components/rating/RatingForm";
import ChecklistSection from "@/components/rating/ChecklistSection";
import RatingFaqSection from "@/components/rating/RatingFaqSection";
import {
  CARDS,
  VERIFIED_LABEL,
  byRating,
  cardsPlural,
  getServiceBySlug,
  serviceSlug,
} from "@/data/cards";
import { RATING_FAQ } from "@/data/rating";

const verifiedLabel = VERIFIED_LABEL;

export const metadata = {
  title: "Рейтинг зарубежных виртуальных карт 2026 — сравнение тарифов · NHcard",
  description: `Таблица сравнения ${CARDS.length} сервисов виртуальных карт Visa и Mastercard: выпуск, пополнение, наценка на курс, KYC. ${verifiedLabel}.`,
  robots: "index, follow, max-snippet:-1, max-image-preview:large",
  alternates: { canonical: "https://nhcard.ru/cards/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "NHcard",
    title: "Рейтинг зарубежных виртуальных карт 2026",
    description:
      "Сравниваем не рекламные «0%», а полную стоимость года — с наценкой на курс.",
    url: "https://nhcard.ru/cards/",
  },
};

/* ===== Schema.org ===== */

const RANKED = [...CARDS].sort(byRating);

const SCHEMA_ITEMLIST = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Рейтинг зарубежных виртуальных карт 2026",
  numberOfItems: RANKED.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: RANKED.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    url: `https://nhcard.ru/cards/${c.slug}`,
  })),
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: RATING_FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://nhcard.ru/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Рейтинг карт",
      item: "https://nhcard.ru/cards/",
    },
  ],
};

const SCHEMAS = [SCHEMA_ITEMLIST, SCHEMA_FAQ, SCHEMA_BREADCRUMB];

type SearchValue = string | string[] | undefined;

const firstSearchParam = (value: SearchValue) =>
  Array.isArray(value) ? (value[0] ?? null) : (value ?? null);

export default function CardsPage({
  searchParams,
}: {
  searchParams?: {
    category?: SearchValue;
    service?: SearchValue;
    filter?: SearchValue;
  };
}) {
  const initialCategory = firstSearchParam(searchParams?.category);
  const initialService = firstSearchParam(searchParams?.service);
  const initialFilter = firstSearchParam(searchParams?.filter);

  /* Старые ссылки вида /cards?service=Netflix ведут на постоянный адрес
     /cards/netflix — у него свои заголовок, подзаголовок и метатеги. */
  const service = initialService ? getServiceBySlug(initialService) : null;
  if (service) {
    redirect(`/cards/${serviceSlug(service)}`);
  }

  return (
    <div className="page-rating page-rating--index">
      {SCHEMAS.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <main className="container">
        <section className="section hero" style={{ paddingBottom: '32px' }}>
          <div className="hero-line">
            <h1 className="section__title">Рейтинг зарубежных виртуальных карт</h1>
            <span className="live">
              <i></i> {verifiedLabel}
            </span>
          </div>
          <p className="section__sub">
            {CARDS.length} {cardsPlural(CARDS.length)} Visa и Mastercard для
            оплаты подписок, рекламы и покупок. Сравниваем не рекламные «0%», а{" "}
            <b>полную стоимость года</b> — с наценкой на курс. Кликните по
            заголовку колонки, чтобы отсортировать.
          </p>
        </section>

        <RatingForm />

        <ChecklistSection />
        <div style={{ marginTop: '-40px' }}>
          <RatingFaqSection />
        </div>
      </main>
    </div>
  );
}

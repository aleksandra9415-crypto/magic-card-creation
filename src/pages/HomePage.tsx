import { CARDS_TOTAL } from "@/data/home";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ServicesSection from "@/components/home/ServicesSection";
import CollectionsSection from "@/components/home/CollectionsSection";
import CountriesSection from "@/components/home/CountriesSection";
import BlogSection from "@/components/home/BlogSection";
import EeatStrip from "@/components/home/EeatStrip";
import TransparencyStrip from "@/components/home/TransparencyStrip";
import ContextSection from "@/components/home/ContextSection";
import DecisionTreeSection from "@/components/home/DecisionTreeSection";
import MethodologySection from "@/components/home/MethodologySection";
import CalculatorSection from "@/components/home/CalculatorSection";
import AiAssistantSection from "@/components/home/AiAssistantSection";
import PMethodsSection from "@/components/home/PMethodsSection";
import HowToSection from "@/components/home/HowToSection";
import CtaBlock from "@/components/home/CtaBlock";
import FaqSection from "@/components/home/FaqSection";
import GuardSection from "@/components/home/GuardSection";
import FeaturesSection from "@/components/home/FeaturesSection";

export const metadata = {
  title:
    "Зарубежные виртуальные карты 2026 — рейтинг, тарифы, как оформить · NHcard",
  description: `Сравнили ${CARDS_TOTAL} зарубежных виртуальных карт Visa и Mastercard. Тарифы, СБП-пополнение, оплата ChatGPT, Netflix, Steam, реклама Meta. Обновлено сегодня.`,
  keywords:
    "зарубежная виртуальная карта, иностранная карта для россиян, карта для оплаты chatgpt, mastercard казахстан, visa армения, рейтинг карт 2026, карта без kyc, карта с сбп, карта для рекламы meta",
  authors: [{ name: "Редакция NHcard" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large",
  alternates: {
    canonical: "https://nhcard.ru/",
    languages: { ru: "https://nhcard.ru/", "x-default": "https://nhcard.ru/" },
  },
  openGraph: {
    type: "article",
    locale: "ru_RU",
    siteName: "NHcard",
    title: `Зарубежные виртуальные карты 2026 — рейтинг ${CARDS_TOTAL} сервисов`,
    description:
      "Сравниваем выпуск, пополнение, комиссии и курс. Что работает в 2026.",
    url: "https://nhcard.ru/",
    publishedTime: "2026-01-15T09:00:00+03:00",
    modifiedTime: "2026-04-27T12:00:00+03:00",
    section: "Финансы",
  },
  twitter: {
    card: "summary_large_image",
    title: "Зарубежные виртуальные карты 2026 — NHcard",
    description: "Рейтинг карт для оплаты зарубежных сервисов и поездок.",
  },
};

/* ===== Schema.org (перенесены 1:1 из исходного index.html) ===== */

const SCHEMA_ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://nhcard.ru/#organization",
  name: "NHcard",
  url: "https://nhcard.ru/",
  logo: "https://nhcard.ru/logo.png",
  description:
    "Независимый мониторинг зарубежных виртуальных карт для россиян. Не выпускает карты — сравнивает и тестирует.",
  sameAs: ["https://t.me/nhcard", "https://youtube.com/@nhcard"],
};

const SCHEMA_WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://nhcard.ru/#website",
  url: "https://nhcard.ru/",
  name: "NHcard",
  publisher: { "@id": "https://nhcard.ru/#organization" },
  inLanguage: "ru-RU",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://nhcard.ru/search?q={query}",
    "query-input": "required name=query",
  },
};

const SCHEMA_ARTICLE = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Зарубежные виртуальные карты 2026: рейтинг ${CARDS_TOTAL} сервисов, тарифы и как оформить`,
  description: `Сравнили ${CARDS_TOTAL} зарубежных виртуальных карт. Тарифы, пополнение, комиссии, срок и KYC. Гайды по оплате в разных странах.`,
  image: "https://nhcard.ru/og.jpg",
  datePublished: "2026-01-15T09:00:00+03:00",
  dateModified: "2026-04-27T12:00:00+03:00",
  wordCount: 5200,
  author: [
    {
      "@type": "Person",
      name: "Никита Хохлов",
      jobTitle: "Главный редактор NHcard",
      url: "https://nhcard.ru/about/nikita",
      sameAs: ["https://t.me/nhcard_nikita"],
    },
    {
      "@type": "Person",
      name: "Хадиджа Алиева",
      jobTitle: "Финтех-аналитик NHcard",
    },
  ],
  reviewedBy: {
    "@type": "Person",
    name: "Хадиджа Алиева",
    jobTitle: "Финтех-аналитик, фактчек NHcard",
  },
  publisher: { "@id": "https://nhcard.ru/#organization" },
  mainEntityOfPage: "https://nhcard.ru/",
  articleSection: "Финансы",
  inLanguage: "ru-RU",
};

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://nhcard.ru/" },
    { "@type": "ListItem", position: 2, name: "Карты", item: "https://nhcard.ru/cards/" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Зарубежные виртуальные карты",
      item: "https://nhcard.ru/",
    },
  ],
};

const SCHEMA_HOWTO = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как оформить зарубежную виртуальную карту за 10 минут",
  description:
    "Пошаговая инструкция: от выбора сервиса под задачу до уведомления ФНС.",
  totalTime: "PT15M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "RUB", value: "0" },
  supply: [
    { "@type": "HowToSupply", name: "Паспорт РФ" },
    { "@type": "HowToSupply", name: "Селфи" },
    { "@type": "HowToSupply", name: "Доступ к СБП" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Выберите сервис под задачу",
      text: "Decision Tree подбирает 1-2 карты под ChatGPT, Netflix, Steam, путешествия или рекламные кабинеты.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Установите приложение",
      text: "Скачайте мобильное приложение или откройте Telegram-бот сервиса.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Пройдите верификацию",
      text: "Загрузите фото российского паспорта и селфи. Onfido/Sumsub проверяют документы за 1-30 минут.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Пополните через СБП",
      text: "Откройте «Пополнить» в приложении, отсканируйте QR в банке-отправителе, подтвердите.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Подключите Apple/Google Pay",
      text: "Добавьте карту в кошелёк по реквизитам или сканированием. Готово к оплате бесконтактно.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Уведомите ФНС об открытии счёта",
      text: "В Личном кабинете налогоплательщика подайте КНД 1120107 в течение 30 дней.",
    },
  ],
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Что такое виртуальная зарубежная карта и зачем она нужна в 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Карта Visa или Mastercard иностранного эмитента в цифровом виде. Карты российских банков не работают за рубежом, поэтому зарубежная виртуальная карта — основной способ оплачивать ChatGPT, Netflix, Steam, рекламу и подписки.",
      },
    },
    {
      "@type": "Question",
      name: "Как быстро выпускается виртуальная карта?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "У большинства сервисов мгновенно или за 10-15 минут после оплаты. Премиальные карты с IBAN — 1-3 рабочих дня.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли пополнить зарубежную карту через СБП?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, у большинства сервисов из рейтинга. Пополнение через СБП занимает 1-5 минут, комиссия 0-4%. Лимит СБП — 100 000 ₽/день.",
      },
    },
    {
      "@type": "Question",
      name: "Нужно ли уведомлять ФНС об открытии зарубежной карты?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. В течение 30 дней с момента открытия счёта подайте уведомление КНД 1120107 через Личный кабинет налогоплательщика. Раз в год до 1 июня — отчёт о движении средств. Штраф за непредставление — 4-5 тыс. ₽.",
      },
    },
    {
      "@type": "Question",
      name: "Какие документы нужны для оформления?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Минимум — российский паспорт и номер телефона. Для премиум-тарифов с лимитами от $10 000/мес — загранпаспорт и подтверждение источника средств.",
      },
    },
  ],
};

const SCHEMAS = [
  SCHEMA_ORGANIZATION,
  SCHEMA_WEBSITE,
  SCHEMA_ARTICLE,
  SCHEMA_BREADCRUMB,
  SCHEMA_HOWTO,
  SCHEMA_FAQ,
];

export default function HomePage() {
  return (
    <>
      {SCHEMAS.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      {/* Порядок секций — как в референсе landing (NHcard.html). На мобильном
          рейтинг поднимается сразу под hero (см. .home-main в home.css):
          в прототипе первый экран заканчивается формой-рейтингом. */}
      <main className="home-main">
        <Hero />
        <TrustStrip />
        <DecisionTreeSection />
        <ServicesSection />
        <CollectionsSection />
        <CountriesSection />
        <BlogSection />
        <EeatStrip />
        <TransparencyStrip />
        <ContextSection />
        <MethodologySection />
        <CalculatorSection />
        <PMethodsSection />
        <HowToSection />
        <AiAssistantSection />
        <FaqSection />
        <CtaBlock />
        <GuardSection />
        <FeaturesSection />
      </main>
    </>
  );
}

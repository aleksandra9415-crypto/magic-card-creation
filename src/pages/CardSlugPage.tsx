import { notFound } from "@/lib/next-compat";
import {
  CARDS,
  SERVICES,
  byRating,
  cardsPlural,
  getCardBySlug,
  getServiceBySlug,
  serviceSlug,
  type Card,
} from "@/data/cards";
import { COUNTRIES, getCountryBySlug, type Country } from "@/data/countries";
import { RATING_CARDS, COUNTRY_NAMES } from "@/data/rating-form";
import { getServiceGuide, type ServiceGuide } from "@/data/service-guides";
import {
  getCountryLanding,
  getServiceLanding,
  type LandingContent,
} from "@/data/landing";
import CardHero from "@/components/card/CardHero";
import TariffPlans from "@/components/card/TariffPlans";
import TariffTable from "@/components/card/TariffTable";
import IssueSteps from "@/components/card/IssueSteps";
import TopupInfo from "@/components/card/TopupInfo";
import TocSidebar, { type TocSection } from "@/components/card/TocSidebar";
import ScoreSidebar from "@/components/card/ScoreSidebar";
import FitSection from "@/components/card/FitSection";
import CriteriaScoring from "@/components/card/CriteriaScoring";
import TestLog from "@/components/card/TestLog";
import ServiceCoverage from "@/components/card/ServiceCoverage";
import CompareTable from "@/components/card/CompareTable";
import ReviewsSection from "@/components/card/ReviewsSection";
import ReviewForm from "@/components/card/ReviewForm";
import SafetyCards from "@/components/card/SafetyCards";
import EndCta from "@/components/card/EndCta";
import RelatedCards from "@/components/card/RelatedCards";
import RatingForm from "@/components/rating/RatingForm";
import Breadcrumbs from "@/components/landing/Breadcrumbs";
import LandingHero from "@/components/landing/LandingHero";
import PayMethods from "@/components/landing/PayMethods";
import EditorialStrip from "@/components/landing/EditorialStrip";
import TransparencyBlock from "@/components/landing/TransparencyBlock";
import RelatedSection from "@/components/landing/RelatedSection";
import TextBlock from "@/components/landing/TextBlock";
import MethodologyBlock from "@/components/landing/MethodologyBlock";
import LandingFaq from "@/components/landing/LandingFaq";
import type { NavFilter } from "@/components/rating/RatingForm";

type Props = { params: { slug: string } };

const SITE = "https://nhcard.ru";

export function generateStaticParams() {
  return [
    ...CARDS.map((c) => ({ slug: c.slug })),
    ...SERVICES.map((s) => ({ slug: serviceSlug(s) })),
    ...COUNTRIES.map((c) => ({ slug: c.slug })),
  ];
}

/* Карты страны собраны в data/rating-form: регион берётся из поля `list`
   гайда по стране, поэтому фильтр здесь и в виджете даёт одну выборку. */
const countryCards = (slug: string) =>
  RATING_CARDS.filter((c) => c.regions.includes(slug)).sort(
    (a, b) => a.rank - b.rank,
  );

/* Заголовки гайдов написаны в предложной форме — «Как платить в Турции».
   Забираем оттуда хвост «в Турции», чтобы H1 читался естественно. Если
   редактор переименует заголовок иначе, откатываемся на нейтральную форму.
   Границу слова \b здесь применять нельзя: для JS кириллица не \w. */
const countryWhere = (country: Country) => {
  const m = country.title.match(/(?:^|\s)(в|на)\s+(\S.*)$/i);
  return m ? `${m[1].toLowerCase()} ${m[2].trim()}` : null;
};

const countryLanding = (country: Country) => {
  const name = COUNTRY_NAMES[country.slug]?.name ?? country.heroTitle;
  const where = countryWhere(country) ?? `в ${name}`;
  return getCountryLanding(country.slug, name, where);
};

export function generateMetadata({ params }: Props) {
  const card = getCardBySlug(params.slug);
  if (card) {
    return {
      title: `${card.name} — обзор и тарифы · NHcard`,
      description: `${card.name}: обзор виртуальной карты для оплаты зарубежных сервисов. Выпуск, пополнение, комиссии, KYC.`,
    };
  }

  const service = getServiceBySlug(params.slug);
  if (service) {
    const landing = getServiceLanding(service);
    return {
      title: `${landing.h1} · NHcard`,
      description: landing.lead,
      robots: "index, follow, max-snippet:-1, max-image-preview:large",
      alternates: { canonical: `${SITE}/cards/${serviceSlug(service)}` },
    };
  }

  const country = getCountryBySlug(params.slug);
  if (country) {
    const landing = countryLanding(country);
    return {
      title: `${landing.h1} · NHcard`,
      description: landing.lead,
      robots: "index, follow, max-snippet:-1, max-image-preview:large",
      alternates: { canonical: `${SITE}/cards/${country.slug}` },
    };
  }

  return {};
}

export default function CardOrServicePage({ params }: Props) {
  const card = getCardBySlug(params.slug);
  if (card) return <CardReview card={card} />;

  const service = getServiceBySlug(params.slug);
  if (service) {
    const ranked = [...CARDS.filter((c) => c.services.includes(service))].sort(
      byRating,
    );
    return (
      <LandingPage
        landing={getServiceLanding(service)}
        href={`/cards/${serviceSlug(service)}`}
        cardsCount={ranked.length}
        rankedNames={ranked.map((c) => ({ name: c.name, slug: c.slug }))}
        guide={getServiceGuide(service) ?? null}
        navFilter={{ kind: "service", slug: service, label: service }}
      />
    );
  }

  const country = getCountryBySlug(params.slug);
  if (!country) notFound();

  const ranked = countryCards(country.slug);
  const landing = countryLanding(country);
  return (
    <LandingPage
      landing={landing}
      href={`/cards/${country.slug}`}
      cardsCount={ranked.length}
      rankedNames={ranked.map((c) => ({ name: c.name, slug: c.slug }))}
      guide={null}
      navFilter={{
        kind: "country",
        slug: country.slug,
        label: landing.subject,
      }}
    />
  );
}

/* ===== /cards/{slug карты} — обзор одного сервиса ===== */

function CardReview({ card }: { card: Card }) {
  const d = card.detail;

  const plans = d?.plans ?? [];
  const issueSteps = d?.issueSteps ?? [];
  const topupText = d?.topupText;
  const reviews = d?.reviews ?? [];
  const relatedSlugs = d?.relatedCards ?? [];

  /* TOC собирается из фактически показанных секций */
  const toc: TocSection[] = [{ id: "about", label: "О сервисе" }];
  if (d?.fit) toc.push({ id: "fit", label: "Кому подойдёт" });
  if (d?.criteria?.length) toc.push({ id: "scores", label: "Оценки" });
  if (d?.tariffTable?.length || plans.length) toc.push({ id: "tariffs", label: "Тарифы" });
  if (d?.testStats?.length || d?.testLog?.length) toc.push({ id: "test", label: "Наш тест" });
  if (d?.serviceGroups?.length) toc.push({ id: "services", label: "Что оплачивает" });
  if (issueSteps.length) toc.push({ id: "issue", label: "Как оформить" });
  if (topupText && !d?.tariffTable?.length) toc.push({ id: "topup", label: "Как пополнить" });
  if (d?.competitors?.length) toc.push({ id: "compare", label: "Сравнение" });
  if (reviews.length || d?.reviewsSummary) toc.push({ id: "reviews", label: "Отзывы" });
  if (d?.safety?.length) toc.push({ id: "safety", label: "Безопасность" });
  if (d?.faq?.length) toc.push({ id: "faq", label: "Вопросы" });

  const SCHEMA_BREADCRUMB = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Рейтинг карт", item: `${SITE}/cards/` },
      { "@type": "ListItem", position: 3, name: card.name, item: `${SITE}/cards/${card.slug}` },
    ],
  };

  const SCHEMA_FAQ = d?.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: d.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const SCHEMA_PRODUCT =
    card.score !== null
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: card.name,
          description: d?.tagline,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (d?.reviewsSummary?.avg ?? card.score).toFixed(1),
            reviewCount: d?.reviewsSummary?.total ?? card.reviews ?? 1,
            bestRating: "5",
          },
        }
      : null;

  const SCHEMAS = [SCHEMA_BREADCRUMB, SCHEMA_FAQ, SCHEMA_PRODUCT].filter(Boolean);

  return (
    <div className="page-review">
      {SCHEMAS.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <div className="container">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Главная" },
            { href: "/cards", label: "Рейтинг карт" },
            { label: "Обзоры сервисов" },
          ]}
          current={card.name}
        />

        <div className="layout">
          <div>
            <CardHero card={card} />

            {d?.fit ? <FitSection fit={d.fit} card={card} /> : null}
            {d?.criteria?.length ? (
              <CriteriaScoring
                criteria={d.criteria}
                score={card.score}
                sub={d.criteriaSub}
              />
            ) : null}

            {/* Подробная таблица заменяет карточки тарифов: держать оба разбора
                условий подряд — это одно и то же дважды. */}
            {d?.tariffTable?.length ? (
              <TariffTable rows={d.tariffTable} note={d.tariffNote} sub={d.tariffSub} />
            ) : plans.length ? (
              <TariffPlans
                plans={plans}
                cardSlug={card.slug}
                applyUrl={card.applyUrl}
                sub={d?.plansSub}
              />
            ) : null}

            {d?.testStats?.length || d?.testLog?.length ? (
              <TestLog stats={d.testStats} log={d.testLog} sub={d.testSub} />
            ) : null}

            {d?.serviceGroups?.length ? (
              <ServiceCoverage
                groups={d.serviceGroups}
                broken={d.brokenServices}
                sub={d.servicesSub}
              />
            ) : null}

            {issueSteps.length ? (
              <IssueSteps steps={issueSteps} sub={d?.issueSub} />
            ) : null}

            {/* Пополнение расписано строкой в таблице тарифов и шагом выше —
                отдельный блок нужен только карточкам без таблицы. */}
            {topupText && !d?.tariffTable?.length ? <TopupInfo text={topupText} /> : null}

            {d?.competitors?.length ? (
              <CompareTable
                card={card}
                competitors={d.competitors}
                note={d.compareNote}
                sub={d.compareSub}
              />
            ) : null}

            {reviews.length || d?.reviewsSummary ? (
              <ReviewsSection
                score={card.score ?? 0}
                reviews={reviews}
                sub={d?.reviewsSub}
                source={d?.reviewsSource}
                summary={d?.reviewsSummary}
              />
            ) : null}

            {reviews.length || d?.reviewsSummary ? <ReviewForm /> : null}

            {d?.safety?.length ? (
              <SafetyCards items={d.safety} sub={d.safetySub} />
            ) : null}

            {d?.faq?.length ? (
              <LandingFaq
                faq={d.faq}
                subjectIn={card.name}
                title={d.faqTitle}
                sub={d.faqSub}
              />
            ) : null}

            {d?.changelog?.length && d?.verifiedAt ? (
              <EditorialStrip
                editorial={{ updatedAt: d.verifiedAt, changelog: d.changelog }}
                authors={d.authors}
                authorsTitle="Кто писал обзор"
                changelogTitle="Что менялось в обзоре"
              />
            ) : null}

            {card.applyUrl ? <EndCta card={card} /> : null}

            {relatedSlugs.length ? <RelatedCards slugs={relatedSlugs} /> : null}
          </div>

          <div className="toc-col">
            <ScoreSidebar card={card} />
            <TocSidebar sections={toc} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Посадочная страница рейтинга =====

   Одна разметка на сервисы и страны: порядок блоков задан ТЗ «Посадочная
   страница Рейтинга» и от темы не зависит. Отличаются только содержимое
   (data/landing) и то, что для стран блок про отказы платёжной системы не
   рендерится вовсе. */

function LandingPage({
  landing,
  href,
  cardsCount,
  rankedNames,
  guide,
  navFilter,
}: {
  landing: LandingContent;
  href: string;
  cardsCount: number;
  rankedNames: { name: string; slug: string }[];
  guide: ServiceGuide | null;
  navFilter: NavFilter;
}) {
  const SCHEMA_ITEMLIST = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: landing.h1,
    numberOfItems: rankedNames.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: rankedNames.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${SITE}/cards/${c.slug}`,
    })),
  };

  const SCHEMA_BREADCRUMB = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Рейтинг карт", item: `${SITE}/cards/` },
      { "@type": "ListItem", position: 3, name: landing.subject, item: `${SITE}${href}` },
    ],
  };

  /* Блок «как оплатить» — инструкция, поэтому размечаем его HowTo: страница
     отвечает на запрос «как оплатить {тема}», а не только «какой картой». */
  const SCHEMA_HOWTO = guide
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: landing.h2,
        description: guide.lead,
        step: guide.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.text,
        })),
      }
    : null;

  const SCHEMA_FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const SCHEMAS = [
    SCHEMA_ITEMLIST,
    SCHEMA_BREADCRUMB,
    SCHEMA_HOWTO,
    SCHEMA_FAQ,
  ].filter(Boolean);

  const cardsLine = `${cardsCount} ${cardsPlural(cardsCount)} Visa и Mastercard`;

  return (
    <div className="page-rating lp">
      {SCHEMAS.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <main>
        <div className="lp-wrap">
          {/* Уровень «Рейтинг карт» подставляется только тем темам, которые не
              задали свою цепочку: у ChatGPT это «Карты для подписок → Нейросети». */}
          <Breadcrumbs
            trail={[
              { href: "/", label: "Главная" },
              ...(landing.breadcrumbExtra ?? [{ href: "/cards", label: "Рейтинг карт" }]),
            ]}
            current={landing.breadcrumbCurrent ?? landing.subject}
          />

          <LandingHero
            h1={landing.h1}
            h1Accent={landing.h1Accent}
            lead={landing.lead}
            cardsLine={cardsLine}
            updatedAt={landing.editorial.updatedAt}
            verdict={landing.verdict}
            stats={landing.heroStats}
          />
        </div>

        {/* Таблице нужен широкий контейнер .page-rating — текстовым блокам
            узкий .lp-wrap. Поэтому рейтинг стоит вне текстовой колонки. */}
        <div className="lp-wrap" id="rating">
          <div className="lp-sec__head">
            <h2>{landing.ratingTitle}</h2>
            <p className="lp-sec__sub">{landing.ratingIntro}</p>
          </div>
          <RatingForm initialNav={navFilter} />
        </div>

        <div className="lp-wrap">
          <PayMethods
            h2={landing.h2}
            intro={landing.intro}
            guide={guide}
            methods={landing.methods}
            methodNote={landing.methodNote}
            walkthrough={landing.walkthrough}
            mistakes={landing.mistakes}
          />

          <MethodologyBlock
            methodology={landing.methodology}
            subjectIn={landing.subjectIn}
            title={landing.methodologyTitle}
          />

          <EditorialStrip editorial={landing.editorial} authors={landing.authors} />
          <TransparencyBlock title={landing.transparency?.title} stats={landing.transparency?.stats} />

          <section className="lp-whatis" id="what-is-card">
            <div className="lp-sec__head">
              <h2>
                {landing.whatIs.title.includes("простыми словами") ? (
                  <>
                    {landing.whatIs.title.split("простыми словами")[0]}
                    <span className="text-accent-orange">простыми словами</span>
                    {landing.whatIs.title.split("простыми словами")[1]}
                  </>
                ) : (
                  landing.whatIs.title
                )}
              </h2>
              {landing.whatIs.lead ? <p className="lp-sec__sub">{landing.whatIs.lead}</p> : null}
            </div>
            <TextBlock prose={landing.whatIs} as="h2" />
          </section>

          <LandingFaq faq={landing.faq} subjectIn={landing.subjectIn} />

          <RelatedSection related={landing.related} />

        </div>
      </main>
    </div>
  );
}

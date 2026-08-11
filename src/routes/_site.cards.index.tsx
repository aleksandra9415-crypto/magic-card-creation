import { createFileRoute, redirect } from "@tanstack/react-router";
import CardsPage, { metadata } from "@/pages/CardsPage";
import { metaFrom } from "@/lib/head-meta";
import { getServiceBySlug, serviceSlug } from "@/data/cards";

type CardsSearch = { category?: string; service?: string; filter?: string };

export const Route = createFileRoute("/_site/cards/")({
  validateSearch: (search: Record<string, unknown>): CardsSearch => ({
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    service: typeof search["service"] === "string" ? search["service"] : undefined,
    filter: typeof search["filter"] === "string" ? search["filter"] : undefined,
  }),
  beforeLoad: ({ search }) => {
    /* Старые ссылки вида /cards?service=Netflix ведут на постоянный адрес. */
    const service = search.service ? getServiceBySlug(search.service) : null;
    if (service) throw redirect({ to: `/cards/${serviceSlug(service)}` as never });
  },
  head: () => metaFrom(metadata),
  component: CardsRoute,
});

function CardsRoute() {
  const search = Route.useSearch();
  return <CardsPage searchParams={search} />;
}

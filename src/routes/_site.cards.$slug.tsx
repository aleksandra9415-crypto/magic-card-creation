import { createFileRoute } from "@tanstack/react-router";
import CardSlugPage, { generateMetadata } from "@/pages/CardSlugPage";
import { metaFrom } from "@/lib/head-meta";

export const Route = createFileRoute("/_site/cards/$slug")({
  head: ({ params }) => metaFrom(generateMetadata({ params })),
  component: CardSlugRoute,
});

function CardSlugRoute() {
  const params = Route.useParams();
  return <CardSlugPage params={params} />;
}

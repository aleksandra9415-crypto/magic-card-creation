import { createFileRoute } from "@tanstack/react-router";
import CountrySlugPage, { generateMetadata } from "@/pages/CountrySlugPage";
import { metaFrom } from "@/lib/head-meta";

export const Route = createFileRoute("/_site/countries/$slug")({
  head: ({ params }) => metaFrom(generateMetadata({ params })),
  component: CountrySlugRoute,
});

function CountrySlugRoute() {
  const params = Route.useParams();
  return <CountrySlugPage params={params} />;
}

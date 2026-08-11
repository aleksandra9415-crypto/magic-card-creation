import { createFileRoute } from "@tanstack/react-router";
import BlogSlugPage, { generateMetadata } from "@/pages/BlogSlugPage";
import { metaFrom } from "@/lib/head-meta";

export const Route = createFileRoute("/_site/blog/$slug")({
  head: ({ params }) => metaFrom(generateMetadata({ params })),
  component: BlogSlugRoute,
});

function BlogSlugRoute() {
  const params = Route.useParams();
  return <BlogSlugPage params={params} />;
}

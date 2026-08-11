import { createFileRoute } from "@tanstack/react-router";
import HomePage, { metadata } from "@/pages/HomePage";
import { metaFrom } from "@/lib/head-meta";

export const Route = createFileRoute("/_site/")({
  head: () => metaFrom(metadata),
  component: HomePage,
});

import { createFileRoute } from "@tanstack/react-router";
import CountriesPage, { metadata } from "@/pages/CountriesPage";
import { metaFrom } from "@/lib/head-meta";

export const Route = createFileRoute("/_site/countries/")({
  head: () => metaFrom(metadata),
  component: CountriesPage,
});

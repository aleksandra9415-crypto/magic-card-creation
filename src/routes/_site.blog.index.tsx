import { createFileRoute } from "@tanstack/react-router";
import BlogPage, { metadata } from "@/pages/BlogPage";
import { metaFrom } from "@/lib/head-meta";

export const Route = createFileRoute("/_site/blog/")({
  head: () => metaFrom(metadata),
  component: BlogPage,
});

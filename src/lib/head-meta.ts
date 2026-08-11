/** Преобразование Next-подобного объекта metadata в head() TanStack Router. */
type NextishMetadata = {
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
  alternates?: { canonical?: string };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    siteName?: string;
    locale?: string;
  };
  twitter?: { card?: string; title?: string; description?: string };
};

export function metaFrom(metadata: NextishMetadata) {
  const meta: Array<Record<string, string>> = [];
  const links: Array<Record<string, string>> = [];

  if (metadata.title) meta.push({ title: metadata.title });
  if (metadata.description)
    meta.push({ name: "description", content: metadata.description });
  if (metadata.keywords) meta.push({ name: "keywords", content: metadata.keywords });
  if (metadata.robots) meta.push({ name: "robots", content: metadata.robots });

  const og = metadata.openGraph ?? {};
  meta.push({ property: "og:title", content: og.title ?? metadata.title ?? "NHcard" });
  meta.push({
    property: "og:description",
    content: og.description ?? metadata.description ?? "",
  });
  meta.push({ property: "og:type", content: og.type ?? "website" });
  meta.push({ property: "og:locale", content: og.locale ?? "ru_RU" });
  meta.push({ property: "og:site_name", content: og.siteName ?? "NHcard" });
  if (og.url) meta.push({ property: "og:url", content: og.url });

  const tw = metadata.twitter ?? {};
  meta.push({ name: "twitter:card", content: tw.card ?? "summary_large_image" });
  meta.push({
    name: "twitter:title",
    content: tw.title ?? og.title ?? metadata.title ?? "NHcard",
  });
  meta.push({
    name: "twitter:description",
    content: tw.description ?? og.description ?? metadata.description ?? "",
  });

  if (metadata.alternates?.canonical)
    links.push({ rel: "canonical", href: metadata.alternates.canonical });

  return { meta, links };
}

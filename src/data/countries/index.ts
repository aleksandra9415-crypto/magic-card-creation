
export type CountryId = string;

export type CountrySection = {
  title: string;
  text: string;
};

export type CountryFaqItem = {
  q: string;
  a: string;
};

export type CountryQuickFact = {
  label: string;
  value: string;
};

export type Country = {
  id: CountryId;
  slug: string;
  published: boolean;
  rank: number;
  gradient: string;
  flag: string;
  cat: string;
  title: string;
  list: string;
  count: string;
  pill: string;
  quickFacts: CountryQuickFact[];
  cardNote: string;
  href: string;
  heroTitle: string;
  summary: string;
  sections: CountrySection[];
  tips: string[];
  faq: CountryFaqItem[];
};

type CountryJson = Omit<Country, "href">;

const modules = import.meta.glob("./*.json", { eager: true }) as Record<
  string,
  { default: CountryJson }
>;

const readFiles = (): CountryJson[] =>
  Object.values(modules).map((m) => m.default);

export const COUNTRIES: Country[] = readFiles()
  .filter((country) => country.published)
  .sort((a, b) => a.rank - b.rank)
  .map((country) => ({
    ...country,
    href: `/countries/${country.slug}`,
  }));

export const getCountryBySlug = (slug: string) =>
  COUNTRIES.find((country) => country.slug === slug);

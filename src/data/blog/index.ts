
export type BlogHeroVariant = "chatgpt" | "turkey" | "subscriptions";

export type BlogSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  published: boolean;
  rank: number;
  heroVariant: BlogHeroVariant;
  gradient: string;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  intro: string;
  sourceUrl?: string;
  sections: BlogSection[];
  href: string;
};

type BlogPostJson = Omit<BlogPost, "href">;

const modules = import.meta.glob("./*.json", { eager: true }) as Record<
  string,
  { default: BlogPostJson }
>;

const readFiles = (): BlogPostJson[] =>
  Object.values(modules).map((m) => m.default);

export const BLOG_POSTS: BlogPost[] = readFiles()
  .filter((post) => post.published)
  .sort((a, b) => a.rank - b.rank)
  .map((post) => ({
    ...post,
    href: `/blog/${post.slug}`,
  }));

export const getBlogPostBySlug = (slug: string) =>
  BLOG_POSTS.find((post) => post.slug === slug);

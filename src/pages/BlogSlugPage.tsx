import Link from "@/components/shared/Link";
import { notFound } from "@/lib/next-compat";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} · NHcard`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="blog-page">
      <article>
        <header className="blog-post-hero" style={{ ["--blog-gradient" as string]: post.gradient }}>
          <div className="container blog-post-hero__inner">
            <div className="blog-kicker">{post.tag}</div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <div className="blog-post-meta">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <section className="blog-post-section">
          <div className="container blog-post-layout">
            <div className="blog-post-content">
              <p className="blog-lead">{post.intro}</p>

              {post.sections.map((section) => (
                <section className="blog-post-block" key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items?.length ? (
                    <ul>
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : null}
                </section>
              ))}

              {post.sourceUrl ? (
                <a
                  className="btn btn--ghost btn--lg"
                  style={{ marginTop: 32 }}
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Читать оригинал на Klerk
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : null}
            </div>

            <aside className="blog-post-side">
              <div className="blog-post-side__box">
                <span>Навигация</span>
                <Link href="/blog">Все статьи</Link>
                <Link href="/cards">Рейтинг карт</Link>
                <Link href="/countries">Страны</Link>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}

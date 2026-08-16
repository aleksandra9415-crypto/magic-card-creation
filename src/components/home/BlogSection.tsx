import type { ReactNode } from "react";
import { BLOG_POSTS, type BlogPost } from "@/data/blog";
import CollectionCard from "./CollectionCard";
import { ArrowRight16 } from "@/components/shared/icons";

const slice = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
} as const;

/* Изображения статей */
const POST_IMAGES: Record<BlogPost["heroVariant"], string> = {
  chatgpt: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=60&w=800", // AI/Neural
  turkey: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=60&w=800", // Turkey/Travel
  subscriptions: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=60&w=800", // Payments/Digital
};

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <CollectionCard
      className="article"
      data={{
        cat: "",
        title: post.title,
        list: post.excerpt,
        count: "Читать",
        href: post.href,
      }}
      hero={
        <div className="coll__hero">
          <div
            className="coll__img"
            style={{
              backgroundImage: `url(${POST_IMAGES[post.heroVariant]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              inset: 0
            }}
          />
          <div className="coll__overlay" style={{ opacity: 0.3 }} />
        </div>
      }
      meta={
        <div className="article__meta">
          <span className="article__tag">{post.tag}</span>
          <span className="article__date">
            {post.date} · {post.readTime}
          </span>
        </div>
      }
    />
  );
}

export default function BlogSection() {
  return (
    <section className="section blog-section" id="blog" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section__head section__head--row">
          <div>
            <h2 className="section__title">Последние статьи блога</h2>
            <p className="section__sub">
              Разборы, гайды и{"\u00a0"}новости рынка карт для{"\u00a0"}оплаты
              сервисов и{"\u00a0"}путешествий.
            </p>
          </div>
          <a className="btn btn--ghost blog-all" href="/blog">
            Все статьи
            <ArrowRight16 />
          </a>
        </div>

        <div className="collections-grid blog-grid">
          {BLOG_POSTS.map((p) => (
            <BlogPostCard key={p.title} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

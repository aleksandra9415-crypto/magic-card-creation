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

/* Иллюстрации статей — 1:1 из исходной вёрстки */
const POST_ART: Record<BlogPost["heroVariant"], ReactNode> = {
  chatgpt: (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={slice} aria-hidden="true">
      <circle cx="120" cy="110" r="70" fill="#2660FF" opacity=".25" />
      <circle cx="260" cy="130" r="55" fill="#FF7A1A" opacity=".35" />
      <rect x="170" y="60" width="120" height="80" rx="14" fill="#fff" opacity=".6" />
      <rect x="184" y="80" width="58" height="6" rx="3" fill="#0B1530" opacity=".5" />
      <rect x="184" y="94" width="92" height="6" rx="3" fill="#0B1530" opacity=".3" />
      <rect x="184" y="108" width="74" height="6" rx="3" fill="#0B1530" opacity=".3" />
    </svg>
  ),
  turkey: (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={slice} aria-hidden="true">
      <path
        d="M0 170 Q 80 110 160 140 T 320 120 L 400 100 L 400 225 L 0 225 Z"
        fill="#FF7A1A"
        opacity=".3"
      />
      <circle cx="320" cy="60" r="30" fill="#fff" opacity=".7" />
      <path
        d="M30 180 L60 150 L90 170 L130 130 L170 155 L200 125 L240 145"
        stroke="#0B1530"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity=".55"
      />
    </svg>
  ),
  subscriptions: (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={slice} aria-hidden="true">
      <rect x="40" y="60" width="150" height="95" rx="14" fill="#fff" opacity=".1" />
      <rect x="60" y="80" width="110" height="10" rx="5" fill="#fff" opacity=".7" />
      <rect x="60" y="100" width="70" height="8" rx="4" fill="#FF7A1A" />
      <rect x="60" y="118" width="90" height="8" rx="4" fill="#fff" opacity=".4" />
      <rect x="210" y="70" width="150" height="120" rx="14" fill="#fff" opacity=".18" />
      <circle cx="285" cy="115" r="32" fill="#FF7A1A" opacity=".7" />
      <path
        d="M268 115 L283 130 L308 100"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
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
        <div className="coll__hero" style={{ background: post.gradient }}>
          {POST_ART[post.heroVariant]}
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

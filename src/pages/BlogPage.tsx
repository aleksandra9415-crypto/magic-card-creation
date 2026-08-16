import { BLOG_POSTS } from "@/data/blog";

export const metadata = {
  title: "Блог NHcard — гайды по оплате и виртуальным картам",
  description:
    "Разборы, инструкции и новости про зарубежные виртуальные карты, подписки, путешествия и оплату сервисов.",
};

export default function BlogPage() {
  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <div className="blog-kicker">Блог</div>
          <h1>Гайды по оплате сервисов и путешествий</h1>
          <p>
            Моковая витрина статей. Тексты лежат в JSON, поэтому карточки и
            страницы можно обновлять без изменения компонентов.
          </p>
        </div>
      </section>

      <section className="blog-section-page">
        <div className="container">
          <div className="blog-list">
            {BLOG_POSTS.map((post) => (
              <a className="blog-card" href={post.href} key={post.id}>
                <div className="blog-card__media" style={{ background: post.gradient }}>
                  <span>{post.tag}</span>
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    {post.date} · {post.readTime}
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <b>Читать</b>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

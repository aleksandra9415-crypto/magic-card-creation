import Link from "@/components/shared/Link";
import { notFound } from "@/lib/next-compat";
import { COUNTRIES, getCountryBySlug } from "@/data/countries";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return COUNTRIES.map((country) => ({ slug: country.slug }));
}

export function generateMetadata({ params }: Props) {
  const country = getCountryBySlug(params.slug);
  if (!country) return {};

  return {
    title: `${country.title} — карты, валюта и пополнение · NHcard`,
    description: country.summary,
  };
}

export default function CountryPage({ params }: Props) {
  const country = getCountryBySlug(params.slug);
  if (!country) notFound();

  return (
    <main className="country-page">
      <section className="country-hero" style={{ ["--country-gradient" as string]: country.gradient }}>
        <div className="container country-hero__inner">
          <div>
            <div className="country-kicker">{country.cat}</div>
            <h1>{country.heroTitle}</h1>
            <p>{country.summary}</p>
            <div className="country-actions">
              <Link className="btn btn--primary" href="/cards">
                Смотреть рейтинг карт
              </Link>
              <Link className="btn btn--ghost" href="/countries">
                Все страны
              </Link>
            </div>
          </div>
          <div className="country-hero__card">
            <div className="country-hero__flag">{country.flag}</div>
            <b>{country.title}</b>
            <span>{country.list}</span>
            <em>{country.pill}</em>
          </div>
        </div>
      </section>

      <section className="country-section">
        <div className="container country-layout">
          <article className="country-content">
            {country.sections.map((section) => (
              <section className="country-info" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}

            <section className="country-info">
              <h2>На что обратить внимание</h2>
              <div className="country-tips">
                {country.tips.map((tip) => (
                  <div className="country-tip" key={tip}>
                    <span>✓</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="country-info">
              <h2>Вопросы</h2>
              <div className="country-faq">
                {country.faq.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="country-side">
            <div className="country-side__box">
              <span>Быстрый переход</span>
              <Link href="/cards">Рейтинг карт</Link>
              <Link href="/#countries">Другие страны</Link>
              <Link href="/#faq">FAQ</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

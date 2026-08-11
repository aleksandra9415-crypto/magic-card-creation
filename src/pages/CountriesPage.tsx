import { COUNTRIES } from "@/data/countries";

export const metadata = {
  title: "Как платить в разных странах — гайды NHcard",
  description:
    "Гайды по оплате картами за рубежом: страны, валюты, способы пополнения, комиссии и практические советы.",
};

export default function CountriesPage() {
  return (
    <main className="country-page country-page--index">
      <section className="country-hero country-hero--index">
        <div className="container">
          <div className="country-kicker">Гайды по странам</div>
          <h1>Как платить картой за рубежом</h1>
          <p>
            Собираем практические сценарии оплаты: какие карты подходят,
            какие валюты использовать, как пополнять и где чаще возникают
            комиссии.
          </p>
        </div>
      </section>

      <section className="country-section">
        <div className="container">
          <div className="country-grid">
            {COUNTRIES.map((country) => (
              <a className="country-card" href={country.href} key={country.id}>
                <div className="country-card__hero" style={{ background: country.gradient }}>
                  <span>{country.flag}</span>
                </div>
                <div className="country-card__body">
                  <div className="country-card__cat">{country.cat}</div>
                  <h2>{country.title}</h2>
                  <p>{country.list}</p>
                  <dl className="country-card__facts">
                    {country.quickFacts.map((fact) => (
                      <div key={fact.label}>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="country-card__note">{country.cardNote}</div>
                  <div className="country-card__foot">
                    <span>{country.count}</span>
                    <b>{country.pill}</b>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

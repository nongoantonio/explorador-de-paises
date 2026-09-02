import { motion } from "framer-motion";
import type { Country } from "../types/country";

interface CountryCardProps {
  country: Country;
}

// Formata números grandes com separadores (ex: 32 866 268), usando a
// convenção portuguesa (pt-PT), para ficar mais fácil de ler a população.
const numberFormatter = new Intl.NumberFormat("pt-PT");

// Pequenas funções auxiliares para "traduzir" dados brutos da API
// em texto pronto a mostrar. Mantê-las fora do componente evita que
// sejam recriadas a cada render.
function getCapital(country: Country): string {
  return country.capital && country.capital.length > 0
    ? country.capital.join(", ")
    : "Sem capital registada";
}

function getCurrencies(country: Country): string {
  if (!country.currencies) return "—";
  return Object.values(country.currencies)
    .map((currency) => `${currency.name}${currency.symbol ? ` (${currency.symbol})` : ""}`)
    .join(", ");
}

// Variantes do framer-motion: descrevem os estados "escondido" e "visível"
// do cartão. Quem decide QUANDO cada cartão anima é o componente-pai
// (CountryGrid), através do "staggerChildren" — por isso aqui só
// definimos O QUE acontece visualmente.
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <motion.article
      className="country-card"
      variants={cardVariants}
      whileHover={{ y: -6, rotate: -0.6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div className="country-card__flag-wrap">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Bandeira de ${country.name.common}`}
          className="country-card__flag"
          loading="lazy"
        />
        {/* O "selo" no canto é puramente decorativo (map-legend / passport vibe) */}
        <span className="country-card__stamp" aria-hidden="true">
          {country.region}
        </span>
      </div>

      <div className="country-card__body">
        <h3>{country.name.common}</h3>
        <p className="country-card__official">{country.name.official}</p>

        <dl className="country-card__facts">
          <div>
            <dt>capital</dt>
            <dd>{getCapital(country)}</dd>
          </div>
          <div>
            <dt>população</dt>
            <dd>{numberFormatter.format(country.population)}</dd>
          </div>
          <div>
            <dt>moeda</dt>
            <dd>{getCurrencies(country)}</dd>
          </div>
        </dl>
      </div>
    </motion.article>
  );
}

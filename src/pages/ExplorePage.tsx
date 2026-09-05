import { motion, AnimatePresence } from "framer-motion";
import { useCountriesContext } from "../context/CountriesContext";
import { useCountryFilter } from "../hooks/useCountryFilter";
import { SearchBar } from "../components/SearchBar";
import { ContinentGrid } from "../components/ContinentGrid";
import { CountryListItem } from "../components/CountryListItem";
import { CountrySpotlight } from "../components/CountrySpotlight";
import { Loader } from "../components/Loader";
import { StateMessage } from "../components/StateMessage";
import { GlobeIllustration } from "../components/GlobeIllustration";
import { MountainBanner } from "../components/MountainBanner";

// Variantes do framer-motion para a lista de resultados: o contentor
// avisa cada filho com um pequeno atraso ("staggerChildren"), criando
// o efeito de cascata quando os resultados aparecem/mudam.
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export function ExplorePage() {
  const { countries, status, errorMessage, retry } = useCountriesContext();
  const { searchTerm, activeRegion, filteredCountries, handleSearch, handleRegionFilter, reset } =
    useCountryFilter(countries);

  // Quando há um termo de pesquisa ativo, destacamos o primeiro resultado
  // num cartão maior, com a paisagem do país — os restantes (se houver
  // mais do que um) continuam como lista simples por baixo.
  const isSearching = searchTerm.trim().length > 0;
  const spotlightCountry = isSearching ? filteredCountries[0] : undefined;
  const remainingCountries = isSearching ? filteredCountries.slice(1) : filteredCountries;

  return (
    <div className="explore-page">
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Camadas puramente decorativas: textura de pontos (evoca um
            gráticulo de mapa) + um brilho radial dourado a partir do
            globo, para o resto do hero deixar de parecer "cor plana
            + texto" e passar a sentir-se como uma cena única. */}
        <div className="hero__texture" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />

        <div className="hero__brand">
          <span className="hero__brand-icon" aria-hidden="true">
            🌍
          </span>
          <span className="hero__brand-text">
            ATLAS<br />
            <small>interativo</small>
          </span>
        </div>

        <div className="hero__intro">
          <span className="hero__rule" aria-hidden="true" />
          <h1>
            Explora o mundo,
            <br />
            um país de cada vez
          </h1>
          <p>
            Dados de capitais, população e moeda de {countries.length || "…"} países.
          </p>
        </div>

        <motion.div
          className="hero__globe"
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 0.95, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <GlobeIllustration />
        </motion.div>
      </motion.header>

      <div className="explore-page__controls">
        <SearchBar value={searchTerm} onSearch={handleSearch} />

        <div className="explore-page__filter-heading">Explorar por continente</div>
        <ContinentGrid activeRegion={activeRegion} onSelectRegion={handleRegionFilter} />
      </div>

      <main className="explore-page__results">
        {status === "loading" && <Loader />}

        {status === "error" && (
          <StateMessage
            title="Não foi possível carregar os países"
            description={errorMessage ?? "Tenta novamente."}
            actionLabel="Tentar novamente"
            onAction={retry}
          />
        )}

        {status === "success" && filteredCountries.length === 0 && (
          <StateMessage
            title="Nenhum país por aqui"
            description="Experimenta ajustar a pesquisa ou escolher outro continente."
            actionLabel="Limpar filtros"
            onAction={reset}
          />
        )}

        {status === "success" && filteredCountries.length > 0 && (
          <div className="explore-page__result-stack">
            <AnimatePresence mode="popLayout">
              {spotlightCountry && (
                <CountrySpotlight key={spotlightCountry.cca3} country={spotlightCountry} />
              )}
            </AnimatePresence>

            {remainingCountries.length > 0 && (
              <motion.ul
                className="country-list"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                // A key muda a cada nova pesquisa/filtro, o que faz o
                // framer-motion repetir a animação em cascata sempre
                // que os resultados mudam.
                key={remainingCountries.map((c) => c.cca3).join("-")}
              >
                {remainingCountries.map((country) => (
                  <motion.li key={country.cca3} variants={itemVariants}>
                    <CountryListItem country={country} />
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
        )}
      </main>

      {!isSearching && <MountainBanner />}
    </div>
  );
}

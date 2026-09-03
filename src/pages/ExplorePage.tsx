import { useCountriesContext } from "../context/CountriesContext";
import { useCountryFilter } from "../hooks/useCountryFilter";
import { SearchBar } from "../components/SearchBar";
import { ContinentGrid } from "../components/ContinentGrid";
import { CountryListItem } from "../components/CountryListItem";
import { Loader } from "../components/Loader";
import { StateMessage } from "../components/StateMessage";
import { GlobeIllustration } from "../components/GlobeIllustration";
import { MountainBanner } from "../components/MountainBanner";

export function ExplorePage() {
  const { countries, status, errorMessage, retry } = useCountriesContext();
  const { searchTerm, activeRegion, filteredCountries, handleSearch, handleRegionFilter, reset } =
    useCountryFilter(countries);

  return (
    <div className="explore-page">
      <header className="hero">
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
          <h1>
            Explora o mundo,
            <br />
            um país de cada vez
          </h1>
          <p>
            Dados de capitais, população e moeda de {countries.length || "…"} países.
          </p>
        </div>

        <div className="hero__globe">
          <GlobeIllustration />
        </div>
      </header>

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
          <ul className="country-list">
            {filteredCountries.map((country) => (
              <li key={country.cca3}>
                <CountryListItem country={country} />
              </li>
            ))}
          </ul>
        )}
      </main>

      <MountainBanner />
    </div>
  );
}

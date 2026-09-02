// App.tsx é o "maestro" da aplicação: não sabe COMO os dados são
// buscados (isso está no hook), nem COMO cada cartão é desenhado
// (isso está nos componentes). Só decide O QUE mostrar, consoante
// o estado atual (a carregar / com erro / com resultados / vazio).
import { useCountries } from "./hooks/useCountries";
import { Hero } from "./components/Hero";
import { CountryGrid } from "./components/CountryGrid";
import { Loader } from "./components/Loader";
import { StateMessage } from "./components/StateMessage";
import "./App.css";

function App() {
  const {
    countries,
    status,
    errorMessage,
    activeRegion,
    resultsCount,
    handleSearch,
    handleRegionFilter,
  } = useCountries();

  return (
    <div className="app">
      <Hero
        resultsCount={resultsCount}
        activeRegion={activeRegion}
        onSearch={handleSearch}
        onSelectRegion={handleRegionFilter}
      />

      <main className="app__content">
        {status === "loading" && <Loader />}

        {status === "error" && (
          <StateMessage
            title="Não encontrámos esse destino"
            description={errorMessage ?? "Tenta pesquisar outro nome de país."}
            onRetry={() => handleRegionFilter(null)}
          />
        )}

        {status === "success" && countries.length === 0 && (
          <StateMessage
            title="Nenhum país por aqui"
            description="Experimenta ajustar a pesquisa ou escolher outro continente."
            onRetry={() => handleRegionFilter(null)}
          />
        )}

        {status === "success" && countries.length > 0 && (
          <CountryGrid countries={countries} />
        )}
      </main>

      <footer className="app__footer">
        <p>
          Dados fornecidos por{" "}
          <a href="https://restcountries.com" target="_blank" rel="noreferrer">
            REST Countries API
          </a>{" "}
          · projeto de estudo em React + TypeScript
        </p>
      </footer>
    </div>
  );
}

export default App;

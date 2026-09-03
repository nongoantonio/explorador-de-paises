import { Link } from "react-router-dom";
import { useCountriesContext } from "../context/CountriesContext";
import { useFavorites } from "../context/FavoritesContext";
import { CountryListItem } from "../components/CountryListItem";
import { StateMessage } from "../components/StateMessage";
import { Loader } from "../components/Loader";

export function FavoritesPage() {
  const { countries, status } = useCountriesContext();
  const { favoriteCodes } = useFavorites();

  const favoriteCountries = countries.filter((country) =>
    favoriteCodes.includes(country.cca3)
  );

  return (
    <div className="simple-page">
      <header className="simple-page__header">
        <h1>Favoritos</h1>
        <p>Os países que guardaste para consultar mais tarde.</p>
      </header>

      {status === "loading" && <Loader />}

      {status === "success" && favoriteCountries.length === 0 && (
        <StateMessage
          title="Ainda sem favoritos"
          description="Abre um país e toca no coração para o guardares aqui."
        />
      )}

      {status === "success" && favoriteCountries.length > 0 && (
        <ul className="country-list">
          {favoriteCountries.map((country) => (
            <li key={country.cca3}>
              <CountryListItem country={country} />
            </li>
          ))}
        </ul>
      )}

      {status === "success" && (
        <p className="simple-page__footnote">
          <Link to="/">← Voltar a explorar países</Link>
        </p>
      )}
    </div>
  );
}

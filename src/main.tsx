import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { CountriesProvider } from "./context/CountriesContext";
import { FavoritesProvider } from "./context/FavoritesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Usamos HashRouter (URLs com "#", ex.: .../#/pais/AGO) em vez de
        BrowserRouter porque o GitHub Pages é hospedagem só de
        ficheiros estáticos, sem servidor a redirecionar rotas. Com
        BrowserRouter, recarregar a página numa rota como "/pais/AGO"
        dava erro 404, porque o GitHub Pages tentava mesmo encontrar
        um ficheiro/pasta chamado "pais/AGO". Com HashRouter, tudo o
        que vem depois do "#" é só interpretado pelo React no browser
        — o servidor nunca sequer o vê, por isso nunca há 404. */}
    <HashRouter>
      {/* A ordem dos providers aqui não importa muito neste caso, porque
          FavoritesProvider não depende de CountriesProvider — mas em
          geral, o provider "mais geral" costuma ficar por fora. */}
      <CountriesProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CountriesProvider>
    </HashRouter>
  </StrictMode>
);

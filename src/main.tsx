import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { CountriesProvider } from "./context/CountriesContext";
import { FavoritesProvider } from "./context/FavoritesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* A ordem dos providers aqui não importa muito neste caso, porque
          FavoritesProvider não depende de CountriesProvider — mas em
          geral, o provider "mais geral" costuma ficar por fora. */}
      <CountriesProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CountriesProvider>
    </BrowserRouter>
  </StrictMode>
);

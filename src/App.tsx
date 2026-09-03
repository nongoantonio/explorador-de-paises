// App.tsx já não faz fetch nem gere estado diretamente — isso passou
// todo para os Contexts. Aqui só definimos QUAIS páginas existem e
// PARA QUE URL cada uma responde, através do react-router-dom.
import { Routes, Route } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { ExplorePage } from "./pages/ExplorePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { AboutPage } from "./pages/AboutPage";
import { CountryDetailPage } from "./pages/CountryDetailPage";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <div className="app-shell__screen">
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/pais/:code" element={<CountryDetailPage />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;

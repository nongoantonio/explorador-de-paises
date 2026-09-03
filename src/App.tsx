// App.tsx já não faz fetch nem gere estado diretamente — isso passou
// todo para os Contexts. Aqui só definimos QUAIS páginas existem e
// PARA QUE URL cada uma responde, através do react-router-dom.
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BottomNav } from "./components/BottomNav";
import { ExplorePage } from "./pages/ExplorePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { AboutPage } from "./pages/AboutPage";
import { CountryDetailPage } from "./pages/CountryDetailPage";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <div className="app-shell__screen">
        {/* AnimatePresence + a "key" a mudar com o caminho da URL: cada
            vez que navegamos para uma página diferente, o conteúdo
            antigo desvanece e o novo entra com um pequeno deslize —
            em vez de trocar instantaneamente, o que fazia a app
            parecer "estática". */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<ExplorePage />} />
              <Route path="/favoritos" element={<FavoritesPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/pais/:code" element={<CountryDetailPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;

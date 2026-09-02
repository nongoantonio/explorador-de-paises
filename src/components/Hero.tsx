import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";
import { RegionFilter } from "./RegionFilter";
import type { Region } from "../hooks/useCountries";

interface HeroProps {
  resultsCount: number;
  activeRegion: Region | null;
  onSearch: (term: string) => void;
  onSelectRegion: (region: Region | null) => void;
}

export function Hero({ resultsCount, activeRegion, onSearch, onSelectRegion }: HeroProps) {
  return (
    <header className="hero">
      {/* Este é o único "momento" de animação não provocado pelo utilizador
          em toda a aplicação: a entrada do título ao abrir a página.
          Deliberadamente não repetimos isto em mais lado nenhum. */}
      <motion.div
        className="hero__intro"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="hero__kicker">atlas interativo</p>
        <h1>
          Explora o mundo,
          <br />
          um país de cada vez
        </h1>
        <p className="hero__subtitle">
          Dados de capitais, população e moeda de {resultsCount} países,
          direto da REST Countries API.
        </p>
      </motion.div>

      <SearchBar onSearch={onSearch} />
      <RegionFilter activeRegion={activeRegion} onSelectRegion={onSelectRegion} />
    </header>
  );
}

import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onSearch: (term: string) => void;
}

// Pesquisa 100% dinâmica: cada tecla que o utilizador escreve chama
// onSearch imediatamente (sem precisar de submeter nada). Como a
// filtragem acontece em memória sobre uma lista pequena (195 países),
// não há custo nenhum em recalcular a cada letra — o resultado sente-se
// instantâneo.
export function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <div className="search-bar">
      <label htmlFor="country-search" className="search-bar__label">
        Procurar um país pelo nome
      </label>
      <div className="search-bar__field">
        <Search size={18} strokeWidth={2} aria-hidden="true" />
        <input
          id="country-search"
          type="text"
          value={value}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="ex.: Angola, Alemanha, Japão..."
          autoComplete="off"
          inputMode="search"
        />
        {/* Botão de limpar só aparece quando há texto escrito — evita
            ocupar espaço desnecessário quando a pesquisa está vazia. */}
        <AnimatePresence>
          {value && (
            <motion.button
              type="button"
              className="search-bar__clear"
              onClick={() => onSearch("")}
              aria-label="Limpar pesquisa"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <X size={16} strokeWidth={2.4} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

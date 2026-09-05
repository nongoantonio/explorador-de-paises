import { useRef, type FormEvent } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onSearch: (term: string) => void;
}

// A pesquisa continua 100% dinâmica: cada tecla que o utilizador
// escreve chama onSearch de imediato, através do onChange do input —
// o botão "Pesquisar" não é necessário para a filtragem acontecer,
// mas dá a confirmação visual/tátil que as pessoas esperam de uma
// barra de pesquisa, e no telemóvel fecha o teclado ao ser tocado.
export function SearchBar({ value, onSearch }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    inputRef.current?.blur();
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="country-search" className="search-bar__label">
        Procurar um país pelo nome
      </label>
      <div className="search-bar__field">
        <Search size={18} strokeWidth={2} className="search-bar__icon" aria-hidden="true" />
        <input
          ref={inputRef}
          id="country-search"
          type="text"
          value={value}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Pesquisar..."
          autoComplete="off"
          inputMode="search"
        />
        {/* Botão de limpar só aparece quando há texto escrito */}
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

        <motion.button
          type="submit"
          className="search-bar__submit"
          aria-label="Pesquisar"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <Search size={18} strokeWidth={2.4} aria-hidden="true" />
        </motion.button>
      </div>
    </form>
  );
}

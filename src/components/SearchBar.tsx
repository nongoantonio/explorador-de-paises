import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

interface SearchBarProps {
  value: string;
  onSearch: (term: string) => void;
}

// Componente controlado: mantemos um valor "local" (draft) enquanto o
// utilizador escreve, e só avisamos o componente-pai quando ele
// submete o formulário. Isto evita filtrar a lista a cada letra digitada.
export function SearchBar({ value, onSearch }: SearchBarProps) {
  const [draft, setDraft] = useState(value);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(draft.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="country-search" className="search-bar__label">
        Procurar um país pelo nome
      </label>
      <div className="search-bar__field">
        <Search size={18} strokeWidth={2} aria-hidden="true" />
        <input
          id="country-search"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="ex.: Angola, Brasil, Japão..."
          autoComplete="off"
        />
        <button type="submit">Pesquisar</button>
      </div>
    </form>
  );
}

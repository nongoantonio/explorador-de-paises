// Componente controlado: o valor do input vive no estado do React ("value"),
// e não diretamente no DOM. É o padrão recomendado em formulários React.
import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  // Ao submeter o formulário (Enter ou clique no botão), evitamos o
  // comportamento padrão do browser (recarregar a página) e chamamos
  // a função que veio do componente pai via props.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="country-search" className="search-bar__label">
        Procurar um país pelo nome
      </label>
      <div className="search-bar__field">
        <input
          id="country-search"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="ex.: Angola, Brasil, Japão..."
          autoComplete="off"
        />
        <button type="submit">Pesquisar</button>
      </div>
    </form>
  );
}

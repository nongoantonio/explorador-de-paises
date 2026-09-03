// Ao contrário da versão anterior (que fazia um novo pedido à API a
// cada pesquisa), agora já temos TODOS os países em memória (via
// CountriesContext), por isso filtrar é só uma operação local sobre
// um array — instantâneo, sem loading, sem poder falhar por causa da rede.
import { useMemo, useState } from "react";
import type { Country, Region } from "../types/country";
import { normalizeSearchText } from "../lib/normalizeSearchText";

export function useCountryFilter(countries: Country[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);

  function handleSearch(term: string) {
    setSearchTerm(term);
  }

  function handleRegionFilter(region: Region | null) {
    setActiveRegion(region);
  }

  function reset() {
    setSearchTerm("");
    setActiveRegion(null);
  }

  const filteredCountries = useMemo(() => {
    const term = normalizeSearchText(searchTerm);

    return countries
      .filter((country) => (activeRegion ? country.region === activeRegion : true))
      .filter((country) => {
        if (!term) return true;
        // Comparamos o termo pesquisado com o nome comum em inglês, o
        // nome oficial e o nome em português — assim "Alemanha" e
        // "Germany" encontram o mesmo país.
        const candidates = [
          country.name.common,
          country.name.official,
          country.name.pt,
        ];
        return candidates.some((candidate) =>
          normalizeSearchText(candidate).includes(term)
        );
      })
      .sort((a, b) => a.name.pt.localeCompare(b.name.pt, "pt"));
  }, [countries, searchTerm, activeRegion]);

  return {
    searchTerm,
    activeRegion,
    filteredCountries,
    handleSearch,
    handleRegionFilter,
    reset,
  };
}

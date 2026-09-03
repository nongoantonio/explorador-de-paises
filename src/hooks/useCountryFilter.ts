// Ao contrário da versão anterior (que fazia um novo pedido à API a
// cada pesquisa), agora já temos TODOS os países em memória (via
// CountriesContext), por isso filtrar é só uma operação local sobre
// um array — instantâneo, sem loading, sem poder falhar por causa da rede.
import { useMemo, useState } from "react";
import type { Country, Region } from "../types/country";

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
    const term = searchTerm.trim().toLowerCase();

    return countries
      .filter((country) => (activeRegion ? country.region === activeRegion : true))
      .filter((country) =>
        term ? country.name.common.toLowerCase().includes(term) : true
      )
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
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

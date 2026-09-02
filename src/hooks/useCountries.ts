// Um "custom hook" é apenas uma função que começa por "use" e que agrupa
// lógica reutilizável de estado (useState) e efeitos (useEffect).
// Vantagem: o componente App.tsx fica limpo, só a tratar da parte visual,
// enquanto TODA a lógica de "ir buscar dados à API" vive aqui.
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Country, RequestStatus } from "../types/country";
import {
  fetchAllCountries,
  fetchCountriesByRegion,
  searchCountriesByName,
} from "../services/countriesApi";

// Lista de continentes que a REST Countries API reconhece.
// Definimos isto aqui porque é usado tanto pelo hook como pelos filtros da UI.
export const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"] as const;
export type Region = (typeof REGIONS)[number];

export function useCountries() {
  // Lista de países atualmente visível no ecrã (resultado da última pesquisa/filtro).
  const [countries, setCountries] = useState<Country[]>([]);
  // Estado do pedido: "idle" | "loading" | "success" | "error".
  const [status, setStatus] = useState<RequestStatus>("idle");
  // Mensagem de erro amigável para mostrar ao utilizador, se algo correr mal.
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Texto atualmente escrito na barra de pesquisa.
  const [searchTerm, setSearchTerm] = useState("");
  // Região selecionada nos filtros (null = "todas as regiões").
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);

  // Função genérica que executa qualquer pedido à API e trata
  // automaticamente os estados de loading/erro/sucesso.
  // Usamos "useCallback" para que esta função não seja recriada
  // a cada render, o que ajuda a evitar efeitos desnecessários.
  const runRequest = useCallback(async (request: () => Promise<Country[]>) => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const data = await request();
      // Ordenamos sempre por nome, para a grelha ficar previsível e fácil de ler.
      const sorted = [...data].sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(sorted);
      setStatus("success");
    } catch (error) {
      // "error" chega como "unknown" em TypeScript — por isso verificamos o tipo
      // antes de tentar ler ".message", para o código ficar seguro.
      const message =
        error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
      setErrorMessage(message);
      setCountries([]);
      setStatus("error");
    }
  }, []);

  // Ao carregar a aplicação pela primeira vez, vamos buscar todos os países.
  // O array de dependências vazio "[]" garante que isto só corre UMA vez.
  useEffect(() => {
    runRequest(fetchAllCountries);
  }, [runRequest]);

  // Pesquisa por nome, chamada quando o utilizador submete o formulário de busca.
  const handleSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      setSearchTerm(trimmed);
      setActiveRegion(null); // uma nova pesquisa por nome limpa o filtro de região

      if (trimmed === "") {
        runRequest(fetchAllCountries);
        return;
      }
      runRequest(() => searchCountriesByName(trimmed));
    },
    [runRequest]
  );

  // Filtro por região, chamado ao clicar num dos "pills" de continente.
  const handleRegionFilter = useCallback(
    (region: Region | null) => {
      setSearchTerm("");
      setActiveRegion(region);

      if (region === null) {
        runRequest(fetchAllCountries);
        return;
      }
      runRequest(() => fetchCountriesByRegion(region));
    },
    [runRequest]
  );

  // "useMemo" evita recalcular isto em cada render — só recalcula
  // quando o array "countries" realmente muda.
  const resultsCount = useMemo(() => countries.length, [countries]);

  // O hook devolve tudo o que o componente App precisa: dados + ações.
  return {
    countries,
    status,
    errorMessage,
    searchTerm,
    activeRegion,
    resultsCount,
    handleSearch,
    handleRegionFilter,
  };
}

// Um "Context" em React serve para partilhar dados entre vários
// componentes sem termos de os passar manualmente por cada nível de
// props (a isso chama-se "prop drilling", e torna-se difícil de manter).
//
// Aqui, o CountriesProvider busca a lista COMPLETA de países UMA ÚNICA
// vez quando a aplicação abre. A partir daí, qualquer página consegue:
// - a página Explorar filtra por nome/continente;
// - a página de Detalhe procura um país pelo código (cca3);
// - a página Favoritos cruza a lista com os códigos guardados.
// Nenhuma destas páginas volta a pedir os dados — um único pedido para
// toda a aplicação.
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Country, RequestStatus } from "../types/country";
import { fetchAllCountries } from "../lib/countriesRepository";

interface CountriesContextValue {
  countries: Country[];
  status: RequestStatus;
  errorMessage: string | null;
  getByCode: (code: string) => Country | undefined;
  retry: () => void;
}

const CountriesContext = createContext<CountriesContextValue | null>(null);

export function CountriesProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Mudar "reloadKey" força o useEffect a correr outra vez — é o nosso
  // botão de "tentar novamente" depois de um erro.
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      setErrorMessage(null);
      try {
        const data = await fetchAllCountries();
        if (cancelled) return;
        setCountries(data);
        setStatus("success");
      } catch (error) {
        if (cancelled) return;
        const message =
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os países.";
        setErrorMessage(message);
        setStatus("error");
      }
    }

    load();

    // Função de limpeza: evita atualizar o estado se o componente já
    // não existir quando o pedido terminar (ex: navegação rápida).
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  function getByCode(code: string) {
    const target = code.toLowerCase();
    return countries.find(
      (country) =>
        country.cca3.toLowerCase() === target ||
        country.cca2.toLowerCase() === target
    );
  }

  const value = useMemo<CountriesContextValue>(
    () => ({
      countries,
      status,
      errorMessage,
      getByCode,
      retry: () => setReloadKey((key) => key + 1),
    }),
    [countries, status, errorMessage]
  );

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  );
}

// Hook de conveniência: evita repetir "useContext(CountriesContext)" +
// a verificação de null em cada componente que precisa dos países.
export function useCountriesContext() {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error(
      "useCountriesContext tem de ser usado dentro de um <CountriesProvider>"
    );
  }
  return context;
}

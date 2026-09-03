// Guarda a lista de países favoritos do utilizador. Usamos o
// localStorage do browser para os dados sobreviverem a um refresh da
// página — não há "conta" nem servidor, é tudo guardado no dispositivo.
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "explorador-de-paises:favoritos";

interface FavoritesContextValue {
  favoriteCodes: string[];
  isFavorite: (cca3: string) => boolean;
  toggleFavorite: (cca3: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

// Lê o localStorage uma única vez, na primeira renderização — evita
// mostrar "sem favoritos" por uma fração de segundo antes dos dados
// guardados aparecerem.
function readInitialFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Se o localStorage estiver corrompido ou indisponível (ex: modo
    // privado em alguns browsers), simplesmente começamos sem favoritos
    // em vez de rebentar a aplicação.
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteCodes, setFavoriteCodes] = useState<string[]>(readInitialFavorites);

  // Sempre que a lista de favoritos muda, gravamos no localStorage.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteCodes));
  }, [favoriteCodes]);

  function toggleFavorite(cca3: string) {
    setFavoriteCodes((current) =>
      current.includes(cca3)
        ? current.filter((code) => code !== cca3)
        : [...current, cca3]
    );
  }

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteCodes,
      isFavorite: (cca3: string) => favoriteCodes.includes(cca3),
      toggleFavorite,
    }),
    [favoriteCodes]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites tem de ser usado dentro de um <FavoritesProvider>");
  }
  return context;
}

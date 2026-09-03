import { useEffect, useState } from "react";
import { fetchCountryLandscapeImage } from "../lib/wikipedia";

// Hook pequeno e focado: dado um nome de país, devolve o URL da
// imagem (ou null enquanto carrega / se não houver imagem disponível).
export function useCountryImage(countryName: string | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!countryName) {
      setImageUrl(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    fetchCountryLandscapeImage(countryName).then((url) => {
      if (cancelled) return;
      setImageUrl(url);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [countryName]);

  return { imageUrl, isLoading };
}

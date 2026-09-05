import { useEffect, useState } from "react";
import { fetchCountryLandscapeImage } from "../lib/wikipedia";

// Hook pequeno e focado: dado um nome de país, devolve o URL da
// imagem de paisagem e a respetiva legenda (quando existe), ou null
// enquanto carrega / se não houver imagem disponível.
export function useCountryImage(countryName: string | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!countryName) {
      setImageUrl(null);
      setCaption(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    fetchCountryLandscapeImage(countryName).then((result) => {
      if (cancelled) return;
      setImageUrl(result?.url ?? null);
      setCaption(result?.caption ?? null);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [countryName]);

  return { imageUrl, caption, isLoading };
}

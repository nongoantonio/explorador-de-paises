import { useEffect, useState } from "react";
import { fetchCountryLandscapeImage } from "../lib/wikipedia";

// Hook pequeno e focado: dado o nome de um país (e, se existir, a sua
// capital), devolve o URL da imagem e a respetiva legenda, ou null
// enquanto carrega / se não houver imagem disponível.
export function useCountryImage(countryName: string | null, capitalName?: string) {
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

    fetchCountryLandscapeImage(countryName, capitalName).then((result) => {
      if (cancelled) return;
      setImageUrl(result?.url ?? null);
      setCaption(result?.caption ?? null);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [countryName, capitalName]);

  return { imageUrl, caption, isLoading };
}

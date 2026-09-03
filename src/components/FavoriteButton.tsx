import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

interface FavoriteButtonProps {
  cca3: string;
  countryName: string;
}

export function FavoriteButton({ cca3, countryName }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(cca3);

  return (
    <button
      type="button"
      className={"favorite-button" + (active ? " is-active" : "")}
      onClick={() => toggleFavorite(cca3)}
      aria-pressed={active}
      aria-label={
        active ? `Remover ${countryName} dos favoritos` : `Adicionar ${countryName} aos favoritos`
      }
    >
      <Heart size={20} strokeWidth={2} fill={active ? "currentColor" : "none"} />
    </button>
  );
}

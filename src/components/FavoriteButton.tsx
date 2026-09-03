import { motion, AnimatePresence } from "framer-motion";
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
    <motion.button
      type="button"
      className={"favorite-button" + (active ? " is-active" : "")}
      onClick={() => toggleFavorite(cca3)}
      whileTap={{ scale: 0.85 }}
      aria-pressed={active}
      aria-label={
        active ? `Remover ${countryName} dos favoritos` : `Adicionar ${countryName} aos favoritos`
      }
    >
      {/* AnimatePresence com "mode=wait" faz o coração passar por uma
          pequena animação de "pulso" sempre que o estado muda entre
          preenchido/vazio, em vez de trocar instantaneamente. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={active ? "filled" : "empty"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ display: "flex" }}
        >
          <Heart size={20} strokeWidth={2} fill={active ? "currentColor" : "none"} />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

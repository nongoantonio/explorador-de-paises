// Quando a pesquisa aponta claramente para UM país, mostramos este
// cartão maior em vez de uma linha simples da lista: bandeira + nome
// no topo, e a paisagem real do país (via Wikipedia) por baixo — é
// a pré-visualização antes de o utilizador tocar para abrir a página
// de detalhe completa.
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ImageOff } from "lucide-react";
import type { Country } from "../types/country";
import { getFlagUrl } from "../lib/flags";
import { useCountryImage } from "../hooks/useCountryImage";

interface CountrySpotlightProps {
  country: Country;
}

export function CountrySpotlight({ country }: CountrySpotlightProps) {
  const capital = country.capital[0] ?? "Sem capital registada";
  const { imageUrl, caption, isLoading } = useCountryImage(
    country.name.common,
    country.capital[0]
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Link to={`/pais/${country.cca3}`} className="spotlight-card">
        <div className="spotlight-card__top">
          <img
            src={getFlagUrl(country.cca2)}
            alt={`Bandeira de ${country.name.pt}`}
            className="spotlight-card__flag"
          />
          <div className="spotlight-card__text">
            <strong>{country.name.pt}</strong>
            <span>
              {capital} · {country.region}
            </span>
          </div>
          <ChevronRight size={20} strokeWidth={2} className="spotlight-card__chevron" />
        </div>

        <div className="spotlight-card__landscape">
          <AnimatePresence mode="wait">
            {imageUrl ? (
              <motion.img
                key={imageUrl}
                src={imageUrl}
                alt={`Paisagem de ${country.name.pt}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                loading="lazy"
              />
            ) : isLoading ? (
              <motion.div
                key="loading"
                className="spotlight-card__placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="spotlight-card__shimmer" />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="spotlight-card__placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ImageOff size={22} strokeWidth={1.5} aria-hidden="true" />
                <span>Sem imagem disponível</span>
              </motion.div>
            )}
          </AnimatePresence>
          <span className="spotlight-card__credit">
            {caption ?? "Imagem: Wikimedia"}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

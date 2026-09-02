import { motion } from "framer-motion";
import type { Country } from "../types/country";
import { CountryCard } from "./CountryCard";

interface CountryGridProps {
  countries: Country[];
}

// "staggerChildren" é o segredo do efeito "cascata": em vez de animarmos
// cada CountryCard manualmente, dizemos ao contentor-pai para avisar
// os filhos, um a um, com um pequeno atraso entre cada. Os filhos (os
// CountryCard) só precisam de saber os estados "hidden" / "visible".
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

export function CountryGrid({ countries }: CountryGridProps) {
  return (
    <motion.div
      className="country-grid"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      // "key" muda sempre que a lista de países muda (nova pesquisa/filtro),
      // o que faz o framer-motion tratar isto como uma entrada nova
      // e repetir a animação em cascata a cada pesquisa.
      key={countries.map((c) => c.cca3).join("-")}
    >
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </motion.div>
  );
}

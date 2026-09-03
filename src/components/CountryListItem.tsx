import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Country } from "../types/country";
import { getFlagUrl } from "../lib/flags";

interface CountryListItemProps {
  country: Country;
}

// motion(Link) permite animar um componente do react-router como se
// fosse um elemento normal do framer-motion — aqui usamos para dar
// um pequeno "aperto" tátil (whileTap) ao tocar na linha.
const MotionLink = motion.create(Link);

export function CountryListItem({ country }: CountryListItemProps) {
  const capital = country.capital[0] ?? "Sem capital registada";

  return (
    <MotionLink
      to={`/pais/${country.cca3}`}
      className="country-row"
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <img
        src={getFlagUrl(country.cca2)}
        alt={`Bandeira de ${country.name.common}`}
        className="country-row__flag"
        loading="lazy"
        width={48}
        height={36}
      />
      <div className="country-row__text">
        <strong>{country.name.common}</strong>
        <span>{capital} · {country.region}</span>
      </div>
      <ChevronRight size={20} strokeWidth={2} className="country-row__chevron" aria-hidden="true" />
    </MotionLink>
  );
}

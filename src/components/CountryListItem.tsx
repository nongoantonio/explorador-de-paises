import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Country } from "../types/country";
import { getFlagUrl } from "../lib/flags";

interface CountryListItemProps {
  country: Country;
}

export function CountryListItem({ country }: CountryListItemProps) {
  const capital = country.capital[0] ?? "Sem capital registada";

  return (
    <Link to={`/pais/${country.cca3}`} className="country-row">
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
    </Link>
  );
}

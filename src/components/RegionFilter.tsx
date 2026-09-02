import { REGIONS, type Region } from "../hooks/useCountries";

interface RegionFilterProps {
  activeRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
}

// Tradução simples só para exibição — os valores enviados à API
// continuam a ser os nomes em inglês, que é o que a REST Countries espera.
const REGION_LABELS: Record<Region, string> = {
  Africa: "África",
  Americas: "Américas",
  Asia: "Ásia",
  Europe: "Europa",
  Oceania: "Oceânia",
};

export function RegionFilter({ activeRegion, onSelectRegion }: RegionFilterProps) {
  return (
    <div className="region-filter" role="group" aria-label="Filtrar por continente">
      <button
        type="button"
        className={activeRegion === null ? "is-active" : ""}
        onClick={() => onSelectRegion(null)}
      >
        Todos os continentes
      </button>
      {REGIONS.map((region) => (
        <button
          key={region}
          type="button"
          className={activeRegion === region ? "is-active" : ""}
          onClick={() => onSelectRegion(region)}
        >
          {REGION_LABELS[region]}
        </button>
      ))}
    </div>
  );
}

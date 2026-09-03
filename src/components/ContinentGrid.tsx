import { Globe, Sun, Mountain, Landmark, Building2, TreePalm } from "lucide-react";
import { REGIONS, REGION_LABELS, type Region } from "../types/country";

interface ContinentGridProps {
  activeRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
}

// Um ícone temático por continente — só para dar personalidade visual
// a cada azulejo. Não têm nenhum significado "oficial", são só uma
// escolha estética (ex.: sol para África, montanha para as Américas).
const REGION_ICONS: Record<Region, typeof Sun> = {
  Africa: Sun,
  Americas: Mountain,
  Asia: Landmark,
  Europe: Building2,
  Oceania: TreePalm,
};

export function ContinentGrid({ activeRegion, onSelectRegion }: ContinentGridProps) {
  return (
    <div className="continent-grid" role="group" aria-label="Filtrar por continente">
      <button
        type="button"
        className={"continent-tile" + (activeRegion === null ? " is-active" : "")}
        onClick={() => onSelectRegion(null)}
      >
        <Globe size={22} strokeWidth={2} aria-hidden="true" />
        <span>Todos os continentes</span>
      </button>

      {REGIONS.map((region) => {
        const Icon = REGION_ICONS[region];
        const isActive = activeRegion === region;
        return (
          <button
            key={region}
            type="button"
            className={"continent-tile" + (isActive ? " is-active" : "")}
            onClick={() => onSelectRegion(region)}
          >
            <Icon size={22} strokeWidth={2} aria-hidden="true" />
            <span>{REGION_LABELS[region]}</span>
          </button>
        );
      })}
    </div>
  );
}

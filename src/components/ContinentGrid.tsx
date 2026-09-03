import { motion } from "framer-motion";
import { Globe, Sun, Mountain, Landmark, Building2, TreePalm } from "lucide-react";
import { REGIONS, REGION_LABELS, type Region } from "../types/country";

interface ContinentGridProps {
  activeRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
}

const REGION_ICONS: Record<Region, typeof Sun> = {
  Africa: Sun,
  Americas: Mountain,
  Asia: Landmark,
  Europe: Building2,
  Oceania: TreePalm,
};

// Pequena variante de "tap": encolhe ligeiramente o azulejo ao tocar,
// dando feedback físico imediato — o tipo de detalhe que faz uma
// interface parecer "viva" em vez de estática.
const tapAnimation = { scale: 0.94 };

export function ContinentGrid({ activeRegion, onSelectRegion }: ContinentGridProps) {
  return (
    <div className="continent-grid" role="group" aria-label="Filtrar por continente">
      <motion.button
        type="button"
        whileTap={tapAnimation}
        className={"continent-tile" + (activeRegion === null ? " is-active" : "")}
        onClick={() => onSelectRegion(null)}
      >
        <Globe size={22} strokeWidth={2} aria-hidden="true" />
        <span>Todos os continentes</span>
      </motion.button>

      {REGIONS.map((region) => {
        const Icon = REGION_ICONS[region];
        const isActive = activeRegion === region;
        return (
          <motion.button
            key={region}
            type="button"
            whileTap={tapAnimation}
            className={"continent-tile" + (isActive ? " is-active" : "")}
            onClick={() => onSelectRegion(region)}
          >
            <Icon size={22} strokeWidth={2} aria-hidden="true" />
            <span>{REGION_LABELS[region]}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

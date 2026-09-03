// Pequena ilustração de "paisagem" que aparece por baixo da bandeira em
// cada resultado de país. Não é a paisagem real e específica de cada
// país (isso exigiria uma fotografia por país, que não temos disponível
// de forma gratuita e licenciada) — é antes uma cena decorativa
// consistente, cujo TERRENO e CORES variam por continente, para dar
// alguma identidade visual a cada região sem recorrer a estereótipos
// culturais: são só formas de relevo (dunas, montanhas, socalcos,
// colinas, costa), a mesma ideia do "sol nascente" que já existia no
// fundo da página Explorar.
import type { Region } from "../types/country";

interface LandscapeBannerProps {
  region: string;
}

// Cada entrada define: as 3 camadas de terreno (longe/média/perto) e a
// posição/tamanho do sol. As cores em si vêm do CSS (por região), para
// ficar fácil de afinar a paleta sem mexer aqui.
const TERRAIN_PATHS: Record<Region, { back: string; mid: string; front: string; sun: { cx: number; cy: number; r: number } }> = {
  // Dunas onduladas + sol grande e baixo.
  Africa: {
    back: "M0 70 Q50 40 100 65 T200 60 T300 68 T400 55 V100 H0 Z",
    mid: "M0 85 Q60 60 120 82 T240 80 T400 78 V100 H0 Z",
    front: "M0 100 Q40 82 90 98 T200 96 T310 99 T400 90 V100 H0 Z",
    sun: { cx: 200, cy: 62, r: 26 },
  },
  // Picos rochosos + sol a meia altura.
  Americas: {
    back: "M0 78 L60 40 L110 70 L170 30 L230 68 L290 42 L340 72 L400 50 V100 H0 Z",
    mid: "M0 92 L50 60 L100 85 L150 50 L210 88 L260 58 L320 90 L400 68 V100 H0 Z",
    front: "M0 100 L40 82 L90 100 L150 74 L190 100 L260 78 L320 100 L360 84 L400 100 Z",
    sun: { cx: 200, cy: 40, r: 20 },
  },
  // Socalcos/terraços em degraus + sol pequeno e pálido.
  Asia: {
    back: "M0 90 H60 V70 H140 V80 H220 V60 H300 V75 H400 V100 H0 Z",
    mid: "M0 96 H90 V85 H180 V92 H260 V80 H340 V88 H400 V100 H0 Z",
    front: "M0 100 H50 V94 H130 V98 H210 V90 H290 V96 H400 V100 Z",
    sun: { cx: 320, cy: 45, r: 16 },
  },
  // Colinas suaves e arredondadas + sol médio.
  Europe: {
    back: "M0 75 Q100 45 200 70 T400 65 V100 H0 Z",
    mid: "M0 90 Q120 65 220 88 T400 82 V100 H0 Z",
    front: "M0 100 Q80 85 180 98 T400 94 V100 H0 Z",
    sun: { cx: 90, cy: 48, r: 18 },
  },
  // Costa com ondas + sol grande e baixo, junto ao horizonte.
  Oceania: {
    back: "M0 80 Q50 68 100 80 T200 80 T300 80 T400 80 V100 H0 Z",
    mid: "M0 88 Q50 78 100 88 T200 88 T300 88 T400 88 V100 H0 Z",
    front: "M0 96 Q50 88 100 96 T200 96 T300 96 T400 96 V100 H0 Z",
    sun: { cx: 340, cy: 60, r: 24 },
  },
};

// Nem todos os países vêm com uma região das 5 esperadas (ex: dados em
// falta), por isso temos um recurso de reserva.
const FALLBACK = TERRAIN_PATHS.Europe;

export function LandscapeBanner({ region }: LandscapeBannerProps) {
  const terrain = TERRAIN_PATHS[region as Region] ?? FALLBACK;
  const regionClass = `landscape-banner--${(region || "default").toLowerCase()}`;

  return (
    <svg
      viewBox="0 0 400 100"
      className={`landscape-banner ${regionClass}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx={terrain.sun.cx} cy={terrain.sun.cy} r={terrain.sun.r} className="landscape-banner__sun" />
      <path d={terrain.back} className="landscape-banner__layer landscape-banner__layer--back" />
      <path d={terrain.mid} className="landscape-banner__layer landscape-banner__layer--mid" />
      <path d={terrain.front} className="landscape-banner__layer landscape-banner__layer--front" />
    </svg>
  );
}

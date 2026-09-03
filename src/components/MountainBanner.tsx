// Faixa decorativa de "horizonte de montanhas", só com formas SVG.
// Serve para dar personalidade à página Explorar sem depender de
// nenhuma imagem/ilustração externa (que teríamos de licenciar ou
// gerar). São só camadas de triângulos sobrepostos + um sol.
export function MountainBanner() {
  return (
    <svg
      viewBox="0 0 400 140"
      className="mountain-banner"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <circle cx="200" cy="55" r="30" className="mountain-banner__sun" />

      {/* Camada mais distante */}
      <path
        d="M0 110 L60 60 L110 95 L170 45 L230 90 L290 55 L340 95 L400 70 L400 140 L0 140 Z"
        className="mountain-banner__layer mountain-banner__layer--back"
      />
      {/* Camada intermédia */}
      <path
        d="M0 130 L50 90 L100 120 L150 75 L210 125 L260 85 L320 130 L400 100 L400 140 L0 140 Z"
        className="mountain-banner__layer mountain-banner__layer--mid"
      />
      {/* Camada da frente */}
      <path
        d="M0 140 L40 115 L90 140 L150 105 L190 140 L260 110 L320 140 L360 118 L400 140 Z"
        className="mountain-banner__layer mountain-banner__layer--front"
      />
    </svg>
  );
}

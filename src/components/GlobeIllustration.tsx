// Ilustração decorativa feita só com SVG (sem imagens externas). Um
// globo simples com meridianos/paralelos, dois "marcadores" de mapa e
// anéis orbitais tracejados à volta — a mesma metáfora visual de
// "atlas interativo" do resto da aplicação, sem depender de nenhum
// ficheiro de imagem.
export function GlobeIllustration() {
  return (
    <svg
      viewBox="0 0 220 220"
      className="globe-illustration"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Anéis orbitais tracejados — agrupados para poderem girar
          juntos, em sentido contrário ao globo, sugerindo órbitas
          a diferentes velocidades (como satélites). */}
      <g className="globe-illustration__orbits">
        <ellipse
          cx="110"
          cy="110"
          rx="104"
          ry="40"
          className="globe-illustration__orbit"
        />
        <ellipse
          cx="110"
          cy="110"
          rx="70"
          ry="104"
          className="globe-illustration__orbit"
          transform="rotate(25 110 110)"
        />
      </g>

      {/* Corpo do globo, meridianos e massas de terra ficam agrupados
          para poderem "rodar" juntos, como uma esfera a girar sobre
          si mesma — os anéis orbitais e os pins ficam de fora do
          grupo, por isso mantêm-se fixos, como se estivessem à volta
          ou pousados por cima do globo em rotação. */}
      <g className="globe-illustration__sphere">
        <circle cx="110" cy="110" r="68" className="globe-illustration__body" />

        {/* Paralelos (linhas horizontais) */}
        <ellipse cx="110" cy="110" rx="68" ry="22" className="globe-illustration__line" />
        <ellipse cx="110" cy="110" rx="68" ry="46" className="globe-illustration__line" />

        {/* Meridianos (linhas verticais) */}
        <ellipse cx="110" cy="110" rx="22" ry="68" className="globe-illustration__line" />
        <ellipse cx="110" cy="110" rx="46" ry="68" className="globe-illustration__line" />
        <line x1="110" y1="42" x2="110" y2="178" className="globe-illustration__line" />

        {/* Massas de terra estilizadas */}
        <path
          d="M78 78c8-10 20-6 24 2 5 10-2 16-10 14-9-2-20 0-14-16z"
          className="globe-illustration__land"
        />
        <path
          d="M118 128c10-4 24 2 22 14-2 10-16 14-26 8-9-5-6-18 4-22z"
          className="globe-illustration__land"
        />
      </g>

      {/* Dois marcadores de mapa, como pins de destino. Cada pin tem um
          grupo "exterior" só para posicionar (via atributo transform,
          que não entra em conflito com a animação CSS) e um grupo
          "interior" que é o que realmente flutua para cima/baixo. */}
      <g transform="translate(150 62)">
        <g className="globe-illustration__pin">
          <path d="M0 0c8 0 14 6 14 14 0 10-14 24-14 24S-14 24-14 14C-14 6-8 0 0 0z" />
          <circle cx="0" cy="13" r="5" className="globe-illustration__pin-hole" />
        </g>
      </g>
      <g transform="translate(66 150)">
        <g className="globe-illustration__pin globe-illustration__pin--small">
          <path d="M0 0c6.5 0 11.5 5 11.5 11.5 0 8-11.5 19.5-11.5 19.5S-11.5 19.5-11.5 11.5C-11.5 5-6.5 0 0 0z" />
          <circle cx="0" cy="10.5" r="4" className="globe-illustration__pin-hole" />
        </g>
      </g>
    </svg>
  );
}

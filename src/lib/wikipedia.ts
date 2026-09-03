// A API da Wikipedia (MediaWiki Action API) é gratuita, não precisa de
// conta nem de chave, e suporta pedidos diretamente do browser através
// de CORS (usamos o parâmetro "origin=*" para isso — é a forma oficial
// documentada pela própria Wikipedia para pedidos "anónimos" de sites
// externos). Aqui pedimos a imagem principal (thumbnail) associada à
// página de cada país, para mostrar uma paisagem real como pré-visualização.
const WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";

// Pequena cache em memória: se o utilizador pesquisar o mesmo país
// várias vezes na mesma sessão, não voltamos a pedir a imagem.
const imageCache = new Map<string, string | null>();

interface WikipediaPage {
  pageid: number;
  title: string;
  thumbnail?: { source: string; width: number; height: number };
}

interface WikipediaQueryResponse {
  query?: {
    pages?: Record<string, WikipediaPage>;
  };
}

export async function fetchCountryLandscapeImage(
  countryName: string
): Promise<string | null> {
  if (imageCache.has(countryName)) {
    return imageCache.get(countryName)!;
  }

  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "pageimages",
    piprop: "thumbnail",
    pithumbsize: "640",
    redirects: "1", // segue automaticamente nomes alternativos (ex.: apelidos comuns do país)
    titles: countryName,
    origin: "*", // pedido CORS anónimo, tal como documentado pela Wikipedia
  });

  try {
    const response = await fetch(`${WIKIPEDIA_API}?${params.toString()}`);
    if (!response.ok) throw new Error("Falha ao contactar a Wikipedia");

    const data = (await response.json()) as WikipediaQueryResponse;
    const pages = data.query?.pages ? Object.values(data.query.pages) : [];
    const thumbnail = pages[0]?.thumbnail?.source ?? null;

    imageCache.set(countryName, thumbnail);
    return thumbnail;
  } catch {
    // Se a Wikipedia estiver em baixo ou o país não tiver imagem, a
    // aplicação simplesmente não mostra a paisagem — nunca deixamos
    // isto rebentar o resto da página.
    imageCache.set(countryName, null);
    return null;
  }
}

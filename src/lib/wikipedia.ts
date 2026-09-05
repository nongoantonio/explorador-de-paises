// Fonte da imagem de paisagem de cada país.
//
// Tentativa 1: Wikimedia Commons, com uma PESQUISA por "{país} landscape",
// em vez de pedir "a imagem principal da página do país" — isso é
// importante, porque a imagem "principal" de um artigo da Wikipedia é
// muitas vezes a bandeira ou o brasão (a primeira imagem grande do
// artigo), não uma fotografia do território. Pesquisar por "landscape"
// no Commons (o repositório de imagens da Wikipedia) devolve fotografias
// reais do país com muito mais frequência.
//
// Tentativa 2 (reserva): se a pesquisa no Commons não encontrar nada,
// caímos de volta à imagem principal da página da Wikipedia em inglês
// — pior do que uma paisagem, mas melhor do que não mostrar nada.
//
// Ambas as APIs são gratuitas, sem conta nem chave, e suportam pedidos
// diretamente do browser via CORS (parâmetro "origin=*", documentado
// pela própria Wikimedia para pedidos anónimos de sites externos).
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";

// Pequena cache em memória: se o utilizador pesquisar o mesmo país
// várias vezes na mesma sessão, não voltamos a pedir a imagem.
const imageCache = new Map<string, string | null>();

interface CommonsImageInfo {
  thumburl?: string;
  url?: string;
}

interface CommonsPage {
  pageid: number;
  title: string;
  imageinfo?: CommonsImageInfo[];
}

interface CommonsSearchResponse {
  query?: {
    pages?: Record<string, CommonsPage>;
  };
}

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

async function searchCommonsLandscape(countryName: string): Promise<string | null> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    // "-flag -coat -emblem -map" exclui os resultados mais comuns que
    // não são fotografias (bandeiras, brasões, mapas), que dominam o
    // Commons para qualquer pesquisa que inclua o nome de um país.
    gsrsearch: `${countryName} landscape -flag -coat -emblem -map -icon`,
    gsrnamespace: "6", // namespace 6 = "File:" (só ficheiros de imagem)
    gsrlimit: "1",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "640",
    origin: "*",
  });

  const response = await fetch(`${COMMONS_API}?${params.toString()}`);
  if (!response.ok) throw new Error("Falha ao contactar o Wikimedia Commons");

  const data = (await response.json()) as CommonsSearchResponse;
  const pages = data.query?.pages ? Object.values(data.query.pages) : [];
  return pages[0]?.imageinfo?.[0]?.thumburl ?? null;
}

async function fetchWikipediaLeadImage(countryName: string): Promise<string | null> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "pageimages",
    piprop: "thumbnail",
    pithumbsize: "640",
    redirects: "1",
    titles: countryName,
    origin: "*",
  });

  const response = await fetch(`${WIKIPEDIA_API}?${params.toString()}`);
  if (!response.ok) throw new Error("Falha ao contactar a Wikipedia");

  const data = (await response.json()) as WikipediaQueryResponse;
  const pages = data.query?.pages ? Object.values(data.query.pages) : [];
  return pages[0]?.thumbnail?.source ?? null;
}

export async function fetchCountryLandscapeImage(
  countryName: string
): Promise<string | null> {
  if (imageCache.has(countryName)) {
    return imageCache.get(countryName)!;
  }

  let result: string | null = null;

  try {
    result = await searchCommonsLandscape(countryName);
  } catch {
    // Se o Commons falhar, seguimos para a alternativa abaixo em vez
    // de desistir logo.
  }

  if (!result) {
    try {
      result = await fetchWikipediaLeadImage(countryName);
    } catch {
      result = null;
    }
  }

  imageCache.set(countryName, result);
  return result;
}

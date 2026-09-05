// Fonte da imagem de paisagem de cada país.
//
// Em vez de pesquisar só pelo nome do país (o que costuma devolver
// fotos genéricas de campo ou de natureza, pouco reconhecíveis),
// damos preferência à CIDADE CAPITAL — cidades têm muito mais
// fotografias urbanas catalogadas (skylines, avenidas, monumentos),
// que é o que dá a sensação de "imagem atual de uma cidade" em vez de
// "paisagem qualquer".
//
// Ordem de tentativas:
// 1) Wikivoyage da CIDADE capital — banners de viagem escolhidos por
//    editores humanos, específicos da cidade.
// 2) Wikimedia Commons — pesquisa por "{capital} skyline cityscape",
//    excluindo bandeiras/brasões/mapas/ícones. Esta é também a única
//    fonte de onde conseguimos extrair uma legenda com o nome exato
//    do local fotografado.
// 3) Wikivoyage do PAÍS (caso a capital não tenha banner próprio).
// 4) Imagem principal da página do país na Wikipedia — reserva final.
//
// Todas gratuitas, sem conta nem chave, com CORS via "origin=*"
// (documentado pela própria Wikimedia para pedidos anónimos).
const WIKIVOYAGE_API = "https://en.wikivoyage.org/w/api.php";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";

export interface CountryImageResult {
  url: string;
  // Legenda com o local da fotografia — tentamos SEMPRE preencher isto
  // com algo útil (o nome da cidade/local pesquisado, no mínimo),
  // nunca deixamos ficar vazio só porque a fonte não tinha uma
  // descrição pronta a usar.
  caption: string;
}

const imageCache = new Map<string, CountryImageResult | null>();

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function captionFromFileTitle(title: string): string {
  return title
    .replace(/^File:/, "")
    .replace(/\.[a-zA-Z0-9]+$/, "")
    .replace(/_/g, " ")
    .trim();
}

interface WikivoyagePage {
  pageid: number;
  thumbnail?: { source: string };
}

// Busca o banner de viagem de um artigo do Wikivoyage (país ou cidade).
// "fallbackCaption" é o que usamos como legenda, já que o Wikivoyage
// não devolve uma descrição do local por esta via — mas sabemos
// perfeitamente do que se trata, porque fomos nós que pedimos por nome.
async function fetchWikivoyageBanner(
  placeName: string,
  fallbackCaption: string
): Promise<CountryImageResult | null> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "pageimages",
    piprop: "thumbnail",
    pithumbsize: "640",
    redirects: "1",
    titles: placeName,
    origin: "*",
  });

  const response = await fetch(`${WIKIVOYAGE_API}?${params.toString()}`);
  if (!response.ok) throw new Error("Falha ao contactar o Wikivoyage");

  const data = (await response.json()) as { query?: { pages?: Record<string, WikivoyagePage> } };
  const pages = data.query?.pages ? Object.values(data.query.pages) : [];
  const source = pages[0]?.thumbnail?.source;
  return source ? { url: source, caption: fallbackCaption } : null;
}

interface CommonsImageInfo {
  thumburl?: string;
  extmetadata?: {
    ImageDescription?: { value: string };
    ObjectName?: { value: string };
  };
}

interface CommonsPage {
  pageid: number;
  title: string;
  imageinfo?: CommonsImageInfo[];
}

async function searchCommonsPhoto(
  searchTerms: string,
  fallbackCaption: string
): Promise<CountryImageResult | null> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `${searchTerms} -flag -coat -emblem -map -icon -logo`,
    gsrnamespace: "6", // namespace 6 = "File:"
    gsrlimit: "1",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "640",
    origin: "*",
  });

  const response = await fetch(`${COMMONS_API}?${params.toString()}`);
  if (!response.ok) throw new Error("Falha ao contactar o Wikimedia Commons");

  const data = (await response.json()) as { query?: { pages?: Record<string, CommonsPage> } };
  const pages = data.query?.pages ? Object.values(data.query.pages) : [];
  const page = pages[0];
  const info = page?.imageinfo?.[0];
  if (!info?.thumburl) return null;

  const rawDescription =
    info.extmetadata?.ObjectName?.value || info.extmetadata?.ImageDescription?.value;
  const cleanDescription = rawDescription ? stripHtml(rawDescription) : "";
  const caption =
    cleanDescription && cleanDescription.length <= 80 && cleanDescription.length > 0
      ? cleanDescription
      : captionFromFileTitle(page.title) || fallbackCaption;

  return { url: info.thumburl, caption };
}

interface WikipediaPage {
  pageid: number;
  thumbnail?: { source: string };
}

async function fetchWikipediaLeadImage(
  countryName: string,
  fallbackCaption: string
): Promise<CountryImageResult | null> {
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

  const data = (await response.json()) as { query?: { pages?: Record<string, WikipediaPage> } };
  const pages = data.query?.pages ? Object.values(data.query.pages) : [];
  const source = pages[0]?.thumbnail?.source;
  return source ? { url: source, caption: fallbackCaption } : null;
}

// "capitalName" é opcional (alguns territórios não têm capital
// registada) — quando existe, é sempre a primeira prioridade de
// pesquisa, por dar imagens mais urbanas e reconhecíveis.
export async function fetchCountryLandscapeImage(
  countryName: string,
  capitalName?: string
): Promise<CountryImageResult | null> {
  const cacheKey = `${countryName}::${capitalName ?? ""}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  const attempts: Array<() => Promise<CountryImageResult | null>> = [];

  if (capitalName) {
    attempts.push(() => fetchWikivoyageBanner(capitalName, capitalName));
    attempts.push(() =>
      searchCommonsPhoto(
        `${capitalName} downtown skyline modern architecture -slum -poverty -shantytown -market -garbage`,
        capitalName
      )
    );
  }
  attempts.push(() => fetchWikivoyageBanner(countryName, countryName));
  attempts.push(() =>
    searchCommonsPhoto(
      `${countryName} landmark modern architecture -slum -poverty -shantytown -market -garbage`,
      countryName
    )
  );
  attempts.push(() => fetchWikipediaLeadImage(countryName, countryName));

  let result: CountryImageResult | null = null;
  for (const attempt of attempts) {
    try {
      result = await attempt();
    } catch {
      result = null;
    }
    if (result) break;
  }

  imageCache.set(cacheKey, result);
  return result;
}

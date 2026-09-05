// Fonte da imagem de paisagem de cada país, em 3 tentativas por ordem
// de qualidade esperada:
//
// 1) Wikivoyage — o "guia de viagens" da Wikimedia. Os artigos de
//    países no Wikivoyage têm uma imagem de banner escolhida à mão
//    pelos editores para representar bem o destino (paisagens,
//    monumentos, vistas conhecidas) — por isso tende a dar resultados
//    mais "icónicos" do que uma pesquisa genérica.
// 2) Wikimedia Commons — pesquisa por "{país} landmark landscape",
//    excluindo bandeiras/brasões/mapas. Também nos dá o TÍTULO do
//    ficheiro e a sua descrição, que usamos para montar a legenda
//    (ex.: "Kalandula Falls, Malanje").
// 3) Imagem principal da página da Wikipedia em inglês — reserva final,
//    caso as duas anteriores não encontrem nada.
//
// Todas gratuitas, sem conta nem chave, com CORS via "origin=*"
// (documentado pela própria Wikimedia para pedidos anónimos).
const WIKIVOYAGE_API = "https://en.wikivoyage.org/w/api.php";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";

export interface CountryImageResult {
  url: string;
  // Legenda com o local/descrição da fotografia, quando conseguimos
  // extraí-la (nem sempre é possível) — null nesse caso, e a interface
  // mostra só o nome da fonte.
  caption: string | null;
}

const imageCache = new Map<string, CountryImageResult | null>();

// Remove tags HTML (a Wikimedia devolve descrições em HTML) e espaços
// a mais, para a legenda ficar em texto simples e limpo.
function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Transforma "Kalandula_Falls,_Malanje_Province.jpg" em
// "Kalandula Falls, Malanje Province" — usado quando não há uma
// descrição melhor disponível nos metadados do ficheiro.
function captionFromFileTitle(title: string): string {
  return title
    .replace(/^File:/, "")
    .replace(/\.[a-zA-Z0-9]+$/, "")
    .replace(/_/g, " ")
    .trim();
}

interface WikivoyagePage {
  pageid: number;
  original?: { source: string };
  thumbnail?: { source: string };
}

async function fetchWikivoyageBanner(countryName: string): Promise<CountryImageResult | null> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "pageimages",
    piprop: "original|thumbnail",
    pithumbsize: "640",
    redirects: "1",
    titles: countryName,
    origin: "*",
  });

  const response = await fetch(`${WIKIVOYAGE_API}?${params.toString()}`);
  if (!response.ok) throw new Error("Falha ao contactar o Wikivoyage");

  const data = (await response.json()) as { query?: { pages?: Record<string, WikivoyagePage> } };
  const pages = data.query?.pages ? Object.values(data.query.pages) : [];
  const source = pages[0]?.thumbnail?.source;
  if (!source) return null;

  // O banner do Wikivoyage não vem com uma legenda de local associada
  // por esta via, por isso identificamos só a fonte.
  return { url: source, caption: null };
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

async function searchCommonsLandscape(countryName: string): Promise<CountryImageResult | null> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `${countryName} landmark landscape -flag -coat -emblem -map -icon -logo`,
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

  // Preferimos uma descrição curta e legível dos metadados do ficheiro;
  // se vier vazia, longa demais, ou não existir, usamos o título do
  // próprio ficheiro (que no Commons costuma incluir o nome do local).
  const rawDescription =
    info.extmetadata?.ObjectName?.value || info.extmetadata?.ImageDescription?.value;
  const cleanDescription = rawDescription ? stripHtml(rawDescription) : "";
  const caption =
    cleanDescription && cleanDescription.length <= 80
      ? cleanDescription
      : captionFromFileTitle(page.title);

  return { url: info.thumburl, caption: caption || null };
}

interface WikipediaPage {
  pageid: number;
  thumbnail?: { source: string };
}

async function fetchWikipediaLeadImage(countryName: string): Promise<CountryImageResult | null> {
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
  return source ? { url: source, caption: null } : null;
}

export async function fetchCountryLandscapeImage(
  countryName: string
): Promise<CountryImageResult | null> {
  if (imageCache.has(countryName)) {
    return imageCache.get(countryName)!;
  }

  // Tentamos as 3 fontes por ordem, uma de cada vez — só avançamos
  // para a seguinte se a anterior falhar ou não devolver nada.
  const attempts = [
    () => fetchWikivoyageBanner(countryName),
    () => searchCommonsLandscape(countryName),
    () => fetchWikipediaLeadImage(countryName),
  ];

  let result: CountryImageResult | null = null;
  for (const attempt of attempts) {
    try {
      result = await attempt();
    } catch {
      result = null;
    }
    if (result) break;
  }

  imageCache.set(countryName, result);
  return result;
}

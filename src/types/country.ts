// Este ficheiro define os "formatos" (types) dos dados que vêm da API.
// Em TypeScript, isto chama-se "tipagem" e serve para o editor e o compilador
// nos avisarem se tentarmos usar um dado que não existe ou está mal escrito.
// A REST Countries API devolve objetos bem mais complexos do que isto,
// mas aqui só descrevemos os campos que realmente vamos usar na aplicação.

// Um país pode ter várias moedas (ex: países com mais do que uma moeda oficial).
// A API devolve isto como um objeto onde a "chave" é o código da moeda (ex: "EUR")
// e o "valor" tem o nome e o símbolo. Por isso usamos "Record<string, Currency>".
export interface Currency {
  name: string;
  symbol?: string;
}

// O mesmo acontece com os idiomas: chave = código do idioma, valor = nome do idioma.
export type Languages = Record<string, string>;

// Interface principal: representa um único país devolvido pela API.
// Usamos "?" nos campos que podem não vir preenchidos para alguns países
// (por exemplo, nem todos os territórios têm capital ou moeda registada).
export interface Country {
  cca3: string; // código único do país (ex: "AGO" para Angola) — ótimo para usar como "key" em listas
  name: {
    common: string; // nome usado no dia a dia (ex: "Angola")
    official: string; // nome oficial (ex: "República de Angola")
  };
  capital?: string[]; // alguns países têm mais do que uma capital
  region: string; // continente/região (ex: "Africa")
  subregion?: string; // sub-região (ex: "Middle Africa")
  population: number;
  flags: {
    svg: string; // usamos sempre o SVG da bandeira: fica nítido em qualquer tamanho de ecrã
    alt?: string; // descrição da bandeira, boa para acessibilidade
  };
  currencies?: Record<string, Currency>;
  languages?: Languages;
  latlng?: [number, number]; // [latitude, longitude] — útil se um dia quisermos mostrar num mapa
}

// Tipo auxiliar para os estados possíveis do pedido à API.
// Em vez de usarmos vários "booleans" soltos (isLoading, hasError, etc.),
// concentramos tudo num único "status", o que evita estados impossíveis
// (ex: estar a carregar E com erro ao mesmo tempo).
export type RequestStatus = "idle" | "loading" | "success" | "error";

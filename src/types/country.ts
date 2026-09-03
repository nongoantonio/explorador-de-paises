// Este ficheiro define os "formatos" (types) dos dados de cada país.
//
// NOTA IMPORTANTE sobre a origem dos dados: esta aplicação começou por
// usar a REST Countries API (restcountries.com) diretamente do browser.
// Entretanto, esse serviço tornou-se um produto pago com contas e chaves
// de API — deixou de ser o "grátis e sem chave" que era quando este
// projeto foi desenhado. Em vez de obrigar o projeto a depender de uma
// conta paga só para uma lista de países, passámos a servir os MESMOS
// dados (o dataset é de origem aberta) como um ficheiro estático,
// gerado por scripts/build-country-data.cjs e servido a partir de
// /public/countries.json. O resto da aplicação continua a "pedir" os
// dados com fetch(), tal como pediria a qualquer API — só muda a origem.
export interface Currency {
  name: string;
  symbol?: string;
}

export type Languages = Record<string, string>;

export interface Country {
  cca2: string; // código de 2 letras (ex: "AO") — usado nas bandeiras e nos URLs
  cca3: string; // código de 3 letras (ex: "AGO") — identificador único e estável
  name: {
    common: string;
    official: string;
    pt: string; // nome comum em português (ex.: "Alemanha") — usado como nome principal na interface
    ptOfficial: string; // nome oficial em português (ex.: "República Federal da Alemanha")
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  currencies: Record<string, Currency>;
  languages: Languages;
  latlng: [number, number] | [];
  borders: string[]; // códigos cca3 dos países vizinhos
  flagEmoji: string;
}

// Estado de um pedido assíncrono, usado sempre que a aplicação
// carrega dados (mesmo que hoje venham de um ficheiro local).
export type RequestStatus = "idle" | "loading" | "success" | "error";

// Continentes disponíveis para filtrar, com a etiqueta em português
// que mostramos na interface.
export const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"] as const;
export type Region = (typeof REGIONS)[number];

export const REGION_LABELS: Record<Region, string> = {
  Africa: "África",
  Americas: "Américas",
  Asia: "Ásia",
  Europe: "Europa",
  Oceania: "Oceânia",
};

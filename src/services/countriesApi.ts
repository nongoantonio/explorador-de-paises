// Este ficheiro é a nossa "camada de serviço": é aqui, e só aqui, que a
// aplicação sabe que existe uma API chamada REST Countries e sabe como
// falar com ela. Se um dia quisermos trocar de API, só mexemos aqui —
// os componentes nem percebem a diferença, porque continuam a receber
// sempre objetos do tipo "Country".
import type { Country } from "../types/country";

// URL base da REST Countries API (v3.1). É totalmente gratuita e não
// precisa de nenhuma chave de API (API key), por isso é perfeita para praticar.
const BASE_URL = "https://restcountries.com/v3.1";

// Os campos que pedimos à API através do parâmetro "fields".
// Isto é uma boa prática: pedimos só o que vamos usar, o que torna
// a resposta mais leve e rápida.
const FIELDS = "name,capital,region,subregion,population,flags,currencies,languages,cca3,latlng";

// Função auxiliar interna: trata a resposta do "fetch" e converte
// erros HTTP (como 404) em exceções JavaScript, para podermos
// apanhá-las com try/catch nos componentes.
async function handleResponse(response: Response): Promise<Country[]> {
  if (!response.ok) {
    // Quando pesquisamos um país que não existe, a API devolve 404.
    if (response.status === 404) {
      throw new Error("Nenhum país encontrado com esse nome.");
    }
    throw new Error(`Erro ao contactar a API (código ${response.status}).`);
  }
  return response.json() as Promise<Country[]>;
}

// Vai buscar a lista de TODOS os países do mundo.
// Usada quando a aplicação abre pela primeira vez.
export async function fetchAllCountries(): Promise<Country[]> {
  const response = await fetch(`${BASE_URL}/all?fields=${FIELDS}`);
  return handleResponse(response);
}

// Pesquisa países pelo nome (comum ou oficial).
// Ex: pesquisar "ang" devolve Angola, entre outros que contenham "ang".
export async function searchCountriesByName(name: string): Promise<Country[]> {
  const response = await fetch(
    `${BASE_URL}/name/${encodeURIComponent(name)}?fields=${FIELDS}`
  );
  return handleResponse(response);
}

// Filtra países por região/continente (ex: "Africa", "Europe", "Asia"...).
export async function fetchCountriesByRegion(region: string): Promise<Country[]> {
  const response = await fetch(`${BASE_URL}/region/${region}?fields=${FIELDS}`);
  return handleResponse(response);
}

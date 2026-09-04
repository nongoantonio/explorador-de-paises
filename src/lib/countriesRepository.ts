// Esta é a nossa camada de acesso a dados — o único ficheiro que sabe
// DE ONDE vêm os países. O resto da aplicação não sabe (nem precisa de
// saber) que os dados vêm de /countries.json em vez de virem de uma
// API remota; só sabe que pode chamar fetchAllCountries() e receber
// uma Promise<Country[]>. Se um dia quiseres voltar a apontar isto
// para uma API real (ex: a REST Countries v5, com chave), só precisas
// de mudar a função abaixo — nada mais no projeto muda.
import type { Country } from "../types/country";

let cache: Country[] | null = null;

export async function fetchAllCountries(): Promise<Country[]> {
  // Cache simples em memória: a lista de países não muda durante a
  // sessão do utilizador, por isso só vale a pena pedir uma vez.
  if (cache) return cache;

  // "import.meta.env.BASE_URL" é o valor definido em "base" no
  // vite.config.ts (ex.: "/atlas-interativo/" em produção, ou "/" no
  // servidor de desenvolvimento local). Sem isto, o pedido ia sempre
  // para a raiz do domínio ("/countries.json"), o que funciona em
  // localhost mas falha no GitHub Pages, onde o site vive numa
  // subpasta (ex.: "/atlas-interativo/countries.json").
  const response = await fetch(`${import.meta.env.BASE_URL}countries.json`);

  if (!response.ok) {
    throw new Error(
      `Não foi possível carregar a lista de países (código ${response.status}).`
    );
  }

  const data = (await response.json()) as Country[];
  cache = data;
  return data;
}

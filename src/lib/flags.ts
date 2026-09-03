// flagcdn.com é um serviço gratuito, sem necessidade de conta nem de
// chave de API, mantido há vários anos e usado por milhares de projetos.
// Dado um código de país de 2 letras (ISO 3166-1 alpha-2), devolve o
// URL de uma imagem da bandeira. Mantemos isto num único sítio para
// ser fácil de trocar de fornecedor de bandeiras no futuro, se preciso.
export function getFlagUrl(cca2: string, width: 320 | 640 = 320): string {
  return `https://flagcdn.com/w${width}/${cca2.toLowerCase()}.png`;
}

export function getFlagSvgUrl(cca2: string): string {
  return `https://flagcdn.com/${cca2.toLowerCase()}.svg`;
}

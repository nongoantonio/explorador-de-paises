// Normaliza texto para efeitos de pesquisa: minúsculas + sem acentos.
// Isto faz com que "Alemanha", "alemanha" e até "alemanh" (sem o "a"
// final) encontrem o mesmo resultado, e que escrever sem acentos
// (ex.: "sao tome" em vez de "São Tomé") também funcione.
//
// A técnica normalize("NFD") separa cada letra acentuada em "letra" +
// "acento" como dois caracteres distintos (ex.: "á" -> "a" + "´"); a
// expressão regular a seguir remove só os acentos (a categoria Unicode
// "Mn" = "Mark, nonspacing"), ficando só as letras.
export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

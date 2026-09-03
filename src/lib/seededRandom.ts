// Gerador de números pseudo-aleatórios determinístico (mesmo "seed" =
// sempre a mesma sequência de números). Usamos isto para gerar
// ilustrações que parecem aleatórias, mas que são sempre iguais para
// o mesmo país sempre que a aplicação carrega — se fosse Math.random()
// verdadeiro, a ilustração de Angola mudaria de forma a cada refresh,
// o que pareceria um "bug" em vez de uma característica visual.
//
// O algoritmo é o "mulberry32", simples e suficiente para gráficos —
// NÃO deve ser usado para nada relacionado com segurança/criptografia.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Converte uma string (ex: o código "AGO" de Angola) num número,
// para podermos usá-la como seed do gerador acima.
function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

// Devolve uma função geradora "presa" a uma seed de texto — cada
// chamada seguinte devolve o próximo número da mesma sequência.
export function createSeededRandom(seed: string) {
  return mulberry32(hashString(seed));
}

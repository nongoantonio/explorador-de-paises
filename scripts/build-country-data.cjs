const countries = require('world-countries');
const populationData = require('country-json/src/country-by-population.json');
const fs = require('fs');

// Criamos um "mapa" nome -> população para pesquisa rápida (O(1) em vez de O(n) a cada país).
const populationByName = new Map(
  populationData
    .filter((entry) => typeof entry.population === 'number')
    .map((entry) => [entry.country, entry.population])
);

// Alguns nomes não coincidem exatamente entre os dois datasets — mapeamos os casos conhecidos.
const NAME_OVERRIDES = {
  'South Korea': 'Korea, South',
  'North Korea': 'Korea, North',
  'DR Congo': 'The Democratic Republic of Congo',
  'Republic of the Congo': 'Congo',
  'Ivory Coast': "Cote d'Ivoire",
  'Czechia': 'Czech Republic',
  'Eswatini': 'Swaziland',
  'North Macedonia': 'Macedonia',
  'Myanmar': 'Burma',
  'Fiji': 'Fiji Islands',
  'Micronesia': 'Micronesia, Federated States of',
  'São Tomé and Príncipe': 'Sao Tome and Principe',
  'Timor-Leste': 'East Timor',
  'Türkiye': 'Turkey',
  'Vatican City': 'Holy See (Vatican City State)',
};

// Casos que nem sequer existem no dataset de população (ex: Kosovo, por ser um
// estado com reconhecimento internacional parcial). Usamos uma estimativa
// pontual, com fonte, em vez de deixar o valor a zero.
const MANUAL_POPULATION = {
  Kosovo: 1586000, // estimativa, Banco Mundial
};

let missing = [];

const slim = countries
  .filter((c) => c.independent !== false || c.unMember)
  .map((c) => {
    const lookupName = NAME_OVERRIDES[c.name.common] || c.name.common;
    const population =
      populationByName.get(lookupName) ??
      populationByName.get(c.name.common) ??
      MANUAL_POPULATION[c.name.common];
    if (population === undefined) missing.push(c.name.common);
    return {
      cca2: c.cca2,
      cca3: c.cca3,
      name: {
        common: c.name.common,
        official: c.name.official,
      },
      capital: c.capital || [],
      region: c.region,
      subregion: c.subregion || "",
      population: population ?? 0,
      currencies: c.currencies || {},
      languages: c.languages || {},
      latlng: c.latlng || [],
      borders: c.borders || [],
      flagEmoji: c.flag || "",
    };
  })
  .sort((a, b) => a.name.common.localeCompare(b.name.common));

fs.writeFileSync('/home/claude/countries-explorer/public/countries.json', JSON.stringify(slim));
console.log('Total de países:', slim.length);
console.log('Sem população encontrada (' + missing.length + '):', missing.join(', '));
console.log('Tamanho do ficheiro (KB):', Math.round(fs.statSync('/home/claude/countries-explorer/public/countries.json').size / 1024));

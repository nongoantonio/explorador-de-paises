# 🌍 Atlas Interativo

Projeto de estudo em **React + TypeScript + Vite**: um "atlas" para
explorar bandeira, capital, população e moeda de 195 países, com
favoritos guardados no browser. Desenhado como uma app móvel, com
barra de navegação inferior e página de detalhe por país.

---

## ⚠️ Sobre a origem dos dados (lê isto primeiro)

A primeira versão deste projeto usava a **REST Countries API**
diretamente do browser. Entretanto, esse serviço tornou-se um produto
pago com contas e chaves de API — deixou de ser o "grátis e sem
chave" que era antes. Por isso, esta versão passou a servir os
**mesmos dados** (nome, capital, região, população, moeda), mas como
um **ficheiro estático próprio** (`public/countries.json`), gerado por
`scripts/build-country-data.cjs` a partir de datasets abertos.

Isto significa:

- A aplicação continua a **pedir os dados com `fetch()`**, exatamente
  como pediria a qualquer API — o padrão que estás a aprender não muda.
- Já não depende de nenhum serviço externo instável para a parte mais
  importante (nome/capital/população/moeda) — funciona sempre, mesmo
  offline depois do primeiro carregamento.
- As **bandeiras** continuam a vir de um serviço externo verdadeiro —
  o [flagcdn.com](https://flagcdn.com), gratuito, sem chave e usado há
  anos por milhares de projetos — para continuares a ver pelo menos um
  pedido de rede "a sério" em ação.

Se um dia quiseres voltar a ligar isto a uma API remota (por exemplo, a
REST Countries v5, com conta gratuita), só precisas de editar
`src/lib/countriesRepository.ts` — nada mais no projeto muda, porque
é o único ficheiro que sabe de onde vêm os dados.

---

## 1. Como correr este projeto

```bash
npm install
npm run dev
```

Abre o URL que aparece no terminal (geralmente `http://localhost:5173`).

| Comando           | O que faz                                               |
| ------------------ | -------------------------------------------------------- |
| `npm run dev`       | servidor de desenvolvimento com hot reload               |
| `npm run build`     | compila TypeScript e gera a versão de produção em `dist/` |
| `npm run preview`   | serve localmente a versão de produção já compilada       |

---

## 2. Como enviar isto para o GitHub

```bash
git init
git add .
git commit -m "primeiro commit: atlas interativo"
git branch -M main
git remote add origin https://github.com/TEU-UTILIZADOR/atlas-interativo.git
git push -u origin main
```

Cria o repositório vazio em [github.com/new](https://github.com/new)
primeiro (sem README/.gitignore automáticos, para evitar conflitos).
Para os commits seguintes: `git add . && git commit -m "..." && git push`.

---

## 3. Estrutura do projeto

```
src/
├── components/        # peças de UI reutilizáveis, cada uma com uma única responsabilidade
│   ├── BottomNav.tsx      # barra de navegação fixa no fundo (Explorar/Favoritos/Sobre)
│   ├── ContinentGrid.tsx  # azulejos de filtro por continente
│   ├── CountryListItem.tsx
│   ├── FavoriteButton.tsx
│   ├── GlobeIllustration.tsx  # ilustração decorativa, só SVG
│   ├── MountainBanner.tsx     # ilustração decorativa, só SVG
│   ├── Loader.tsx / StateMessage.tsx / SearchBar.tsx / StatRow.tsx / Tabs.tsx
├── context/
│   ├── CountriesContext.tsx   # busca a lista de países UMA vez, partilha por toda a app
│   └── FavoritesContext.tsx   # favoritos persistidos em localStorage
├── hooks/
│   └── useCountryFilter.ts    # filtragem local (pesquisa + continente)
├── lib/
│   ├── countriesRepository.ts # o ÚNICO ficheiro que sabe de onde vêm os dados
│   └── flags.ts               # URLs das bandeiras (flagcdn.com)
├── pages/
│   ├── ExplorePage.tsx      # "/"           — hero, pesquisa, filtros, lista
│   ├── FavoritesPage.tsx    # "/favoritos"  — países guardados
│   ├── AboutPage.tsx        # "/sobre"      — info do projeto
│   └── CountryDetailPage.tsx # "/pais/:code" — detalhe com separadores
├── types/country.ts   # tipos TypeScript partilhados por toda a app
├── App.tsx             # define as rotas (react-router-dom)
├── main.tsx             # ponto de entrada, monta os providers
├── App.css / index.css  # estilos dos componentes / tokens globais
scripts/
└── build-country-data.cjs  # gera public/countries.json a partir de datasets abertos
public/
└── countries.json      # os dados dos 195 países, servidos como ficheiro estático
```

### Porquê Context API em vez de passar props?

Sem Context, a lista de países teria de ser pedida em cada página, ou
passada manualmente de componente em componente até chegar onde é
precisa ("prop drilling"). Com `CountriesProvider`, qualquer página
(Explorar, Favoritos, Detalhe) acede aos mesmos dados sem repetir o
pedido — só há UM `fetch()` em toda a navegação da aplicação.

---

## 4. Ideias para continuares a praticar

- [ ] Mostrar os países vizinhos na página de detalhe como cartões clicáveis
- [ ] Adicionar um tema claro/escuro com `ThemeContext`
- [ ] Ordenar a lista por população (crescente/decrescente)
- [ ] Animações de transição entre páginas com `framer-motion`
- [ ] Ligar a um verdadeiro serviço de câmbio (ex: [frankfurter.app](https://frankfurter.app),
      gratuito e sem chave) para mostrar a cotação da moeda de cada país

---

## Tecnologias usadas

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) — navegação entre páginas
- [lucide-react](https://lucide.dev/) — ícones
- [flagcdn.com](https://flagcdn.com) — imagens das bandeiras (gratuito, sem chave)

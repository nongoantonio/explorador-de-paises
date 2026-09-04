# 🌍 Atlas Interativo

Projeto de estudo em **React + TypeScript + Vite**: um "atlas" para
explorar bandeira, capital, população e moeda de 195 países, com
favoritos guardados no browser, animações e pesquisa em português.
Desenhado como uma app móvel, com barra de navegação inferior e
página de detalhe por país.

🔗 **Site publicado:** `https://nongoantonio.github.io/explorador-de-paises/`
(substitui pelo teu URL real depois do primeiro deploy — ver secção 2)

---

## 1. Como correr este projeto localmente

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

## 2. Como publicar no GitHub Pages

Este projeto já vem preparado para o GitHub Pages, com um workflow do
GitHub Actions (`.github/workflows/deploy.yml`) que publica o site
automaticamente sempre que fazes `push` para a branch `main`.

### Passo a passo (só precisas de fazer isto uma vez)

1. **Confirma o nome do teu repositório no GitHub** (ex.: `explorador-de-paises`).
   Se for diferente, abre `vite.config.ts` e muda a linha:
   ```ts
   base: '/explorador-de-paises/',
   ```
   para o nome exato do teu repositório (tem de bater certo com o URL,
   incluindo maiúsculas/minúsculas).

2. **Envia o código para o GitHub**, se ainda não tiveres feito:
   ```bash
   git add .
   git commit -m "chore: prepara o projeto para publicação no GitHub Pages"
   git push
   ```

3. **Ativa o GitHub Pages no repositório**:
   - Vai a **Settings → Pages** no teu repositório
   - Em **"Build and deployment" → "Source"**, escolhe **"GitHub Actions"**
     (não escolhas "Deploy from a branch")

4. **Espera pelo deploy automático**: vai ao separador **"Actions"** do
   teu repositório — deve aparecer um workflow chamado
   *"Publicar no GitHub Pages"* a correr. Quando ficar verde (✅), o
   site já está no ar.

5. O URL final aparece em **Settings → Pages**, normalmente:
   ```
   https://TEU-UTILIZADOR.github.io/explorador-de-paises/
   ```

### Sempre que quiseres atualizar o site publicado

Não precisas de fazer mais nada especial — o workflow corre sozinho a
cada `push` para `main`:

```bash
git add .
git commit -m "descrição da alteração"
git push
```

### Porquê algumas decisões técnicas específicas para o GitHub Pages

- **`base` no `vite.config.ts`**: o GitHub Pages publica o site numa
  subpasta (`/explorador-de-paises/`), não na raiz do domínio. Sem isto,
  os ficheiros JS/CSS e os ícones não seriam encontrados.
- **`HashRouter` em vez de `BrowserRouter`** (em `src/main.tsx`): o
  GitHub Pages só serve ficheiros estáticos, sem servidor a redirecionar
  rotas. Com `BrowserRouter`, recarregar a página numa rota como
  `/pais/AGO` dava erro 404. Com `HashRouter`, as rotas ficam depois de
  um `#` (ex.: `.../#/pais/AGO`), que o browser nunca envia ao servidor
  — por isso nunca há 404.
- **`fetch(import.meta.env.BASE_URL + "countries.json")`** (em
  `src/lib/countriesRepository.ts`): mesma razão do `base` — sem isto,
  o pedido ia sempre para a raiz do domínio em vez da subpasta correta.

---

## 3. Estrutura do projeto

```
.github/workflows/
└── deploy.yml           # publica o site no GitHub Pages a cada push
src/
├── components/        # peças de UI reutilizáveis, cada uma com uma única responsabilidade
├── context/
│   ├── CountriesContext.tsx   # busca a lista de países UMA vez, partilha por toda a app
│   └── FavoritesContext.tsx   # favoritos persistidos em localStorage
├── hooks/
│   ├── useCountryFilter.ts    # filtragem local (pesquisa + continente)
│   └── useCountryImage.ts     # busca a imagem de paisagem de um país (Wikipedia)
├── lib/
│   ├── countriesRepository.ts # o ÚNICO ficheiro que sabe de onde vêm os dados
│   ├── flags.ts               # URLs das bandeiras (flagcdn.com)
│   ├── wikipedia.ts           # busca a imagem de paisagem via API da Wikipedia
│   └── normalizeSearchText.ts # normaliza texto (sem acentos/maiúsculas) para a pesquisa
├── pages/
│   ├── ExplorePage.tsx      # "/"           — hero, pesquisa, filtros, lista
│   ├── FavoritesPage.tsx    # "/favoritos"  — países guardados
│   ├── AboutPage.tsx        # "/sobre"      — perfil do autor + info do projeto
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

---

## 4. Ideias para continuares a praticar

- [ ] Mostrar os países vizinhos na página de detalhe como cartões clicáveis
- [ ] Adicionar um tema claro/escuro com `ThemeContext`
- [ ] Ordenar a lista por população (crescente/decrescente)
- [ ] Ligar a um verdadeiro serviço de câmbio (ex: [frankfurter.app](https://frankfurter.app),
      gratuito e sem chave) para mostrar a cotação da moeda de cada país
- [ ] Adicionar um domínio próprio ao GitHub Pages (Settings → Pages → Custom domain)

---

## Tecnologias usadas

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) (`HashRouter`) — navegação entre páginas
- [Framer Motion](https://motion.dev/) — animações
- [lucide-react](https://lucide.dev/) + [react-icons](https://react-icons.github.io/react-icons/) — ícones
- [flagcdn.com](https://flagcdn.com) — imagens das bandeiras (gratuito, sem chave)
- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) — imagens de paisagem (gratuito, sem chave)
- **GitHub Actions** — build e deploy automático para o GitHub Pages

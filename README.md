# 🌍 Explorador de Países

Projeto de estudo em **React + TypeScript + Vite**, que consome a
[REST Countries API](https://restcountries.com) (gratuita, sem necessidade
de chave/API key) para pesquisar países por nome, filtrar por continente e
ver bandeira, capital, população e moeda.

Este README serve dois propósitos: (1) ensinar-te a criar este tipo de
projeto **do zero**, para o caso de quereres repetir o processo sozinho(a)
num próximo projeto, e (2) explicar como correr **este** projeto específico.

---

## 1. Como criar um projeto assim do zero (passo a passo)

Se quiseres criar o teu próprio projeto React + TypeScript com Vite, sem
partir deste ficheiro, o processo é:

```bash
# 1. Criar o projeto (o Vite pergunta o nome e o template — escolhe "React" e "TypeScript")
npm create vite@latest nome-do-teu-projeto

cd nome-do-teu-projeto

# 2. Instalar as dependências
npm install

# 3. (opcional) instalar bibliotecas extra, como animações
npm install framer-motion

# 4. Correr o servidor de desenvolvimento
npm run dev
```

O Vite vai abrir um servidor local (normalmente em `http://localhost:5173`)
com **hot reload**: sempre que gravas um ficheiro, a página atualiza sozinha.

---

## 2. Como correr ESTE projeto

```bash
# Dentro da pasta do projeto:
npm install
npm run dev
```

Depois abre o URL que aparece no terminal (geralmente `http://localhost:5173`).

Outros comandos úteis:

| Comando           | O que faz                                             |
| ------------------ | ------------------------------------------------------ |
| `npm run dev`       | servidor de desenvolvimento com hot reload             |
| `npm run build`     | compila TypeScript e gera a versão de produção em `dist/` |
| `npm run preview`   | serve localmente a versão de produção já compilada     |
| `npm run lint`      | verifica o código com o linter (oxlint)                |

---

## 3. Como criar o repositório no GitHub e enviar o projeto

Passo a passo, assumindo que já tens conta no GitHub e o `git` instalado:

1. **Inicializar o git localmente** (dentro da pasta do projeto):
   ```bash
   git init
   git add .
   git commit -m "primeiro commit: estrutura inicial do projeto"
   ```

2. **Criar o repositório no GitHub**:
   - Vai a [github.com/new](https://github.com/new)
   - Dá um nome ao repositório (ex.: `explorador-de-paises`)
   - **Não marques** a opção de criar README/`.gitignore`/licença automaticamente
     (já os temos localmente, evita conflitos)
   - Clica em "Create repository"

3. **Ligar o repositório local ao GitHub e enviar o código**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TEU-UTILIZADOR/explorador-de-paises.git
   git push -u origin main
   ```

4. Para os próximos commits, basta:
   ```bash
   git add .
   git commit -m "descrição do que mudaste"
   git push
   ```

> 💡 Dica: usa mensagens de commit descritivas (ex.: `"adiciona filtro por continente"`
> em vez de `"update"`). Ajuda-te a ti no futuro a perceber o histórico do projeto.

---

## 4. Estrutura do projeto

```
countries-explorer/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/          # componentes visuais, cada um com uma única responsabilidade
│   │   ├── CountryCard.tsx   # cartão individual de um país
│   │   ├── CountryGrid.tsx   # grelha que organiza os cartões + animação em cascata
│   │   ├── Hero.tsx          # cabeçalho com título, pesquisa e filtros
│   │   ├── Loader.tsx        # animação de "a carregar"
│   │   ├── RegionFilter.tsx  # botões de filtro por continente
│   │   ├── SearchBar.tsx     # campo de pesquisa por nome
│   │   └── StateMessage.tsx  # mensagens de erro / sem resultados
│   ├── hooks/
│   │   └── useCountries.ts   # TODA a lógica de estado e chamadas à API
│   ├── services/
│   │   └── countriesApi.ts   # única camada que "conhece" a REST Countries API
│   ├── types/
│   │   └── country.ts        # tipos/interfaces TypeScript dos dados da API
│   ├── App.tsx                # junta tudo, decide o que mostrar consoante o estado
│   ├── App.css                # estilos dos componentes
│   ├── index.css              # reset global, fontes e variáveis de design (tokens)
│   └── main.tsx                # ponto de entrada da aplicação
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Porquê esta organização?

Esta estrutura separa **responsabilidades**:

- **`services/`** — só sabe falar com a API externa. Se um dia quiseres trocar
  de API, só mexes aqui.
- **`hooks/`** — só sabe gerir estado (loading, erro, dados, pesquisa). Não
  sabe nada de HTML/CSS.
- **`components/`** — só sabem desenhar UI a partir de dados que recebem via
  *props*. Não sabem de onde vêm os dados.
- **`types/`** — o "dicionário" partilhado por todos, para o TypeScript
  nos avisar de erros antes mesmo de corrermos o código.

Esta separação (API ↔ estado ↔ apresentação) é um padrão muito comum em
projetos React reais, e vale a pena praticares em todos os teus próximos
projetos com API.

---

## 5. Ideias para continuares a praticar

Depois de teres isto a funcionar, experimenta adicionar sozinho(a):

- [ ] Página de detalhe ao clicar num país (usa `react-router-dom` para criar rotas)
- [ ] Mostrar países vizinhos (a API devolve os códigos `borders` de cada país)
- [ ] Um botão de "favoritos", guardando os países escolhidos no `localStorage`
- [ ] Alternar entre tema claro e escuro
- [ ] Ordenar por população (crescente/decrescente)
- [ ] Testes automáticos simples com [Vitest](https://vitest.dev/)

---

## Tecnologias usadas

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Framer Motion](https://motion.dev/) — animações
- [REST Countries API](https://restcountries.com) — dados dos países (gratuita, sem chave)

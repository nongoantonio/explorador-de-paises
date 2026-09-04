import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ⚠️ IMPORTANTE para o GitHub Pages: o site fica publicado em
  // https://TEU-UTILIZADOR.github.io/NOME-DO-REPOSITORIO/ — ou seja,
  // não vive na raiz do domínio, vive numa subpasta. O "base" diz ao
  // Vite para construir todos os caminhos dos ficheiros (JS, CSS,
  // imagens) já com esse prefixo. Tem de bater certo com o nome EXATO
  // do repositório no GitHub (o que aparece no URL, incluindo
  // maiúsculas/minúsculas).
  base: '/explorador-de-paises/',
})

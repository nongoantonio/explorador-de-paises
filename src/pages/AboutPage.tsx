export function AboutPage() {
  return (
    <div className="simple-page">
      <header className="simple-page__header">
        <h1>Sobre este projeto</h1>
        <p>Um atlas interativo, construído para aprender React + TypeScript.</p>
      </header>

      <section className="about-section">
        <h2>De onde vêm os dados</h2>
        <p>
          Os dados de cada país (nome, capital, região, população, moeda) vêm de
          um dataset aberto, servido como ficheiro estático desta própria
          aplicação. As bandeiras vêm do{" "}
          <a href="https://flagcdn.com" target="_blank" rel="noreferrer">
            flagcdn.com
          </a>
          , um CDN gratuito e sem necessidade de chave de API.
        </p>
      </section>

      <section className="about-section">
        <h2>Tecnologias usadas</h2>
        <ul className="about-section__list">
          <li>React 19 + TypeScript</li>
          <li>Vite</li>
          <li>React Router — navegação entre páginas</li>
          <li>Context API — partilha de dados e favoritos entre páginas</li>
          <li>localStorage — persistência dos favoritos no browser</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Favoritos</h2>
        <p>
          Os países favoritos ficam guardados apenas neste dispositivo e
          browser — não há conta nem servidor a guardar essa informação.
        </p>
      </section>
    </div>
  );
}

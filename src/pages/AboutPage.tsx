import { FaGithub, FaLinkedin } from "react-icons/fa";

// ⚠️ Substitui estes dois links pelos teus, antes de publicares o site.
const GITHUB_URL = "https://github.com/nongoantonio";
const LINKEDIN_URL = "https://www.linkedin.com/in/nongo-ant%C3%B3nio-9691603a3/";

const SKILLS = ["React", "Node.js", "TypeScript", "UI/UX Design"];

export function AboutPage() {
  return (
    <div className="simple-page">
      {/* ---------- Perfil do autor ---------- */}
      <section className="profile-card">
        <img
          src={`${import.meta.env.BASE_URL}profile-nongo.jpg`}
          alt="Foto de Nongo António"
          className="profile-card__avatar"
        />

        <h1 className="profile-card__name">Nongo António</h1>
        <p className="profile-card__role">
          Software Engineer · Web Developer · UI/UX Designer
        </p>

        <ul className="profile-card__tags">
          {SKILLS.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <p className="profile-card__bio">
          I believe in continuous learning and constantly strive to grow by
          exploring new technologies, tools, and best practices — building
          solutions that solve real problems and add value to people and
          organizations. I value collaboration, innovation, and crafting
          quality software.
        </p>

        <div className="profile-card__links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            <FaGithub size={18} aria-hidden="true" />
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            <FaLinkedin size={18} aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </section>

      {/* ---------- Sobre o projeto ---------- */}
      <header className="simple-page__header">
        <h2>Sobre este projeto</h2>
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
          , um CDN gratuito e sem necessidade de chave de API, e as paisagens
          vêm da{" "}
          <a href="https://www.wikipedia.org" target="_blank" rel="noreferrer">
            Wikipedia
          </a>
          .
        </p>
      </section>

      <section className="about-section">
        <h2>Tecnologias usadas</h2>
        <ul className="about-section__list">
          <li>React 19 + TypeScript</li>
          <li>Vite</li>
          <li>React Router — navegação entre páginas</li>
          <li>Context API — partilha de dados e favoritos entre páginas</li>
          <li>Framer Motion — animações</li>
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

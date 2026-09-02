// Componente simples e "burro" (sem lógica própria): só recebe
// que está tudo a carregar e mostra uma animação de bússola a rodar.
// Usar CSS puro aqui (em vez de framer-motion) porque é uma animação
// contínua e simples — não há necessidade de trazer JS para isto.
export function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__compass" aria-hidden="true" />
      <p>A localizar países no mapa...</p>
    </div>
  );
}

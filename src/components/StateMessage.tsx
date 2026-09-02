// Um único componente para os dois casos "sem resultados" e "erro",
// já que visualmente são muito parecidos. Isto evita duplicar código.
interface StateMessageProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export function StateMessage({ title, description, onRetry }: StateMessageProps) {
  return (
    <div className="state-message">
      <h2>{title}</h2>
      <p>{description}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Ver todos os países
        </button>
      )}
    </div>
  );
}

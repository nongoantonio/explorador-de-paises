interface StateMessageProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function StateMessage({ title, description, actionLabel, onAction }: StateMessageProps) {
  return (
    <div className="state-message">
      <h2>{title}</h2>
      <p>{description}</p>
      {onAction && actionLabel && (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

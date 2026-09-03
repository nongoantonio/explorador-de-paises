import type { ComponentType } from "react";

interface StatRowProps {
  icon: ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}

export function StatRow({ icon: Icon, label, value }: StatRowProps) {
  return (
    <div className="stat-row">
      <span className="stat-row__icon">
        <Icon size={20} strokeWidth={2} aria-hidden={true} />
      </span>
      <div className="stat-row__text">
        <span className="stat-row__label">{label}</span>
        <strong className="stat-row__value">{value}</strong>
      </div>
    </div>
  );
}

import type { RoleSummary } from "../data";

interface Props {
  currentRole: RoleSummary;
  nextRole: RoleSummary;
  compact?: boolean;
}

function GaugeBar({
  label,
  pts,
  available,
  pct,
  threshold,
  eligible,
  compact,
}: {
  label: string;
  pts: number;
  available: number;
  pct: number;
  threshold: number;
  eligible: boolean;
  compact?: boolean;
}) {
  const fillPct = Math.min(pct * 100, 100);
  const thresholdPct = threshold * 100;
  const color = eligible ? "#10b981" : pct >= threshold * 0.85 ? "#f59e0b" : "#6366f1";

  return (
    <div className={compact ? "gauge-row compact" : "gauge-row"}>
      <div className="gauge-label-row">
        <span className="gauge-role-label">{label}</span>
        <span className="gauge-pts">
          {pts} / {available} pts
          {eligible && <span className="gauge-badge">✓ Eligible</span>}
        </span>
      </div>
      <div
        className="gauge-track"
        role="progressbar"
        aria-valuenow={Math.round(fillPct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${Math.round(fillPct)}% of ${Math.round(thresholdPct)}% required`}
      >
        <div
          className="gauge-fill"
          style={{ width: `${fillPct}%`, background: color }}
        />
        <div
          className="gauge-threshold"
          style={{ left: `${thresholdPct}%` }}
          title={`Promotion threshold: ${Math.round(thresholdPct)}%`}
        />
      </div>
      <div className="gauge-labels">
        <span>{Math.round(fillPct)}%</span>
        <span className="gauge-threshold-label">
          {Math.round(thresholdPct)}% required
        </span>
      </div>
    </div>
  );
}

export default function PromotionGauge({ currentRole, nextRole, compact }: Props) {
  return (
    <div className={compact ? "promotion-gauge compact" : "promotion-gauge"}>
      {!compact && <h4 className="gauge-title">Promotion Progress</h4>}
      <GaugeBar
        label={currentRole.role_title}
        pts={currentRole.current_points}
        available={currentRole.available_points}
        pct={currentRole.percentage}
        threshold={currentRole.promotion_threshold_required}
        eligible={currentRole.promotion_eligible}
        compact={compact}
      />
      <GaugeBar
        label={nextRole.role_title}
        pts={nextRole.current_points}
        available={nextRole.available_points}
        pct={nextRole.percentage}
        threshold={nextRole.promotion_threshold_required}
        eligible={nextRole.promotion_eligible}
        compact={compact}
      />
    </div>
  );
}

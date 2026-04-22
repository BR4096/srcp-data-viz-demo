import type { SrcpReport } from "../data";

interface Props {
  report: SrcpReport;
  theme?: "layout" | "insight";
}

interface StatCardProps {
  value: string;
  label: string;
  sub: string;
  status?: "met" | "close" | "eligible" | "default";
  theme: "layout" | "insight";
}

function StatCard({ value, label, sub, status = "default", theme }: StatCardProps) {
  const accent = theme === "layout" ? "#10b981" : "#f59e0b";
  const accentLight = theme === "layout" ? "#d1fae5" : "#fef3c7";
  const accentBorder = theme === "layout" ? "#6ee7b7" : "#fde68a";
  const accentText = theme === "layout" ? "#065f46" : "#78350f";

  const style =
    status === "met" || status === "eligible"
      ? { background: accentLight, borderColor: accentBorder, color: accentText }
      : status === "close"
      ? { background: "#fef9c3", borderColor: "#fde047", color: "#713f12" }
      : {};

  return (
    <div className="stat-card" style={style}>
      <div
        className="stat-value"
        style={
          status === "met" || status === "eligible" ? { color: accent } : {}
        }
      >
        {value}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

export default function StatsCards({ report, theme = "layout" }: Props) {
  const { scoring_summary: ss, current_role_summary: cr, next_role_summary: nr } =
    report;

  const currPct = Math.round(ss.current_role_percentage * 100);
  const nextPct = Math.round(ss.next_role_percentage * 100);
  const currThreshold = Math.round(cr.promotion_threshold_required * 100);
  const nextThreshold = Math.round(nr.promotion_threshold_required * 100);

  const currStatus: StatCardProps["status"] =
    currPct >= currThreshold
      ? "met"
      : currPct >= currThreshold * 0.85
      ? "close"
      : "default";

  const nextStatus: StatCardProps["status"] =
    nextPct >= nextThreshold ? "met" : "default";

  return (
    <div className="stats-cards">
      <StatCard
        theme={theme}
        value={`${ss.total_current_role_points}`}
        label="Current Points"
        sub={`of ${ss.available_current_role_points} available`}
      />
      <StatCard
        theme={theme}
        value={`${currPct}%`}
        label="% Current Level"
        sub={`${currThreshold}% required`}
        status={currStatus}
      />
      <StatCard
        theme={theme}
        value={`${nextPct}%`}
        label="% Next Level"
        sub={`${nextThreshold}% required`}
        status={nextStatus}
      />
      <StatCard
        theme={theme}
        value={ss.promotion_eligible ? "✓ Eligible" : "In Progress"}
        label="Promotion Status"
        sub={ss.promotion_eligible ? "Both thresholds met" : "Threshold not yet reached"}
        status={ss.promotion_eligible ? "eligible" : "default"}
      />
    </div>
  );
}

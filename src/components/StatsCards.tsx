import type React from "react";
import type { SrcpReport } from "../data";

interface Props {
  report: SrcpReport;
  theme?: "layout" | "insight";
}

interface StatCardProps {
  value: string;
  label: string;
  sub: string;
  status?: "met" | "close" | "next" | "eligible" | "default";
  theme: "layout" | "insight";
}

type StatusStyle = {
  card: React.CSSProperties;
  value: React.CSSProperties;
  label: React.CSSProperties;
  sub: React.CSSProperties;
};

const NONE: React.CSSProperties = {};

function statusStyles(status: StatCardProps["status"], theme: StatCardProps["theme"]): StatusStyle {
  if (status === "default") return { card: NONE, value: NONE, label: NONE, sub: NONE };

  if (theme === "layout") {
    if (status === "met" || status === "eligible")
      return {
        card: { background: "#d1fae5", borderColor: "#6ee7b7" },
        value: { color: "#10b981" },
        label: { color: "#065f46" },
        sub:   { color: "#047857" },
      };
    if (status === "close")
      return {
        card: { background: "#fef9c3", borderColor: "#fde047" },
        value: { color: "#ca8a04" },
        label: { color: "#713f12" },
        sub:   { color: "#92400e" },
      };
    if (status === "next")
      return {
        card: { background: "#ede9fe", borderColor: "#a78bfa" },
        value: { color: "#7c3aed" },
        label: { color: "#5b21b6" },
        sub:   { color: "#6d28d9" },
      };
  }

  // Dark-background variants (Insight tab)
  if (status === "met")
    return {
      card: { background: "#052e16", borderColor: "#16a34a" },
      value: { color: "#4ade80" },
      label: { color: "#34d399" },
      sub:   { color: "#6ee7b7" },
    };
  if (status === "eligible")
    return {
      card: { background: "#1e1b4b", borderColor: "#4f46e5" },
      value: { color: "#818cf8" },
      label: { color: "#a5b4fc" },
      sub:   { color: "#c7d2fe" },
    };
  if (status === "close")
    return {
      card: { background: "#1c0d00", borderColor: "#b45309" },
      value: { color: "#f59e0b" },
      label: { color: "#fbbf24" },
      sub:   { color: "#d97706" },
    };
  if (status === "next")
    return {
      card: { background: "#1e1b4b", borderColor: "#4f46e5" },
      value: { color: "#818cf8" },
      label: { color: "#a5b4fc" },
      sub:   { color: "#c7d2fe" },
    };

  return { card: NONE, value: NONE, label: NONE, sub: NONE };
}

function StatCard({ value, label, sub, status = "default", theme }: StatCardProps) {
  const { card: cardStyle, value: valueStyle, label: labelStyle, sub: subStyle } = statusStyles(status, theme);

  return (
    <div className="stat-card" style={cardStyle}>
      <div className="stat-value" style={valueStyle}>{value}</div>
      <div className="stat-label" style={labelStyle}>{label}</div>
      <div className="stat-sub"  style={subStyle}>{sub}</div>
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
    nextPct >= nextThreshold ? "met" : "next";

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

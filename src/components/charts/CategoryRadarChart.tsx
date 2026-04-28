import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { SkillEntry } from "../../data";
import { categoryAverages } from "../../utils/groupByCategory";

export interface RadarSeries {
  skills: SkillEntry[];
  color: string;
  label: string;
}

// Multi-series props (new API)
interface MultiSeriesProps {
  series: RadarSeries[];
  height?: number;
  textColor?: string;
  // legacy props not used, but must not be present to disambiguate
  skills?: never;
  color?: never;
}

// Single-IC legacy props (backward compat)
interface LegacyProps {
  skills: SkillEntry[];
  color?: string;
  height?: number;
  textColor?: string;
  series?: never;
}

type Props = MultiSeriesProps | LegacyProps;

interface TooltipPayload {
  name: string;
  color: string;
  payload: Record<string, unknown>;
  value: number;
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.length) return null;
  const fullSubject = payload[0]?.payload?.fullSubject as string | undefined;
  return (
    <div className="chart-tooltip">
      <div className="tooltip-title">{fullSubject ?? ""}</div>
      {payload.map((p) => (
        <div key={p.name} className="tooltip-value" style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" ? p.value.toFixed(1) : p.value} / 3
        </div>
      ))}
    </div>
  );
}

export default function CategoryRadarChart(props: Props) {
  const height = props.height ?? 300;
  const textColor = props.textColor;
  const axisColor = textColor ?? "#64748b";
  const tickColor = textColor ? `${textColor}99` : "#94a3b8";

  // Normalize to series array
  const series: RadarSeries[] = props.series
    ? props.series
    : [{ skills: props.skills, color: props.color ?? "#6366f1", label: "Rating" }];

  // Build merged data: all subjects from the union of all series' categories,
  // keyed by the series label.
  type DataPoint = { subject: string; fullSubject: string; fullMark: number } & Record<string, number>;

  const subjectMap = new Map<string, DataPoint>();

  series.forEach(({ skills, label }) => {
    const avgs = categoryAverages(skills);
    avgs.forEach(({ subject, fullSubject, value, fullMark }) => {
      if (!subjectMap.has(subject)) {
        subjectMap.set(subject, { subject, fullSubject, fullMark } as DataPoint);
      }
      const entry = subjectMap.get(subject)!;
      entry[label] = value;
    });
  });

  const data = Array.from(subjectMap.values());
  const showLegend = series.length > 1;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke={textColor ? "#334155" : "#e2e8f0"} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fill: axisColor, fontWeight: 600 }}
        />
        <PolarRadiusAxis
          domain={[0, 3]}
          tick={{ fontSize: 10, fill: tickColor }}
          tickCount={4}
        />
        {series.map(({ color, label }) => (
          <Radar
            key={label}
            name={label}
            dataKey={label}
            stroke={color}
            fill={color}
            fillOpacity={showLegend ? 0.15 : 0.25}
            strokeWidth={2}
          />
        ))}
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            wrapperStyle={{
              fontSize: 12,
              color: textColor ?? "#64748b",
              paddingTop: 4,
            }}
          />
        )}
      </RadarChart>
    </ResponsiveContainer>
  );
}

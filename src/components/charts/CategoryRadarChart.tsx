import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { SkillEntry } from "../../data";
import { categoryAverages } from "../../utils/groupByCategory";

interface Props {
  skills: SkillEntry[];
  color?: string;
  height?: number;
  textColor?: string;
}

interface TooltipPayload {
  payload: { fullSubject: string; value: number };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const { fullSubject, value } = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <div className="tooltip-title">{fullSubject}</div>
      <div className="tooltip-value">Avg: {value.toFixed(1)} / 5</div>
    </div>
  );
}

export default function CategoryRadarChart({
  skills,
  color = "#6366f1",
  height = 300,
  textColor,
}: Props) {
  const data = categoryAverages(skills);
  const axisColor = textColor ?? "#64748b";
  const tickColor = textColor ? `${textColor}99` : "#94a3b8";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke={textColor ? "#334155" : "#e2e8f0"} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fill: axisColor, fontWeight: 600 }}
        />
        <PolarRadiusAxis
          domain={[0, 5]}
          tick={{ fontSize: 10, fill: tickColor }}
          tickCount={6}
        />
        <Radar
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

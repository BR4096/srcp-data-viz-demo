import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { SkillEntry } from "../../data";
import { trendValues } from "../../utils/groupByCategory";

interface Props {
  skill: SkillEntry;
  color?: string;
  height?: number;
}

export default function RatingTrendChart({
  skill,
  color = "#6366f1",
  height = 60,
}: Props) {
  const vals = trendValues(skill);
  if (vals.length < 2) return null;

  const labels = ["3 ago", "2 ago", "Prev", "Now"].slice(
    4 - vals.length
  );
  const data = vals.map((v, i) => ({ cycle: labels[i], rating: v }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -24 }}>
        <XAxis dataKey="cycle" tick={{ fontSize: 9, fill: "#94a3b8" }} />
        <YAxis domain={[0, 5]} hide />
        <ReferenceLine y={3} stroke="#e2e8f0" strokeDasharray="3 3" />
        <Tooltip
          formatter={(v) => [`${v}/5`, "Rating"]}
          labelStyle={{ fontSize: 10 }}
          contentStyle={{ fontSize: 11 }}
        />
        <Line
          type="monotone"
          dataKey="rating"
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3, fill: color }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

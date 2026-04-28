import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { SkillEntry } from "../../data";
import { ratingColor } from "../../utils/groupByCategory";

type SortOrder = "desc" | "asc" | "alpha";

interface Props {
  skills: SkillEntry[];
  height?: number;
  sortOrder?: SortOrder;
}

interface TooltipPayload {
  payload: SkillEntry & { name: string };
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.length) return null;
  const skill = payload[0].payload;
  const preview =
    skill.rating_support_comments.length > 180
      ? skill.rating_support_comments.slice(0, 180) + "…"
      : skill.rating_support_comments;
  return (
    <div className="chart-tooltip skill-tooltip">
      <div className="tooltip-title">{skill.description_context}</div>
      <div className="tooltip-rating">Rating: {skill.current_rating} / 3</div>
      <div className="tooltip-comment">{preview}</div>
    </div>
  );
}

export default function SkillBarChart({ skills, height, sortOrder = "desc" }: Props) {
  const sorted = [...skills].sort((a, b) => {
    if (sortOrder === "asc") return a.current_rating - b.current_rating;
    if (sortOrder === "alpha") return a.description_context.localeCompare(b.description_context);
    return b.current_rating - a.current_rating;
  });
  const data = sorted.map((s) => ({
    ...s,
    name:
      s.description_context.length > 28
        ? s.description_context.slice(0, 28) + "…"
        : s.description_context,
  }));

  const barHeight = Math.max(skills.length * 44, 120);

  return (
    <ResponsiveContainer width="100%" height={height ?? barHeight}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
        <XAxis
          type="number"
          domain={[0, 3]}
          ticks={[0, 1, 2, 3]}
          tick={{ fontSize: 11, fill: "#64748b" }}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={160}
          tick={{ fontSize: 11, fill: "#475569" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="current_rating" radius={[0, 4, 4, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={ratingColor(entry.current_rating)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

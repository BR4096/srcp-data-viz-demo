import { useState } from "react";
import { useDataset } from "../context/DataContext";
import { groupByCategory, categoryAverages } from "../utils/groupByCategory";
import CategoryRadarChart from "./charts/CategoryRadarChart";
import type { RadarSeries } from "./charts/CategoryRadarChart";
import SkillBarChart from "./charts/SkillBarChart";
import RatingTrendChart from "./charts/RatingTrendChart";
import type { SkillEntry } from "../data";

const IC_COLORS = ["#6366f1", "#10b981", "#f59e0b"];
const TEAM_COLOR = "#e879f9";

type SortOrder = "desc" | "asc" | "alpha";
type ViewMode = "single" | "compare" | "team";

const SORT_LABELS: Record<SortOrder, string> = {
  desc: "↓ Rating",
  asc: "↑ Rating",
  alpha: "A–Z",
};

const MODE_LABELS: Record<ViewMode, string> = {
  single: "Single",
  compare: "Compare",
  team: "Team",
};

/** Average category ratings across multiple IC skill arrays into synthetic SkillEntry[]. */
function teamAverageSkills(allSkills: SkillEntry[][]): SkillEntry[] {
  if (allSkills.length === 0) return [];

  // Gather all category names across all ICs
  const categoryMap = new Map<string, number[]>();
  allSkills.forEach((skills) => {
    const avgs = categoryAverages(skills);
    avgs.forEach(({ fullSubject, value }) => {
      if (!categoryMap.has(fullSubject)) categoryMap.set(fullSubject, []);
      categoryMap.get(fullSubject)!.push(value);
    });
  });

  // Synthesize one SkillEntry per category (current_rating = mean)
  let ref = 1;
  const result: SkillEntry[] = [];
  categoryMap.forEach((values, cat) => {
    const avg = values.reduce((s, v) => s + v, 0) / values.length;
    result.push({
      reference_number: ref++,
      prior_reference_number: ref,
      skill_category: cat,
      description_context: cat,
      current_rating: parseFloat(avg.toFixed(1)),
      rating_support_comments: "",
      previous_rating_1: null,
      previous_rating_2: null,
      previous_rating_3: null,
    });
  });
  return result;
}

export default function VisualizationTab() {
  const { dataset } = useDataset();
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  // Single mode: single index
  const [selectedIC, setSelectedIC] = useState(0);
  // Compare mode: ordered array of up to 2 IC indices
  const [compareICs, setCompareICs] = useState<number[]>([0, 1]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // ── Derived: primary IC (for SkillBarChart / RatingTrend) ──
  const primaryIdx =
    viewMode === "single"
      ? Math.min(selectedIC, dataset.length - 1)
      : viewMode === "compare"
      ? compareICs[0] ?? 0
      : 0;
  const ic = dataset[primaryIdx];

  const grouped = groupByCategory(ic.skills);
  const categories = Object.keys(grouped);
  const activeCat =
    selectedCategory && grouped[selectedCategory] ? selectedCategory : categories[0];
  const categorySkills = grouped[activeCat] ?? [];

  const skillsWithTrend = ic.skills.filter(
    (s) => s.previous_rating_1 !== null || s.previous_rating_2 !== null
  );

  // ── Radar series ──
  let radarSeries: RadarSeries[];
  let radarTitle: string;
  let radarSub: string;

  if (viewMode === "team") {
    const synthetic = teamAverageSkills(dataset.map((d) => d.skills));
    radarSeries = [{ skills: synthetic, color: TEAM_COLOR, label: "Team Avg" }];
    radarTitle = "Competency Profile — Team Average";
    radarSub = "Mean category ratings across all ICs (0–3 scale)";
  } else if (viewMode === "compare") {
    radarSeries = compareICs.map((idx) => ({
      skills: dataset[idx].skills,
      color: IC_COLORS[idx % IC_COLORS.length],
      label: dataset[idx].metadata.employee_name,
    }));
    const names = compareICs
      .map((i) => dataset[i].metadata.employee_name)
      .join(" vs ");
    radarTitle = `Competency Profile — ${names}`;
    radarSub = "Category average ratings overlaid (0–3 scale)";
  } else {
    radarSeries = [
      {
        skills: ic.skills,
        color: IC_COLORS[selectedIC % IC_COLORS.length],
        label: ic.metadata.employee_name,
      },
    ];
    radarTitle = `Competency Profile — ${ic.metadata.employee_name}`;
    radarSub = "Category average ratings (0–3 scale)";
  }

  // ── Compare toggle helpers ──
  function handleCompareClick(idx: number) {
    setCompareICs((prev) => {
      if (prev.includes(idx)) {
        // Deselect: remove, but keep at least 1
        const next = prev.filter((i) => i !== idx);
        return next.length > 0 ? next : prev;
      }
      if (prev.length < 2) {
        return [...prev, idx];
      }
      // Replace oldest (first) selection
      return [prev[1], idx];
    });
  }

  return (
    <div className="tab visualization">
      <div className="viz-header">
        <h2>Visualization Dashboard</h2>
        <p className="tab-subtitle">
          65% emphasis on data richness — radar profiles, skill breakdowns, and
          rating trends
        </p>

        {/* Mode selector */}
        <div className="viz-mode-toggle" role="group" aria-label="View mode">
          {(["single", "compare", "team"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              className={`viz-mode-btn${viewMode === mode ? " active" : ""}`}
              onClick={() => setViewMode(mode)}
            >
              {MODE_LABELS[mode]}
            </button>
          ))}
        </div>

        {/* IC selector — hidden in Team mode */}
        {viewMode !== "team" && (
          <div className="ic-selector" role="group" aria-label="Select IC">
            {dataset.map((icItem, i) => {
              const isActive =
                viewMode === "single"
                  ? selectedIC === i
                  : compareICs.includes(i);
              const color = IC_COLORS[i % IC_COLORS.length];
              const isFirst =
                viewMode === "compare" && compareICs[0] === i;

              return (
                <button
                  key={icItem.metadata.employee_name}
                  className={`ic-btn${isActive ? " active" : ""}${
                    isFirst ? " ic-btn-primary" : ""
                  }`}
                  style={
                    isActive
                      ? { background: color, borderColor: color }
                      : {}
                  }
                  onClick={() => {
                    if (viewMode === "single") {
                      setSelectedIC(i);
                      setSelectedCategory(null);
                    } else {
                      handleCompareClick(i);
                    }
                  }}
                  aria-pressed={isActive}
                >
                  {icItem.metadata.employee_name}
                  <span className="ic-btn-role">{icItem.metadata.current_role}</span>
                  {viewMode === "compare" && isFirst && (
                    <span className="ic-btn-badge">primary</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {viewMode === "team" && (
          <p className="viz-team-note">
            Showing averaged ratings across{" "}
            {dataset.map((d) => d.metadata.employee_name).join(", ")}
          </p>
        )}
      </div>

      <div className="viz-body">
        <div className="viz-charts-row">
          <div
            className="chart-card"
            role="img"
            aria-label={radarTitle}
          >
            <h3 className="chart-card-title">{radarTitle}</h3>
            <p className="chart-card-sub">{radarSub}</p>
            <CategoryRadarChart
              series={radarSeries}
              height={320}
              textColor="#e2e8f0"
            />
          </div>

          <div
            className="chart-card"
            role="img"
            aria-label={`Skill bar chart for ${activeCat}`}
          >
            <div className="chart-card-title-row">
              <h3 className="chart-card-title">
                Skills by Category
                {viewMode !== "single" && (
                  <span className="chart-ic-label">
                    {" "}— {ic.metadata.employee_name}
                  </span>
                )}
              </h3>
              <div className="chart-controls">
                <select
                  className="cat-select"
                  value={activeCat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by skill category"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div
                  className="sort-toggle"
                  role="group"
                  aria-label="Sort skills"
                >
                  {(["desc", "asc", "alpha"] as SortOrder[]).map((order) => (
                    <button
                      key={order}
                      className={`sort-btn${sortOrder === order ? " active" : ""}`}
                      onClick={() => setSortOrder(order)}
                    >
                      {SORT_LABELS[order]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="chart-card-sub">Hover bars for rating commentary</p>
            <SkillBarChart skills={categorySkills} sortOrder={sortOrder} />
          </div>
        </div>

        {skillsWithTrend.length > 0 && (
          <div className="chart-card trend-section">
            <h3 className="chart-card-title">
              Rating Trends Over Cycles
              {viewMode !== "single" && (
                <span className="chart-ic-label">
                  {" "}— {ic.metadata.employee_name}
                </span>
              )}
            </h3>
            <p className="chart-card-sub">
              Skills with prior evaluation data — showing trajectory
            </p>
            <div className="trend-grid">
              {skillsWithTrend.map((skill) => (
                <div key={skill.reference_number} className="trend-card">
                  <div className="trend-card-meta">
                    <span className="trend-skill-cat" title={skill.skill_category}>{skill.skill_category}</span>
                    <span
                      className="trend-rating-badge"
                      style={{
                        background:
                          skill.current_rating >= 3
                            ? "#d1fae5"
                            : skill.current_rating >= 2
                            ? "#e0e7ff"
                            : "#fef3c7",
                        color:
                          skill.current_rating >= 3
                            ? "#065f46"
                            : skill.current_rating >= 2
                            ? "#3730a3"
                            : "#92400e",
                      }}
                    >
                      {skill.current_rating}/3
                    </span>
                  </div>
                  <div className="trend-skill-name">{skill.description_context}</div>
                  <RatingTrendChart
                    skill={skill}
                    color={IC_COLORS[primaryIdx % IC_COLORS.length]}
                    height={64}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

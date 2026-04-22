import { useState } from "react";
import { useDataset } from "../context/DataContext";
import { groupByCategory } from "../utils/groupByCategory";
import CategoryRadarChart from "./charts/CategoryRadarChart";
import SkillBarChart from "./charts/SkillBarChart";
import RatingTrendChart from "./charts/RatingTrendChart";

const IC_COLORS = ["#6366f1", "#10b981", "#f59e0b"];
type SortOrder = "desc" | "asc" | "alpha";

const SORT_LABELS: Record<SortOrder, string> = {
  desc: "↓ Rating",
  asc: "↑ Rating",
  alpha: "A–Z",
};

export default function VisualizationTab() {
  const { dataset } = useDataset();
  const [selectedIC, setSelectedIC] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const ic = dataset[Math.min(selectedIC, dataset.length - 1)];
  const grouped = groupByCategory(ic.skills);
  const categories = Object.keys(grouped);
  const activeCat = selectedCategory && grouped[selectedCategory] ? selectedCategory : categories[0];
  const categorySkills = grouped[activeCat] ?? [];

  const skillsWithTrend = ic.skills.filter(
    (s) => s.previous_rating_1 !== null || s.previous_rating_2 !== null
  );

  return (
    <div className="tab visualization">
      <div className="viz-header">
        <h2>Visualization Dashboard</h2>
        <p className="tab-subtitle">
          65% emphasis on data richness — radar profiles, skill breakdowns, and
          rating trends
        </p>
        <div className="ic-selector" role="group" aria-label="Select IC">
          {dataset.map((icItem, i) => (
            <button
              key={icItem.metadata.employee_name}
              className={`ic-btn${selectedIC === i ? " active" : ""}`}
              style={
                selectedIC === i
                  ? { background: IC_COLORS[i % IC_COLORS.length], borderColor: IC_COLORS[i % IC_COLORS.length] }
                  : {}
              }
              onClick={() => {
                setSelectedIC(i);
                setSelectedCategory(null);
              }}
            >
              {icItem.metadata.employee_name}
              <span className="ic-btn-role">{icItem.metadata.current_role}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="viz-body">
        <div className="viz-charts-row">
          <div className="chart-card" role="img" aria-label={`Competency radar chart for ${ic.metadata.employee_name}`}>
            <h3 className="chart-card-title">
              Competency Profile — {ic.metadata.employee_name}
            </h3>
            <p className="chart-card-sub">Category average ratings (0–5 scale)</p>
            <CategoryRadarChart
              skills={ic.skills}
              color={IC_COLORS[selectedIC % IC_COLORS.length]}
              height={320}
              textColor="#e2e8f0"
            />
          </div>

          <div className="chart-card" role="img" aria-label={`Skill bar chart for ${activeCat}`}>
            <div className="chart-card-title-row">
              <h3 className="chart-card-title">Skills by Category</h3>
              <div className="chart-controls">
                <select
                  className="cat-select"
                  value={activeCat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by skill category"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
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
            <h3 className="chart-card-title">Rating Trends Over Cycles</h3>
            <p className="chart-card-sub">
              Skills with prior evaluation data — showing trajectory
            </p>
            <div className="trend-grid">
              {skillsWithTrend.map((skill) => (
                <div key={skill.reference_number} className="trend-card">
                  <div className="trend-card-meta">
                    <span className="trend-skill-cat">{skill.skill_category}</span>
                    <span
                      className="trend-rating-badge"
                      style={{
                        background:
                          skill.current_rating >= 4
                            ? "#d1fae5"
                            : skill.current_rating >= 3
                            ? "#e0e7ff"
                            : "#fef3c7",
                        color:
                          skill.current_rating >= 4
                            ? "#065f46"
                            : skill.current_rating >= 3
                            ? "#3730a3"
                            : "#92400e",
                      }}
                    >
                      {skill.current_rating}/5
                    </span>
                  </div>
                  <div className="trend-skill-name">{skill.description_context}</div>
                  <RatingTrendChart
                    skill={skill}
                    color={IC_COLORS[selectedIC % IC_COLORS.length]}
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

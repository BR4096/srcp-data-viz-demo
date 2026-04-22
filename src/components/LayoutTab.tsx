import { useState } from "react";
import { useDataset } from "../context/DataContext";
import { groupByCategory, ratingColor } from "../utils/groupByCategory";
import PromotionGauge from "./PromotionGauge";
import StatsCards from "./StatsCards";

type View = "team" | "individual";

function RatingDot({ rating }: { rating: number }) {
  return (
    <span
      className="rating-dot"
      style={{ background: ratingColor(rating) }}
      aria-label={`Rating ${rating} out of 5`}
    >
      {rating}
    </span>
  );
}

export default function LayoutTab() {
  const { dataset } = useDataset();
  const [view, setView] = useState<View>("team");
  const [selectedIC, setSelectedIC] = useState(0);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const ic = dataset[Math.min(selectedIC, dataset.length - 1)];
  const grouped = groupByCategory(ic.skills);

  return (
    <div className="tab layout">
      <div className="layout-header">
        <div>
          <h2>Layout Dashboard</h2>
          <p className="tab-subtitle">
            65% emphasis on UX clarity — structured panels, team vs. individual
            perspective toggle
          </p>
        </div>
        <div
          className="view-toggle"
          role="group"
          aria-label="Toggle view perspective"
        >
          <button
            className={view === "team" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => setView("team")}
          >
            Team View
          </button>
          <button
            className={view === "individual" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => setView("individual")}
          >
            Individual View
          </button>
        </div>
      </div>

      {view === "team" && (
        <div className="team-grid">
          {dataset.map((icItem) => {
            const catGroups = groupByCategory(icItem.skills);
            return (
              <div className="team-card" key={icItem.metadata.employee_name}>
                <div className="team-card-header">
                  <div>
                    <div className="team-card-name">
                      {icItem.metadata.employee_name}
                    </div>
                    <div className="team-card-role">
                      {icItem.metadata.current_role}
                    </div>
                  </div>
                  <span
                    className={
                      icItem.scoring_summary.promotion_eligible
                        ? "promo-badge eligible"
                        : "promo-badge"
                    }
                  >
                    {icItem.scoring_summary.promotion_eligible
                      ? "Eligible"
                      : `${Math.round(icItem.scoring_summary.current_role_percentage * 100)}%`}
                  </span>
                </div>

                <StatsCards report={icItem} theme="layout" />

                <PromotionGauge
                  currentRole={icItem.current_role_summary}
                  nextRole={icItem.next_role_summary}
                  compact
                />

                <div className="team-cat-summary">
                  {Object.entries(catGroups).map(([cat, skills]) => {
                    const avg =
                      skills.reduce((s, e) => s + e.current_rating, 0) /
                      skills.length;
                    return (
                      <div key={cat} className="team-cat-row">
                        <span className="team-cat-name">{cat}</span>
                        <div className="mini-bar-track">
                          <div
                            className="mini-bar-fill"
                            style={{
                              width: `${(avg / 5) * 100}%`,
                              background: ratingColor(avg),
                            }}
                          />
                        </div>
                        <span className="team-cat-avg">{avg.toFixed(1)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "individual" && (
        <div className="individual-view">
          <div className="individual-controls">
            <label htmlFor="ic-select" className="ic-select-label">
              Viewing:
            </label>
            <select
              id="ic-select"
              className="cat-select"
              value={selectedIC}
              onChange={(e) => {
                setSelectedIC(Number(e.target.value));
                setExpandedCat(null);
              }}
            >
              {dataset.map((icItem, i) => (
                <option key={i} value={i}>
                  {icItem.metadata.employee_name} — {icItem.metadata.current_role}
                </option>
              ))}
            </select>
          </div>

          <StatsCards report={ic} theme="layout" />

          <div className="individual-header-card">
            <div className="individual-name-block">
              <div className="individual-name">{ic.metadata.employee_name}</div>
              <div className="individual-meta">
                {ic.metadata.current_role} · {ic.metadata.cycle} · Manager:{" "}
                {ic.metadata.manager_name}
              </div>
            </div>
            <PromotionGauge
              currentRole={ic.current_role_summary}
              nextRole={ic.next_role_summary}
            />
          </div>

          <div className="category-accordion">
            {Object.entries(grouped).map(([cat, skills]) => {
              const isOpen = expandedCat === cat;
              const avg =
                skills.reduce((s, e) => s + e.current_rating, 0) / skills.length;
              return (
                <div key={cat} className="accordion-section">
                  <button
                    className="accordion-header"
                    aria-expanded={isOpen}
                    onClick={() => setExpandedCat(isOpen ? null : cat)}
                  >
                    <span className="accordion-cat">{cat}</span>
                    <span className="accordion-meta">
                      {skills.length} skill{skills.length !== 1 ? "s" : ""} · avg{" "}
                      <strong style={{ color: ratingColor(avg) }}>
                        {avg.toFixed(1)}
                      </strong>
                    </span>
                    <span className="accordion-chevron">{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && (
                    <div className="accordion-body">
                      {skills.map((skill) => (
                        <div key={skill.reference_number} className="skill-row">
                          <RatingDot rating={skill.current_rating} />
                          <div className="skill-row-text">
                            <div className="skill-row-desc">
                              {skill.description_context}
                            </div>
                            <div className="skill-row-comment">
                              {skill.rating_support_comments.slice(0, 160)}…
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

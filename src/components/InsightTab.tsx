import { useState } from "react";
import { useDataset } from "../context/DataContext";
import PromotionGauge from "./PromotionGauge";
import StatsCards from "./StatsCards";
import { ratingColor, trendArrow } from "../utils/groupByCategory";

export default function InsightTab() {
  const { dataset } = useDataset();
  const [selectedIC, setSelectedIC] = useState(0);
  const ic = dataset[Math.min(selectedIC, dataset.length - 1)];

  const sorted = [...ic.skills].sort((a, b) => b.current_rating - a.current_rating);
  const strengths = sorted.slice(0, 3);
  const coaching = [...sorted].reverse().slice(0, 3);

  return (
    <div className="tab insight">
      <div className="insight-topbar">
        <div>
          <h2>Insight Dashboard</h2>
          <p className="tab-subtitle">
            65% emphasis on managerial utility — promotion status, strengths,
            and 1:1 coaching priorities
          </p>
        </div>
        <div className="insight-topbar-actions">
          <div className="ic-pill-group" role="group" aria-label="Select IC">
            {dataset.map((icItem, i) => (
              <button
                key={i}
                className={`ic-pill${selectedIC === i ? " active" : ""}`}
                aria-pressed={selectedIC === i}
                onClick={() => setSelectedIC(i)}
              >
                {icItem.metadata.employee_name}
              </button>
            ))}
          </div>
          <button
            className="print-btn no-print"
            onClick={() => window.print()}
            aria-label="Print this IC report"
          >
            ⎙ Print
          </button>
        </div>
      </div>

      <div className="insight-identity">
        <div>
          <div className="insight-name">{ic.metadata.employee_name}</div>
          <div className="insight-role">
            {ic.metadata.current_role} · {ic.metadata.cycle}
          </div>
          <div className="insight-manager">
            Manager: {ic.metadata.manager_name}
          </div>
        </div>
        <div className="insight-score-block">
          <div className="insight-score-label">Current Role</div>
          <div className="insight-score-pct">
            {Math.round(ic.scoring_summary.current_role_percentage * 100)}%
          </div>
          <div className="insight-score-pts">
            {ic.scoring_summary.total_current_role_points} /{" "}
            {ic.scoring_summary.available_current_role_points} pts
          </div>
        </div>
      </div>

      <div className="insight-stats-section">
        <StatsCards report={ic} theme="insight" />
      </div>

      <div className="insight-gauge-section">
        <PromotionGauge
          currentRole={ic.current_role_summary}
          nextRole={ic.next_role_summary}
        />
      </div>

      <div className="insight-status-note">
        <span className="status-note-label">Status Note</span>
        {ic.promotion_status_note}
      </div>

      <div className="insight-columns">
        <div className="insight-column">
          <h3 className="insight-col-title strength-title">
            ✓ Strengths to Acknowledge
          </h3>
          <p className="insight-col-sub">Top-rated skills this cycle</p>
          {strengths.map((skill) => {
            const arrow = trendArrow(skill);
            return (
              <div key={skill.reference_number} className="insight-skill-card strength">
                <div className="isc-header">
                  <div>
                    <div className="isc-cat">{skill.skill_category}</div>
                    <div className="isc-desc">{skill.description_context}</div>
                  </div>
                  <div className="isc-rating-block">
                    <span
                      className="isc-rating"
                      style={{ color: ratingColor(skill.current_rating) }}
                    >
                      {skill.current_rating}/5
                    </span>
                    {arrow !== "—" && (
                      <span
                        className="isc-trend"
                        style={{
                          color:
                            arrow === "↑"
                              ? "#10b981"
                              : arrow === "↓"
                              ? "#ef4444"
                              : "#64748b",
                        }}
                      >
                        {arrow}
                      </span>
                    )}
                  </div>
                </div>
                <div className="isc-comment">{skill.rating_support_comments}</div>
              </div>
            );
          })}
        </div>

        <div className="insight-column">
          <h3 className="insight-col-title coaching-title">
            ⚑ Coaching Priorities
          </h3>
          <p className="insight-col-sub">Development focus for next cycle</p>
          {coaching.map((skill) => {
            const arrow = trendArrow(skill);
            return (
              <div key={skill.reference_number} className="insight-skill-card coaching">
                <div className="isc-header">
                  <div>
                    <div className="isc-cat">{skill.skill_category}</div>
                    <div className="isc-desc">{skill.description_context}</div>
                  </div>
                  <div className="isc-rating-block">
                    <span
                      className="isc-rating"
                      style={{ color: ratingColor(skill.current_rating) }}
                    >
                      {skill.current_rating}/5
                    </span>
                    {arrow !== "—" && (
                      <span
                        className="isc-trend"
                        style={{
                          color:
                            arrow === "↑"
                              ? "#10b981"
                              : arrow === "↓"
                              ? "#ef4444"
                              : "#64748b",
                        }}
                      >
                        {arrow}
                      </span>
                    )}
                  </div>
                </div>
                <div className="isc-comment">{skill.rating_support_comments}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="insight-footer">
        <div className="insight-gap-section">
          <h3 className="insight-col-title">Promotion Gap Summary</h3>
          <div className="gap-rows">
            <div className="gap-row">
              <span className="gap-label">Current Role:</span>
              <span className="gap-text">
                {ic.scoring_summary.promotion_gap_current_role}
              </span>
            </div>
            <div className="gap-row">
              <span className="gap-label">Next Role:</span>
              <span className="gap-text">
                {ic.scoring_summary.promotion_gap_next_role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRef, useState } from "react";
import type { SrcpReport } from "../data";
import { useDataset } from "../context/DataContext";

type Status =
  | { type: "success"; msg: string }
  | { type: "error"; errors: string[] }
  | null;

type ValidationResult =
  | { report: SrcpReport }
  | { errors: string[] };

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isNumber(v: unknown): v is number {
  return typeof v === "number" && !Number.isNaN(v);
}

function isBoolean(v: unknown): v is boolean {
  return typeof v === "boolean";
}

function isObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function validateRoleSummary(obj: unknown, label: string, errors: string[]): void {
  if (!isObject(obj)) {
    errors.push(`${label}: must be an object`);
    return;
  }
  if (!isString(obj.role_title))             errors.push(`${label}.role_title: required string`);
  if (!isNumber(obj.current_points))         errors.push(`${label}.current_points: required number`);
  if (!isNumber(obj.available_points))       errors.push(`${label}.available_points: required number`);
  if (!isNumber(obj.percentage))             errors.push(`${label}.percentage: required number`);
  if (!isNumber(obj.promotion_threshold_required)) errors.push(`${label}.promotion_threshold_required: required number`);
  if (!isBoolean(obj.promotion_eligible))    errors.push(`${label}.promotion_eligible: required boolean`);
}

function validateSkill(skill: unknown): boolean {
  if (!isObject(skill)) return false;
  const hasRef = isString(skill.reference_number) || isNumber(skill.reference_number);
  return (
    hasRef &&
    isString(skill.skill_category) &&
    isString(skill.description_context) &&
    isNumber(skill.current_rating) &&
    (skill.current_rating as number) >= 1 &&
    (skill.current_rating as number) <= 5 &&
    isString(skill.rating_support_comments)
  );
}

export function validateReport(raw: unknown): ValidationResult {
  const errors: string[] = [];

  if (!isObject(raw)) {
    return { errors: ["File must contain a JSON object"] };
  }

  // Unwrap optional { srcp_report: {...} } wrapper
  const root = isObject((raw as Record<string, unknown>).srcp_report)
    ? (raw as Record<string, unknown>).srcp_report as Record<string, unknown>
    : raw as Record<string, unknown>;

  // ── Metadata ──
  const meta = root.metadata;
  if (!isObject(meta)) {
    errors.push("metadata: required object is missing");
  } else {
    if (!isString(meta.employee_name)) errors.push("metadata.employee_name: required string");
    if (!isString(meta.current_role))  errors.push("metadata.current_role: required string");
    if (!isString(meta.manager_name))  errors.push("metadata.manager_name: required string");
    if (!isString(meta.cycle))         errors.push("metadata.cycle: required string");
  }

  // ── Role summaries ──
  validateRoleSummary(root.current_role_summary, "current_role_summary", errors);
  validateRoleSummary(root.next_role_summary,    "next_role_summary",    errors);

  // ── Skills ──
  if (!Array.isArray(root.skills) || root.skills.length === 0) {
    errors.push("skills: must be a non-empty array");
  } else {
    const total = root.skills.length;
    const invalid = (root.skills as unknown[]).filter((s) => !validateSkill(s)).length;
    if (invalid > 0) {
      errors.push(`skills: ${invalid} of ${total} skills are missing required fields (reference_number, skill_category, description_context, current_rating 1–5, rating_support_comments)`);
    }
  }

  // ── Scoring summary ──
  const ss = root.scoring_summary;
  if (!isObject(ss)) {
    errors.push("scoring_summary: required object is missing");
  } else {
    if (!isNumber(ss.total_current_role_points))     errors.push("scoring_summary.total_current_role_points: required number");
    if (!isNumber(ss.available_current_role_points)) errors.push("scoring_summary.available_current_role_points: required number");
    if (!isNumber(ss.current_role_percentage))       errors.push("scoring_summary.current_role_percentage: required number");
    if (!isString(ss.promotion_gap_current_role) && !isNumber(ss.promotion_gap_current_role))
      errors.push("scoring_summary.promotion_gap_current_role: required");
    if (!isString(ss.promotion_gap_next_role) && !isNumber(ss.promotion_gap_next_role))
      errors.push("scoring_summary.promotion_gap_next_role: required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  return { report: root as unknown as SrcpReport };
}

export default function FileLoader() {
  const { addReport, resetToDefault } = useDataset();
  const [status, setStatus] = useState<Status>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    if (!file.name.endsWith(".json")) {
      setStatus({ type: "error", errors: [`${file.name}: must be a .json file`] });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const text = await file.text();
      const json: unknown = JSON.parse(text);
      const result = validateReport(json);
      if ("errors" in result) {
        setStatus({ type: "error", errors: result.errors.map((e) => `${file.name}: ${e}`) });
      } else {
        addReport(result.report);
        setStatus({ type: "success", msg: `Loaded: ${result.report.metadata.employee_name}` });
      }
    } catch (e) {
      setStatus({ type: "error", errors: [`${file.name}: ${(e as Error).message}`] });
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function onFiles(files: FileList | null) {
    if (!files?.length) return;
    Array.from(files).forEach(processFile);
  }

  const MAX_SHOWN = 5;

  return (
    <div className="file-loader" aria-label="Load SRCP data">
      <div
        className={`drop-zone${dragging ? " dragging" : ""}${loading ? " loading" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onFiles(e.dataTransfer.files);
        }}
        onClick={() => !loading && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Drop SRCP JSON file or click to browse"
        aria-busy={loading}
        onKeyDown={(e) => e.key === "Enter" && !loading && inputRef.current?.click()}
      >
        {loading ? (
          <>
            <span className="drop-icon spinner" aria-hidden="true">⟳</span>
            <span className="drop-text">Loading…</span>
          </>
        ) : (
          <>
            <span className="drop-icon" aria-hidden="true">↑</span>
            <span className="drop-text">Drop SRCP JSON or click to load</span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".json"
          multiple
          style={{ display: "none" }}
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>

      {status && (
        <div
          className={`loader-status ${status.type}`}
          role="status"
          aria-live="polite"
        >
          {status.type === "success" ? (
            status.msg
          ) : (
            <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
              {status.errors.slice(0, MAX_SHOWN).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
              {status.errors.length > MAX_SHOWN && (
                <li>…and {status.errors.length - MAX_SHOWN} more</li>
              )}
            </ul>
          )}
        </div>
      )}

      <button
        className="reset-btn"
        onClick={() => { resetToDefault(); setStatus(null); }}
        title="Reset to bundled sample data"
      >
        Reset to samples
      </button>
    </div>
  );
}

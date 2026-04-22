import { useRef, useState } from "react";
import type { SrcpReport } from "../data";
import { useDataset } from "../context/DataContext";

type Status = { type: "success" | "error"; msg: string } | null;

function parseReportJson(raw: unknown): SrcpReport {
  const obj = raw as Record<string, unknown>;
  const report = (obj.srcp_report ?? raw) as SrcpReport;
  if (!report.metadata?.employee_name) {
    throw new Error("Missing metadata.employee_name");
  }
  if (!Array.isArray(report.skills) || report.skills.length === 0) {
    throw new Error("Missing or empty skills array");
  }
  if (!report.scoring_summary) {
    throw new Error("Missing scoring_summary");
  }
  return report;
}

export default function FileLoader() {
  const { addReport, resetToDefault } = useDataset();
  const [status, setStatus] = useState<Status>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    if (!file.name.endsWith(".json")) {
      setStatus({ type: "error", msg: `${file.name}: must be a .json file` });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const text = await file.text();
      const json: unknown = JSON.parse(text);
      const report = parseReportJson(json);
      addReport(report);
      setStatus({ type: "success", msg: `Loaded: ${report.metadata.employee_name}` });
    } catch (e) {
      setStatus({ type: "error", msg: `${file.name}: ${(e as Error).message}` });
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function onFiles(files: FileList | null) {
    if (!files?.length) return;
    Array.from(files).forEach(processFile);
  }

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
          {status.msg}
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

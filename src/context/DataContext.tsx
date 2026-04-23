import { createContext, useContext, useState } from "react";
import type { SrcpReport, AnnotationMap, CommentQuality } from "../data";
import { srcpDataset as defaultDataset } from "../data";

interface DataContextType {
  dataset: SrcpReport[];
  addReport: (report: SrcpReport) => void;
  resetToDefault: () => void;
  annotations: AnnotationMap;
  annotationsLoading: Set<string>;
}

const DataContext = createContext<DataContextType>({
  dataset: defaultDataset,
  addReport: () => {},
  resetToDefault: () => {},
  annotations: {},
  annotationsLoading: new Set(),
});

async function annotateReport(
  report: SrcpReport,
  setAnnotations: React.Dispatch<React.SetStateAction<AnnotationMap>>,
  setAnnotationsLoading: React.Dispatch<React.SetStateAction<Set<string>>>
): Promise<void> {
  const proxyUrl = import.meta.env.VITE_AI_PROXY_URL;
  if (!proxyUrl) return;

  const employeeName = report.metadata.employee_name;

  setAnnotationsLoading((prev) => {
    const next = new Set(prev);
    next.add(employeeName);
    return next;
  });

  try {
    const skillsArray = report.skills.map((s) => ({
      ref: String(s.reference_number),
      rating: s.current_rating,
      context: s.description_context,
      comment: s.rating_support_comments.slice(0, 400),
    }));

    const prompt =
      "You are evaluating manager feedback quality for performance reviews.\n\n" +
      "Classify each comment as:\n" +
      '- "strong": specific behavioral evidence, concrete examples, measurable outcomes\n' +
      '- "vague": general statements, lacks specifics, could apply to anyone\n' +
      '- "needs_evidence": assertion without support, very short, or missing\n\n' +
      "Return ONLY a JSON array with no other text:\n" +
      '[{"ref": "reference_number", "quality": "strong|vague|needs_evidence"}, ...]\n\n' +
      "Skills:\n" +
      JSON.stringify(skillsArray);

    const body = JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      throw new Error(`AI proxy responded with ${response.status}`);
    }

    const data = await response.json();
    const text: string = data?.content?.[0]?.text ?? "";

    // Extract JSON array from the response text
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("No JSON array found in AI response");

    const results: Array<{ ref: string; quality: string }> = JSON.parse(match[0]);

    const qualityMap: Record<string, CommentQuality> = {};
    for (const item of results) {
      if (
        item.ref &&
        (item.quality === "strong" ||
          item.quality === "vague" ||
          item.quality === "needs_evidence")
      ) {
        qualityMap[item.ref] = item.quality;
      }
    }

    setAnnotations((prev) => ({
      ...prev,
      [employeeName]: qualityMap,
    }));
  } catch (err) {
    console.error("annotateReport error:", err);
  } finally {
    setAnnotationsLoading((prev) => {
      const next = new Set(prev);
      next.delete(employeeName);
      return next;
    });
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [dataset, setDataset] = useState<SrcpReport[]>(defaultDataset);
  const [annotations, setAnnotations] = useState<AnnotationMap>({});
  const [annotationsLoading, setAnnotationsLoading] = useState<Set<string>>(new Set());

  function addReport(report: SrcpReport) {
    setDataset((prev) => {
      const exists = prev.some(
        (r) => r.metadata.employee_name === report.metadata.employee_name
      );
      return exists
        ? prev.map((r) =>
            r.metadata.employee_name === report.metadata.employee_name
              ? report
              : r
          )
        : [...prev, report];
    });
    // Fire annotation async — does not block UI
    annotateReport(report, setAnnotations, setAnnotationsLoading);
  }

  return (
    <DataContext.Provider
      value={{
        dataset,
        addReport,
        resetToDefault: () => setDataset(defaultDataset),
        annotations,
        annotationsLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataset() {
  return useContext(DataContext);
}

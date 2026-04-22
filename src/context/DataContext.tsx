import { createContext, useContext, useState } from "react";
import type { SrcpReport } from "../data";
import { srcpDataset as defaultDataset } from "../data";

interface DataContextType {
  dataset: SrcpReport[];
  addReport: (report: SrcpReport) => void;
  resetToDefault: () => void;
}

const DataContext = createContext<DataContextType>({
  dataset: defaultDataset,
  addReport: () => {},
  resetToDefault: () => {},
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [dataset, setDataset] = useState<SrcpReport[]>(defaultDataset);

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
  }

  return (
    <DataContext.Provider
      value={{ dataset, addReport, resetToDefault: () => setDataset(defaultDataset) }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataset() {
  return useContext(DataContext);
}

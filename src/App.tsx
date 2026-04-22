import { useState } from "react";
import { DataProvider, useDataset } from "./context/DataContext";
import Tabs from "./components/Tabs";
import VisualizationTab from "./components/VisualizationTab";
import LayoutTab from "./components/LayoutTab";
import InsightTab from "./components/InsightTab";
import FileLoader from "./components/FileLoader";
import { version } from "../package.json";
import "./index.css";
import { useEffect } from "react";
import type { SrcpReport } from "./data";

const TAB_LABELS = ["Visualization", "Layout", "Insight"];

function HashLoader() {
  const { addReport } = useDataset();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length <= 1) return;
    try {
      const decoded: SrcpReport = JSON.parse(
        decodeURIComponent(atob(hash.slice(1)))
      );
      addReport(decoded);
    } catch {
      // silently ignore malformed hashes
    }
    window.location.hash = "";
  }, [addReport]);

  return null;
}

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabComponents = [
    <VisualizationTab key="v" />,
    <LayoutTab key="l" />,
    <InsightTab key="i" />,
  ];

  return (
    <DataProvider>
      <HashLoader />
      <div className="App">
        <div className="app-header">
          <h1>SRCP Dashboard Comparison</h1>
          <span className="app-version">v{version}</span>
          <FileLoader />
        </div>
        <Tabs tabs={TAB_LABELS} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="tab-content">
          {tabComponents[activeTab]}
        </div>
      </div>
    </DataProvider>
  );
}

export default App;

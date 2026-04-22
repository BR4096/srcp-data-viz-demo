import { useState } from "react";
import { DataProvider } from "./context/DataContext";
import Tabs from "./components/Tabs";
import VisualizationTab from "./components/VisualizationTab";
import LayoutTab from "./components/LayoutTab";
import InsightTab from "./components/InsightTab";
import FileLoader from "./components/FileLoader";
import { version } from "../package.json";
import "./index.css";

const TAB_LABELS = ["Visualization", "Layout", "Insight"];

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabComponents = [
    <VisualizationTab key="v" />,
    <LayoutTab key="l" />,
    <InsightTab key="i" />,
  ];

  return (
    <DataProvider>
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

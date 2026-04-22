# SRCP Data Viz Demo

A React SPA comparing three dashboard design approaches for Structured Career Review Process (SRCP) data.

## What it is

Three tabs, each emphasizing a different aspect (~65% focus weight):

| Tab | Primary focus | What you see |
|-----|--------------|--------------|
| **Visualization** | Data richness | Multi-chart layout per IC (radar, bar, trend) |
| **Layout** | UX/UI evaluation | Collapsible panel grid, responsive structure |
| **Insight** | Managerial usefulness | Growth summaries, strength/dev focus, 1:1 talking points |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 and switch between tabs.

## Tech

- Vite + React + TypeScript
- No external chart library (placeholders represent future chart integration)
- Mock SRCP dataset — 3 IC profiles with competency scores, growth trends, and recommendations

## Project structure

```
src/
  App.tsx
  data.ts
  index.css
  components/
    Tabs.tsx
    VisualizationTab.tsx
    LayoutTab.tsx
    InsightTab.tsx
docs/
  overview.md
```

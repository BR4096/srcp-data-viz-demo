# SRCP Data Viz Demo

## Project purpose
A React SPA that demonstrates three dashboard views (Visualization, Layout, Insight) for the SRCP (Structured Career Review Process) dataset. Used to evaluate focus-weighting approaches (~65% per tab) across: data visualization richness, UX/UI layout quality, and managerial insight depth.

## Stack
- Vite + React + TypeScript
- Plain CSS (no Tailwind — intentionally minimal for demo comparison purposes)
- No external chart library — mock chart placeholders used to isolate layout/UX evaluation

## Project structure
```
src/
  App.tsx               — root component, tab state
  data.ts               — typed SRCP mock dataset (3 IC profiles)
  index.css             — all styles
  components/
    Tabs.tsx            — tab switcher UI
    VisualizationTab.tsx — chart-dense view
    LayoutTab.tsx       — collapsible panel grid view
    InsightTab.tsx      — managerial summary view
docs/
  overview.md           — project background and tab comparison
```

## Dev commands
```bash
npm run dev     # start dev server (http://localhost:5173)
npm run build   # production build
npm run preview # preview production build
```

## Data shape
See `src/data.ts` for `ICProfile` type. Three sample profiles: Jane Smith (L4→L5), Carlos Fernandez (L3→L4), Kim Khan (L5→L6).

## Conventions
- Keep mock data in `src/data.ts` — do not split into multiple files
- Chart placeholders stay as `.mock-chart` divs until real chart libs are added
- New tabs follow the same pattern: import `srcpData`, return a `<div className="tab [name]">` wrapper

# SRCP Data Viz Demo — Overview

## Background

The SRCP (Structured Career Review Process) dashboard demo was built to evaluate how different design priorities produce meaningfully different outputs from the same underlying dataset. Each tab applies a ~65% weighting to one dimension while treating the others as supporting context.

## Tab comparison

### Visualization Tab (65% data richness)
- Dense chart placeholders per IC: radar (competencies), bar (scores by category), line (growth trend)
- **IC overlay / radar compare** — Single / Compare / Team mode lets users overlay multiple IC radar charts for direct comparison
- Goal: evaluate how visual variety aids comprehension across multiple data dimensions
- Best for: stakeholders who want to see the full dataset at a glance

### Layout Tab (65% UX/UI)
- Responsive grid of collapsible panels
- Click any panel header to expand details
- Goal: evaluate structural clarity, interactivity, and mobile-friendliness
- Best for: testing layout patterns before committing to a chart library

### Insight Tab (65% managerial utility)
- Text-first: primary strength, development focus, and recommendations per IC
- Pie chart placeholder for growth ratio
- **Share link** — encodes the current IC report to a URL hash; auto-loads the correct IC on page open
- Goal: evaluate how well the dashboard supports 1:1 preparation and coaching conversations
- Best for: managers who need actionable summaries, not raw data

## Dataset

Three mock IC profiles:
- **Jane Smith** — Senior Data Analyst, L4→L5, strong in technical depth
- **Carlos Fernandez** — Data Analyst, L3→L4, highest technical depth (4.8), developing leadership
- **Kim Khan** — Data Analyst, L5→L6, highest collaboration (4.7) and strategic thinking (4.6)

All data lives in `src/data.ts` as a typed TypeScript array.

## Additional features

- **Field-level JSON schema validation** — FileLoader shows a bulleted error list per missing required field when uploading IC data
- **Version badge** — `v{version}` displayed in the app header, sourced from `package.json` at build time

## Next steps

To evolve this into a real dashboard:
1. Replace `.mock-chart` divs with Recharts or Nivo components
2. Add Supabase backend for real SRCP data
3. Add authentication (manager views vs. IC self-view)
4. Integrate shadcn-ui for production-grade component polish

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

## Deployment

- **Live URL:** `https://demo.nickringle.com/srcp/`
- **Root landing:** `https://demo.nickringle.com/` (Under Construction page)
- **Host:** InMotion Hosting, cPanel account `abr`, SSH alias `nickringle-demo`
- **SSH port:** 2222
- **Deploy path:** `/home/abr/demo.nickringle.com/srcp`
- **GitHub repo:** `https://github.com/BR4096/srcp-data-viz-demo`

### Manual deploy
```bash
rsync -avz --delete -e "ssh -p 2222" dist/ nickringle-demo:/home/abr/demo.nickringle.com/srcp/
```

### CI/CD
GitHub Actions on push to `main`. Uses `srcp_deploy_ci` key (passphrase-free ed25519, separate from `id_rsa_nrdemo` used for interactive SSH). Host/port/user/path are stored as workflow `env:` vars, not secrets.

### Server-side artifacts (not in git, rsync-only)
- `api/` — PHP proxy (`ai-proxy.php`)
- `server/` — root landing HTML

## AI proxy

- **Endpoint:** `https://demo.nickringle.com/api/ai-proxy.php`
- **API key location:** `/home/abr/.env` (chmod 600, outside document root); read via `parse_ini_file()` at request time
- **Model verified:** `claude-haiku-4-5-20251001`
- **CORS:** restricted to `https://demo.nickringle.com` and `http://localhost:5173`

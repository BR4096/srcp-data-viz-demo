# Backlog

## Enhancements

### [ENHANCEMENT] PDF Report Export
Export the current IC's Insight tab as a styled PDF. Options: browser print-to-PDF (already partially supported via print styles), or jsPDF client-side generation. Goal: produce a single-page summary usable in 1:1 meetings without opening the browser.

## Known Bugs

### [BUG] Promotion Gap Summary — bottom spacing has no effect
**Tab:** Insight  
**Symptom:** Padding-bottom / margin-bottom CSS changes to `.insight-gap-section` and `.gap-rows` produce no visible change in the browser. Tried: CSS class edits (`padding-bottom`, `margin-bottom`, dedicated spacer class), dedicated `<div className="gap-bottom-spacer" />` element, and inline `style={{ paddingBottom: 32 }}` directly on the section div. None produced any visible change across multiple browsers and cleared caches.  
**Suspected cause:** Unknown — CSS appears correct and class names match. Possible stylesheet load ordering issue or a parent container clipping behavior not yet identified.  
**Workaround:** None currently. Needs DevTools inspection in a live session to trace computed styles on the element.

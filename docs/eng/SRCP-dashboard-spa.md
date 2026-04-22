# SRCP Dashboard SPA (Coded Prototype)  
**Context:** A manager reviews **Strategic Role Competency Profile (SRCP)** reports from 3–8 individual contributors (ICs). Each SRCP JSON file contains structured information on key competencies, role expectations, performance metrics, growth areas, and recommendations for development. The manager uses a single-page web application (SPA) to analyze, compare, and visualize this data to better guide each IC’s progression to the next career level.  
**Task:** Develop a functional **Single Page App (SPA)** that:  
1. **Reads SRCP JSON files** (for 3–8 ICs) and aggregates the data for display.  
2. Presents **three distinct dashboard views** accessible via **tabbed navigation**, each representing a different approach to data presentation and emphasis focus.  
3. Each tab should offer a unique combination of design, visualization, and interpretive logic aligned with its weighting focus (described below).  
  
## Tab Configuration  
**Tab 1 — Visualization Emphasis (≈65% Data Visualization Variety)**  
* Focus: visually rich presentation using diverse chart types (radar, stacked bar, timeline, heatmap, etc.).  
* Include hover interactions, sorting, or filtering by competency domain.  
* Simpler layout structure — prioritize beauty and data richness.  
* Provide light summarization of insights (secondary element).  
**Tab 2 — UX/UI Layout Emphasis (≈65% UX/UI Layout Evaluation)**  
* Focus: clean, intuitive layout and responsive design.  
* UX features such as adjustable cards, collapsible IC panels, and accessibility.  
* Visualizations should be simple but cohesive.  
* Include manager-oriented controls for toggling perspective (team vs. individual).  
**Tab 3 — Insight Emphasis (≈65% Managerial Insight Generation)**  
* Focus: algorithmic summaries and recommendations per IC.  
* Include bullet-point “discussion starters” and career growth suggestions.  
* Visuals complement text (simple pie or trend charts only).  
* Layout optimized for quick scanning before 1:1 meetings.  
  
## Assumed Data Model (Sample JSON Schema)  
Each SRCP JSON might include:  
```
{
  "name": "Jane Smith",
  "role": "Senior Data Analyst",
  "competencies": {
    "strategic_thinking": 4.2,
    "leadership": 3.8,
    "technical_depth": 4.5,
    "collaboration": 4.0,
    "communication": 4.1
  },
  "progress": {
    "current_level": "L4",
    "target_level": "L5",
    "last_review_score": 4.0,
    "growth_trend": [3.7, 3.9, 4.0, 4.2]
  },
  "recommendations": [
    "Identify cross-functional strategic projects.",
    "Mentor junior analysts to strengthen leadership competencies."
  ]
}

```
  
## Implementation Requirements  
* Framework: **React (preferred)** or vanilla HTML/JS SPA.  
* Tabs to switch between the three approaches dynamically.  
* Each approach renders differently but reads from the same JSON dataset.  
* Create modular, reusable components (e.g., <CompetencyChart />, <InsightsPanel />).  
* Include placeholder/mock JSON data for demonstration.  
* Clean, responsive UI design—suitable for desktop and tablet.  
  
## Deliverable  
Provide:  
1. The complete **HTML/CSS/JS (or React)** code for the SPA prototype.  
2. Embedded **sample JSON dataset** for 3–8 ICs.  
3. Clear separation of logic and design per tab.  
4. Short explanation of how each version’s emphasis weighting shaped the design and functionality.  
  
## Objective  
Enable comparison of three dashboard designs that reflect different priorities — **visual richness**, **user experience**, and **managerial insight depth** — using the same SRCP dataset, to help refine the final production implementation.  
  

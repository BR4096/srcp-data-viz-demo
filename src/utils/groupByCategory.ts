import type { SkillEntry } from "../data";

export function groupByCategory(
  skills: SkillEntry[]
): Record<string, SkillEntry[]> {
  return skills.reduce(
    (acc, skill) => {
      const cat = skill.skill_category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, SkillEntry[]>
  );
}

export function categoryAverages(
  skills: SkillEntry[]
): { subject: string; fullSubject: string; value: number; fullMark: number }[] {
  const grouped = groupByCategory(skills);
  return Object.entries(grouped).map(([cat, entries]) => ({
    subject: shortCategoryName(cat),
    fullSubject: cat,
    value: parseFloat(
      (
        entries.reduce((sum, e) => sum + e.current_rating, 0) / entries.length
      ).toFixed(1)
    ),
    fullMark: 5,
  }));
}

export function ratingColor(rating: number): string {
  if (rating >= 4) return "#10b981";
  if (rating >= 3) return "#6366f1";
  if (rating >= 2) return "#f59e0b";
  return "#ef4444";
}

export function trendValues(skill: SkillEntry): number[] {
  const pts: (number | null)[] = [
    skill.previous_rating_3,
    skill.previous_rating_2,
    skill.previous_rating_1,
    skill.current_rating,
  ];
  return pts.filter((v): v is number => v !== null);
}

export function trendArrow(skill: SkillEntry): string {
  const prev = skill.previous_rating_1 ?? skill.previous_rating_2;
  if (prev === null) return "—";
  const delta = skill.current_rating - prev;
  if (delta > 0) return "↑";
  if (delta < 0) return "↓";
  return "→";
}

const SHORT_NAMES: Record<string, string> = {
  "Digital Advertising Knowledge": "Digital Ads",
  "Data Extraction": "Data Ext.",
  "Empower OS": "Empower OS",
  "MS Office": "MS Office",
  "Microsoft Excel": "Excel",
  "Site Analytics Reporting": "Site Analytics",
  DOMO: "DOMO",
  "Data Quality Assurance": "Data QA",
  Reporting: "Reporting",
  "Programmatic Display Media": "Programmatic",
  "SQL / Python / R": "SQL/Python",
  Measurement: "Measurement",
  "Python / R Basics": "Python/R",
};

export function shortCategoryName(name: string): string {
  return SHORT_NAMES[name] ?? (name.length > 16 ? name.slice(0, 16) + "…" : name);
}

export type ReviewStatus = "Pending" | "Approved" | "Denied" | "Needs Info";
export type Priority = "Normal" | "Urgent";

export type ReviewCase = {
  id: string;
  patient: string;
  age: number;
  sex: "F" | "M";
  medication: string;
  provider: string;
  submitted: string;
  waitHours: number;
  priority: Priority;
  status: ReviewStatus;
  bmi: number;
  flags: string[];
  intake: { q: string; a: string }[];
};

export const REVIEW_CASES: ReviewCase[] = [
  {
    id: "RV-3012",
    patient: "Norma Alvarez",
    age: 42,
    sex: "F",
    medication: "Semaglutide",
    provider: "Dr. Sarah Lane",
    submitted: "2026-07-01",
    waitHours: 4,
    priority: "Normal",
    status: "Pending",
    bmi: 31.2,
    flags: [],
    intake: [
      { q: "Primary goal", a: "Weight loss" },
      { q: "Current weight", a: "190 lbs" },
      { q: "Allergies", a: "None reported" },
      { q: "Current medications", a: "None" },
      { q: "Pregnant or breastfeeding", a: "No" },
    ],
  },
  {
    id: "RV-3011",
    patient: "Rachel Kim",
    age: 38,
    sex: "F",
    medication: "Tirzepatide",
    provider: "Dr. Mia Chen",
    submitted: "2026-07-01",
    waitHours: 9,
    priority: "Urgent",
    status: "Pending",
    bmi: 34.8,
    flags: ["High BMI", "Family history of diabetes"],
    intake: [
      { q: "Primary goal", a: "Weight loss & energy" },
      { q: "Current weight", a: "215 lbs" },
      { q: "Allergies", a: "Penicillin" },
      { q: "Current medications", a: "Metformin" },
      { q: "Pregnant or breastfeeding", a: "No" },
    ],
  },
  {
    id: "RV-3010",
    patient: "Laura Bennett",
    age: 45,
    sex: "F",
    medication: "GLP-1 + NAD+",
    provider: "Dr. Sarah Lane",
    submitted: "2026-06-30",
    waitHours: 20,
    priority: "Normal",
    status: "Needs Info",
    bmi: 28.5,
    flags: ["Missing lab results"],
    intake: [
      { q: "Primary goal", a: "Vitality & wellness" },
      { q: "Current weight", a: "165 lbs" },
      { q: "Allergies", a: "None reported" },
      { q: "Current medications", a: "Levothyroxine" },
      { q: "Pregnant or breastfeeding", a: "No" },
    ],
  },
  {
    id: "RV-3009",
    patient: "Tiffany King",
    age: 51,
    sex: "F",
    medication: "Sermorelin",
    provider: "Dr. Mia Chen",
    submitted: "2026-06-30",
    waitHours: 26,
    priority: "Normal",
    status: "Approved",
    bmi: 26.1,
    flags: [],
    intake: [
      { q: "Primary goal", a: "Recovery & sleep" },
      { q: "Current weight", a: "150 lbs" },
      { q: "Allergies", a: "None reported" },
      { q: "Current medications", a: "None" },
      { q: "Pregnant or breastfeeding", a: "No" },
    ],
  },
  {
    id: "RV-3008",
    patient: "Denise Carter",
    age: 39,
    sex: "F",
    medication: "Tirzepatide",
    provider: "Dr. Sarah Lane",
    submitted: "2026-06-29",
    waitHours: 40,
    priority: "Normal",
    status: "Denied",
    bmi: 22.4,
    flags: ["BMI below threshold"],
    intake: [
      { q: "Primary goal", a: "Weight loss" },
      { q: "Current weight", a: "130 lbs" },
      { q: "Allergies", a: "None reported" },
      { q: "Current medications", a: "None" },
      { q: "Pregnant or breastfeeding", a: "No" },
    ],
  },
  {
    id: "RV-3007",
    patient: "Maria Lopez",
    age: 47,
    sex: "F",
    medication: "NAD+",
    provider: "Dr. Mia Chen",
    submitted: "2026-06-29",
    waitHours: 6,
    priority: "Normal",
    status: "Pending",
    bmi: 29.7,
    flags: [],
    intake: [
      { q: "Primary goal", a: "Energy & focus" },
      { q: "Current weight", a: "172 lbs" },
      { q: "Allergies", a: "Sulfa drugs" },
      { q: "Current medications", a: "None" },
      { q: "Pregnant or breastfeeding", a: "No" },
    ],
  },
];

export const STATUS_STYLES: Record<ReviewStatus, string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Denied: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  "Needs Info": "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
};

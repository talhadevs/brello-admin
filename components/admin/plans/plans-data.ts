export type PlanStatus = "Active" | "Draft";
export type PlanTag =
  | "Most Popular"
  | "Most Requested"
  | "New Arrival"
  | "Most Complete"
  | null;

export type Plan = {
  id: string;
  name: string;
  tag: PlanTag;
  monthly: number;
  quarterly: number;
  originalQuarterly: number | null;
  status: PlanStatus;
  subscribers: number;
  highlighted: boolean;
  features: string[];
};

const BASE_FEATURES = [
  "Provider health review",
  "Medication (if approved)",
  "Syringes & injection instructions",
  "Virtual fitness & nutrition classes",
  "Private Facebook community",
  "Progress tracking in Brello app",
];

export const PLANS: Plan[] = [
  {
    id: "plan-nad",
    name: "NAD+",
    tag: null,
    monthly: 79,
    quarterly: 237,
    originalQuarterly: null,
    status: "Active",
    subscribers: 1980,
    highlighted: false,
    features: BASE_FEATURES,
  },
  {
    id: "plan-serm",
    name: "Sermorelin",
    tag: "New Arrival",
    monthly: 116,
    quarterly: 499,
    originalQuarterly: 749,
    status: "Active",
    subscribers: 742,
    highlighted: false,
    features: BASE_FEATURES,
  },
  {
    id: "plan-sema",
    name: "Semaglutide",
    tag: "Most Popular",
    monthly: 133,
    quarterly: 399,
    originalQuarterly: 599,
    status: "Active",
    subscribers: 6215,
    highlighted: true,
    features: BASE_FEATURES,
  },
  {
    id: "plan-tirz",
    name: "Tirzepatide",
    tag: "Most Requested",
    monthly: 166,
    quarterly: 499,
    originalQuarterly: 749,
    status: "Active",
    subscribers: 4820,
    highlighted: false,
    features: BASE_FEATURES,
  },
  {
    id: "plan-empowered",
    name: "Empowered+ (GLP-1 + NAD+)",
    tag: null,
    monthly: 199,
    quarterly: 597,
    originalQuarterly: null,
    status: "Active",
    subscribers: 2140,
    highlighted: false,
    features: [...BASE_FEATURES, "GLP-1 + NAD+ coordinated dosing"],
  },
  {
    id: "plan-stack",
    name: "Longevity Stack",
    tag: "Most Complete",
    monthly: 299,
    quarterly: 897,
    originalQuarterly: null,
    status: "Active",
    subscribers: 980,
    highlighted: false,
    features: [...BASE_FEATURES, "GLP-1 + NAD+ + Sermorelin stack"],
  },
];

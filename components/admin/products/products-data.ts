export type ProductCategory = "Medication" | "Bundle" | "Device";
export type ProductStatus = "Active" | "Draft" | "Out of Stock";
export type ProductTag =
  | "Most Popular"
  | "Most Requested"
  | "New Arrival"
  | "Most Complete"
  | null;

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
  tag: ProductTag;
  monthly: number;
  quarterly: number;
  subscribers: number;
  included: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "p-tirz",
    name: "Tirzepatide",
    category: "Medication",
    status: "Active",
    tag: "Most Requested",
    monthly: 166,
    quarterly: 499,
    subscribers: 4820,
    included: "Provider review, medication, syringes, fitness classes",
  },
  {
    id: "p-sema",
    name: "Semaglutide",
    category: "Medication",
    status: "Active",
    tag: "Most Popular",
    monthly: 133,
    quarterly: 399,
    subscribers: 6215,
    included: "Provider review, medication, syringes, fitness classes",
  },
  {
    id: "p-nad",
    name: "NAD+",
    category: "Medication",
    status: "Active",
    tag: null,
    monthly: 79,
    quarterly: 237,
    subscribers: 1980,
    included: "Provider review, medication, syringes, community",
  },
  {
    id: "p-serm",
    name: "Sermorelin",
    category: "Medication",
    status: "Active",
    tag: "New Arrival",
    monthly: 116,
    quarterly: 499,
    subscribers: 742,
    included: "Provider review, medication, syringes, fitness classes",
  },
  {
    id: "p-micc",
    name: "MICC",
    category: "Medication",
    status: "Draft",
    tag: null,
    monthly: 89,
    quarterly: 267,
    subscribers: 0,
    included: "Provider review, medication, injection kit",
  },
  {
    id: "p-empowered",
    name: "GLP-1 + NAD+ (Empowered+)",
    category: "Bundle",
    status: "Active",
    tag: null,
    monthly: 199,
    quarterly: 597,
    subscribers: 2140,
    included: "GLP-1, NAD+, provider support, fitness & nutrition classes",
  },
  {
    id: "p-stack",
    name: "Longevity Stack",
    category: "Bundle",
    status: "Active",
    tag: "Most Complete",
    monthly: 299,
    quarterly: 897,
    subscribers: 980,
    included: "GLP-1, NAD+, Sermorelin, provider support, classes",
  },
  {
    id: "p-lumen",
    name: "GLP-1 + Lumen Tracker",
    category: "Device",
    status: "Active",
    tag: null,
    monthly: 166,
    quarterly: 498,
    subscribers: 415,
    included: "GLP-1, Lumen metabolism tracker, nutrition plans",
  },
];

export const CATEGORY_STYLES: Record<ProductCategory, string> = {
  Medication: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  Bundle: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Device: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
};

export const STATUS_STYLES: Record<ProductStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Draft: "bg-muted text-muted-foreground",
  "Out of Stock": "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

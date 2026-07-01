export type PaymentStatus = "Paid" | "Pending" | "Refunded";
export type FulfillmentStatus =
  | "Provider Review"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "On Hold"
  | "Cancelled";

export type Order = {
  id: string;
  customer: string;
  email: string;
  plan: string;
  state: string;
  amount: number;
  payment: PaymentStatus;
  fulfillment: FulfillmentStatus;
  date: string;
};

export const MEDICATIONS = [
  "Tirzepatide",
  "Semaglutide",
  "NAD+",
  "Sermorelin",
  "GLP-1 + NAD+",
  "Longevity Stack",
] as const;

export const ORDERS: Order[] = [
  { id: "BR-12386", customer: "Norma Alvarez", email: "norma.a@email.com", plan: "Semaglutide", state: "Texas", amount: 399, payment: "Paid", fulfillment: "Shipped", date: "2026-07-01" },
  { id: "BR-12385", customer: "Jennifer Nguyen", email: "jen.n@email.com", plan: "GLP-1 + NAD+", state: "Florida", amount: 199, payment: "Paid", fulfillment: "Processing", date: "2026-07-01" },
  { id: "BR-12384", customer: "Gerald Grant", email: "gerald.g@email.com", plan: "Tirzepatide", state: "Ohio", amount: 499, payment: "Pending", fulfillment: "Provider Review", date: "2026-06-30" },
  { id: "BR-12383", customer: "Tiffany King", email: "tiffany.k@email.com", plan: "Sermorelin", state: "Arizona", amount: 499, payment: "Paid", fulfillment: "Delivered", date: "2026-06-30" },
  { id: "BR-12382", customer: "Maria Lopez", email: "maria.l@email.com", plan: "NAD+", state: "Georgia", amount: 79, payment: "Paid", fulfillment: "Shipped", date: "2026-06-29" },
  { id: "BR-12381", customer: "Ashley Brooks", email: "ashley.b@email.com", plan: "Longevity Stack", state: "Nevada", amount: 299, payment: "Paid", fulfillment: "Delivered", date: "2026-06-29" },
  { id: "BR-12380", customer: "Denise Carter", email: "denise.c@email.com", plan: "Tirzepatide", state: "Michigan", amount: 499, payment: "Refunded", fulfillment: "Cancelled", date: "2026-06-28" },
  { id: "BR-12379", customer: "Rachel Kim", email: "rachel.k@email.com", plan: "Semaglutide", state: "Colorado", amount: 399, payment: "Pending", fulfillment: "On Hold", date: "2026-06-28" },
  { id: "BR-12378", customer: "Laura Bennett", email: "laura.b@email.com", plan: "GLP-1 + NAD+", state: "Oregon", amount: 199, payment: "Paid", fulfillment: "Processing", date: "2026-06-27" },
  { id: "BR-12377", customer: "Sandra Patel", email: "sandra.p@email.com", plan: "NAD+", state: "Utah", amount: 79, payment: "Paid", fulfillment: "Delivered", date: "2026-06-27" },
  { id: "BR-12376", customer: "Emily Foster", email: "emily.f@email.com", plan: "Sermorelin", state: "Washington", amount: 499, payment: "Paid", fulfillment: "Shipped", date: "2026-06-26" },
  { id: "BR-12375", customer: "Karen Wright", email: "karen.w@email.com", plan: "Tirzepatide", state: "Virginia", amount: 499, payment: "Pending", fulfillment: "Provider Review", date: "2026-06-26" },
  { id: "BR-12374", customer: "Monica Reed", email: "monica.r@email.com", plan: "Semaglutide", state: "Tennessee", amount: 399, payment: "Paid", fulfillment: "Delivered", date: "2026-06-25" },
  { id: "BR-12373", customer: "Paula Simmons", email: "paula.s@email.com", plan: "Longevity Stack", state: "Indiana", amount: 299, payment: "Paid", fulfillment: "Processing", date: "2026-06-25" },
  { id: "BR-12372", customer: "Diana Cruz", email: "diana.c@email.com", plan: "NAD+", state: "Missouri", amount: 79, payment: "Refunded", fulfillment: "Cancelled", date: "2026-06-24" },
  { id: "BR-12371", customer: "Heather Ross", email: "heather.r@email.com", plan: "Tirzepatide", state: "Kentucky", amount: 499, payment: "Paid", fulfillment: "Shipped", date: "2026-06-24" },
];

export const PAYMENT_STYLES: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Refunded: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

export const FULFILLMENT_STYLES: Record<FulfillmentStatus, string> = {
  "Provider Review": "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  Processing: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Shipped: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  Delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  "On Hold": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

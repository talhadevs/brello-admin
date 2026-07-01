export type SubscriptionStatus =
  | "Active"
  | "Paused"
  | "Cancelled"
  | "Past Due"
  | "Pending Approval";

export type Subscription = {
  id: string;
  member: string;
  email: string;
  plan: string;
  dosage: string;
  status: SubscriptionStatus;
  amount: string;
  cycle: string;
  nextBilling: string;
  state: string;
};

export const SUBSCRIPTIONS: Subscription[] = [
  { id: "SUB-10241", member: "Norma A.", email: "norma.a@email.com", plan: "Tirzepatide", dosage: "5mg / week", status: "Active", amount: "$499", cycle: "Every 10 weeks", nextBilling: "Jul 18, 2026", state: "Texas" },
  { id: "SUB-10240", member: "Jen N.", email: "jen.n@email.com", plan: "GLP-1 + NAD+", dosage: "Bundle", status: "Active", amount: "$199", cycle: "Every 10 weeks", nextBilling: "Jul 21, 2026", state: "Florida" },
  { id: "SUB-10239", member: "Gerald G.", email: "gerald.g@email.com", plan: "Semaglutide", dosage: "0.5mg / week", status: "Past Due", amount: "$399", cycle: "Every 10 weeks", nextBilling: "Jun 30, 2026", state: "Ohio" },
  { id: "SUB-10238", member: "Tiffany K.", email: "tiffany.k@email.com", plan: "Sermorelin", dosage: "0.3mg / day", status: "Active", amount: "$499", cycle: "Every 10 weeks", nextBilling: "Aug 02, 2026", state: "Arizona" },
  { id: "SUB-10237", member: "Maria L.", email: "maria.l@email.com", plan: "NAD+", dosage: "100mg / week", status: "Paused", amount: "$79", cycle: "Every 10 weeks", nextBilling: "—", state: "Georgia" },
  { id: "SUB-10236", member: "Ashley R.", email: "ashley.r@email.com", plan: "GLP-1 + NAD+ + Sermorelin", dosage: "Bundle", status: "Pending Approval", amount: "$299", cycle: "Every 10 weeks", nextBilling: "—", state: "Nevada" },
  { id: "SUB-10235", member: "Danielle P.", email: "danielle.p@email.com", plan: "Tirzepatide", dosage: "7.5mg / week", status: "Cancelled", amount: "$499", cycle: "Every 10 weeks", nextBilling: "—", state: "Colorado" },
  { id: "SUB-10234", member: "Karen M.", email: "karen.m@email.com", plan: "Semaglutide", dosage: "1mg / week", status: "Active", amount: "$399", cycle: "Every 10 weeks", nextBilling: "Jul 25, 2026", state: "Michigan" },
  { id: "SUB-10233", member: "Brenda S.", email: "brenda.s@email.com", plan: "GLP-1 + Lumen", dosage: "Bundle", status: "Active", amount: "$166", cycle: "Every 10 weeks", nextBilling: "Aug 10, 2026", state: "Washington" },
];

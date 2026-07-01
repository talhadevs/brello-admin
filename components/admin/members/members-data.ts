export type MemberStatus = "Active" | "New" | "Inactive" | "Suspended";

export type Member = {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: MemberStatus;
  state: string;
  joined: string;
  lastActive: string;
  progress: string;
};

export const MEMBERS: Member[] = [
  { id: "MBR-8041", name: "Norma A.", email: "norma.a@email.com", plan: "Tirzepatide", status: "Active", state: "Texas", joined: "Jun 12, 2025", lastActive: "2 hours ago", progress: "-62 lbs" },
  { id: "MBR-8040", name: "Jen N.", email: "jen.n@email.com", plan: "GLP-1 + NAD+", status: "Active", state: "Florida", joined: "Mar 03, 2025", lastActive: "Yesterday", progress: "-28 lbs" },
  { id: "MBR-8039", name: "Gerald G.", email: "gerald.g@email.com", plan: "Semaglutide", status: "Active", state: "Ohio", joined: "Nov 21, 2025", lastActive: "5 days ago", progress: "-108 lbs" },
  { id: "MBR-8038", name: "Tiffany K.", email: "tiffany.k@email.com", plan: "Sermorelin", status: "Active", state: "Arizona", joined: "Jan 15, 2026", lastActive: "1 hour ago", progress: "-14 lbs" },
  { id: "MBR-8037", name: "Maria L.", email: "maria.l@email.com", plan: "NAD+", status: "Inactive", state: "Georgia", joined: "Feb 08, 2026", lastActive: "3 weeks ago", progress: "-6 lbs" },
  { id: "MBR-8036", name: "Ashley R.", email: "ashley.r@email.com", plan: "GLP-1 + NAD+ + Sermorelin", status: "New", state: "Nevada", joined: "Jun 28, 2026", lastActive: "Today", progress: "—" },
  { id: "MBR-8035", name: "Danielle P.", email: "danielle.p@email.com", plan: "Tirzepatide", status: "Suspended", state: "Colorado", joined: "Aug 19, 2025", lastActive: "2 months ago", progress: "-33 lbs" },
  { id: "MBR-8034", name: "Karen M.", email: "karen.m@email.com", plan: "Semaglutide", status: "Active", state: "Michigan", joined: "Apr 30, 2025", lastActive: "3 hours ago", progress: "-41 lbs" },
  { id: "MBR-8033", name: "Brenda S.", email: "brenda.s@email.com", plan: "GLP-1 + Lumen", status: "New", state: "Washington", joined: "Jun 25, 2026", lastActive: "Today", progress: "—" },
];

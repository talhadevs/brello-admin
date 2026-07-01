export type AdminRole = "Owner" | "Administrator" | "Editor" | "Support" | "Viewer";
export type AdminStatus = "Active" | "Pending" | "Suspended";

export type Admin = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastActive: string;
};

export const ROLES: AdminRole[] = ["Owner", "Administrator", "Editor", "Support", "Viewer"];

export const ADMINS: Admin[] = [
  { id: "a1", name: "Sarah Lane", email: "sarah.lane@brellohealth.com", role: "Owner", status: "Active", lastActive: "Just now" },
  { id: "a2", name: "Mia Chen", email: "mia.chen@brellohealth.com", role: "Administrator", status: "Active", lastActive: "12 min ago" },
  { id: "a3", name: "Amy Ross", email: "amy.ross@brellohealth.com", role: "Editor", status: "Active", lastActive: "2 hours ago" },
  { id: "a4", name: "James Carter", email: "james.carter@brellohealth.com", role: "Support", status: "Active", lastActive: "Yesterday" },
  { id: "a5", name: "Priya Nair", email: "priya.nair@brellohealth.com", role: "Support", status: "Pending", lastActive: "—" },
  { id: "a6", name: "Tom Reed", email: "tom.reed@brellohealth.com", role: "Viewer", status: "Suspended", lastActive: "3 weeks ago" },
];

export const STATUS_STYLES: Record<AdminStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Suspended: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

export const ROLE_STYLES: Record<AdminRole, string> = {
  Owner: "bg-brand/10 text-brand",
  Administrator: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  Editor: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Support: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Viewer: "bg-muted text-muted-foreground",
};

"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  UserCheck,
  Clock,
  Search,
  UserPlus,
  Send,
  Ban,
  RotateCcw,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { useAdminCrud } from "@/components/admin/crud/useAdminCrud";
import {
  ADMINS,
  ROLES,
  STATUS_STYLES,
  ROLE_STYLES,
  type Admin,
  type AdminRole,
  type AdminStatus,
} from "@/components/admin/admins/admins-data";
import InviteModal from "@/components/admin/admins/InviteModal";

const STATUS_OPTIONS: (AdminStatus | "All")[] = ["All", "Active", "Pending", "Suspended"];

function initialsOf(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function StatCard({
  label,
  value,
  icon: Icon,
  tint,
  index,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tint: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground leading-tight">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminsView() {
  const {
    items: admins,
    error,
    create,
    update,
    remove: removeAdmin,
  } = useAdminCrud<Admin>("admins", ADMINS);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  const stats = useMemo(() => {
    const total = admins.length;
    const active = admins.filter((a) => a.status === "Active").length;
    const pending = admins.filter((a) => a.status === "Pending").length;
    return { total, active, pending };
  }, [admins]);

  const filtered = useMemo(() => {
    return admins.filter((a) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
      const matchesStatus = status === "All" || a.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [admins, query, status]);

  async function invite(email: string, role: AdminRole) {
    const name = email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    try {
      await create({
        id: `a${Date.now()}`,
        name,
        email,
        role,
        status: "Pending",
        lastActive: "—",
      });
      setInviteOpen(false);
      flash(`Invitation sent to ${email}`);
    } catch {
      /* error shown via banner */
    }
  }

  async function changeRole(id: string, role: AdminRole) {
    const admin = admins.find((a) => a.id === id);
    if (!admin) return;
    try {
      await update({ ...admin, role });
    } catch {
      /* error shown via banner */
    }
  }

  async function toggleSuspend(id: string) {
    const admin = admins.find((a) => a.id === id);
    if (!admin) return;
    try {
      await update({
        ...admin,
        status: admin.status === "Suspended" ? "Active" : "Suspended",
      });
    } catch {
      /* error shown via banner */
    }
  }

  function resend(email: string) {
    flash(`Invitation re-sent to ${email}`);
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Admins</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team, roles, and invitations.
          </p>
        </div>
        <button
          onClick={() => setInviteOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity"
        >
          <UserPlus size={16} />
          Invite Admin
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-6">
        <StatCard index={0} label="Total Admins" value={String(stats.total)} icon={ShieldCheck} tint="bg-brand/10 text-brand" />
        <StatCard index={1} label="Active" value={String(stats.active)} icon={UserCheck} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
        <StatCard index={2} label="Pending Invites" value={String(stats.pending)} icon={Clock} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email"
              className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as (typeof STATUS_OPTIONS)[number])}
            className="rounded-full border border-border bg-background py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-brand/30"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground bg-muted/40">
                <th className="px-4 py-3 font-medium">Admin</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Last Active</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand text-xs font-bold">
                        {initialsOf(a.name)}
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-foreground truncate">{a.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {a.role === "Owner" ? (
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ROLE_STYLES.Owner}`}>
                        Owner
                      </span>
                    ) : (
                      <select
                        value={a.role}
                        onChange={(e) => changeRole(a.id, e.target.value as AdminRole)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold border-0 outline-none cursor-pointer ${ROLE_STYLES[a.role]}`}
                      >
                        {ROLES.filter((r) => r !== "Owner").map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{a.lastActive}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {a.status === "Pending" && (
                        <button
                          onClick={() => resend(a.email)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/15 transition-colors"
                          aria-label="Resend invite"
                          title="Resend invite"
                        >
                          <Send size={15} />
                        </button>
                      )}
                      {a.role !== "Owner" && a.status !== "Pending" && (
                        <button
                          onClick={() => toggleSuspend(a.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/15 transition-colors"
                          aria-label={a.status === "Suspended" ? "Reactivate" : "Suspend"}
                          title={a.status === "Suspended" ? "Reactivate" : "Suspend"}
                        >
                          {a.status === "Suspended" ? <RotateCcw size={15} /> : <Ban size={15} />}
                        </button>
                      )}
                      {a.role !== "Owner" && (
                        <button
                          onClick={() => removeAdmin(a.id, a.name)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/15 transition-colors"
                          aria-label="Remove"
                          title="Remove"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No admins match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-lg"
        >
          {toast}
        </motion.div>
      )}

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} onInvite={invite} />
    </div>
  );
}

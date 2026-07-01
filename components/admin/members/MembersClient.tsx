"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreVertical,
  Eye,
  Mail,
  MessageSquare,
  UserX,
  UserCheck,
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useAdminCrud } from "@/components/admin/crud/useAdminCrud";
import {
  MEMBERS,
  type Member,
  type MemberStatus,
} from "@/components/admin/members/members-data";
import MemberModal from "@/components/admin/members/MemberModal";

const STATUS_STYLES: Record<MemberStatus, string> = {
  Active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  New: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  Inactive:
    "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-300",
  Suspended:
    "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

const AVATAR_COLORS = [
  "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
];

const STATUS_FILTERS: (MemberStatus | "All")[] = [
  "All",
  "Active",
  "New",
  "Inactive",
  "Suspended",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StatCard({
  label,
  value,
  sub,
  index,
}: {
  label: string;
  value: string;
  sub: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </motion.div>
  );
}

export default function MembersClient() {
  const {
    items: members,
    error,
    save,
    update,
    remove,
  } = useAdminCrud<Member>("members", MEMBERS);
  const [statusFilter, setStatusFilter] = useState<MemberStatus | "All">("All");
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);

  const stats = useMemo(() => {
    const count = (s: MemberStatus) => members.filter((x) => x.status === s).length;
    return {
      total: members.length,
      active: count("Active"),
      newMembers: count("New"),
      inactive: count("Inactive"),
    };
  }, [members]);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesStatus =
        statusFilter === "All" || m.status === statusFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.plan.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [members, statusFilter, query]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(member: Member) {
    setEditing(member);
    setModalOpen(true);
    setOpenMenu(null);
  }

  async function handleSave(saved: Member) {
    try {
      await save(saved);
      setModalOpen(false);
      setEditing(null);
    } catch {
      /* error shown via banner */
    }
  }

  async function updateStatus(id: string, status: MemberStatus) {
    const member = members.find((m) => m.id === id);
    if (!member) return;
    try {
      await update({ ...member, status });
      setOpenMenu(null);
    } catch {
      /* error shown via banner */
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Members
          </h1>
          <p className="text-muted-foreground mt-1">
            View member profiles, plans, and progress.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity"
        >
          <UserPlus size={16} />
          Add Member
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total Members" value={String(stats.total)} sub="All time" index={0} />
        <StatCard label="Active" value={String(stats.active)} sub="Engaged members" index={1} />
        <StatCard label="New" value={String(stats.newMembers)} sub="Recently joined" index={2} />
        <StatCard label="Inactive" value={String(stats.inactive)} sub="No recent activity" index={3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border">
          <div className="flex flex-wrap items-center gap-1.5">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  statusFilter === f
                    ? "bg-brand text-brand-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, plan, state…"
              className="w-64 rounded-full border border-border bg-background py-1.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground bg-muted/40">
                <th className="px-5 py-3 font-medium">Member</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Progress</th>
                <th className="px-5 py-3 font-medium">State</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium">Last Active</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr
                  key={m.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                      >
                        {initials(m.name)}
                      </div>
                      <div>
                        <div className="text-foreground font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-foreground">{m.plan}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[m.status]}`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                    {m.progress}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                    {m.state}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                    {m.joined}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                    {m.lastActive}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === m.id ? null : m.id)
                        }
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label="Actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenu === m.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenu(null)}
                          />
                          <div className="absolute right-0 z-20 mt-1 w-48 rounded-xl border border-border bg-card p-1 shadow-lg">
                            <MenuButton icon={Eye} label="View profile" onClick={() => setOpenMenu(null)} />
                            <MenuButton icon={Pencil} label="Edit" onClick={() => openEdit(m)} />
                            <MenuButton icon={Mail} label="Send email" onClick={() => setOpenMenu(null)} />
                            <MenuButton icon={MessageSquare} label="Message" onClick={() => setOpenMenu(null)} />
                            {m.status === "Suspended" ? (
                              <MenuButton icon={UserCheck} label="Reactivate" onClick={() => updateStatus(m.id, "Active")} />
                            ) : (
                              <MenuButton
                                icon={UserX}
                                label="Suspend"
                                destructive
                                onClick={() => updateStatus(m.id, "Suspended")}
                              />
                            )}
                            <MenuButton
                              icon={Trash2}
                              label="Delete"
                              destructive
                              onClick={() => {
                                remove(m.id, m.name);
                                setOpenMenu(null);
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-muted-foreground"
                  >
                    No members match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <MemberModal
        open={modalOpen}
        member={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

function MenuButton({
  icon: Icon,
  label,
  onClick,
  destructive,
}: {
  icon: typeof Eye;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
        destructive
          ? "text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
          : "text-foreground hover:bg-muted"
      }`}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

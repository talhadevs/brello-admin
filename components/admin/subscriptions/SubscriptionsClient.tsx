"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreVertical,
  Pause,
  Play,
  XCircle,
  RefreshCw,
  CreditCard,
  Eye,
  Trash2,
} from "lucide-react";
import { useAdminCrud } from "@/components/admin/crud/useAdminCrud";
import {
  SUBSCRIPTIONS,
  type Subscription,
  type SubscriptionStatus,
} from "@/components/admin/subscriptions/subscriptions-data";

const STATUS_STYLES: Record<SubscriptionStatus, string> = {
  Active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Paused:
    "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Cancelled:
    "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  "Past Due":
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  "Pending Approval":
    "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
};

const STATUS_FILTERS: (SubscriptionStatus | "All")[] = [
  "All",
  "Active",
  "Paused",
  "Past Due",
  "Pending Approval",
  "Cancelled",
];

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

export default function SubscriptionsClient() {
  const {
    items: subscriptions,
    error,
    update,
    remove,
  } = useAdminCrud<Subscription>("subscriptions", SUBSCRIPTIONS);
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "All">("All");
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const stats = useMemo(() => {
    const count = (s: SubscriptionStatus) =>
      subscriptions.filter((x) => x.status === s).length;
    return {
      active: count("Active"),
      paused: count("Paused"),
      pastDue: count("Past Due"),
      cancelled: count("Cancelled"),
    };
  }, [subscriptions]);

  const filtered = useMemo(() => {
    return subscriptions.filter((s) => {
      const matchesStatus =
        statusFilter === "All" || s.status === statusFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        s.member.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.plan.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [subscriptions, statusFilter, query]);

  async function updateStatus(id: string, status: SubscriptionStatus) {
    const sub = subscriptions.find((s) => s.id === id);
    if (!sub) return;
    try {
      await update({ ...sub, status });
      setOpenMenu(null);
    } catch {
      /* error shown via banner */
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Subscriptions
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage active, paused, and cancelled member subscriptions.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Active" value={String(stats.active)} sub="Currently billing" index={0} />
        <StatCard label="Paused" value={String(stats.paused)} sub="Temporarily on hold" index={1} />
        <StatCard label="Past Due" value={String(stats.pastDue)} sub="Payment failed" index={2} />
        <StatCard label="Cancelled" value={String(stats.cancelled)} sub="This period" index={3} />
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
              placeholder="Search member, email, plan…"
              className="w-64 rounded-full border border-border bg-background py-1.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground bg-muted/40">
                <th className="px-5 py-3 font-medium">Subscription</th>
                <th className="px-5 py-3 font-medium">Member</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Next Billing</th>
                <th className="px-5 py-3 font-medium">State</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors"
                >
                  <td className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">
                    {s.id}
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-foreground font-medium">{s.member}</div>
                    <div className="text-xs text-muted-foreground">{s.email}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-foreground">{s.plan}</div>
                    <div className="text-xs text-muted-foreground">{s.dosage}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[s.status]}`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-foreground">{s.amount}</div>
                    <div className="text-xs text-muted-foreground">{s.cycle}</div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                    {s.nextBilling}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                    {s.state}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === s.id ? null : s.id)
                        }
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label="Actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenu === s.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenu(null)}
                          />
                          <div className="absolute right-0 z-20 mt-1 w-48 rounded-xl border border-border bg-card p-1 shadow-lg">
                            <MenuButton icon={Eye} label="View member" onClick={() => setOpenMenu(null)} />
                            {s.status !== "Active" && s.status !== "Cancelled" && (
                              <MenuButton icon={Play} label="Resume" onClick={() => updateStatus(s.id, "Active")} />
                            )}
                            {s.status === "Active" && (
                              <MenuButton icon={Pause} label="Pause" onClick={() => updateStatus(s.id, "Paused")} />
                            )}
                            {s.status === "Past Due" && (
                              <MenuButton icon={CreditCard} label="Retry payment" onClick={() => updateStatus(s.id, "Active")} />
                            )}
                            {s.status === "Pending Approval" && (
                              <MenuButton icon={RefreshCw} label="Approve & activate" onClick={() => updateStatus(s.id, "Active")} />
                            )}
                            {s.status !== "Cancelled" && (
                              <MenuButton
                                icon={XCircle}
                                label="Cancel"
                                destructive
                                onClick={() => updateStatus(s.id, "Cancelled")}
                              />
                            )}
                            <MenuButton
                              icon={Trash2}
                              label="Delete"
                              destructive
                              onClick={() => {
                                remove(s.id, s.id);
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
                    No subscriptions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
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

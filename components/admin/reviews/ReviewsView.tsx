"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Percent,
  Search,
  Check,
  Ban,
  Eye,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import {
  REVIEW_CASES,
  STATUS_STYLES,
  type ReviewCase,
  type ReviewStatus,
} from "@/components/admin/reviews/reviews-data";
import ReviewModal from "@/components/admin/reviews/ReviewModal";

const STATUS_OPTIONS: (ReviewStatus | "All")[] = [
  "All",
  "Pending",
  "Approved",
  "Denied",
  "Needs Info",
];

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

export default function ReviewsView() {
  const [cases, setCases] = useState<ReviewCase[]>(REVIEW_CASES);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [selected, setSelected] = useState<ReviewCase | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openCase(c: ReviewCase) {
    setSelected(c);
    setModalOpen(true);
  }

  function decide(id: string, newStatus: ReviewStatus) {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
  }

  function handleModalDecision(id: string, newStatus: ReviewStatus) {
    decide(id, newStatus);
    setModalOpen(false);
    setSelected(null);
  }

  const stats = useMemo(() => {
    const pending = cases.filter((c) => c.status === "Pending").length;
    const approved = cases.filter((c) => c.status === "Approved").length;
    const denied = cases.filter((c) => c.status === "Denied").length;
    const decided = approved + denied;
    const rate = decided ? Math.round((approved / decided) * 100) : 0;
    return { pending, approved, denied, rate };
  }, [cases]);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.patient.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.medication.toLowerCase().includes(q);
      const matchesStatus = status === "All" || c.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [cases, query, status]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">Provider Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Review patient intakes and approve or deny prescriptions.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard index={0} label="Pending Reviews" value={String(stats.pending)} icon={ClipboardList} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
        <StatCard index={1} label="Approved" value={String(stats.approved)} icon={CheckCircle2} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
        <StatCard index={2} label="Denied" value={String(stats.denied)} icon={XCircle} tint="bg-rose-500/10 text-rose-600 dark:text-rose-400" />
        <StatCard index={3} label="Approval Rate" value={`${stats.rate}%`} icon={Percent} tint="bg-brand/10 text-brand" />
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patient, case ID or medication"
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
                <th className="px-4 py-3 font-medium">Case</th>
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium">Medication</th>
                <th className="px-4 py-3 font-medium">Provider</th>
                <th className="px-4 py-3 font-medium">Wait</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {c.priority === "Urgent" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 dark:bg-rose-500/15 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:text-rose-300">
                          <AlertTriangle size={10} /> Urgent
                        </span>
                      )}
                      {c.id}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{c.patient}</div>
                    <div className="text-xs text-muted-foreground">{c.age}/{c.sex} · BMI {c.bmi}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{c.medication}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{c.provider}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.waitHours}h</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => decide(c.id, "Approved")}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/15 transition-colors"
                        aria-label="Approve"
                        title="Approve"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => decide(c.id, "Denied")}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/15 transition-colors"
                        aria-label="Deny"
                        title="Deny"
                      >
                        <Ban size={16} />
                      </button>
                      <button
                        onClick={() => openCase(c)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-brand transition-colors"
                        aria-label="View details"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    No review cases match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ReviewModal
        open={modalOpen}
        reviewCase={selected}
        onClose={() => setModalOpen(false)}
        onDecision={handleModalDecision}
      />
    </div>
  );
}

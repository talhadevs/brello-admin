"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Check,
  Pencil,
  Star,
  Users,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { useAdminCrud } from "@/components/admin/crud/useAdminCrud";
import { PLANS, type Plan } from "@/components/admin/plans/plans-data";
import PlanModal from "@/components/admin/plans/PlanModal";

type Billing = "monthly" | "quarterly";

const EMPTY_PLAN: Plan = {
  id: "",
  name: "",
  tag: null,
  monthly: 0,
  quarterly: 0,
  originalQuarterly: null,
  status: "Draft",
  subscribers: 0,
  highlighted: false,
  features: [
    "Provider health review",
    "Medication (if approved)",
    "Progress tracking in Brello app",
  ],
};

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

function PlanCard({
  plan,
  billing,
  index,
  onEdit,
  onDelete,
}: {
  plan: Plan;
  billing: Billing;
  index: number;
  onEdit: (plan: Plan) => void;
  onDelete: (id: string, name: string) => void;
}) {
  const price = billing === "monthly" ? plan.monthly : plan.quarterly;
  const suffix = billing === "monthly" ? "/mo" : "/3-mo";
  const showOriginal = billing === "quarterly" && plan.originalQuarterly;
  const save =
    showOriginal && plan.originalQuarterly
      ? Math.round(((plan.originalQuarterly - plan.quarterly) / plan.originalQuarterly) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`relative flex flex-col rounded-2xl border p-6 shadow-card transition-all ${
        plan.highlighted
          ? "border-brand ring-2 ring-brand/30 bg-card"
          : "border-border bg-card hover:shadow-card-hover"
      }`}
    >
      {plan.tag && (
        <span
          className={`absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
            plan.highlighted
              ? "bg-brand text-brand-foreground"
              : "bg-brand/10 text-brand"
          }`}
        >
          {plan.highlighted && <Star size={11} />}
          {plan.tag}
        </span>
      )}

      <div className="flex items-start justify-between">
        <h3 className="font-heading font-bold text-foreground text-lg">{plan.name}</h3>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            plan.status === "Active"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {plan.status}
        </span>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-3xl font-bold text-foreground">${price}</span>
        <span className="mb-1 text-sm text-muted-foreground">{suffix}</span>
        {showOriginal && plan.originalQuarterly && (
          <span className="mb-1 text-sm text-muted-foreground line-through">
            ${plan.originalQuarterly}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {billing === "quarterly"
          ? "Billed every 10 weeks · 3-month min"
          : "3-month minimum · cancel anytime"}
        {save > 0 && <span className="ml-1 font-semibold text-emerald-600 dark:text-emerald-400">Save {save}%</span>}
      </p>

      <ul className="mt-5 space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check size={16} className="mt-0.5 shrink-0 text-brand" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users size={14} />
          {plan.subscribers.toLocaleString()} subscribers
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(plan)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-brand hover:text-brand-foreground transition-colors"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            onClick={() => onDelete(plan.id, plan.name)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-colors"
            aria-label="Delete plan"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PlansView() {
  const { items: plans, error, save, remove } = useAdminCrud<Plan>("plans", PLANS);
  const [billing, setBilling] = useState<Billing>("monthly");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Plan | null>(null);

  function openAdd() {
    setEditing(EMPTY_PLAN);
    setModalOpen(true);
  }

  function openEdit(plan: Plan) {
    setEditing(plan);
    setModalOpen(true);
  }

  async function handleSave(saved: Plan) {
    try {
      const payload = saved.id ? saved : { ...saved, id: `pl-${Date.now()}` };
      await save(payload);
      setModalOpen(false);
      setEditing(null);
    } catch {
      /* error shown via banner */
    }
  }

  const stats = useMemo(() => {
    const total = plans.length;
    const active = plans.filter((p) => p.status === "Active").length;
    const avg = Math.round(plans.reduce((s, p) => s + p.monthly, 0) / (plans.length || 1));
    const mrr = plans
      .filter((p) => p.status === "Active")
      .reduce((s, p) => s + p.monthly * p.subscribers, 0);
    return { total, active, avg, mrr };
  }, [plans]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Plans &amp; Pricing</h1>
          <p className="text-muted-foreground mt-1">
            Manage subscription plans, pricing, and billing.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Add Plan
          </button>
          <div className="flex rounded-full bg-muted p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                billing === "monthly" ? "bg-card text-brand shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("quarterly")}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                billing === "quarterly" ? "bg-card text-brand shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              3-Month
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard index={0} label="Total Plans" value={String(stats.total)} icon={Layers} tint="bg-brand/10 text-brand" />
        <StatCard index={1} label="Active Plans" value={String(stats.active)} icon={CheckCircle2} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
        <StatCard index={2} label="Avg. Monthly" value={`$${stats.avg}`} icon={DollarSign} tint="bg-sky-500/10 text-sky-600 dark:text-sky-400" />
        <StatCard index={3} label="Est. MRR" value={`$${(stats.mrr / 1000).toFixed(0)}K`} icon={TrendingUp} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p, i) => (
          <PlanCard key={p.id} plan={p} billing={billing} index={i} onEdit={openEdit} onDelete={remove} />
        ))}
      </div>

      <PlanModal
        open={modalOpen}
        plan={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

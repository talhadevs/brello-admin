"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Plan, PlanStatus, PlanTag } from "@/components/admin/plans/plans-data";

const STATUSES: PlanStatus[] = ["Active", "Draft"];
const TAGS: Exclude<PlanTag, null>[] = [
  "Most Popular",
  "Most Requested",
  "New Arrival",
  "Most Complete",
];

export default function PlanModal({
  open,
  plan,
  onClose,
  onSave,
}: {
  open: boolean;
  plan: Plan | null;
  onClose: () => void;
  onSave: (plan: Plan) => void;
}) {
  const [form, setForm] = useState<Plan | null>(plan);

  useEffect(() => {
    setForm(plan);
  }, [plan]);

  function update<K extends keyof Plan>(key: K, value: Plan[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form) onSave(form);
  }

  return (
    <AnimatePresence>
      {open && form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-card-hover"
          >
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="text-lg font-heading font-bold text-foreground">
                Edit Plan — {form.name}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Plan Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="input"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Monthly ($)</span>
                  <input
                    type="number"
                    min={0}
                    value={form.monthly}
                    onChange={(e) => update("monthly", Number(e.target.value))}
                    className="input"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">3-Month ($)</span>
                  <input
                    type="number"
                    min={0}
                    value={form.quarterly}
                    onChange={(e) => update("quarterly", Number(e.target.value))}
                    className="input"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Status</span>
                  <select
                    value={form.status}
                    onChange={(e) => update("status", e.target.value as PlanStatus)}
                    className="input"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Tag</span>
                  <select
                    value={form.tag ?? ""}
                    onChange={(e) => update("tag", (e.target.value || null) as PlanTag)}
                    className="input"
                  >
                    <option value="">None</option>
                    {TAGS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={form.highlighted}
                  onChange={(e) => update("highlighted", e.target.checked)}
                  className="h-4 w-4 accent-[hsl(var(--brand))]"
                />
                <span className="text-sm text-foreground">Highlight as featured plan</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 border-t border-border p-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity"
              >
                Save Changes
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
}

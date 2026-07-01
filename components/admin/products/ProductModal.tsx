"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type {
  Product,
  ProductCategory,
  ProductStatus,
  ProductTag,
} from "@/components/admin/products/products-data";

const CATEGORIES: ProductCategory[] = ["Medication", "Bundle", "Device"];
const STATUSES: ProductStatus[] = ["Active", "Draft", "Out of Stock"];
const TAGS: Exclude<ProductTag, null>[] = [
  "Most Popular",
  "Most Requested",
  "New Arrival",
  "Most Complete",
];

const EMPTY: Product = {
  id: "",
  name: "",
  category: "Medication",
  status: "Draft",
  tag: null,
  monthly: 0,
  quarterly: 0,
  subscribers: 0,
  included: "",
};

export default function ProductModal({
  open,
  product,
  onClose,
  onSave,
}: {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}) {
  const [form, setForm] = useState<Product>(EMPTY);

  useEffect(() => {
    if (open) setForm(product ?? EMPTY);
  }, [open, product]);

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      ...form,
      id: form.id || `p-${Date.now()}`,
    });
  }

  const isEdit = Boolean(product);

  return (
    <AnimatePresence>
      {open && (
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
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-card-hover"
          >
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="text-lg font-heading font-bold text-foreground">
                {isEdit ? "Edit Product" : "Add Product"}
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
              <Field label="Product Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="input"
                  placeholder="e.g. Tirzepatide"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value as ProductCategory)}
                    className="input"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(e) => update("status", e.target.value as ProductStatus)}
                    className="input"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Monthly Price ($)">
                  <input
                    type="number"
                    min={0}
                    value={form.monthly}
                    onChange={(e) => update("monthly", Number(e.target.value))}
                    className="input"
                  />
                </Field>
                <Field label="3-Month Price ($)">
                  <input
                    type="number"
                    min={0}
                    value={form.quarterly}
                    onChange={(e) => update("quarterly", Number(e.target.value))}
                    className="input"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Tag">
                  <select
                    value={form.tag ?? ""}
                    onChange={(e) => update("tag", (e.target.value || null) as ProductTag)}
                    className="input"
                  >
                    <option value="">None</option>
                    {TAGS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Subscribers">
                  <input
                    type="number"
                    min={0}
                    value={form.subscribers}
                    onChange={(e) => update("subscribers", Number(e.target.value))}
                    className="input"
                  />
                </Field>
              </div>

              <Field label="What's Included">
                <textarea
                  value={form.included}
                  onChange={(e) => update("included", e.target.value)}
                  rows={3}
                  className="input resize-none"
                  placeholder="Provider review, medication, syringes, fitness classes"
                />
              </Field>
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
                {isEdit ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

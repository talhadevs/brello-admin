"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Order, PaymentStatus, FulfillmentStatus } from "@/components/admin/orders/orders-data";

const PAYMENTS: PaymentStatus[] = ["Paid", "Pending", "Refunded"];
const FULFILLMENTS: FulfillmentStatus[] = [
  "Provider Review",
  "Processing",
  "Shipped",
  "Delivered",
  "On Hold",
  "Cancelled",
];

const EMPTY: Order = {
  id: "",
  customer: "",
  email: "",
  plan: "",
  state: "",
  amount: 0,
  payment: "Pending",
  fulfillment: "Provider Review",
  date: new Date().toISOString().slice(0, 10),
};

export default function OrderModal({
  open,
  order,
  onClose,
  onSave,
}: {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onSave: (order: Order) => void | Promise<void>;
}) {
  const [form, setForm] = useState<Order>(EMPTY);

  useEffect(() => {
    if (open) setForm(order ?? EMPTY);
  }, [open, order]);

  function update<K extends keyof Order>(key: K, value: Order[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave({
      ...form,
      id: form.id || `BR-${Date.now()}`,
    });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={onClose}
        >
          <motion.form
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-bold">
                {order ? "Edit Order" : "Add Order"}
              </h2>
              <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Customer</span>
                <input required value={form.customer} onChange={(e) => update("customer", e.target.value)} className="input mt-1" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Email</span>
                <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="input mt-1" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Plan</span>
                <input required value={form.plan} onChange={(e) => update("plan", e.target.value)} className="input mt-1" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">State</span>
                <input required value={form.state} onChange={(e) => update("state", e.target.value)} className="input mt-1" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Amount ($)</span>
                <input type="number" required min={0} value={form.amount} onChange={(e) => update("amount", Number(e.target.value))} className="input mt-1" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Date</span>
                <input type="date" required value={form.date} onChange={(e) => update("date", e.target.value)} className="input mt-1" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Payment</span>
                <select value={form.payment} onChange={(e) => update("payment", e.target.value as PaymentStatus)} className="input mt-1">
                  {PAYMENTS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium">Fulfillment</span>
                <select value={form.fulfillment} onChange={(e) => update("fulfillment", e.target.value as FulfillmentStatus)} className="input mt-1">
                  {FULFILLMENTS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-brand-foreground">
              Save Order
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Clock,
  Truck,
  DollarSign,
  Search,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  ORDERS,
  MEDICATIONS,
  PAYMENT_STYLES,
  FULFILLMENT_STYLES,
  type FulfillmentStatus,
} from "@/components/admin/orders/orders-data";

const FULFILLMENT_OPTIONS: (FulfillmentStatus | "All")[] = [
  "All",
  "Provider Review",
  "Processing",
  "Shipped",
  "Delivered",
  "On Hold",
  "Cancelled",
];

const PAGE_SIZE = 8;

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

export default function OrdersView() {
  const [query, setQuery] = useState("");
  const [fulfillment, setFulfillment] = useState<(typeof FULFILLMENT_OPTIONS)[number]>("All");
  const [medication, setMedication] = useState<string>("All");
  const [page, setPage] = useState(1);

  const stats = useMemo(() => {
    const total = ORDERS.length;
    const pending = ORDERS.filter(
      (o) => o.fulfillment === "Provider Review" || o.fulfillment === "Processing" || o.fulfillment === "On Hold"
    ).length;
    const shipped = ORDERS.filter(
      (o) => o.fulfillment === "Shipped" || o.fulfillment === "Delivered"
    ).length;
    const revenue = ORDERS.filter((o) => o.payment === "Paid").reduce((s, o) => s + o.amount, 0);
    return { total, pending, shipped, revenue };
  }, []);

  const filtered = useMemo(() => {
    return ORDERS.filter((o) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q);
      const matchesFulfillment = fulfillment === "All" || o.fulfillment === fulfillment;
      const matchesMedication = medication === "All" || o.plan === medication;
      return matchesQuery && matchesFulfillment && matchesMedication;
    });
  }, [query, fulfillment, medication]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage customer orders and fulfillment.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
          <Download size={16} />
          Export
        </button>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard index={0} label="Total Orders" value={String(stats.total)} icon={ShoppingCart} tint="bg-brand/10 text-brand" />
        <StatCard index={1} label="Pending" value={String(stats.pending)} icon={Clock} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
        <StatCard index={2} label="Shipped / Delivered" value={String(stats.shipped)} icon={Truck} tint="bg-sky-500/10 text-sky-600 dark:text-sky-400" />
        <StatCard index={3} label="Revenue (Paid)" value={`$${stats.revenue.toLocaleString()}`} icon={DollarSign} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => resetPage(setQuery)(e.target.value)}
              placeholder="Search by order, customer or email"
              className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <select
            value={fulfillment}
            onChange={(e) => resetPage(setFulfillment)(e.target.value as (typeof FULFILLMENT_OPTIONS)[number])}
            className="rounded-full border border-border bg-background py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-brand/30"
          >
            {FULFILLMENT_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All statuses" : s}
              </option>
            ))}
          </select>
          <select
            value={medication}
            onChange={(e) => resetPage(setMedication)(e.target.value)}
            className="rounded-full border border-border bg-background py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="All">All medications</option>
            {MEDICATIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground bg-muted/40">
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Medication / Plan</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Fulfillment</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">{o.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{o.customer}</div>
                    <div className="text-xs text-muted-foreground">{o.email}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{o.plan}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{o.state}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">${o.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${PAYMENT_STYLES[o.payment]}`}>
                      {o.payment}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${FULFILLMENT_STYLES[o.fulfillment]}`}>
                      {o.fulfillment}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{o.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-brand transition-colors"
                      aria-label="View order"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing {pageItems.length} of {filtered.length} orders
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-semibold transition-colors ${
                  currentPage === i + 1
                    ? "bg-brand text-brand-foreground"
                    : "border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

type Order = {
  id: string;
  customer: string;
  from: string;
  amount: string;
  status: "Paid" | "Pending" | "Shipped" | "On Hold";
};

const ORDERS: Order[] = [
  { id: "12386", customer: "Norma A.", from: "Texas", amount: "$399", status: "Shipped" },
  { id: "12385", customer: "Jen N.", from: "Florida", amount: "$199", status: "Paid" },
  { id: "12384", customer: "Gerald G.", from: "Ohio", amount: "$499", status: "On Hold" },
  { id: "12383", customer: "Tiffany K.", from: "Arizona", amount: "$499", status: "Paid" },
  { id: "12382", customer: "Maria L.", from: "Georgia", amount: "$79", status: "Pending" },
];

const STATUS_STYLES: Record<Order["status"], string> = {
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Shipped: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  "On Hold": "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

export default function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl border border-border bg-card shadow-card overflow-hidden h-full"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border">
        <div>
          <h3 className="font-heading font-bold text-foreground">Order Status</h3>
          <p className="text-xs text-muted-foreground">Overview of Latest Month</p>
        </div>
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-44 rounded-full border border-border bg-background py-1.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground bg-muted/40">
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">From</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr
                key={o.id}
                className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors"
              >
                <td className="px-5 py-3 font-semibold text-foreground">{o.id}</td>
                <td className="px-5 py-3 text-foreground">{o.customer}</td>
                <td className="px-5 py-3 text-muted-foreground">{o.from}</td>
                <td className="px-5 py-3 font-semibold text-foreground">{o.amount}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[o.status]}`}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

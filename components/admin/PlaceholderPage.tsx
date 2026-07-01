"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  RefreshCw,
  Tag,
  Users,
  ClipboardList,
  Stethoscope,
  Settings,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export type PlaceholderIcon =
  | "orders"
  | "subscriptions"
  | "plans"
  | "members"
  | "intakes"
  | "providers"
  | "settings";

const ICONS: Record<PlaceholderIcon, LucideIcon> = {
  orders: ShoppingCart,
  subscriptions: RefreshCw,
  plans: Tag,
  members: Users,
  intakes: ClipboardList,
  providers: Stethoscope,
  settings: Settings,
};

export default function PlaceholderPage({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: PlaceholderIcon;
}) {
  const Icon = ICONS[icon];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card"
      >
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
          <div className="grid grid-cols-3 gap-4 p-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-muted" />
            ))}
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <Icon size={28} />
          </div>
          <h2 className="mt-5 text-xl font-heading font-bold text-foreground">
            {title} module
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            This section&apos;s interface is being designed. The layout and
            components will appear here soon.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
            <Hammer size={13} />
            Coming soon
          </span>
        </div>
      </motion.div>
    </div>
  );
}

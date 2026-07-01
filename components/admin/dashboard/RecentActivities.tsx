"use client";

import { motion } from "framer-motion";

type Activity = {
  time: string;
  title: string;
  meta: string;
  color: string;
};

const ACTIVITIES: Activity[] = [
  { time: "40 mins ago", title: "New Intake Submitted", meta: "Norma A. started Semaglutide", color: "bg-violet-400" },
  { time: "1 day ago", title: "Order Shipped", meta: "Jen N. · GLP-1 + NAD+", color: "bg-rose-400" },
  { time: "42 mins ago", title: "Provider Review", meta: "Gerald G. approved", color: "bg-sky-400" },
  { time: "2 days ago", title: "Subscription Renewed", meta: "Tiffany K. · Sermorelin", color: "bg-amber-400" },
  { time: "3 days ago", title: "New Member Joined", meta: "Maria L. signed up", color: "bg-emerald-400" },
];

export default function RecentActivities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl border border-border bg-card shadow-card p-5 h-full"
    >
      <h3 className="font-heading font-bold text-foreground mb-5">
        Recent Activities
      </h3>
      <div className="space-y-5">
        {ACTIVITIES.map((a, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className={`h-2.5 w-2.5 rounded-full ${a.color} shrink-0 mt-1.5`} />
              {i < ACTIVITIES.length - 1 && (
                <span className="w-px flex-1 bg-border mt-1" />
              )}
            </div>
            <div className="pb-1">
              <p className="text-[11px] text-muted-foreground">{a.time}</p>
              <p className="text-sm font-semibold text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

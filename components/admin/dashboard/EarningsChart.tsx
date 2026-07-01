"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Wallet, Users, TrendingUp, DollarSign } from "lucide-react";

const TABS = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

const SERIES_A = [22, 30, 26, 34, 40, 33, 48, 44, 52, 47, 60, 66];
const SERIES_B = [14, 20, 17, 24, 22, 28, 30, 26, 34, 38, 44, 50];
const LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const W = 640;
const H = 220;
const PAD_X = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

function buildPaths(data: number[], max: number) {
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_TOP - PAD_BOTTOM;
  const x = (i: number) => PAD_X + (innerW * i) / (data.length - 1);
  const y = (v: number) => PAD_TOP + innerH - (innerH * v) / max;
  const line = data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const area = `${line} L ${x(data.length - 1)} ${PAD_TOP + innerH} L ${x(0)} ${PAD_TOP + innerH} Z`;
  return { line, area, x, y };
}

const MINI_STATS = [
  { icon: Wallet, label: "Wallet Balance", value: "$4,557.53", color: "text-violet-500" },
  { icon: Users, label: "Referral Earning", value: "$1,689.53", color: "text-rose-500" },
  { icon: TrendingUp, label: "Estimate Sales", value: "$2,851.53", color: "text-sky-500" },
  { icon: DollarSign, label: "Earning", value: "$52,567.53", color: "text-amber-500" },
];

export default function EarningsChart() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Monthly");

  const max = Math.max(...SERIES_A) * 1.15;
  const a = buildPaths(SERIES_A, max);
  const b = buildPaths(SERIES_B, max);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-lg font-semibold text-foreground">Overview of Latest Month</p>
        </div>
        <div className="flex rounded-full bg-muted p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                tab === t
                  ? "bg-card text-brand shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 mb-2">
        <div>
          <p className="text-2xl font-bold text-foreground">$3,468.96</p>
          <p className="text-xs text-muted-foreground">Current Month Earnings</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">82</p>
          <p className="text-xs text-muted-foreground">Current Month Sales</p>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <linearGradient id="earnA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(262 78% 60%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(262 78% 60%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="earnB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(28 90% 62%)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="hsl(28 90% 62%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.33, 0.66, 1].map((g) => (
          <line
            key={g}
            x1={PAD_X}
            x2={W - PAD_X}
            y1={PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) * g}
            y2={PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) * g}
            stroke="hsl(var(--border))"
            strokeWidth={1}
            strokeDasharray="4 6"
          />
        ))}

        <motion.path d={b.area} fill="url(#earnB)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />
        <motion.path d={a.area} fill="url(#earnA)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />
        <motion.path
          d={b.line}
          fill="none"
          stroke="hsl(28 90% 62%)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d={a.line}
          fill="none"
          stroke="hsl(262 78% 60%)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {LABELS.map((l, i) => (
          <text
            key={l}
            x={a.x(i)}
            y={H - 6}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize={10}
          >
            {l}
          </text>
        ))}
      </svg>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-border">
        {MINI_STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-muted ${s.color}`}>
              <s.icon size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

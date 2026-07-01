"use client";

import { motion } from "framer-motion";

export type MiniStatTheme = "rose" | "violet" | "sky" | "amber";
export type MiniChartKind = "bars" | "area";

const THEMES: Record<
  MiniStatTheme,
  { bg: string; text: string; sub: string; accent: string }
> = {
  rose: {
    bg: "bg-rose-50 dark:bg-rose-500/10",
    text: "text-rose-900 dark:text-rose-100",
    sub: "text-rose-500/80 dark:text-rose-300/70",
    accent: "hsl(340 75% 62%)",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-500/10",
    text: "text-violet-900 dark:text-violet-100",
    sub: "text-violet-500/80 dark:text-violet-300/70",
    accent: "hsl(262 60% 60%)",
  },
  sky: {
    bg: "bg-sky-50 dark:bg-sky-500/10",
    text: "text-sky-900 dark:text-sky-100",
    sub: "text-sky-500/80 dark:text-sky-300/70",
    accent: "hsl(200 75% 55%)",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-900 dark:text-amber-100",
    sub: "text-amber-600/80 dark:text-amber-300/70",
    accent: "hsl(35 90% 55%)",
  },
};

const DATA = [8, 14, 10, 18, 12, 20, 16, 22];

function MiniBars({ color }: { color: string }) {
  const max = Math.max(...DATA);
  return (
    <div className="flex items-end gap-1 h-10">
      {DATA.map((v, i) => (
        <motion.span
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          className="w-1.5 rounded-full"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}

function MiniArea({ color }: { color: string }) {
  const w = 90;
  const h = 40;
  const max = Math.max(...DATA);
  const x = (i: number) => (w * i) / (DATA.length - 1);
  const y = (v: number) => h - (h - 6) * (v / max) - 2;
  const line = DATA.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <motion.path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
    </svg>
  );
}

export type MiniStatCardProps = {
  label: string;
  value: string;
  period: string;
  theme: MiniStatTheme;
  chart: MiniChartKind;
  index?: number;
};

export default function MiniStatCard({
  label,
  value,
  period,
  theme,
  chart,
  index = 0,
}: MiniStatCardProps) {
  const t = THEMES[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`rounded-2xl border border-border/50 p-5 ${t.bg}`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className={`text-sm font-semibold ${t.text}`}>{label}</p>
        <div className={t.text}>
          {chart === "bars" ? (
            <MiniBars color={t.accent} />
          ) : (
            <MiniArea color={t.accent} />
          )}
        </div>
      </div>
      <p className={`text-2xl font-bold ${t.text}`}>{value}</p>
      <p className={`text-xs mt-1 ${t.sub}`}>{period}</p>
    </motion.div>
  );
}

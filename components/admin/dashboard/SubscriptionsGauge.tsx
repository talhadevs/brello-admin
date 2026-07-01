"use client";

import { motion } from "framer-motion";

const TOTAL = 68;
const NEW = 45;
const RENEWALS = 23;

const N_BARS = 18;
const CX = 160;
const CY = 172;
const R = 118;
const BAR_W = 16;
const BAR_H = 58;

const DOT_R = 80;
const N_DOTS = 26;

function barColor(i: number) {
  const t = i / (N_BARS - 1);
  const light = 34 + t * 46;
  return `hsl(262 68% ${light}%)`;
}

export default function SubscriptionsGauge() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card h-full flex flex-col">
      <h3 className="text-center font-heading font-bold text-foreground">
        Total Acquired Subscriptions in{" "}
        <span className="text-brand">July</span>
      </h3>

      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 320 200" className="w-full max-w-[440px] h-auto">
          {Array.from({ length: N_DOTS }).map((_, j) => {
            const t = (Math.PI * j) / (N_DOTS - 1);
            const x = CX - DOT_R * Math.cos(t);
            const y = CY - DOT_R * Math.sin(t);
            return (
              <circle key={`d${j}`} cx={x} cy={y} r={1.6} fill="hsl(262 60% 75%)" opacity={0.5} />
            );
          })}

          {Array.from({ length: N_BARS }).map((_, i) => {
            const angle = -90 + (180 * i) / (N_BARS - 1);
            return (
              <motion.rect
                key={i}
                x={CX - BAR_W / 2}
                y={CY - R - BAR_H / 2}
                width={BAR_W}
                height={BAR_H}
                rx={BAR_W / 2}
                fill={barColor(i)}
                transform={`rotate(${angle} ${CX} ${CY})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-brand leading-none"
          >
            {TOTAL}
          </motion.span>
          <span className="mt-1 text-sm text-muted-foreground">
            Active subscriptions
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-border border-t border-border pt-4 mt-2">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">New Members</p>
          <p className="text-xl font-bold text-foreground">{NEW}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Renewals</p>
          <p className="text-xl font-bold text-foreground">{RENEWALS}</p>
        </div>
      </div>
    </div>
  );
}

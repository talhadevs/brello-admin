"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Ban, HelpCircle, AlertTriangle } from "lucide-react";
import {
  STATUS_STYLES,
  type ReviewCase,
  type ReviewStatus,
} from "@/components/admin/reviews/reviews-data";

export default function ReviewModal({
  open,
  reviewCase,
  onClose,
  onDecision,
}: {
  open: boolean;
  reviewCase: ReviewCase | null;
  onClose: () => void;
  onDecision: (id: string, status: ReviewStatus, note: string) => void;
}) {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) setNote("");
  }, [open, reviewCase]);

  return (
    <AnimatePresence>
      {open && reviewCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-card-hover"
          >
            <div className="flex items-start justify-between border-b border-border p-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-heading font-bold text-foreground">
                    {reviewCase.patient}
                  </h2>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[reviewCase.status]}`}>
                    {reviewCase.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {reviewCase.id} · {reviewCase.age}/{reviewCase.sex} · {reviewCase.medication}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <Metric label="BMI" value={String(reviewCase.bmi)} />
                <Metric label="Provider" value={reviewCase.provider.replace("Dr. ", "")} />
                <Metric label="Wait" value={`${reviewCase.waitHours}h`} />
              </div>

              {reviewCase.flags.length > 0 && (
                <div className="rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1.5">
                    <AlertTriangle size={13} /> Health Flags
                  </p>
                  <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-0.5">
                    {reviewCase.flags.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Intake Answers</p>
                <div className="rounded-xl border border-border divide-y divide-border">
                  {reviewCase.intake.map((row) => (
                    <div key={row.q} className="flex justify-between gap-4 px-3 py-2 text-sm">
                      <span className="text-muted-foreground">{row.q}</span>
                      <span className="font-medium text-foreground text-right">{row.a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-1.5">Provider Note</p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="Add a note for this decision (optional)"
                  className="input resize-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t border-border p-5">
              <button
                onClick={() => onDecision(reviewCase.id, "Needs Info", note)}
                className="inline-flex items-center gap-1.5 rounded-full border border-sky-300 bg-sky-50 dark:bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-700 dark:text-sky-300 hover:opacity-90 transition-opacity"
              >
                <HelpCircle size={15} /> Request Info
              </button>
              <button
                onClick={() => onDecision(reviewCase.id, "Denied", note)}
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 dark:bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-700 dark:text-rose-300 hover:opacity-90 transition-opacity"
              >
                <Ban size={15} /> Deny
              </button>
              <button
                onClick={() => onDecision(reviewCase.id, "Approved", note)}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                <Check size={15} /> Approve
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/50 p-3 text-center">
      <p className="text-lg font-bold text-foreground leading-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

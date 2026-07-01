"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Member, MemberStatus } from "@/components/admin/members/members-data";

const STATUSES: MemberStatus[] = ["Active", "New", "Inactive", "Suspended"];

const EMPTY: Member = {
  id: "",
  name: "",
  email: "",
  plan: "",
  status: "New",
  state: "",
  joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
  lastActive: "Today",
  progress: "—",
};

export default function MemberModal({
  open,
  member,
  onClose,
  onSave,
}: {
  open: boolean;
  member: Member | null;
  onClose: () => void;
  onSave: (member: Member) => void | Promise<void>;
}) {
  const [form, setForm] = useState<Member>(EMPTY);

  useEffect(() => {
    if (open) setForm(member ?? EMPTY);
  }, [open, member]);

  function update<K extends keyof Member>(key: K, value: Member[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave({ ...form, id: form.id || `MBR-${Date.now()}` });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
          <motion.form initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-bold">{member ? "Edit Member" : "Add Member"}</h2>
              <button type="button" onClick={onClose}><X size={18} /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2"><span className="text-sm font-medium">Name</span><input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input mt-1" /></label>
              <label className="block sm:col-span-2"><span className="text-sm font-medium">Email</span><input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="input mt-1" /></label>
              <label className="block"><span className="text-sm font-medium">Plan</span><input required value={form.plan} onChange={(e) => update("plan", e.target.value)} className="input mt-1" /></label>
              <label className="block"><span className="text-sm font-medium">State</span><input required value={form.state} onChange={(e) => update("state", e.target.value)} className="input mt-1" /></label>
              <label className="block"><span className="text-sm font-medium">Status</span><select value={form.status} onChange={(e) => update("status", e.target.value as MemberStatus)} className="input mt-1">{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
              <label className="block"><span className="text-sm font-medium">Progress</span><input value={form.progress} onChange={(e) => update("progress", e.target.value)} className="input mt-1" /></label>
            </div>
            <button type="submit" className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-brand-foreground">Save Member</button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

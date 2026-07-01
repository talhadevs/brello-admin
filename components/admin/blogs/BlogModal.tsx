"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { BlogPost, BlogCategory, BlogStatus } from "@/components/admin/blogs/blogs-data";

const CATEGORIES: BlogCategory[] = ["Weight Loss", "Medication", "Nutrition", "Fitness", "Community"];
const STATUSES: BlogStatus[] = ["Published", "Draft", "Scheduled"];

const EMPTY: BlogPost = {
  id: "",
  title: "",
  excerpt: "",
  author: "",
  category: "Weight Loss",
  status: "Draft",
  date: new Date().toISOString().slice(0, 10),
  views: 0,
  readTime: 5,
};

export default function BlogModal({
  open,
  post,
  onClose,
  onSave,
}: {
  open: boolean;
  post: BlogPost | null;
  onClose: () => void;
  onSave: (post: BlogPost) => void | Promise<void>;
}) {
  const [form, setForm] = useState<BlogPost>(EMPTY);

  useEffect(() => {
    if (open) setForm(post ?? EMPTY);
  }, [open, post]);

  function update<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave({ ...form, id: form.id || `b-${Date.now()}` });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
          <motion.form initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-bold">{post ? "Edit Post" : "Add Post"}</h2>
              <button type="button" onClick={onClose}><X size={18} /></button>
            </div>
            <label className="block"><span className="text-sm font-medium">Title</span><input required value={form.title} onChange={(e) => update("title", e.target.value)} className="input mt-1" /></label>
            <label className="block"><span className="text-sm font-medium">Excerpt</span><textarea required value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={3} className="input mt-1" /></label>
            <label className="block"><span className="text-sm font-medium">Author</span><input required value={form.author} onChange={(e) => update("author", e.target.value)} className="input mt-1" /></label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block"><span className="text-sm font-medium">Category</span><select value={form.category} onChange={(e) => update("category", e.target.value as BlogCategory)} className="input mt-1">{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></label>
              <label className="block"><span className="text-sm font-medium">Status</span><select value={form.status} onChange={(e) => update("status", e.target.value as BlogStatus)} className="input mt-1">{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
              <label className="block"><span className="text-sm font-medium">Date</span><input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="input mt-1" /></label>
              <label className="block"><span className="text-sm font-medium">Read time (min)</span><input type="number" min={1} value={form.readTime} onChange={(e) => update("readTime", Number(e.target.value))} className="input mt-1" /></label>
            </div>
            <button type="submit" className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-brand-foreground">Save Post</button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

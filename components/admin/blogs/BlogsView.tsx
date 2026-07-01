"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  CheckCircle2,
  FileEdit,
  Eye,
  Search,
  Plus,
  Pencil,
  Trash2,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { useAdminCrud } from "@/components/admin/crud/useAdminCrud";
import {
  BLOG_POSTS,
  CATEGORY_STYLES,
  STATUS_STYLES,
  type BlogPost,
  type BlogCategory,
  type BlogStatus,
} from "@/components/admin/blogs/blogs-data";
import BlogModal from "@/components/admin/blogs/BlogModal";

const CATEGORY_OPTIONS: (BlogCategory | "All")[] = [
  "All",
  "Weight Loss",
  "Medication",
  "Nutrition",
  "Fitness",
  "Community",
];
const STATUS_OPTIONS: (BlogStatus | "All")[] = ["All", "Published", "Draft", "Scheduled"];

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

function BlogCard({
  post,
  index,
  onEdit,
  onDelete,
}: {
  post: BlogPost;
  index: number;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string, title: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all"
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${CATEGORY_STYLES[post.category]}`}>
          {post.category}
        </span>
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[post.status]}`}>
          {post.status}
        </span>
      </div>

      <h3 className="mt-3 font-heading font-bold text-foreground leading-snug">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground flex-1">{post.excerpt}</p>

      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{post.author}</span>
        <span>·</span>
        <span>{post.date}</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} />
          {post.readTime}m
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Eye size={14} />
          {post.views.toLocaleString()} views
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(post)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-brand hover:text-brand-foreground transition-colors"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id, post.title)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-colors"
            aria-label="Delete post"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogsView() {
  const { items: posts, error, save, remove } = useAdminCrud<BlogPost>("blogs", BLOG_POSTS);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(post: BlogPost) {
    setEditing(post);
    setModalOpen(true);
  }

  async function handleSave(saved: BlogPost) {
    try {
      await save(saved);
      setModalOpen(false);
      setEditing(null);
    } catch {
      /* error shown via banner */
    }
  }

  const stats = useMemo(() => {
    const total = posts.length;
    const published = posts.filter((p) => p.status === "Published").length;
    const drafts = posts.filter((p) => p.status === "Draft").length;
    const views = posts.reduce((s, p) => s + p.views, 0);
    return { total, published, drafts, views };
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      const matchesStatus = status === "All" || p.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [posts, query, category, status]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Blogs</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage articles for the Brello blog.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard index={0} label="Total Posts" value={String(stats.total)} icon={Newspaper} tint="bg-brand/10 text-brand" />
        <StatCard index={1} label="Published" value={String(stats.published)} icon={CheckCircle2} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
        <StatCard index={2} label="Drafts" value={String(stats.drafts)} icon={FileEdit} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
        <StatCard index={3} label="Total Views" value={stats.views.toLocaleString()} icon={Eye} tint="bg-sky-500/10 text-sky-600 dark:text-sky-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts or authors"
            className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as (typeof CATEGORY_OPTIONS)[number])}
          className="rounded-full border border-border bg-background py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-brand/30"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as (typeof STATUS_OPTIONS)[number])}
          className="rounded-full border border-border bg-background py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-brand/30"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
          No posts match your filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <BlogCard key={p.id} post={p} index={i} onEdit={openEdit} onDelete={remove} />
          ))}
        </div>
      )}

      <BlogModal
        open={modalOpen}
        post={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

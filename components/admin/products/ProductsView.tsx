"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Pill,
  Boxes,
  Activity,
  Package,
  Users,
  Crown,
  Plus,
  Search,
  LayoutGrid,
  List,
  Pencil,
  Eye,
  type LucideIcon,
} from "lucide-react";
import {
  PRODUCTS,
  CATEGORY_STYLES,
  STATUS_STYLES,
  type Product,
  type ProductCategory,
  type ProductStatus,
} from "@/components/admin/products/products-data";
import ProductModal from "@/components/admin/products/ProductModal";

const CATEGORY_ICON: Record<ProductCategory, LucideIcon> = {
  Medication: Pill,
  Bundle: Boxes,
  Device: Activity,
};

const CATEGORY_OPTIONS: (ProductCategory | "All")[] = ["All", "Medication", "Bundle", "Device"];
const STATUS_OPTIONS: (ProductStatus | "All")[] = ["All", "Active", "Draft", "Out of Stock"];

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

function ProductCard({
  product,
  index,
  onEdit,
}: {
  product: Product;
  index: number;
  onEdit: (product: Product) => void;
}) {
  const Icon = CATEGORY_ICON[product.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon size={22} />
        </div>
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[product.status]}`}>
          {product.status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <h3 className="font-heading font-bold text-foreground">{product.name}</h3>
        {product.tag && (
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand">
            {product.tag}
          </span>
        )}
      </div>
      <span className={`mt-2 inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${CATEGORY_STYLES[product.category]}`}>
        {product.category}
      </span>

      <p className="mt-3 text-sm text-muted-foreground flex-1">{product.included}</p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xl font-bold text-foreground">
            ${product.monthly}
            <span className="text-sm font-medium text-muted-foreground">/mo</span>
          </p>
          <p className="text-xs text-muted-foreground">3-month ${product.quarterly}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users size={14} />
          {product.subscribers.toLocaleString()}
        </div>
      </div>

      <div className="mt-4 flex gap-2 border-t border-border pt-4">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-muted py-2 text-sm font-semibold text-foreground hover:bg-brand hover:text-brand-foreground transition-colors"
        >
          <Pencil size={14} />
          Edit
        </button>
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-brand transition-colors" aria-label="View product">
          <Eye size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductsView() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setModalOpen(true);
  }

  function handleSave(saved: Product) {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === saved.id);
      return exists
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [saved, ...prev];
    });
    setModalOpen(false);
    setEditing(null);
  }

  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.status === "Active").length;
    const bundles = products.filter((p) => p.category === "Bundle").length;
    const bestSeller = products.reduce(
      (best, p) => (p.subscribers > best.subscribers ? p : best),
      products[0]
    );
    return { total, active, bundles, bestSeller };
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || p.name.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      const matchesStatus = status === "All" || p.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [products, query, category, status]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage medications, bundles, and wellness plans.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard index={0} label="Total Products" value={String(stats.total)} icon={Package} tint="bg-brand/10 text-brand" />
        <StatCard index={1} label="Active" value={String(stats.active)} icon={Pill} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
        <StatCard index={2} label="Bundles" value={String(stats.bundles)} icon={Boxes} tint="bg-sky-500/10 text-sky-600 dark:text-sky-400" />
        <StatCard index={3} label="Top Seller this Month" value={stats.bestSeller?.name ?? "—"} icon={Crown} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
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
        <div className="flex rounded-full border border-border bg-background p-1">
          <button
            onClick={() => setView("grid")}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${view === "grid" ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-foreground"}`}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${view === "list" ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-foreground"}`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
          No products match your filters.
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onEdit={openEdit} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground bg-muted/40">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price /mo</th>
                  <th className="px-4 py-3 font-medium">3-month</th>
                  <th className="px-4 py-3 font-medium">Subscribers</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const Icon = CATEGORY_ICON[p.category];
                  return (
                    <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand shrink-0">
                            <Icon size={16} />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{p.name}</div>
                            {p.tag && <div className="text-[10px] font-bold uppercase text-brand">{p.tag}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${CATEGORY_STYLES[p.category]}`}>{p.category}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">${p.monthly}</td>
                      <td className="px-4 py-3 text-muted-foreground">${p.quarterly}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.subscribers.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[p.status]}`}>{p.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => openEdit(p)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-brand transition-colors"
                          aria-label="Edit product"
                        >
                          <Pencil size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ProductModal
        open={modalOpen}
        product={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

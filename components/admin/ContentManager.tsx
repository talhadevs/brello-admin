"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/format-date";

type ContentRow = {
  id: number;
  title: string;
  status: string;
  date: string;
  slug: string;
};

type Props = {
  type: string;
  typeLabel: string;
  initialItems: ContentRow[];
  initialTotal: number;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

export default function ContentManager({
  type,
  typeLabel,
  initialItems,
  initialTotal,
}: Props) {
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    status: "draft" as "draft" | "publish",
  });

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/wordpress/${type}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load");
      setItems(
        data.items.map(
          (item: {
            id: number;
            title: { rendered: string };
            status: string;
            date: string;
            slug: string;
          }) => ({
            id: item.id,
            title: stripHtml(item.title.rendered),
            status: item.status,
            date: item.date,
            slug: item.slug,
          }),
        ),
      );
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/wordpress/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create");
      setForm({ title: "", excerpt: "", content: "", status: "draft" });
      setShowForm(false);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/wordpress/${type}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to delete");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            {typeLabel}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{total} items</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-cool text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90"
        >
          {showForm ? "Cancel" : "+ Add New"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-card space-y-4"
        >
          <h2 className="font-heading font-semibold text-lg">Add New Item</h2>
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
          />
          <textarea
            placeholder="Excerpt (short description)"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
          />
          <textarea
            placeholder="Content (HTML allowed)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
          />
          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as "draft" | "publish",
              })
            }
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="publish">Published</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-cool text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Item"}
          </button>
        </form>
      )}

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  {loading ? "Loading..." : "No items found"}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="px-4 py-3 text-muted-foreground">{item.id}</td>
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                        item.status === "publish"
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(item.date)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      disabled={loading}
                      className="inline-flex items-center gap-1 text-destructive hover:opacity-70 disabled:opacity-40 text-xs"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

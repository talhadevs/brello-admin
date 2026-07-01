"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminResource } from "@/lib/admin/registry";

type CrudRecord = { id: string };

export function useAdminCrud<T extends CrudRecord>(
  resource: AdminResource,
  fallback: T[]
) {
  const [items, setItems] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/${resource}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load data");
      setItems(data.items as T[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
      setItems(fallback);
    } finally {
      setLoading(false);
    }
  }, [resource, fallback]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function create(item: T) {
    setError(null);
    const res = await fetch(`/api/admin/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error ?? "Failed to create";
      setError(msg);
      throw new Error(msg);
    }
    setItems((prev) => [data.item as T, ...prev]);
    return data.item as T;
  }

  async function update(item: T) {
    setError(null);
    const res = await fetch(`/api/admin/${resource}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error ?? "Failed to update";
      setError(msg);
      throw new Error(msg);
    }
    setItems((prev) => prev.map((r) => (r.id === item.id ? (data.item as T) : r)));
    return data.item as T;
  }

  async function save(item: T) {
    const exists = items.some((r) => r.id === item.id);
    return exists ? update(item) : create(item);
  }

  async function remove(id: string, label?: string) {
    if (!confirm(`Delete ${label ? `"${label}"` : "this item"}? This cannot be undone.`)) {
      return false;
    }
    setError(null);
    const res = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error ?? "Failed to delete";
      setError(msg);
      throw new Error(msg);
    }
    setItems((prev) => prev.filter((r) => r.id !== id));
    return true;
  }

  return { items, setItems, loading, error, refresh, create, update, save, remove };
}

"use client";

import { useEffect, useState } from "react";

type StripeListResult<T> = {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  configured: boolean;
  usingMock: boolean;
  loading: boolean;
};

export function useStripeList<T>(
  endpoint: string,
  dataKey: string,
  fallback: T[]
): StripeListResult<T> {
  const [items, setItems] = useState<T[]>(fallback);
  const [configured, setConfigured] = useState(false);
  const [usingMock, setUsingMock] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(endpoint);
        const data = await res.json();

        if (cancelled) return;

        if (res.ok && data.source === "stripe" && Array.isArray(data[dataKey])) {
          setItems(data[dataKey] as T[]);
          setConfigured(true);
          setUsingMock(false);
        } else {
          setConfigured(Boolean(data.configured));
          setUsingMock(true);
          setItems(fallback);
        }
      } catch {
        if (!cancelled) {
          setUsingMock(true);
          setItems(fallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [endpoint, dataKey, fallback]);

  return { items, setItems, configured, usingMock, loading };
}

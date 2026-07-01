"use client";

import { AlertCircle } from "lucide-react";

export default function StripeBanner({
  configured,
  usingMock,
}: {
  configured: boolean;
  usingMock: boolean;
}) {
  if (configured && !usingMock) return null;

  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
      <AlertCircle size={18} className="shrink-0 mt-0.5" />
      <div>
        {!configured ? (
          <>
            <p className="font-semibold">Stripe not connected</p>
            <p className="mt-0.5 opacity-90">
              Add <code className="text-xs">STRIPE_SECRET_KEY</code> to{" "}
              <code className="text-xs">.env.local</code> to load live payment data.
              Showing demo data for now.
            </p>
          </>
        ) : (
          <>
            <p className="font-semibold">Using demo fallback</p>
            <p className="mt-0.5 opacity-90">
              Stripe is configured but live data could not be loaded. Showing demo data.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

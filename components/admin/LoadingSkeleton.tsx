export function DashboardSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-pulse">
      <div className="h-9 w-48 bg-muted rounded-lg mb-2" />
      <div className="h-4 w-80 bg-muted rounded mb-8" />
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2 h-80 rounded-2xl border border-border bg-card" />
        <div className="h-80 rounded-2xl border border-border bg-card" />
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl border border-border bg-card"
          />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-72 rounded-2xl border border-border bg-card" />
        <div className="lg:col-span-2 h-72 rounded-2xl border border-border bg-card" />
      </div>
    </div>
  );
}

export function ContentPageSkeleton() {
  return (
    <div className="p-8 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-9 w-40 bg-muted rounded-lg" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
        <div className="h-10 w-28 bg-muted rounded-full" />
      </div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex gap-8">
          {["w-8", "w-32", "w-16", "w-20", "w-16"].map((w, i) => (
            <div key={i} className={`h-4 ${w} bg-muted rounded`} />
          ))}
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border-b border-border/50 px-4 py-4 flex gap-8 items-center"
          >
            <div className="h-4 w-8 bg-muted rounded" />
            <div className="h-4 flex-1 max-w-xs bg-muted rounded" />
            <div className="h-5 w-16 bg-muted rounded-full" />
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-14 bg-muted rounded ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

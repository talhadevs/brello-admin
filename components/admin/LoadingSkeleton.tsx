export function DashboardSkeleton() {
  return (
    <div className="p-8 max-w-5xl animate-pulse">
      <div className="h-9 w-48 bg-muted rounded-lg mb-2" />
      <div className="h-4 w-72 bg-muted rounded mb-8" />
      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-6 space-y-3"
          >
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
        ))}
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

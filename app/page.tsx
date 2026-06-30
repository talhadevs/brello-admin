import Link from "next/link";
import { CONTENT_TYPES } from "@/lib/wordpress/content-types";

export default function Home() {
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
        Dashboard
      </h1>
      <p className="text-muted-foreground mb-8">
        Manage HelloWellness content synced from WordPress CMS reference.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {CONTENT_TYPES.map((type) => (
          <Link
            key={type.slug}
            href={`/${type.slug}`}
            className="block rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-all"
          >
            <h2 className="text-lg font-heading font-semibold text-foreground mb-1">
              {type.label}
            </h2>
            <p className="text-sm text-muted-foreground">{type.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

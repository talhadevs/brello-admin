"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Loader2 } from "lucide-react";
import { CONTENT_TYPES } from "@/lib/wordpress/content-types";
import ThemeToggle from "@/components/admin/ThemeToggle";

function NavItemLabel({ label }: { label: string }) {
  const { pending } = useLinkStatus();

  return (
    <span className="flex items-center gap-2">
      {pending && (
        <Loader2 size={14} className="animate-spin shrink-0 text-primary" />
      )}
      {label}
    </span>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card shrink-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <Link
          href="/"
          className="text-xl font-heading font-bold text-foreground"
        >
          Brello <span className="text-gradient-cool">Admin</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Content Management</p>
      </div>
      <nav className="p-4 space-y-1 flex-1">
        <Link
          href="/"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
            pathname === "/"
              ? "bg-muted text-foreground font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <LayoutDashboard size={16} className="shrink-0" />
          <NavItemLabel label="Dashboard" />
        </Link>
        {CONTENT_TYPES.map((type) => {
          const href = `/${type.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={type.slug}
              href={href}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <NavItemLabel label={type.label} />
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <ThemeToggle />
      </div>
    </aside>
  );
}

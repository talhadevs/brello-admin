"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOut, Settings } from "lucide-react";
import { useUser } from "@/components/admin/user-store";

const ROLE_STYLES: Record<string, string> = {
  owner: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  editor: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  manager: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
};

function roleBadgeClass(role: string) {
  const key = role.trim().toLowerCase();
  return ROLE_STYLES[key] ?? "bg-muted text-muted-foreground";
}

function UserAvatar({
  name,
  avatar,
  size = "md",
}: {
  name: string;
  avatar?: string;
  size?: "md" | "sm";
}) {
  const initials = (name || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizeClass = size === "sm" ? "h-9 w-9 text-xs" : "h-11 w-11 text-sm";

  if (avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatar}
        alt={name}
        className={`${sizeClass} rounded-full object-cover border border-border shrink-0`}
      />
    );
  }

  return (
    <span
      className={`${sizeClass} flex items-center justify-center rounded-full bg-brand text-brand-foreground font-bold shrink-0`}
    >
      {initials}
    </span>
  );
}

export default function SidebarProfileSection() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, mounted } = useUser();
  const [loggingOut, setLoggingOut] = useState(false);

  const name = user?.name ?? "Admin User";
  const role = user?.role ?? "Owner";
  const avatar = user?.avatar;
  const settingsActive = pathname === "/settings";

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  const actionBtnClass =
    "flex h-7 w-7 items-center justify-center rounded-md transition-colors text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50";

  if (!mounted) {
    return (
      <div className="p-4 border-t border-border shrink-0">
        <div className="h-[88px] rounded-xl bg-muted/40 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-border shrink-0">
      <div className="relative rounded-xl border border-border bg-muted/30 px-3 py-2.5">
        <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-0.5">
          <Link
            href="/settings"
            aria-label="Settings"
            className={`${actionBtnClass} ${
              settingsActive ? "bg-brand text-brand-foreground hover:bg-brand hover:text-brand-foreground" : ""
            }`}
          >
            <Settings size={15} />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            aria-label="Logout"
            className={actionBtnClass}
          >
            {loggingOut ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <LogOut size={15} />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 pr-[4.25rem]">
          <UserAvatar name={name} avatar={avatar} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground">{name}</p>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${roleBadgeClass(role)}`}
            >
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

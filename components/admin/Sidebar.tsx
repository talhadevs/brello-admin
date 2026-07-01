"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  RefreshCw,
  Tag,
  Users,
  Newspaper,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Settings,
  Loader2,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useUser, logoutUser } from "@/components/admin/user-store";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    title: "Commerce",
    items: [
      { label: "Orders", href: "/orders", icon: ShoppingCart },
      { label: "Products", href: "/products", icon: Package },
      { label: "Subscriptions", href: "/subscriptions", icon: RefreshCw },
      { label: "Plans & Pricing", href: "/plans", icon: Tag },
    ],
  },
  {
    title: "Patients",
    items: [
      { label: "Members", href: "/members", icon: Users },
      { label: "Blogs", href: "/blogs", icon: Newspaper },
      { label: "Provider Reviews", href: "/providers", icon: Stethoscope },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Human Interactions", href: "/human_interaction", icon: HeartHandshake },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Admins", href: "/admins", icon: ShieldCheck },
    ],
  },
];

function NavItemLabel({ label }: { label: string }) {
  const { pending } = useLinkStatus();

  return (
    <span className="flex items-center gap-2">
      {pending && (
        <Loader2 size={13} className="animate-spin shrink-0" />
      )}
      {label}
    </span>
  );
}

function NavLink({
  item,
  active,
  index,
}: {
  item: NavItem;
  active: boolean;
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
    >
      <Link
        href={item.href}
        className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-base font-bold transition-all hover:translate-x-0.5 ${
          active
            ? "text-brand-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        {active && (
          <motion.span
            layoutId="sidebar-active"
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: "hsl(var(--nav-active))" }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
          />
        )}
        <Icon size={18} className="relative z-10 shrink-0" />
        <span className="relative z-10 flex-1">
          <NavItemLabel label={item.label} />
        </span>
      </Link>
    </motion.div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, mounted } = useUser();
  let itemIndex = 0;

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  const displayName = user?.name ?? "Guest";
  const initials = displayName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-64 border-r border-border bg-card shrink-0 flex flex-col h-screen sticky top-0"
    >
      <div className="p-6 border-b border-border flex justify-center shrink-0">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/images/cropped-brello-logo-2026-removebg-preview.png"
            alt="Brello"
            width={160}
            height={48}
            priority
            className="h-12 w-auto object-contain dark:hidden"
          />
          <Image
            src="/images/brello-logo-white-v2.png"
            alt="Brello"
            width={160}
            height={48}
            priority
            className="h-12 w-auto object-contain hidden dark:block"
          />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {NAV_GROUPS.map((group) =>
          group.items.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={pathname === item.href}
              index={itemIndex++}
            />
          ))
        )}
      </nav>

      <div className="p-3 border-t border-border shrink-0">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 flex-1 min-w-0 rounded-lg p-1 hover:bg-muted transition-colors"
          >
            {mounted && user?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt=""
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground text-xs font-bold">
                {mounted ? initials : ""}
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-foreground">
                {mounted ? displayName : "\u00A0"}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {mounted ? user?.role ?? "Not signed in" : "\u00A0"}
              </span>
            </span>
          </Link>
          <Link
            href="/settings"
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
              pathname === "/settings"
                ? "bg-muted text-brand"
                : "text-muted-foreground hover:bg-muted hover:text-brand"
            }`}
            aria-label="Settings"
            title="Settings"
          >
            <Settings size={16} />
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-brand transition-colors"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

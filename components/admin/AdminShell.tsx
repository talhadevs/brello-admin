"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

const FULLSCREEN_ROUTES = ["/login"];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (FULLSCREEN_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-card flex">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-card">{children}</main>
    </div>
  );
}

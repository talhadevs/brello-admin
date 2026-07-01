import Sidebar from "@/components/admin/Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-card flex">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-card">{children}</main>
    </div>
  );
}

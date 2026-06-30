import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { ThemeProvider } from "@/components/admin/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brello Admin",
  description: "Admin panel for managing the Brello platform.",
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("brello-admin-theme");
    var theme = stored === "dark" || stored === "light" ? stored : "system";
    var dark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="min-h-full font-body bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AdminShell>{children}</AdminShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

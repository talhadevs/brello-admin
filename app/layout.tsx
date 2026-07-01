import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/admin/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brello Admin",
  description: "Admin panel for managing the Brello platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="min-h-full font-body bg-background text-foreground"
        suppressHydrationWarning
      >
        <Script src="/scripts/theme-init.js" strategy="beforeInteractive" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

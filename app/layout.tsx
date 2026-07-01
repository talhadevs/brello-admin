import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/admin/ThemeProvider";
import { resolveThemeClass, THEME_COOKIE_NAME } from "@/lib/theme-cookie";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brello Admin",
  description: "Admin panel for managing the Brello platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME)?.value;
  const themeClass = resolveThemeClass(themeCookie);

  return (
    <html
      lang="en"
      className={`h-full antialiased${themeClass ? ` ${themeClass}` : ""}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full font-body bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

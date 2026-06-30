import type { Metadata } from "next";
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}

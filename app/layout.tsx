import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Village Rithm – AI-Powered Family Growth Platform",
  description:
    "A personalized, AI-powered growth platform for families to co-create meaningful experiences through learning, creativity, fun, and exploration.",
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

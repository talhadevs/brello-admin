"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/admin/ThemeProvider";

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-muted-foreground"
      >
        <Moon size={16} className="shrink-0 opacity-0" />
        <span className="opacity-0">Theme</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
    >
      {resolvedTheme === "dark" ? (
        <>
          <Sun size={16} className="shrink-0" />
          Light mode
        </>
      ) : (
        <>
          <Moon size={16} className="shrink-0" />
          Dark mode
        </>
      )}
    </button>
  );
}

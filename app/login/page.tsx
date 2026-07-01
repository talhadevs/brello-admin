"use client";

<<<<<<< HEAD
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { loginUser } from "@/components/admin/user-store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    loginUser(email.trim());
    setTimeout(() => router.push("/"), 400);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card-hover"
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/cropped-brello-logo-2026-removebg-preview.png"
            alt="Brello"
            width={150}
            height={44}
            priority
            className="h-11 w-auto object-contain dark:hidden"
          />
          <Image
            src="/images/brello-logo-white-v2.png"
            alt="Brello"
            width={150}
            height={44}
            priority
            className="h-11 w-auto object-contain hidden dark:block"
          />
          <h1 className="mt-6 text-2xl font-heading font-bold text-foreground">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your Brello admin account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brellohealth.com"
                className="input pl-9"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Password</span>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pl-9 pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
=======
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Moon, Sun, ShieldCheck } from "lucide-react";
import { useTheme } from "@/components/admin/ThemeProvider";

const ACCENT = {
  light: {
    strong: "#173f3f",
    soft: "#a7b3b3",
    button: "#173f3f",
    buttonHover: "#0f2e2e",
    link: "#1c6b6b",
    inputBg: "#edf0fb",
    inputText: "#28313a",
  },
  dark: {
    strong: "#5fd1c9",
    soft: "#7c8f8f",
    button: "#2f7d76",
    buttonHover: "#3a938b",
    link: "#7fe0d8",
    inputBg: "hsl(220 15% 18%)",
    inputText: "#e6ecec",
  },
};

function LoginThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
    >
      {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const colors = mounted && resolvedTheme === "dark" ? ACCENT.dark : ACCENT.light;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!notRobot) {
      setError("Please confirm you're not a robot.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Unable to sign in.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute top-5 right-5">
        <LoginThemeToggle />
      </div>

      <div className="w-full max-w-sm rounded-2xl bg-card p-9 shadow-card border border-border">
        <div className="text-center mb-7">
          <h1
            className="text-xl font-bold uppercase tracking-wider"
            style={{ letterSpacing: "0.06em" }}
          >
            <span style={{ color: colors.strong }}>Brello</span>{" "}
            <span style={{ color: colors.soft, fontWeight: 600 }}>Admin</span>
          </h1>
          <p className="text-sm mt-2 text-muted-foreground">Admin sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-[11px] font-semibold uppercase mb-1.5 text-muted-foreground"
              style={{ letterSpacing: "0.05em" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input w-full rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              style={
                {
                  background: colors.inputBg,
                  color: colors.inputText,
                  "--autofill-bg": colors.inputBg,
                  "--autofill-text": colors.inputText,
                } as React.CSSProperties
              }
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[11px] font-semibold uppercase mb-1.5 text-muted-foreground"
              style={{ letterSpacing: "0.05em" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input w-full rounded-md px-3 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
                style={
                  {
                    background: colors.inputBg,
                    color: colors.inputText,
                    "--autofill-bg": colors.inputBg,
                    "--autofill-text": colors.inputText,
                  } as React.CSSProperties
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
>>>>>>> 75d1619780cabc981ce95673c68fe727b505dc0e
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
<<<<<<< HEAD
          </label>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 accent-[hsl(var(--brand))]" />
              Remember me
            </label>
            <button type="button" className="font-semibold text-brand hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            <LogIn size={16} />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Protected admin area · Brello Health
        </p>
      </motion.div>
=======
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5">
            <label className="flex items-center gap-2 text-sm cursor-pointer text-foreground">
              <input
                type="checkbox"
                checked={notRobot}
                onChange={(e) => setNotRobot(e.target.checked)}
                className="h-4 w-4 rounded"
                style={{ accentColor: colors.button }}
              />
              <span>I&apos;m not a robot</span>
            </label>
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <ShieldCheck size={20} style={{ color: "#4285F4" }} />
              <span className="text-[8px] leading-none text-muted-foreground">
                reCAPTCHA
              </span>
            </div>
          </div>
          <p className="text-[11px] leading-snug text-muted-foreground">
            This form is protected by reCAPTCHA. The Google{" "}
            <a href="#" style={{ color: colors.link }}>
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" style={{ color: colors.link }}>
              Terms of Service
            </a>{" "}
            apply.
          </p>

          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50"
            style={{ background: colors.button }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = colors.buttonHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = colors.button;
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center">
            <a href="#" className="text-sm" style={{ color: colors.link }}>
              Forgot password?
            </a>
          </div>

          <p className="text-center text-xs pt-1 text-muted-foreground">
            Protected area — authorized staff only
          </p>
        </form>
      </div>
>>>>>>> 75d1619780cabc981ce95673c68fe727b505dc0e
    </div>
  );
}

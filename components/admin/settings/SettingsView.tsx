"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { User as UserIcon, Palette, Check, Monitor, Moon, Sun, Upload, Trash2 } from "lucide-react";
import {
  readUser,
  saveUser,
  type User,
} from "@/components/admin/user-store";
import { useTheme, type Theme } from "@/components/admin/ThemeProvider";

const EMPTY: User = { name: "", email: "", role: "Owner", phone: "", avatar: "" };

const ROLE_OPTIONS = ["Owner", "Editor", "Manager"] as const;

const THEME_OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export default function SettingsView() {
  const [form, setForm] = useState<User>(EMPTY);
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(readUser() ?? EMPTY);
  }, []);

  function update<K extends keyof User>(key: K, value: User[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => update("avatar", reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const initials = (form.name || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile and appearance preferences.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-card mb-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <UserIcon size={18} className="text-brand" />
          <h2 className="font-heading font-bold text-foreground">Profile</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {form.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.avatar}
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover border border-border"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-brand-foreground text-xl font-bold">
              {initials}
            </span>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <Upload size={14} />
                Upload photo
              </button>
              {form.avatar && (
                <button
                  type="button"
                  onClick={() => update("avatar", "")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-muted transition-colors"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              )}
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              JPG or PNG. Square image recommended.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Full Name</span>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input"
              placeholder="e.g. Jane Doe"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="input"
              placeholder="you@brellohealth.com"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Role</span>
            <select
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="input"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Phone</span>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="input"
              placeholder="+1 555 000 0000"
            />
          </label>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity"
          >
            Save Profile
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <Check size={15} /> Saved
            </span>
          )}
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <div className="flex items-center gap-2 mb-2">
          <Palette size={18} className="text-brand" />
          <h2 className="font-heading font-bold text-foreground">Appearance</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Choose how the admin dashboard looks.
        </p>

        <div className="grid grid-cols-3 gap-3 max-w-md">
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTheme(opt.value)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-all ${
                  active
                    ? "border-brand ring-2 ring-brand/30 text-brand"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon size={20} />
                {opt.label}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

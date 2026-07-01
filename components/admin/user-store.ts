"use client";

import { useEffect, useState } from "react";

export type UserRole = "Owner" | "Editor" | "Manager";

export type User = {
  name: string;
  email: string;
  role: UserRole | string;
  phone: string;
  avatar?: string;
};

const KEY = "brello-admin-user";
const EVENT = "brello-user-change";

const DEFAULT_USER: User = {
  name: "Admin User",
  email: "admin@brellohealth.com",
  role: "Owner",
  phone: "",
  avatar: "",
};

export function readUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: User) {
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(EVENT));
}

export function loginUser(email: string) {
  const existing = readUser();
  const derivedName =
    email
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || DEFAULT_USER.name;
  const user: User = existing?.email === email
    ? existing
    : { ...DEFAULT_USER, name: derivedName, email };
  saveUser(user);
  return user;
}

export function logoutUser() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(readUser());
    const onChange = () => setUser(readUser());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return { user, mounted };
}

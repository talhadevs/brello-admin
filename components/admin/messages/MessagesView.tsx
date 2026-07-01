"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Send,
  Check,
  Mail,
  MailOpen,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import {
  CONVERSATIONS,
  STATUS_STYLES,
  type Conversation,
  type MessageStatus,
} from "@/components/admin/messages/messages-data";

const STATUS_OPTIONS: (MessageStatus | "All")[] = ["All", "Open", "Replied", "Resolved"];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StatChip({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  tint: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xl font-bold text-foreground leading-tight">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function MessagesView() {
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string>(CONVERSATIONS[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [reply, setReply] = useState("");

  const stats = useMemo(() => {
    const unread = conversations.filter((c) => c.unread).length;
    const open = conversations.filter((c) => c.status === "Open").length;
    const resolved = conversations.filter((c) => c.status === "Resolved").length;
    return { unread, open, resolved, total: conversations.length };
  }, [conversations]);

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || c.patient.toLowerCase().includes(q) || c.medication.toLowerCase().includes(q);
      const matchesStatus = status === "All" || c.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [conversations, query, status]);

  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  function openConversation(id: string) {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c))
    );
  }

  function sendReply() {
    const text = reply.trim();
    if (!text || !selected) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? {
              ...c,
              status: "Replied",
              unread: false,
              lastTime: "Now",
              messages: [
                ...c.messages,
                { id: `m${c.messages.length + 1}`, from: "provider", text, time: "Now" },
              ],
            }
          : c
      )
    );
    setReply("");
  }

  function markResolved() {
    if (!selected) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === selected.id ? { ...c, status: "Resolved" } : c))
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">Human Interactions</h1>
        <p className="text-muted-foreground mt-1">
          Patient and provider conversations — care inbox.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatChip label="Unread" value={stats.unread} icon={Mail} tint="bg-rose-500/10 text-rose-600 dark:text-rose-400" />
        <StatChip label="Open" value={stats.open} icon={MailOpen} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
        <StatChip label="Resolved" value={stats.resolved} icon={CheckCircle2} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
        <StatChip label="Total" value={stats.total} icon={Send} tint="bg-brand/10 text-brand" />
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-4 rounded-2xl border border-border bg-card shadow-card overflow-hidden h-[600px]">
        <div className="border-b lg:border-b-0 lg:border-r border-border flex flex-col min-h-0">
          <div className="p-3 border-b border-border space-y-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations"
                className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div className="flex gap-1">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                    status === s
                      ? "bg-brand text-brand-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => openConversation(c.id)}
                className={`flex w-full items-start gap-3 border-b border-border/50 p-3 text-left transition-colors ${
                  selectedId === c.id ? "bg-muted" : "hover:bg-muted/50"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand text-xs font-bold">
                  {initialsOf(c.patient)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className={`truncate text-sm ${c.unread ? "font-bold text-foreground" : "font-medium text-foreground"}`}>
                      {c.patient}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{c.lastTime}</span>
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {c.messages[c.messages.length - 1]?.text}
                  </span>
                  <span className="mt-1 flex items-center gap-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                    {c.unread && <span className="h-2 w-2 rounded-full bg-rose-500" />}
                  </span>
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="p-6 text-center text-sm text-muted-foreground">No conversations found.</p>
            )}
          </div>
        </div>

        {selected ? (
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between gap-3 border-b border-border p-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand text-sm font-bold">
                  {initialsOf(selected.patient)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">{selected.patient}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {selected.medication} · {selected.provider}
                  </p>
                </div>
              </div>
              <button
                onClick={markResolved}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <Check size={13} /> Resolve
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selected.messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "provider" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                      m.from === "provider"
                        ? "bg-brand text-brand-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    <p>{m.text}</p>
                    <p className={`mt-1 text-[10px] ${m.from === "provider" ? "text-brand-foreground/70" : "text-muted-foreground"}`}>
                      {m.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendReply();
                  }}
                  placeholder="Type your reply…"
                  className="flex-1 rounded-full border border-border bg-background py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <button
                  onClick={sendReply}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground hover:opacity-90 transition-opacity"
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center text-muted-foreground">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}

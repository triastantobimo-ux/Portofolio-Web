"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Loader2, MessageCircleHeart, Send, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "./section-heading";

type Entry = {
  id: string;
  name: string;
  role: string | null;
  message: string;
  likes: number;
  createdAt: string;
};

const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300",
  "bg-amber-500/20 text-amber-600 dark:text-amber-300",
  "bg-teal-500/20 text-teal-600 dark:text-teal-300",
  "bg-lime-500/20 text-lime-600 dark:text-lime-300",
  "bg-orange-500/20 text-orange-600 dark:text-orange-300",
];

function avatarColor(id: string) {
  let sum = 0;
  for (const ch of id) sum += ch.charCodeAt(0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "baru saja";
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} hari lalu`;
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/guestbook");
      const data = await res.json();
      setEntries(data.entries ?? []);
    } catch {
      setEntries([]);
      toast.error("Gagal memuat pesan buku tamu.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Gagal mengirim pesan.");
        return;
      }
      setEntries((prev) => [data.entry as Entry, ...(prev ?? [])]);
      setMessage("");
      setRole("");
      toast.success("Terima kasih! Pesanmu sudah terkirim 🎉");
    } catch {
      toast.error("Koneksi bermasalah. Coba lagi ya.");
    } finally {
      setSending(false);
    }
  }

  async function like(entry: Entry) {
    if (liked.has(entry.id)) return;
    // Optimistic update
    setLiked((prev) => new Set(prev).add(entry.id));
    setEntries((prev) =>
      (prev ?? []).map((e) => (e.id === entry.id ? { ...e, likes: e.likes + 1 } : e))
    );
    try {
      const res = await fetch("/api/guestbook/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry.id }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEntries((prev) =>
        (prev ?? []).map((e) => (e.id === entry.id ? { ...e, likes: data.likes } : e))
      );
    } catch {
      // Rollback bila gagal
      setLiked((prev) => {
        const next = new Set(prev);
        next.delete(entry.id);
        return next;
      });
      setEntries((prev) =>
        (prev ?? []).map((e) => (e.id === entry.id ? { ...e, likes: e.likes } : e))
      );
    }
  }

  const charCount = message.length;

  return (
    <section id="buku-tamu" className="relative py-20 md:py-28" aria-label="Buku tamu">
      <div
        aria-hidden
        className="animate-aurora-b absolute bottom-0 right-[-8%] size-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-3), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Interaktif"
          title="Buku tamu"
          description="Tinggalkan jejakmu! Pesan akan tersimpan permanen di database situs ini — jangan lupa beri suka pada pesan favoritmu."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Form kirim pesan */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="glass h-fit rounded-3xl p-6 lg:col-span-2 lg:sticky lg:top-28"
            aria-label="Formulir buku tamu"
          >
            <div className="mb-5 flex items-center gap-2.5">
              <MessageCircleHeart className="size-5 text-primary" aria-hidden />
              <h3 className="font-bold">Tinggalkan Pesan</h3>
            </div>

            <div className="space-y-3.5">
              <div>
                <label htmlFor="gb-name" className="mb-1.5 block text-sm font-medium">
                  Nama <span className="text-destructive">*</span>
                </label>
                <Input
                  id="gb-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu"
                  maxLength={60}
                  required
                  minLength={2}
                />
              </div>
              <div>
                <label htmlFor="gb-role" className="mb-1.5 block text-sm font-medium">
                  Profesi <span className="text-xs text-muted-foreground">(opsional)</span>
                </label>
                <Input
                  id="gb-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="cth: Designer, Mahasiswa, PM"
                  maxLength={40}
                />
              </div>
              <div>
                <label htmlFor="gb-message" className="mb-1.5 block text-sm font-medium">
                  Pesan <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="gb-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 280))}
                  placeholder="Sapa saya, kasih masukan, atau ceritakan hal seru…"
                  rows={4}
                  required
                  minLength={4}
                  className="resize-none"
                />
                <p
                  className={`mt-1 text-right font-mono text-xs ${
                    charCount >= 280 ? "text-destructive" : "text-muted-foreground"
                  }`}
                  aria-live="polite"
                >
                  {charCount}/280
                </p>
              </div>
              <Button type="submit" disabled={sending} className="w-full gap-2 rounded-full">
                {sending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Mengirim…
                  </>
                ) : (
                  <>
                    <Send className="size-4" aria-hidden />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </div>
          </motion.form>

          {/* Daftar pesan */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div
              className="max-h-[520px] space-y-3.5 overflow-y-auto pr-2 pb-2"
              aria-live="polite"
              aria-label="Daftar pesan buku tamu"
            >
              {entries === null ? (
                // Skeleton saat memuat
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border bg-card/50 p-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-10 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="mt-3 h-3.5 w-full" />
                    <Skeleton className="mt-1.5 h-3.5 w-2/3" />
                  </div>
                ))
              ) : entries.length === 0 ? (
                <div className="grid h-52 place-items-center rounded-2xl border border-dashed text-center">
                  <div>
                    <MessageCircleHeart className="mx-auto mb-3 size-10 text-primary/50" aria-hidden />
                    <p className="font-medium">Belum ada pesan</p>
                    <p className="text-sm text-muted-foreground">Jadilah yang pertama meninggalkan jejak!</p>
                  </div>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {entries.map((e) => (
                    <motion.article
                      key={e.id}
                      layout
                      initial={{ opacity: 0, y: -14, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl border bg-card/60 p-4 transition-colors hover:border-primary/30"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid size-10 shrink-0 place-items-center rounded-full font-bold ${avatarColor(e.id)}`}
                          aria-hidden
                        >
                          <UserRound className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{e.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {e.role ? `${e.role} · ` : ""}
                            {timeAgo(e.createdAt)}
                          </p>
                        </div>
                        {/* Tombol suka */}
                        <button
                          onClick={() => like(e)}
                          disabled={liked.has(e.id)}
                          aria-label={`Sukai pesan dari ${e.name}`}
                          aria-pressed={liked.has(e.id)}
                          className={`group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all active:scale-90 ${
                            liked.has(e.id)
                              ? "border-primary/50 bg-primary/10 text-primary"
                              : "text-muted-foreground hover:border-primary/40 hover:text-primary"
                          }`}
                        >
                          <Heart
                            className={`size-4 transition-transform group-hover:scale-110 ${
                              liked.has(e.id) ? "fill-current" : ""
                            }`}
                            aria-hidden
                          />
                          <span className="font-mono text-xs tabular-nums">{e.likes}</span>
                        </button>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-pretty">{e.message}</p>
                    </motion.article>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Eye } from "lucide-react";
import { profile } from "@/lib/portfolio";

/* Penghitung pengunjung — POST sekali per sesi (dijaga sessionStorage) */
function useVisitorCount() {
  const [views, setViews] = useState<number | null>(null);
  const requested = useRef(false);

  useEffect(() => {
    if (requested.current) return;
    requested.current = true;

    const counted = sessionStorage.getItem("portfolio-counted");
    const method = counted ? "GET" : "POST";
    if (!counted) sessionStorage.setItem("portfolio-counted", "1");

    fetch("/api/visits", { method })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.views === "number") setViews(d.views);
      })
      .catch(() => {});
  }, []);

  return views;
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Kembali ke atas"
          className="glass fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full text-primary shadow-xl transition-transform hover:-translate-y-1"
        >
          <ArrowUp className="size-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  const views = useVisitorCount();
  const year = new Date().getFullYear();

  return (
    <>
      <BackToTop />
      <footer className="mt-auto border-t py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {year}{" "}
            <span className="font-semibold text-foreground">{profile.name}</span> — Dibuat dengan
            Next.js 16 & Tailwind CSS 4.
          </p>
          <p className="flex items-center gap-2 font-mono text-xs" aria-live="polite">
            <Eye className="size-3.5 text-primary" aria-hidden />
            {views === null ? (
              <span className="inline-block h-3.5 w-14 animate-pulse rounded bg-muted" aria-label="Memuat jumlah kunjungan" />
            ) : (
              <>
                {views.toLocaleString("id-ID")} kunjungan
                <span className="text-primary">·</span>
                Terima kasih sudah mampir!
              </>
            )}
          </p>
        </div>
      </footer>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/portfolio";

const links = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "keahlian", label: "Keahlian" },
  { id: "proyek", label: "Galeri" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "jurnal", label: "Jurnal" },
  { id: "buku-tamu", label: "Buku Tamu" },
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Ganti ke tema terang" : "Ganti ke tema gelap"}
      title={isDark ? "Tema gelap · klik untuk terang" : "Tema terang · klik untuk gelap"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative rounded-full border border-transparent hover:border-primary/30 hover:bg-primary/10"
      disabled={!mounted}
    >
      <Sun
        className={`size-5 transition-all ${
          mounted
            ? isDark
              ? "scale-100 rotate-0 opacity-100"
              : "absolute scale-0 rotate-90 opacity-0"
            : "opacity-0"
        }`}
        aria-hidden
      />
      <Moon
        className={`size-5 transition-all ${
          mounted
            ? !isDark
              ? "scale-100 rotate-0 opacity-100"
              : "absolute scale-0 -rotate-90 opacity-0"
            : "opacity-0"
        }`}
        aria-hidden
      />
      {!mounted && <span className="size-5" aria-hidden />}
    </Button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("beranda");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function go(id: string) {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.assign(`/#${id}`);
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-gradient-to-r from-primary via-chart-2 to-primary"
        aria-hidden
      />
      <nav
        aria-label="Navigasi utama"
        className={`mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "glass mt-3 rounded-2xl py-2.5 shadow-lg shadow-black/5"
            : "mt-0 bg-transparent py-4"
        }`}
      >
        <button
          onClick={() => go("beranda")}
          className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight"
          aria-label="Kembali ke beranda"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            {profile.firstName.charAt(0)}
          </span>
          <span>
            {profile.firstName.toLowerCase()}
            <span className="text-primary">gt</span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === l.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass mx-4 mt-2 rounded-2xl p-3 shadow-xl md:hidden"
          >
            <ul className="grid gap-1">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      active === l.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent"
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="mt-1 border-t pt-2">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm text-muted-foreground">Tema</span>
                  <ThemeToggle />
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

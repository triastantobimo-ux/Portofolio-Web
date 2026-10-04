"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { marqueeItems, skills } from "@/lib/portfolio";

const categories = ["Semua", "Audit", "Teknologi", "Tools"] as const;

export function Skills() {
  const [active, setActive] = useState<(typeof categories)[number]>("Semua");

  const filtered = useMemo(
    () => (active === "Semua" ? skills : skills.filter((s) => s.category === active)),
    [active]
  );

  return (
    <section id="keahlian" className="relative py-20 md:py-28" aria-label="Keahlian">
      {/* Latar aurora tipis */}
      <div
        aria-hidden
        className="animate-aurora-b absolute top-10 right-[-10%] size-[380px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-1), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Keahlian"
          title="Perangkat yang saya asah"
          description="Dua dunia yang saling menguatkan: disiplin audit berbasis bukti, dan teknologi yang membuat semuanya lebih cepat."
        />

        {/* Tab kategori */}
        <div
          role="tablist"
          aria-label="Kategori keahlian"
          className="mx-auto mb-10 flex w-fit flex-wrap justify-center gap-1.5 rounded-2xl border bg-card/50 p-1.5"
        >
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                active === c ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === c && (
                <motion.span
                  layoutId="skill-pill"
                  className="absolute inset-0 -z-10 rounded-xl bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {c}
            </button>
          ))}
        </div>

        {/* Kartu keahlian */}
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.div
                key={s.name}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -12 }}
                transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border bg-card/60 p-5 transition-colors hover:border-primary/40"
              >
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <h3 className="font-semibold">{s.name}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                </div>
                {/* Bar progres animasi */}
                <div
                  className="h-2 overflow-hidden rounded-full bg-secondary"
                  role="meter"
                  aria-valuenow={s.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Tingkat kemampuan ${s.name}`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2"
                  />
                </div>
                <span className="mt-2.5 inline-block text-xs text-muted-foreground">
                  {s.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Marquee teknologi */}
        <div className="marquee-paused mask-fade-x mt-14 overflow-hidden" aria-hidden>
          <div className="animate-marquee flex w-max gap-3">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="rounded-full border bg-card/50 px-5 py-2.5 font-mono text-sm whitespace-nowrap text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

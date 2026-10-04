"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, GraduationCap, Lightbulb, MapPin, Quote, Rocket } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";
import { aboutCards, profile, stats } from "@/lib/portfolio";

/* Angka yang menghitung naik saat masuk viewport */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export function About() {
  return (
    <section id="tentang" className="relative py-20 md:py-28" aria-label="Tentang saya">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tentang"
          title="Kenalan lebih dekat"
          description="Sedikit cerita tentang siapa saya, apa yang saya kerjakan, dan angka-angka di balik perjalanan karier ini."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {/* Kartu utama: avatar + bio (bento besar) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <TiltCard className="h-full rounded-3xl">
              <div className="glass flex h-full flex-col gap-5 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="animate-float-y grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-chart-2/25 text-3xl ring-2 ring-primary/30">
                    <span role="img" aria-label="Avatar">{profile.avatarEmoji}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{profile.name}</h3>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5 text-primary" aria-hidden />
                      {profile.location}
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {profile.bio} Di luar audit, dunia IT adalah taman bermain saya — dari
                  video game, merakit hardware, sampai bereksperimen dengan AI. Rasa
                  penasaran itu saya salurkan lewat membangun app dan tools kecil,
                  menulis jurnal, dan menjaga tubuh tetap bergerak; karena otak yang
                  tajam butuh tubuh yang sehat.
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {aboutCards.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Kartu statistik */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass grid h-full grid-cols-2 gap-px overflow-hidden rounded-3xl">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center gap-1 p-5 text-center"
                >
                  <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Kartu fakta seru */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <TiltCard className="h-full rounded-3xl">
              <div className="glass relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
                <Quote
                  className="absolute -top-2 -right-2 size-24 rotate-12 text-primary/8"
                  aria-hidden
                />
                <Lightbulb className="mb-4 size-6 text-primary" aria-hidden />
                <p className="text-base leading-relaxed text-pretty md:text-lg">
                  &ldquo;{aboutCards.funFact}&rdquo;
                </p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Kartu sedang dipelajari */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard className="h-full rounded-3xl">
              <div className="glass flex h-full flex-col gap-4 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="size-5 text-primary" aria-hidden />
                  <h3 className="font-semibold">Sedang Dipelajari</h3>
                </div>
                <ul className="space-y-2.5">
                  {aboutCards.currentlyLearning.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Rocket className="size-3.5 shrink-0 text-chart-2" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                  <Compass className="size-4 text-primary" aria-hidden />
                  Selalu ada hal baru untuk dijelajahi
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

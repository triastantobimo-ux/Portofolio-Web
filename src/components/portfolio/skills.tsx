"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { marqueeItems, skillGroups } from "@/lib/portfolio";

export function Skills() {
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

        {/* Tiga kelompok keahlian — sederhana, tanpa panggung */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border bg-card/60 p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-chart-2/20 text-xl ring-1 ring-primary/20"
                  role="img"
                  aria-label={`Kelompok ${group.name}`}
                >
                  {group.emoji}
                </span>
                <div>
                  <h3 className="font-bold tracking-tight">{group.name}</h3>
                  <p className="text-xs leading-snug text-muted-foreground">{group.note}</p>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border bg-secondary/50 px-3.5 py-1.5 text-[13px] text-secondary-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

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

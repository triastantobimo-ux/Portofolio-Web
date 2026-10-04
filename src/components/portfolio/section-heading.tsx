"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
    >
      <span className="mb-3 inline-block rounded-full border border-primary/25 bg-primary/10 px-4 py-1 font-mono text-xs tracking-widest text-primary uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

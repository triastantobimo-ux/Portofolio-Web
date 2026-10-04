"use client";

import { useRef, type ReactNode } from "react";

/** Kartu dengan efek tilt 3D mengikuti kursor + kilau (glare). */
export function TiltCard({
  children,
  className,
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * maxTilt).toFixed(
      2
    )}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateY(-4px)`;
    el.style.setProperty("--glare-x", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--glare-y", `${((py + 0.5) * 100).toFixed(1)}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group/tilt relative transition-transform duration-300 ease-out will-change-transform ${className ?? ""}`}
    >
      {children}
      {/* Kilau halus mengikuti kursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--glare-x,50%) var(--glare-y,50%), oklch(0.9 0.1 165 / 10%), transparent 60%)",
        }}
      />
    </div>
  );
}

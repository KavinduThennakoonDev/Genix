"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";

/** Animated count-up stat (0 → value) that triggers once the number scrolls into view. */
export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  tone = "light",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  tone?: "light" | "ink";
}) {
  const numberRef = useRef<HTMLParagraphElement>(null);
  // Preserve one decimal place for non-integer targets (e.g. a 4.9 rating) instead of
  // rounding to a misleading whole number.
  const decimals = Number.isInteger(value) ? 0 : 1;

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const counter = { n: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          n: value,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            const formatted = decimals
              ? counter.n.toFixed(decimals)
              : Math.round(counter.n).toLocaleString();
            el.textContent = `${prefix}${formatted}${suffix}`;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, suffix, prefix, decimals]);

  return (
    <div>
      <p
        ref={numberRef}
        className="text-4xl font-extrabold tracking-tight sm:text-5xl"
      >
        {prefix}
        {decimals ? (0).toFixed(decimals) : 0}
        {suffix}
      </p>
      <p className={`mt-2 text-sm font-medium ${tone === "ink" ? "text-white/65" : "text-genix-charcoal/70"}`}>
        {label}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

/**
 * Continuous auto-scrolling logo strip (GSAP xPercent tween, infinite repeat).
 * Renders the track twice back-to-back so the loop is seamless.
 */
export default function LogoMarquee({
  logos,
  tone = "light",
}: {
  logos: { name: string }[];
  tone?: "light" | "ink";
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      duration: Math.max(20, logos.length * 3),
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [logos.length]);

  const chipClass =
    tone === "ink"
      ? "border-white/15 bg-white/5 text-white/80"
      : "border-genix-line bg-white text-genix-charcoal";

  const renderChips = (keyPrefix: string) =>
    logos.map((logo, i) => (
      <div
        key={`${keyPrefix}-${i}`}
        className={`flex shrink-0 items-center gap-2 rounded-xl border px-6 py-3.5 ${chipClass}`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-genix-orange to-genix-blue" />
        <span className="whitespace-nowrap text-sm font-bold tracking-wide">{logo.name}</span>
      </div>
    ));

  return (
    <div className="no-scrollbar overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div ref={trackRef} className="flex w-max items-center gap-4">
        {renderChips("a")}
        {renderChips("b")}
      </div>
    </div>
  );
}

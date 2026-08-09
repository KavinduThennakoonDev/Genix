"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";

/**
 * Shared "light polish" scroll-reveal wrapper: fades + slides children up (or in from a side)
 * as they enter the viewport. Used throughout every page instead of re-implementing GSAP
 * timelines per section.
 */
export default function RevealOnScroll({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from =
      direction === "up"
        ? { y: 36, opacity: 0 }
        : direction === "left"
          ? { x: -36, opacity: 0 }
          : direction === "right"
            ? { x: 36, opacity: 0 }
            : { opacity: 0 };

    const tween = gsap.fromTo(el, from, {
      y: 0,
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

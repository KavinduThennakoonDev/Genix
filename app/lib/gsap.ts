"use client";

// Central GSAP setup. ScrollTrigger is registered once here so every client
// component that needs scroll-based animation can just `import { gsap, ScrollTrigger } from "@/app/lib/gsap"`.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

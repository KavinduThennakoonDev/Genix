import type { ReactNode } from "react";

/** Vertical rhythm wrapper. `tone="ink"` gives the dark charcoal section variant used for contrast bands. */
export default function Section({
  children,
  className = "",
  tone = "light",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "ink" | "mist";
  id?: string;
}) {
  const toneClass =
    tone === "ink"
      ? "bg-genix-ink text-white"
      : tone === "mist"
        ? "bg-genix-mist text-genix-ink"
        : "bg-white text-genix-ink";

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${toneClass} ${className}`}>
      {children}
    </section>
  );
}

import type { ReactNode } from "react";

/** Rounded, soft-shadow card base shared by course cards, testimonial cards, and bento cells. */
export default function Card({
  children,
  className = "",
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist" | "ink" | "outline";
}) {
  const toneClass =
    {
      white: "bg-white shadow-card border border-genix-line/70",
      mist: "bg-genix-mist border border-genix-line/70",
      ink: "bg-genix-ink text-white border border-white/10",
      outline: "bg-white border-2 border-genix-line",
    }[tone] ?? "";

  return <div className={`rounded-2xl ${toneClass} ${className}`}>{children}</div>;
}

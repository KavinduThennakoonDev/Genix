import type { ReactNode } from "react";

/** Small pill chip — used for category badges, inline headline chips, and status labels. */
export default function Badge({
  children,
  icon,
  tone = "orange",
  className = "",
}: {
  children: ReactNode;
  icon?: ReactNode;
  tone?: "orange" | "blue" | "ink" | "white" | "success";
  className?: string;
}) {
  const toneClass =
    {
      orange: "bg-genix-orange/10 text-genix-orange-dark",
      blue: "bg-genix-blue/10 text-genix-blue",
      ink: "bg-genix-ink text-white",
      white: "bg-white/15 text-white backdrop-blur",
      success: "bg-genix-success/10 text-genix-success",
    }[tone] ?? "";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide ${toneClass} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

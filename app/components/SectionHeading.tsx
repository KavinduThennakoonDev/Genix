import type { ReactNode } from "react";
import Badge from "./Badge";

/**
 * Standard section header: small eyebrow badge, headline (with an optional highlighted
 * trailing word), supporting copy, and an optional right-aligned action slot (link/button).
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  action,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  tone?: "light" | "ink";
}) {
  const isCenter = align === "center";
  const mutedClass = tone === "ink" ? "text-white/70" : "text-genix-charcoal/80";

  return (
    <div
      className={`flex flex-col gap-5 ${
        isCenter ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={`flex flex-col gap-4 ${isCenter ? "items-center max-w-2xl" : "max-w-2xl"}`}>
        {eyebrow && (
          <Badge tone={tone === "ink" ? "white" : "orange"}>{eyebrow}</Badge>
        )}
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {title} {highlight && <span className="text-gradient-brand">{highlight}</span>}
        </h2>
        {description && <p className={`text-base leading-relaxed sm:text-lg ${mutedClass}`}>{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

import type { ReactNode } from "react";

/** One cell of a bento-style feature grid; `span` controls how many grid columns it occupies on lg+. */
export default function BentoCell({
  icon,
  title,
  children,
  span = 1,
  tone = "white",
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  span?: 1 | 2;
  tone?: "white" | "ink" | "orange" | "blue";
}) {
  const toneClass =
    {
      white: "bg-white border border-genix-line text-genix-ink",
      ink: "bg-genix-ink border border-white/10 text-white",
      orange: "bg-linear-to-br from-genix-orange to-genix-orange-dark border border-transparent text-white",
      blue: "bg-linear-to-br from-genix-blue to-genix-blue-dark border border-transparent text-white",
    }[tone] ?? "";

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl p-6 shadow-card ${toneClass} ${
        span === 2 ? "lg:col-span-2" : ""
      }`}
    >
      {icon && (
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            tone === "white" ? "bg-genix-mist text-genix-orange" : "bg-white/15 text-white"
          }`}
        >
          {icon}
        </span>
      )}
      <h3 className="text-base font-bold sm:text-lg">{title}</h3>
      <div className={`text-sm leading-relaxed ${tone === "white" ? "text-genix-charcoal/80" : "text-white/80"}`}>
        {children}
      </div>
    </div>
  );
}

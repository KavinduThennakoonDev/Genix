import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRightIcon } from "./icons";

type Variant = "primary" | "secondary" | "dark" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-genix-orange text-white shadow-soft hover:bg-genix-orange-dark",
  secondary: "bg-white text-genix-ink border border-genix-line hover:border-genix-ink",
  dark: "bg-genix-ink text-white hover:bg-genix-ink-soft",
  ghost: "bg-transparent text-genix-ink hover:bg-genix-mist",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  href?: string;
  target?: string;
}

/** Pill CTA button matching the template's trailing-arrow buttons. Renders as a Next.js Link when `href` is given, otherwise a native button. */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  withArrow = true,
  className = "",
  href,
  target,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {withArrow && (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

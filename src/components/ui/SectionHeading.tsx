import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase",
            dark
              ? "bg-white/5 text-accent-light ring-1 ring-white/10"
              : "bg-ink/[0.04] text-accent-dark ring-1 ring-ink/10"
          )}
        >
          {eyebrow}
        </span>
      )}
      {title && (
        <h2
          className={cn(
            "max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
            dark ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={cn(
            "mx-auto max-w-xl text-base leading-relaxed sm:text-lg",
            dark ? "text-muted" : "text-faint"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
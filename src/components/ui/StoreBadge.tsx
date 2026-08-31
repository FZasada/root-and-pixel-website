import { Apple, Play } from "lucide-react";

import { cn } from "../../lib/cn";

interface StoreBadgeProps {
  platform: "apple" | "google";
  href?: string;
  label?: string;
  /** `dark` = dark badge for light backgrounds (default), `light` = light badge for dark backgrounds. */
  variant?: "dark" | "light";
  className?: string;
}

export function StoreBadge({
  platform,
  href,
  label,
  variant = "dark",
  className,
}: StoreBadgeProps) {
  const isApple = platform === "apple";
  const content = (
    <>
      {isApple ? (
        <Apple className="h-5 w-5" aria-hidden="true" />
      ) : (
        <span className="grid h-5 w-5 place-items-center" aria-hidden="true">
          <Play className="h-4 w-4 fill-current" />
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span className="text-[9px] font-medium tracking-wide opacity-70">Download on</span>
        <span className="text-[13px] font-semibold tracking-tight">{label}</span>
      </span>
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-2.5 rounded-[13px] px-4 py-2.5 transition-all duration-300 active:scale-[0.97]",
    variant === "dark"
      ? "bg-ink text-white shadow-sm ring-1 ring-ink/10 hover:shadow-md hover:-translate-y-0.5"
      : "bg-white text-ink ring-1 ring-white/25 hover:bg-white/95 hover:-translate-y-0.5",
    className
  );

  if (!href) {
    return (
      <span className={cn(classes, "cursor-default opacity-90")}>
        {content}
      </span>
    );
  }

  return (
    <a href={href} className={classes} aria-label={label} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}
import { useId } from "react";
import { cn } from "../../lib/cn";

interface LogoProps {
  className?: string;
  /** `dark` text works on light backgrounds, `light` on dark backgrounds. */
  variant?: "light" | "dark";
  withWordmark?: boolean;
  iconOnly?: boolean;
}

export function Logo({
  className,
  variant = "light",
  withWordmark = true,
  iconOnly = false,
}: LogoProps) {
  const id = useId();
  const text = variant === "light" ? "text-white" : "text-ink";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative block h-8 w-8 shrink-0" aria-hidden="true">
        <svg viewBox="0 0 40 40" className="h-full w-full" focusable="false">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D7BFF" />
              <stop offset="1" stopColor="#5B3EE0" />
            </linearGradient>
          </defs>
          <rect x="2.5" y="2.5" width="35" height="35" rx="11" fill={`url(#${id})`} />
          <circle cx="20" cy="20" r="6" fill="#fff" />
        </svg>
      </span>
      {withWordmark && !iconOnly && (
        <span
          className={cn(
            "font-semibold tracking-tight whitespace-nowrap",
            "text-[17px]",
            text
          )}
        >
          Root <span className="text-gradient-soft">&</span> Pixel
        </span>
      )}
      {iconOnly && withWordmark === false && null}
    </span>
  );
}
import { cn } from "../../lib/cn";

interface LogoProps {
  className?: string;
  /** `light` text works on dark backgrounds, `dark` on light backgrounds. */
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
  // Monochrome lockup. `light` = for dark backgrounds, `dark` = for light backgrounds.
  const tileFill = variant === "light" ? "#ffffff" : "#05070b";
  const markFill = variant === "light" ? "#05070b" : "#ffffff";
  const text = variant === "light" ? "text-white" : "text-ink";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative block h-8 w-8 shrink-0" aria-hidden="true">
        <svg viewBox="0 0 40 40" className="h-full w-full" focusable="false">
          <rect x="2.5" y="2.5" width="35" height="35" rx="10" fill={tileFill} />
          <text
            x="20"
            y="20"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="'Inter Variable', Inter, ui-sans-serif, system-ui, sans-serif"
            fontSize="14"
            fontWeight="700"
            letterSpacing="-0.4"
            fill={markFill}
          >
            R&amp;P
          </text>
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
          Root &amp; Pixel
        </span>
      )}
      {iconOnly && withWordmark === false && null}
    </span>
  );
}

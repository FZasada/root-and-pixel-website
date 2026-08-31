import { cn } from "../../lib/cn";

interface StoreBadgeProps {
  platform: "apple" | "google";
  href?: string;
  label?: string;
  /** `dark` = dark badge for light backgrounds (default), `light` = light badge for dark backgrounds. */
  variant?: "dark" | "light";
  className?: string;
}

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3.6 1.8 13.7 12 3.6 22.2c-.38-.22-.6-.62-.6-1.1V2.9c0-.48.22-.88.6-1.1Z" fill="#00d9ff" />
      <path d="M17.4 8.6 13.7 12l8.1 8.1c.7-.36.8-1.32.1-1.86L17.4 8.6Z" fill="#ffcb00" />
      <path d="M13.7 12 3.6 1.8c.05-.03.1-.05.15-.07l12.5 7.15L13.7 12Z" fill="#00e060" />
      <path d="M21.9 5.76c.7.54.6 1.5-.1 1.86L13.7 12l3.7 3.4 3.6-2.06c.7-.36.7-1.5 0-1.86v-.15l.9-.92L21.9 5.76Z" fill="#ff3a44" />
    </svg>
  );
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
        <AppleLogo className="h-6 w-6" />
      ) : (
        <GooglePlayLogo className="h-6 w-6" />
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
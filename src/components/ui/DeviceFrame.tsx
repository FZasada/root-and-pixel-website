import type { PropsWithChildren } from "react";

import { cn } from "../../lib/cn";

const isleColor = "#05070b";

interface DeviceFrameProps extends PropsWithChildren {
  variant?: "light" | "dark";
  className?: string;
  contentClassName?: string;
}

export function DeviceFrame({
  children,
  variant = "light",
  className,
  contentClassName,
}: DeviceFrameProps) {
  return (
    <div
      className={cn(
        "relative w-[248px] sm:w-[264px] rounded-[3.1rem] p-[9px] pb-[11px]",
        "bg-[#0a0d14] shadow-phone ring-1 ring-white/15",
        className
      )}
    >
      {/* side buttons */}
      <span
        aria-hidden="true"
        className="absolute -left-[10px] top-[118px] h-7 w-[4px] rounded-md bg-[#232838]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[10px] top-[158px] h-7 w-[4px] rounded-md bg-[#232838]"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[10px] top-[138px] h-[52px] w-[4px] rounded-md bg-[#232838]"
      />

      {/* screen */}
      <div
        className={cn(
          "relative aspect-[9/19.2] w-full overflow-hidden rounded-[2.55rem]",
          variant === "light" ? "bg-white" : "bg-ink-900",
          contentClassName
        )}
      >
        {/* dynamic island */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[11px] z-30 h-[24px] w-[88px] -translate-x-1/2 rounded-full"
          style={{ backgroundColor: isleColor }}
        />
        {children}
      </div>
    </div>
  );
}
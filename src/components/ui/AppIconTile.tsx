import { type LucideIcon } from "lucide-react";

import { cn } from "../../lib/cn";

interface AppIconTileProps {
  icon: LucideIcon;
  tile: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  label: string;
}

const sizes = {
  sm: "h-11 w-11 rounded-[14px] [&>svg]:h-5 [&>svg]:w-5",
  md: "h-14 w-14 rounded-[17px] [&>svg]:h-6 [&>svg]:w-6",
  lg: "h-16 w-16 rounded-[19px] [&>svg]:h-7 [&>svg]:w-7",
};

export function AppIconTile({ icon: Icon, tile, size = "md", className, label }: AppIconTileProps) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center bg-gradient-to-br text-white shadow-md shadow-ink/10",
        sizes[size],
        tile,
        className
      )}
      role="img"
      aria-label={label}
    >
      <Icon strokeWidth={2.2} aria-hidden="true" />
    </span>
  );
}
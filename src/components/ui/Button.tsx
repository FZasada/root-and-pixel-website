import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-premium-gradient text-white shadow-[0_8px_24px_-8px_rgba(124,92,255,0.55)] hover:shadow-[0_12px_32px_-8px_rgba(124,92,255,0.7)] hover:brightness-110 active:scale-[0.98]",
  secondary:
    "border border-white/15 bg-white/5 text-white backdrop-blur-sm hover:border-white/30 hover:bg-white/10 active:scale-[0.98]",
  ghost:
    "text-white/80 hover:text-white hover:bg-white/5 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonBaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean;
}

type ButtonAsLinkProps = ButtonBaseProps & {
  to?: string;
  href?: string;
  onClick?: () => void;
};

type NativeButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    to?: undefined;
    href?: undefined;
  };

type NativeAnchorProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    to?: undefined;
    href: string;
  };

export type ButtonProps = ButtonAsLinkProps | NativeButtonProps | NativeAnchorProps;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    ariaLabel,
    arrow = false,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if ("to" in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes} aria-label={ariaLabel} onClick={props.onClick}>
        {inner}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as NativeAnchorProps;
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  const { type = "button", onClick, ...rest } = props as NativeButtonProps;
  return (
    <button type={type} className={classes} aria-label={ariaLabel} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
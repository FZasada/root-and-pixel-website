import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ScrollLinkProps {
  /** Route path with optional hash, e.g. "/#services". */
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Navigates to a route and smooth-scrolls to the hash target.
 * Same-page links scroll without a page transition; cross-page links
 * navigate first and then scroll once the target is rendered.
 */
export function ScrollLink({ to, children, className, onClick, ariaLabel }: ScrollLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick?.();
      const [path, hash] = to.split("#");
      const id = hash ? `#${hash}` : null;

      if (!id) {
        navigate(to);
        return;
      }

      const scroll = () => {
        const el = document.getElementById(id.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      if (location.pathname === path && path !== "/") {
        navigate(`${path}${id}`);
        window.setTimeout(scroll, 60);
        return;
      }

      if (location.pathname === path) {
        e.preventDefault();
        scroll();
        history.replaceState(null, "", `${path}${id}`);
        return;
      }

      navigate(`${path}${id}`);
      window.setTimeout(scroll, 90);
    },
    [to, navigate, location.pathname, onClick]
  );

  return (
    <a href={to} className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
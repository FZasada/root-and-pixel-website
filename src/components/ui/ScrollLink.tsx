import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ScrollLinkProps {
  /** Route path with an optional in-page section id, e.g. "/#services". */
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Navigates to a route and smooth-scrolls to a section within it.
 * Same-page links scroll immediately; cross-page links navigate first,
 * then scroll once the target has rendered.
 */
export function ScrollLink({ to, children, className, onClick, ariaLabel }: ScrollLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick?.();
      const [path, hash] = to.split("#");
      const sectionId = hash || null;

      const scroll = () => {
        if (!sectionId) return;
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      if (location.pathname === path) {
        e.preventDefault();
        if (!sectionId) {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          return;
        }
        scroll();
        return;
      }

      e.preventDefault();
      navigate(path);
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

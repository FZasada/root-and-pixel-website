import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { navItems } from "../../data/nav";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { LanguageSelector } from "../ui/LanguageSelector";
import { Logo } from "../ui/Logo";
import { ScrollLink } from "../ui/ScrollLink";

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      menuRef.current?.focus();
    } else if (menuRef.current) {
      toggleRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const navLabel = t("nav.a11yMain");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || open
            ? "border-b border-white/5 bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          className="container-shell flex h-16 items-center justify-between gap-4 lg:h-[72px]"
          aria-label={navLabel}
        >
          <ScrollLink to="/#home" ariaLabel={t("brand.name")} className="shrink-0">
            <Logo variant="light" />
          </ScrollLink>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isApps = item.to === "/apps";
              const active =
                isApps
                  ? location.pathname.startsWith("/apps")
                  : location.pathname === item.to &&
                    (item.hash
                      ? location.hash === `#${item.hash}` ||
                        (item.hash === "home" && location.hash === "")
                      : true);
              const target = `${item.to}${item.hash ? `#${item.hash}` : ""}`;
              return (
                <ScrollLink
                  key={item.key}
                  to={target}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {t(item.key)}
                </ScrollLink>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSelector />
            <Button to="/#contact" size="md" variant="primary">
              {t("nav.cta")}
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <LanguageSelector align="right" />
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-ink-950/95 backdrop-blur-2xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={navLabel}
            tabIndex={-1}
          >
            <div className="flex flex-col gap-1 px-6 pb-10 pt-6">
              {navItems.map((item, i) => {
                const target = `${item.to}${item.hash ? `#${item.hash}` : ""}`;
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ScrollLink
                      to={target}
                      className="block rounded-2xl px-4 py-3.5 text-xl font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      {t(item.key)}
                    </ScrollLink>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.3 }}
                className="mt-6 flex flex-col gap-3 px-2"
              >
                <Button to="/#contact" size="lg" onClick={() => setOpen(false)} arrow>
                  {t("nav.cta")}
                </Button>
                <p className="mt-2 text-center text-sm text-white/40">
                  {t("brand.tagline")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { languages, setLanguage, type LanguageCode } from "../../i18n";
import { cn } from "../../lib/cn";

interface LanguageSelectorProps {
  className?: string;
  align?: "left" | "right";
}

export function LanguageSelector({ className, align = "right" }: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find((l) => l.code === i18n.resolvedLanguage) ?? languages[0];

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function select(code: LanguageCode) {
    setLanguage(code);
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={current.label}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white",
          open && "bg-white/5 text-white"
        )}
      >
        <span aria-hidden="true" className="text-base leading-none">
          {current.flag}
        </span>
        <span>{current.short}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-white/50 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Sprache wählen"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 p-1.5 shadow-phone backdrop-blur-xl",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {languages.map((lang) => {
              const active = lang.code === current.code;
              return (
                <li key={lang.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => select(lang.code)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                      active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span aria-hidden="true" className="text-base leading-none">
                      {lang.flag}
                    </span>
                    <span className="flex-1">{lang.label}</span>
                    {active && <Check className="h-4 w-4 text-accent-light" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
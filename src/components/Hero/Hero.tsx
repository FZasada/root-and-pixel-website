import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../ui/Button";
import { DeviceFrame } from "../ui/DeviceFrame";
import { MemoriesScreen, StatsScreen } from "../ui/PhoneScreens";

function HighlightedTitle() {
  const { t } = useTranslation();
  const title = t("hero.title");
  const accent = t("hero.titleAccent");

  const { before, after } = useMemo(() => {
    const idx = title.lastIndexOf(accent);
    if (idx === -1) return { before: title, after: "" };
    return { before: title.slice(0, idx), after: title.slice(idx + accent.length) };
  }, [title, accent]);

  return (
    <h1 className="text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-balance sm:text-6xl lg:text-[4.1rem]">
      {before}
      <span className="text-gradient">{accent}</span>
      {after}
    </h1>
  );
}

const phoneEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const checks = t("hero.checks", { returnObjects: true }) as string[];

  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-32 lg:pb-32 lg:pt-44">
      {/* background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 left-1/2 h-[560px] w-[960px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.22),transparent)] blur-2xl" />
        <div className="absolute right-[-200px] top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(110,168,254,0.12),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container-shell relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="max-w-xl lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: phoneEase }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-premium-gradient"
                  aria-hidden="true"
                />
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: phoneEase }}
              className="mt-6"
            >
              <HighlightedTitle />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: phoneEase }}
              className="mt-6 max-w-md text-lg leading-relaxed text-muted"
            >
              {t("hero.support")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: phoneEase }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button to="/apps" size="lg" arrow>
                {t("hero.primaryCta")}
              </Button>
              <Button to="/#about" size="lg" variant="secondary">
                {t("hero.secondaryCta")}
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: phoneEase }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {checks.map((check) => (
                <li key={check} className="flex items-center gap-2 text-sm text-white/75">
                  <span
                    className="grid h-5 w-5 place-items-center rounded-full bg-accent/15 ring-1 ring-accent/30"
                    aria-hidden="true"
                  >
                    <Check className="h-3 w-3 text-accent-light" strokeWidth={3} />
                  </span>
                  {check}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Phones */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: phoneEase }}
              className="relative mx-auto h-[540px] w-full max-w-[430px] sm:h-[600px]"
              aria-hidden="true"
            >
              <div
                className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.28),transparent)] blur-2xl"
                aria-hidden="true"
              />

              {/* back phone */}
              <motion.div
                initial={{ opacity: 0, rotate: reduce ? 0 : 4, y: reduce ? 0 : 30 }}
                animate={{ opacity: 1, rotate: reduce ? 0 : -7, y: 0 }}
                transition={{ duration: 1, delay: 0.42, ease: phoneEase }}
                className="absolute right-0 top-0 z-0"
              >
                <div className="opacity-90">
                  <DeviceFrame variant="dark">
                    <StatsScreen />
                  </DeviceFrame>
                </div>
              </motion.div>

              {/* front phone */}
              <motion.div
                initial={{ opacity: 0, rotate: reduce ? 0 : -4, y: reduce ? 0 : 40 }}
                animate={{ opacity: 1, rotate: reduce ? 0 : 5, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: phoneEase }}
                className="absolute bottom-0 left-0 z-10"
              >
                <DeviceFrame variant="light">
                  <MemoriesScreen />
                </DeviceFrame>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function SecurityBanner() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-20 lg:py-28" aria-label={t("security.banner.label")}>
      <div className="container-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-10 shadow-card sm:px-12 lg:px-16 lg:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.4),transparent)] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(110,168,254,0.18),transparent)] blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-10">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-start sm:gap-6">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-premium-gradient text-white shadow-lg">
                  <ShieldCheck className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="flex max-w-xl flex-col gap-3">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-light" />
                    {t("security.banner.badge")}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {t("security.banner.title")}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-white/60">
                    {t("security.banner.text")}
                  </p>
                </span>
              </div>
              <Button to="/#about" variant="secondary" size="lg" arrow className="shrink-0">
                {t("security.banner.cta")}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

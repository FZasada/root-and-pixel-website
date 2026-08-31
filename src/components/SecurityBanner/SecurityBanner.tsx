import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function SecurityBanner() {
  const { t } = useTranslation();

  return (
    <section className="bg-ink py-14 lg:py-16" aria-label={t("security.banner.label")}>
      <div className="container-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-7 py-9 sm:px-10 lg:px-14 lg:py-11">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.35),transparent)] blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <span className="flex items-start gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-premium-gradient text-white shadow-lg">
                  <ShieldCheck className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="flex max-w-xl flex-col gap-2">
                  <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light">
                    {t("security.banner.badge")}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {t("security.banner.title")}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-white/60">
                    {t("security.banner.text")}
                  </p>
                </span>
              </span>
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

import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CONTACT_EMAIL } from "../../data/apps";
import { Reveal } from "../ui/Reveal";

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 lg:py-36">
      {/* background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.28),transparent)] blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>

      <div className="container-shell relative">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light">
              {t("contact.eyebrow")}
            </span>

            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {t("contact.title")}
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              {t("contact.subtitle")}
            </p>

            <div className="mt-6 flex flex-col items-center gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-premium-gradient px-8 py-4 text-base font-semibold text-white shadow-[0_12px_36px_-10px_rgba(124,92,255,0.65)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_44px_-10px_rgba(124,92,255,0.8)] active:scale-[0.98]"
              >
                {t("contact.primaryCta")}
                <ArrowUpRight
                  className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-[15px] font-medium text-white/60 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t("contact.email")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
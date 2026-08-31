import { useTranslation } from "react-i18next";

import { processSteps } from "../../data/process";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Process() {
  const { t } = useTranslation();

  return (
    <section id="process" className="bg-white py-24 lg:py-32">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow={t("process.eyebrow")}
            title={t("process.title")}
            dark={false}
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[8.5%] right-[8.5%] top-[38px] hidden h-px lg:block"
          >
            <div className="h-full w-full bg-gradient-to-r from-accent/15 via-accent/40 to-accent/15" />
          </div>

          {processSteps.map(({ number, icon: Icon, i18nKey }, i) => (
            <Reveal key={number} delay={0.12 * i} className="relative">
              <li className="group relative flex flex-col items-center gap-5 text-center">
                <span className="relative z-10 grid h-[76px] w-[76px] place-items-center rounded-[22px] bg-premium-gradient text-white shadow-[0_10px_24px_-10px_rgba(124,92,255,0.6)] ring-4 ring-white">
                  <Icon className="h-7 w-7" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="flex flex-col items-center gap-2">
                  <span className="text-xs font-bold tracking-[0.22em] text-accent-dark">
                    {number}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {t(`${i18nKey}.title`)}
                  </h3>
                  <p className="max-w-[240px] text-sm leading-relaxed text-faint">
                    {t(`${i18nKey}.description`)}
                  </p>
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
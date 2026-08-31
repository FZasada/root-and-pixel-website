import { useTranslation } from "react-i18next";

import { technologies } from "../../data/technologies";
import { Reveal } from "../ui/Reveal";

export function TechnologyBar() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-line bg-white py-14" aria-label={t("tech.title")}>
      <div className="container-shell">
        <Reveal y={12}>
          <p className="text-center text-sm font-medium text-faint">
            {t("tech.title")}
          </p>
        </Reveal>

        <Reveal y={16} delay={0.08}>
          <ul className="no-scrollbar mt-8 flex items-center justify-between gap-10 overflow-x-auto pb-1 lg:justify-center lg:gap-14">
            {technologies.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="flex shrink-0 items-center gap-2.5 text-ink/55 transition-colors duration-300 hover:text-ink"
              >
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden="true" />
                <span className="whitespace-nowrap text-[17px] font-semibold tracking-tight">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
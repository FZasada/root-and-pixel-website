import { useTranslation } from "react-i18next";

import { Reveal } from "../../components/ui/Reveal";
import { SEO } from "../../components/ui/SEO";

export function ImprintPage() {
  const { t } = useTranslation();
  const items = t("legalPages.imprint.items", { returnObjects: true }) as string[];

  return (
    <section className="bg-white pb-24 pt-32 lg:pb-32 lg:pt-40">
      <div className="container-shell max-w-3xl">
        <SEO titleKey="seo.imprint.title" descriptionKey="seo.imprint.description" />
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {t("legalPages.imprint.title")}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-faint">
            {t("legalPages.imprint.intro")}
          </p>
          <ul className="mt-8 flex flex-col gap-2 rounded-2xl border border-line bg-white p-6 shadow-card">
            {items.map((item) => (
              <li key={item} className="text-[15px] text-ink/80">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function PrivacyPage() {
  const { t } = useTranslation();
  const blocks = t("legalPages.privacy.blocks", {
    returnObjects: true,
  }) as Array<{ heading: string; text: string }>;

  return (
    <section className="bg-white pb-24 pt-32 lg:pb-32 lg:pt-40">
      <div className="container-shell max-w-3xl">
        <SEO titleKey="seo.privacy.title" descriptionKey="seo.privacy.description" />
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {t("legalPages.privacy.title")}
          </h1>
          <div className="mt-10 flex flex-col gap-6">
            {blocks.map((block) => (
              <div
                key={block.heading}
                className="rounded-2xl border border-line bg-white p-6 shadow-card"
              >
                <h2 className="text-lg font-semibold tracking-tight text-ink">{block.heading}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-faint">{block.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
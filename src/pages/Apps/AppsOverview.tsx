import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { appStoreHref, apps } from "../../data/apps";
import { AppIconTile } from "../../components/ui/AppIconTile";
import { DeviceFrame } from "../../components/ui/DeviceFrame";
import { PhoneScreen } from "../../components/ui/PhoneScreens";
import { Reveal } from "../../components/ui/Reveal";
import { SEO } from "../../components/ui/SEO";
import { StoreBadge } from "../../components/ui/StoreBadge";

const ease = [0.22, 1, 0.36, 1] as const;

function OverviewRow({ index }: { index: number }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const app = apps[index];
  const name = t(`${app.i18nKey}.name`);
  const tagline = t(`${app.i18nKey}.tagline`);
  const description = t(`${app.i18nKey}.description`);

  return (
    <Reveal delay={index * 0.05}>
      <Link
        to={`/apps/${app.slug}`}
        className="group relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] border border-ink/[0.06] bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover sm:p-10 lg:grid-cols-2"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full opacity-[0.08] blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${app.accent}, transparent)` }}
        />

        <div className="relative flex flex-col items-start gap-5">
          <AppIconTile icon={app.icon} tile={app.tile} size="lg" label={name} />
          <h3 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{name}</h3>
          <p className="text-lg font-medium text-ink/80">{tagline}</p>
          <p className="max-w-md text-[15px] leading-relaxed text-faint">{description}</p>

          <span className="mt-2 flex flex-wrap items-center gap-5">
            {app.comingSoon ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-2 text-xs font-medium text-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-ink/25" aria-hidden="true" />
                {t("store.comingSoon")}
              </span>
            ) : (
              <>
                <StoreBadge
                  platform="apple"
                  href={appStoreHref(name, "apple")}
                  label={t("store.appleShort")}
                />
                <StoreBadge
                  platform="google"
                  href={appStoreHref(name, "google")}
                  label={t("store.googleShort")}
                />
              </>
            )}
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark transition-colors group-hover:text-accent">
              {t("learnMore")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </span>
        </div>

        <motion.div
          initial={false}
          animate={{ rotate: reduce ? 0 : index % 2 === 0 ? 4 : -4 }}
          transition={{ duration: 1, ease }}
          className="relative hidden items-center justify-center lg:flex"
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${app.accent}26, transparent)` }}
          />
          <div className="relative">
            <DeviceFrame variant="light">
              <PhoneScreen variant={app.screen} />
            </DeviceFrame>
          </div>
        </motion.div>
      </Link>
    </Reveal>
  );
}

export function AppsOverview() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <>
      <SEO titleKey="seo.apps.title" descriptionKey="seo.apps.description" />

      <section className="relative overflow-hidden pb-24 pt-32 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-48 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.22),transparent)] blur-2xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="container-shell relative">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col items-start gap-5"
          >
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light">
              {t("appsOverview.eyebrow")}
            </span>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {t("appsOverview.title")}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              {t("appsOverview.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <div className="container-shell flex flex-col gap-8">
          {apps.map((app, i) => (
            <OverviewRow key={app.slug} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { appStoreHref, apps, type AppInfo } from "../../data/apps";
import { cn } from "../../lib/cn";
import { AppIconTile } from "../ui/AppIconTile";
import { DeviceFrame } from "../ui/DeviceFrame";
import { PhoneScreen } from "../ui/PhoneScreens";
import { Reveal } from "../ui/Reveal";
import { StoreBadge } from "../ui/StoreBadge";

function CardBadges({ app }: { app: AppInfo }) {
  const { t } = useTranslation();

  if (app.comingSoon) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.04] px-3.5 py-1.5 text-xs font-medium text-faint">
        <span className="h-1.5 w-1.5 rounded-full bg-ink/25" aria-hidden="true" />
        {t("store.comingSoon")}
      </span>
    );
  }

  return (
    <span className="flex flex-wrap gap-2">
      <StoreBadge
        platform="apple"
        href={appStoreHref(app, "apple")}
        label={t("store.appleShort")}
      />
      <StoreBadge
        platform="google"
        href={appStoreHref(app, "google")}
        label={t("store.googleShort")}
      />
    </span>
  );
}

function FeaturedCard({ app }: { app: AppInfo }) {
  const { t } = useTranslation();
  const name = t(`${app.i18nKey}.name`);
  const tagline = t(`${app.i18nKey}.tagline`);
  const learnMore = t("learnMore");

  return (
    <Link
      to={`/apps/${app.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-ink/[0.06] bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover lg:col-span-2 lg:row-span-2 lg:flex-row"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.14]"
        style={{ background: `radial-gradient(closest-side, ${app.accent}, transparent)` }}
      />

      <div className="relative flex flex-1 flex-col justify-center gap-6 p-8 lg:p-12">
        <span className="flex items-center gap-4">
          <AppIconTile icon={app.icon} tile={app.tile} size="lg" label={name} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-dark">
            {t("apps.eyebrow")}
          </span>
        </span>
        <h3 className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">{name}</h3>
        <p className="max-w-md text-lg leading-relaxed text-faint">{tagline}</p>
        <span className="flex flex-wrap items-center gap-5">
          <CardBadges app={app} />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark transition-colors group-hover:text-accent">
            {learnMore}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </span>
      </div>

      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden p-2 sm:min-h-[380px] lg:min-h-0 lg:w-[46%]">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${app.accent}33, transparent)` }}
        />
        <div className="relative rotate-[4deg] transition-transform duration-500 group-hover:rotate-[2deg]">
          <DeviceFrame variant="light">
            <PhoneScreen variant={app.screen} />
          </DeviceFrame>
        </div>
      </div>
    </Link>
  );
}

function StandardCard({ app, delay }: { app: AppInfo; delay: number }) {
  const { t } = useTranslation();
  const name = t(`${app.i18nKey}.name`);
  const tagline = t(`${app.i18nKey}.tagline`);

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={`/apps/${app.slug}`}
        className={cn(
          "group relative flex h-full flex-col gap-5 overflow-hidden rounded-[2rem] border border-ink/[0.06] bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-[0.07] blur-2xl"
          style={{ background: `radial-gradient(closest-side, ${app.accent}, transparent)` }}
        />
        <span className="flex items-start justify-between">
          <AppIconTile icon={app.icon} tile={app.tile} label={name} />
          <ArrowUpRight
            className="h-5 w-5 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
        </span>
        <span className="flex flex-col gap-1.5">
          <h3 className="text-2xl font-semibold tracking-tight text-ink">{name}</h3>
          <p className="text-[15px] leading-relaxed text-faint">{tagline}</p>
        </span>
        <span className="mt-auto">
          <CardBadges app={app} />
        </span>
      </Link>
    </Reveal>
  );
}

export function Apps() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="bg-mist py-24 lg:py-32">
      <div className="container-shell">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="relative flex flex-col gap-2">
              <span className="inline-flex w-fit items-center rounded-full bg-ink/[0.05] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-dark ring-1 ring-ink/10">
                {t("apps.eyebrow")}
              </span>
              <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {t("apps.title")}
              </h2>
            </div>
            <Link
              to="/apps"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-accent-dark transition-colors hover:text-accent"
            >
              {t("apps.link")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <FeaturedCard app={apps[0]} />
          {apps.slice(1).map((app, i) => (
            <StandardCard key={app.slug} app={app} delay={0.08 + i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useParams } from "react-router-dom";

import { appStoreHref, CONTACT_EMAIL, getApp } from "../../data/apps";
import { AppIconTile } from "../../components/ui/AppIconTile";
import { DeviceFrame } from "../../components/ui/DeviceFrame";
import { PhoneScreen } from "../../components/ui/PhoneScreens";
import { Reveal } from "../../components/ui/Reveal";
import { SEO } from "../../components/ui/SEO";
import { StoreBadge } from "../../components/ui/StoreBadge";

const ease = [0.22, 1, 0.36, 1] as const;

export function AppPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const app = slug ? getApp(slug) : undefined;
  if (!app) return <Navigate to="/apps" replace />;

  const name = t(`${app.i18nKey}.name`);
  const tagline = t(`${app.i18nKey}.tagline`);
  const description = t(`${app.i18nKey}.description`);
  const benefits = t(`${app.i18nKey}.benefits`, { returnObjects: true }) as string[];
  const features = [0, 1, 2].map((i) => ({
    title: t(`${app.i18nKey}.features.${i}.title`),
    text: t(`${app.i18nKey}.features.${i}.text`),
  }));
  const ctaTitle = t(`${app.i18nKey}.ctaTitle`);
  const ctaSub = t(`${app.i18nKey}.ctaSub`);

  return (
    <>
      <SEO titleKey={`seo.${app.slug}.title`} descriptionKey={`seo.${app.slug}.description`} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-32 lg:pb-28 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-2xl"
            style={{ background: `radial-gradient(closest-side, ${app.accent}2e, transparent)` }}
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="container-shell relative">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Link
              to="/apps"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("appsOverview.eyebrow")}
            </Link>
            <nav className="mt-6 flex flex-wrap gap-2" aria-label={t("appPage.tabsLabel")}>
              {[
                { to: `/apps/${app.slug}`, key: `${app.i18nKey}.overviewLink` },
                { to: `/apps/${app.slug}/privacy`, key: `${app.i18nKey}.privacyLink` },
                { to: `/apps/${app.slug}/support`, key: `${app.i18nKey}.supportLink` },
              ].map((tab) => (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className="rounded-full px-5 py-2.5 text-sm font-medium text-white/60 ring-1 ring-transparent transition-colors hover:bg-white/5 hover:text-white"
                >
                  {t(tab.key)}
                </Link>
              ))}
            </nav>
          </motion.div>

          <div className="mt-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="max-w-xl lg:col-span-7"
            >
              <div className="flex items-center gap-5">
                <AppIconTile icon={app.icon} tile={app.tile} size="lg" label={name} />
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {name}
                </h1>
              </div>
              <p className="mt-6 text-xl font-medium text-white/90">{tagline}</p>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {app.comingSoon ? (
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/75">
                    <span className="h-2 w-2 rounded-full bg-premium-gradient" aria-hidden="true" />
                    {t("store.comingSoon")}
                  </span>
                ) : (
                  <>
                    <StoreBadge
                      platform="apple"
                      variant="light"
                      label={t("store.appleShort")}
                      href={appStoreHref(name, "apple")}
                    />
                    <StoreBadge
                      platform="google"
                      variant="light"
                      label={t("store.googleShort")}
                      href={appStoreHref(name, "google")}
                    />
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto w-fit">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                  style={{ background: `radial-gradient(closest-side, ${app.accent}40, transparent)` }}
                />
                <div className="relative rotate-[3deg]">
                  <DeviceFrame variant="light">
                    <PhoneScreen variant={app.screen} />
                  </DeviceFrame>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24 lg:py-28">
        <div className="container-shell">
          <Reveal>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t("appPage.featuresHeading", { app: name })}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = app.featureIcons[i];
              return (
                <Reveal key={feature.title} delay={0.08 * i}>
                  <article className="group h-full rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md"
                      style={{ background: `linear-gradient(135deg, ${app.accent}, ${app.accent}bb)` }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-faint">{feature.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits + tech */}
      <section className="bg-mist py-24 lg:py-28">
        <div className="container-shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {t("appPage.benefitsHeading")}
              </h2>
              <ul className="mt-8 flex flex-col gap-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-[15px] font-medium text-ink/80">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-dark">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-line bg-white p-8 shadow-card sm:p-10">
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {t("appPage.techHeading")}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {app.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink/75"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-faint">
                {t("appPage.techNote")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-24 lg:pb-32">
        <div className="container-shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center sm:px-16 lg:py-20">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-[320px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                style={{ background: `radial-gradient(closest-side, ${app.accent}52, transparent)` }}
              />
              <div className="relative flex flex-col items-center gap-5">
                <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                  {ctaTitle}
                </h2>
                <p className="text-base text-white/60">{ctaSub}</p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                  {app.comingSoon ? (
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${name} — ${t("store.comingSoon")}`)}`}
                      className="inline-flex items-center gap-2.5 rounded-full bg-premium-gradient px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                    >
                      <Download className="h-4.5 w-4.5" aria-hidden="true" />
                      {t("appPage.notifyMe")}
                    </a>
                  ) : (
                    <>
                      <StoreBadge
                        platform="apple"
                        variant="light"
                        label={t("store.appleShort")}
                        href={appStoreHref(name, "apple")}
                      />
                      <StoreBadge
                        platform="google"
                        variant="light"
                        label={t("store.googleShort")}
                        href={appStoreHref(name, "google")}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
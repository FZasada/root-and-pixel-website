import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, NavLink, useParams } from "react-router-dom";

import { getApp } from "../../data/apps";
import { CONTACT_EMAIL } from "../../data/apps";
import { Faq } from "../../components/Faq/Faq";
import { SupportForm } from "../../components/SupportForm/SupportForm";
import { AppIconTile } from "../../components/ui/AppIconTile";
import { Reveal } from "../../components/ui/Reveal";
import { SEO } from "../../components/ui/SEO";

const ease = [0.22, 1, 0.36, 1] as const;

type PageKind = "privacy" | "support";

interface LegalContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: Array<{ heading: string; text: string }>;
  ctaTitle: string;
  ctaSub: string;
  ctaLabel: string;
}

function AppLegalPage({ kind }: { kind: PageKind }) {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const app = slug ? getApp(slug) : undefined;
  const name = t(app ? `${app.i18nKey}.name` : "");
  const AppIcon = app?.icon ?? ShieldCheck;
  const base = app ? `${app.i18nKey}.${kind}` : `${kind}.title`;
  const seoOptions = useMemo(() => ({ app: name }), [name]);
  const content = t(base, { returnObjects: true }) as LegalContent;
  const sections = content.sections ?? [];

  if (!app) return <Navigate to="/apps" replace />;

  const tabs = [
    { to: `/apps/${app.slug}`, key: `${app.i18nKey}.overviewLink` },
    { to: `/apps/${app.slug}/privacy`, key: `${app.i18nKey}.privacyLink` },
    { to: `/apps/${app.slug}/support`, key: `${app.i18nKey}.supportLink` },
  ];

  return (
    <>
      <SEO
        titleKey={`seo.app${kind === "privacy" ? "Privacy" : "Support"}`}
        descriptionKey={`seo.app${kind === "privacy" ? "Privacy" : "Support"}Desc`}
        options={seoOptions}
      />

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
          </motion.div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="max-w-2xl lg:col-span-7"
            >
              <div className="flex items-center gap-5">
                <AppIconTile icon={app.icon} tile={app.tile} size="lg" label={name} />
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    {kind === "privacy" ? (
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {content.eyebrow}
                  </span>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                    {content.title}
                  </h1>
                </div>
              </div>
              <p className="mt-6 text-xl font-medium text-white/90">{content.subtitle}</p>

              <nav
                className="mt-8 flex flex-wrap gap-2"
                aria-label={t("appPage.tabsLabel")}
              >
                {tabs.map((tab) => (
                  <NavLink
                    key={tab.to}
                    to={tab.to}
                    end
                    className={({ isActive }) =>
                      `rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white/10 text-white ring-1 ring-white/20"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    {t(tab.key)}
                  </NavLink>
                ))}
              </nav>
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
                <div className="relative grid h-56 w-56 place-items-center rounded-[2.5rem] bg-premium-gradient text-white shadow-[0_24px_48px_-12px_rgba(5,7,11,0.4)]">
                  <AppIcon className="h-24 w-24" strokeWidth={1.6} aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 lg:py-28">
        <div className="container-shell">
          <h2 className="sr-only">{content.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, i) => (
              <Reveal key={section.heading} delay={0.08 * i} className="h-full">
                <article className="h-full rounded-3xl border border-line bg-white p-7 shadow-card">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {section.heading}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-faint">
                    {section.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {kind === "privacy" && (
            <Reveal delay={0.1}>
              <div className="mt-14 flex flex-col items-center gap-5 text-center">
                <h3 className="max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {content.ctaTitle}
                </h3>
                <p className="text-base text-faint">{content.ctaSub}</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${name} — ${content.eyebrow}`)}`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-premium-gradient px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                >
                  <Mail className="h-4.5 w-4.5" aria-hidden="true" />
                  {content.ctaLabel}
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {kind === "support" && (
        <>
          <section className="bg-white py-24 lg:py-28">
            <div className="container-shell">
              <Reveal>
                <div className="flex flex-col gap-2">
                  <span className="inline-flex w-fit items-center rounded-full bg-ink/[0.05] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-dark ring-1 ring-ink/10">
                    {t("supportFaq.eyebrow")}
                  </span>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {t("supportFaq.title")}
                  </h2>
                </div>
              </Reveal>
              <div className="mt-10 max-w-3xl">
                <Faq i18nKey={`${app.i18nKey}.support.faq`} />
              </div>
            </div>
          </section>

          <section className="bg-white pb-24 lg:pb-32">
            <div className="container-shell">
              <Reveal>
                <div className="flex flex-col gap-2">
                  <span className="inline-flex w-fit items-center rounded-full bg-ink/[0.05] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-dark ring-1 ring-ink/10">
                    {t("supportForm.eyebrow")}
                  </span>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {t("supportForm.title")}
                  </h2>
                </div>
              </Reveal>
              <div className="mt-10 max-w-2xl">
                <SupportForm appName={name} />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export function AppPrivacy() {
  return <AppLegalPage kind="privacy" />;
}

export function AppSupport() {
  return <AppLegalPage kind="support" />;
}

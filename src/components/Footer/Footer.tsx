import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { apps } from "../../data/apps";
import { navItems } from "../../data/nav";
import { LanguageSelector } from "../ui/LanguageSelector";
import { Logo } from "../ui/Logo";
import { ScrollLink } from "../ui/ScrollLink";

export function Footer() {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("footer.columns.nav"),
      links: navItems.map((item) => ({
        label: t(item.key),
        to: `${item.to}${item.hash ? `#${item.hash}` : ""}`,
      })),
    },
    {
      title: t("footer.columns.apps"),
      links: apps.map((app) => ({
        label: t(`${app.i18nKey}.name`),
        to: `/apps/${app.slug}`,
      })),
    },
  ];

  return (
    <footer className="bg-ink-950">
      <div className="container-shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Logo variant="light" />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              {t("brand.tagline")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map(({ title, links }) => (
              <nav key={title} aria-label={title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                  {title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <ScrollLink
                        to={link.to}
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {link.label}
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label={t("footer.columns.legal")}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                {t("footer.columns.legal")}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                <li>
                  <Link to="/impressum" className="text-sm text-white/65 transition-colors hover:text-white">
                    {t("footer.legal.imprint")}
                  </Link>
                </li>
                <li>
                  <Link to="/datenschutz" className="text-sm text-white/65 transition-colors hover:text-white">
                    {t("footer.legal.privacy")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/[0.07] pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            © 2026 Root &amp; Pixel. {t("footer.rights")}
          </p>
          <LanguageSelector align="right" />
        </div>
      </div>
    </footer>
  );
}
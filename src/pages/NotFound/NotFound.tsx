import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SEO } from "../../components/ui/SEO";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-ink pb-24 pt-32">
      <SEO titleKey="seo.notFound.title" descriptionKey="seo.home.description" />
      <div className="container-shell">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="bg-gradient-to-r from-accent via-accent-light to-blue-glow bg-clip-text text-8xl font-semibold tracking-tight text-transparent">
            404
          </p>
          <h1 className="max-w-md text-3xl font-semibold tracking-tight text-balance text-white">
            {t("notFound.title")}
          </h1>
          <p className="max-w-sm text-muted">{t("notFound.text")}</p>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full bg-premium-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
            {t("notFound.home")}
          </Link>
        </div>
      </div>
    </section>
  );
}
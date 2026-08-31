import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://rootandpixel.com";

interface SEOProps {
  /** i18n key for the page title, e.g. "seo.home.title" */
  titleKey: string;
  descriptionKey: string;
  /** Optional translation interpolation values, e.g. `{ app: "nomi" }`. */
  options?: Record<string, unknown>;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function SEO({ titleKey, descriptionKey, options }: SEOProps) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const title = t(titleKey, options);
    const description = t(descriptionKey, options);
    const canonical = `${BASE_URL}${pathname === "/" ? "/" : pathname}`;

    document.title = title;
    if (document.querySelector('meta[name="description"]')) {
      document.querySelector('meta[name="description"]')!.setAttribute("content", description);
    }

    upsertLink("canonical", canonical);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Root & Pixel");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", `${BASE_URL}/og.svg`);
    upsertMeta("property", "og:locale", i18n.resolvedLanguage ?? "de");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", `${BASE_URL}/og.svg`);
  }, [titleKey, descriptionKey, options, t, i18n.resolvedLanguage, pathname]);

  return null;
}
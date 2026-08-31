import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import de from "../locales/de/common.json";
import en from "../locales/en/common.json";
import pl from "../locales/pl/common.json";

export const STORAGE_KEY = "rootpixel-lang";

export const languages = [
  { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "pl", label: "Polski", short: "PL", flag: "🇵🇱" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "en";

const stored = (() => {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v && isLanguage(v)) return v;
  } catch {
    /* ignore */
  }
  return undefined;
})();

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { common: de },
      en: { common: en },
      pl: { common: pl },
    },
    lng: stored,
    load: "languageOnly",
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    supportedLngs: ["de", "en", "pl"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: STORAGE_KEY,
      caches: ["localStorage"],
    },
  });

export function setLanguage(lang: LanguageCode) {
  void i18n.changeLanguage(lang);
}

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  try {
    window.localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* ignore */
  }
});

export function isLanguage(code: string): code is LanguageCode {
  return code === "de" || code === "en" || code === "pl";
}

export default i18n;
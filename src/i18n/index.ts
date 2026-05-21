import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";
import {
  type AppLocale,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  getStoredLocale,
  isAppLocale,
  localeToHtmlLang,
} from "./config";

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "zh-CN": { translation: zhCN },
  },
  lng: typeof window !== "undefined" ? getStoredLocale() : DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: ["en", "zh-CN"],
  interpolation: { escapeValue: false },
});

export { i18n };

export async function setAppLocale(locale: AppLocale) {
  await i18n.changeLanguage(locale);
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = localeToHtmlLang(locale);
  }
}

export function getCurrentLocale(): AppLocale {
  const lng = i18n.language;
  return isAppLocale(lng) ? lng : DEFAULT_LOCALE;
}

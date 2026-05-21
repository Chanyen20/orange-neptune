export const LOCALE_STORAGE_KEY = "orange-neptune-locale";

export const SUPPORTED_LOCALES = ["en", "zh-CN"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

export const localeOptions: { value: AppLocale; labelKey: string }[] = [
  { value: "en", labelKey: "locale.en" },
  { value: "zh-CN", labelKey: "locale.zhCN" },
];

export function isAppLocale(value: string): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale);
}

export function getStoredLocale(): AppLocale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored && isAppLocale(stored) ? stored : DEFAULT_LOCALE;
}

export function localeToHtmlLang(locale: AppLocale): string {
  return locale === "zh-CN" ? "zh-Hans" : "en";
}

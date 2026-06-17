/*
 * Editable site copy (home hero/CTA + page hero headings).
 *
 * These strings live in content/site/<locale>.json so the CMS can edit them as
 * plain files — the same no-database, build-time model the articles use. The app
 * reads them here; components stay in sync with the visitor's language.
 */
import { type AppLocale, DEFAULT_LOCALE, isAppLocale } from "@/i18n/config";

type PageHero = { heroTitle: string; heroSubtitle: string };

export type SiteText = {
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitleLine1: string;
    heroSubtitleLine2: string;
    ctaTitle: string;
    ctaDescription: string;
  };
  pages: Record<"capabilities" | "traffic" | "results" | "company" | "contact", PageHero>;
};

const files = import.meta.glob("../../content/site/*.json", {
  eager: true,
  import: "default",
}) as Record<string, SiteText>;

const byLocale = {} as Record<AppLocale, SiteText>;
for (const [path, content] of Object.entries(files)) {
  const match = /\/site\/([^/]+)\.json$/.exec(path);
  if (match && isAppLocale(match[1])) byLocale[match[1]] = content;
}

/** Editable copy for a locale, falling back to the default locale per section. */
export function getSiteText(locale: AppLocale): SiteText {
  const base = byLocale[DEFAULT_LOCALE];
  const localized = byLocale[locale];
  if (!localized || localized === base) return base;
  return {
    home: { ...base.home, ...localized.home },
    pages: { ...base.pages, ...localized.pages },
  };
}

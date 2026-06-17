import type { AppLocale } from "@/i18n/config";

/** Format a YYYY-MM-DD date string for display, locale-aware and timezone-safe. */
export function formatArticleDate(date: string, locale: AppLocale): string {
  if (!date) return "";
  // Anchor to local midnight so the displayed day never shifts across timezones.
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(locale === "zh-CN" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(parsed);
}

import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { buildPageHead } from "@/i18n/head";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/insights")({
  head: () => buildPageHead("insights"),
  component: InsightsPage,
});

const insightKeys = ["positioning", "trafficQuality", "walmart", "localization", "perception"] as const;

function InsightsPage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.insights.heroEyebrow")}
        title={t("pages.insights.heroTitle")}
        subtitle={t("pages.insights.heroSubtitle")}
      />
      <section className="flex min-h-[90vh] flex-col justify-center py-12 md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-5xl px-6">
          <ul className="divide-y divide-border">
          {insightKeys.map((key) => (
            <li key={key} className="py-8 first:pt-0 last:pb-0">
              <span className="text-xs font-mono text-primary">{t("pages.insights.article")}</span>
              <h3 className="mt-2 text-2xl font-semibold leading-snug">{t(`pages.insights.items.${key}.title`)}</h3>
              <p className="mt-2 text-muted-foreground">{t(`pages.insights.items.${key}.desc`)}</p>
            </li>
          ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}

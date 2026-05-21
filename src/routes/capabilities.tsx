import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { buildPageHead } from "@/i18n/head";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/capabilities")({
  head: () => buildPageHead("capabilities"),
  component: CapabilitiesPage,
});

const capabilityKeys = [
  "consumerPositioning",
  "amazonAdvertising",
  "walmartAdvertising",
  "influencerSocialCommerce",
  "googleMetaAds",
  "fulfillmentEfficiency",
] as const;

function CapabilitiesPage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.capabilities.heroEyebrow")}
        title={t("pages.capabilities.heroTitle")}
        subtitle={t("pages.capabilities.heroSubtitle")}
      />
      <section className="flex min-h-[90vh] flex-col justify-center py-12 md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilityKeys.map((key, i) => (
            <article key={key} className="rounded-2xl border border-border p-6 hover:border-primary/40 transition-colors">
              <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{t(`pages.capabilities.items.${key}.title`)}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(`pages.capabilities.items.${key}.desc`)}</p>
            </article>
          ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

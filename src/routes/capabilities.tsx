import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { GradientBlob } from "@/components/decor";
import { buildPageHead } from "@/i18n/head";
import { getCurrentLocale } from "@/i18n";
import { getSiteText } from "@/content/site";
import { capabilityIcons } from "@/lib/section-visuals";
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
  const site = getSiteText(getCurrentLocale());

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.capabilities.heroEyebrow")}
        title={site.pages.capabilities.heroTitle}
        subtitle={site.pages.capabilities.heroSubtitle}
      />
      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-12 md:min-h-screen md:py-16">
        <GradientBlob className="-left-24 top-10 h-[380px] w-[380px] bg-primary/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilityKeys.map((key, i) => {
              const Icon = capabilityIcons[key];
              return (
                <article
                  key={key}
                  className="group rounded-2xl border border-border p-6 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {Icon ? <Icon className="h-6 w-6" /> : null}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">
                    {t(`pages.capabilities.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {t(`pages.capabilities.items.${key}.desc`)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

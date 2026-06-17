import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { DotGrid, GradientBlob } from "@/components/decor";
import { buildPageHead } from "@/i18n/head";
import { getCurrentLocale } from "@/i18n";
import { getSiteText } from "@/content/site";
import { trafficIcons } from "@/lib/section-visuals";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/traffic")({
  head: () => buildPageHead("traffic"),
  component: TrafficPage,
});

const blockKeys = ["01", "02", "03", "04"] as const;

function TrafficPage() {
  const { t } = useTranslation();
  const site = getSiteText(getCurrentLocale());

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.traffic.heroEyebrow")}
        title={site.pages.traffic.heroTitle}
        subtitle={site.pages.traffic.heroSubtitle}
      />
      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-12 md:min-h-screen md:py-16">
        <DotGrid className="text-primary/[0.04] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <GradientBlob className="-right-24 bottom-10 h-[380px] w-[380px] bg-primary/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {blockKeys.map((k) => {
              const Icon = trafficIcons[k];
              return (
                <article
                  key={k}
                  className="group rounded-2xl border border-border p-8 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {Icon ? <Icon className="h-6 w-6" /> : null}
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-primary">{k}</span>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {t(`pages.traffic.blocks.${k}.heading`)}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">
                    {t(`pages.traffic.blocks.${k}.title`)}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {t(`pages.traffic.blocks.${k}.desc`)}
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

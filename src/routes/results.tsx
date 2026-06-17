import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { GradientBlob } from "@/components/decor";
import { buildPageHead } from "@/i18n/head";
import { getCurrentLocale } from "@/i18n";
import { getSiteText } from "@/content/site";
import { resultIcons, resultImages } from "@/lib/section-visuals";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/results")({
  head: () => buildPageHead("results"),
  component: ResultsPage,
});

const resultKeys = ["roas", "reposition", "oem", "creator", "data"] as const;

function ResultsPage() {
  const { t } = useTranslation();
  const site = getSiteText(getCurrentLocale());

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.results.heroEyebrow")}
        title={site.pages.results.heroTitle}
        subtitle={site.pages.results.heroSubtitle}
      />
      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-12 md:min-h-screen md:py-16">
        <GradientBlob className="-left-24 top-10 h-[380px] w-[380px] bg-primary/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resultKeys.map((key, i) => {
              const Icon = resultIcons[key];
              return (
                <article
                  key={key}
                  className="group overflow-hidden rounded-2xl border border-border transition-colors hover:border-primary/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={resultImages[key]}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-foreground/5 to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-mono text-primary backdrop-blur">
                      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                      {t("pages.results.caseLabel", { num: String(i + 1).padStart(2, "0") })}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold leading-snug">
                      {t(`pages.results.items.${key}`)}
                    </h3>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {t("pages.results.cardDesc")}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

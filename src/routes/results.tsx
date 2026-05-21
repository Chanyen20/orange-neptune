import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { buildPageHead } from "@/i18n/head";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/results")({
  head: () => buildPageHead("results"),
  component: ResultsPage,
});

const resultKeys = ["roas", "reposition", "oem", "creator", "data"] as const;

function ResultsPage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.results.heroEyebrow")}
        title={t("pages.results.heroTitle")}
        subtitle={t("pages.results.heroSubtitle")}
      />
      <section className="flex min-h-[90vh] flex-col justify-center py-12 md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resultKeys.map((key, i) => (
            <article key={key} className="rounded-2xl border border-border p-8 hover:border-primary/40 transition-colors">
              <span className="text-xs font-mono text-primary">
                {t("pages.results.caseLabel", { num: String(i + 1).padStart(2, "0") })}
              </span>
              <h3 className="mt-4 text-xl font-semibold leading-snug">{t(`pages.results.items.${key}`)}</h3>
              <p className="mt-4 text-sm text-muted-foreground">{t("pages.results.cardDesc")}</p>
            </article>
          ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

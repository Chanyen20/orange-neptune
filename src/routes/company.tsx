import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { buildPageHead } from "@/i18n/head";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/company")({
  head: () => buildPageHead("company"),
  component: CompanyPage,
});

const blockKeys = ["about", "team", "principles", "contact"] as const;

function CompanyPage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.company.heroEyebrow")}
        title={t("pages.company.heroTitle")}
        subtitle={t("pages.company.heroSubtitle")}
      />
      <section className="flex min-h-[90vh] flex-col justify-center py-12 md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
          {blockKeys.map((key) => (
            <article key={key} className="rounded-2xl border border-border p-8 hover:border-primary/40 transition-colors">
              <h3 className="text-2xl font-semibold">{t(`pages.company.blocks.${key}.title`)}</h3>
              <p className="mt-3 text-muted-foreground">{t(`pages.company.blocks.${key}.desc`)}</p>
            </article>
          ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

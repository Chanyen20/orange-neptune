import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { GradientBlob } from "@/components/decor";
import { buildPageHead } from "@/i18n/head";
import { getCurrentLocale } from "@/i18n";
import { getSiteText } from "@/content/site";
import { companyIcons } from "@/lib/section-visuals";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/company")({
  head: () => buildPageHead("company"),
  component: CompanyPage,
});

const blockKeys = ["about", "team", "principles", "contact"] as const;

function CompanyPage() {
  const { t } = useTranslation();
  const site = getSiteText(getCurrentLocale());

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.company.heroEyebrow")}
        title={site.pages.company.heroTitle}
        subtitle={site.pages.company.heroSubtitle}
      />
      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-12 md:min-h-screen md:py-16">
        <GradientBlob className="-right-24 top-10 h-[380px] w-[380px] bg-primary/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {blockKeys.map((key) => {
              const Icon = companyIcons[key];
              return (
                <article
                  key={key}
                  className="group rounded-2xl border border-border p-8 transition-colors hover:border-primary/40"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {Icon ? <Icon className="h-6 w-6" /> : null}
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold">
                    {t(`pages.company.blocks.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {t(`pages.company.blocks.${key}.desc`)}
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

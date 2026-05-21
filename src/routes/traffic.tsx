import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { buildPageHead } from "@/i18n/head";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/traffic")({
  head: () => buildPageHead("traffic"),
  component: TrafficPage,
});

const blockKeys = ["01", "02", "03", "04"] as const;

function TrafficPage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.traffic.heroEyebrow")}
        title={t("pages.traffic.heroTitle")}
        subtitle={t("pages.traffic.heroSubtitle")}
      />
      <section className="flex min-h-[90vh] flex-col justify-center py-12 md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
          {blockKeys.map((k) => (
            <article key={k} className="rounded-2xl border border-border p-8">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-mono text-primary">{k}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t(`pages.traffic.blocks.${k}.heading`)}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{t(`pages.traffic.blocks.${k}.title`)}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{t(`pages.traffic.blocks.${k}.desc`)}</p>
            </article>
          ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

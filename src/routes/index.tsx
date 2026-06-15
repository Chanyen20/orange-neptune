import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { buildPageHead } from "@/i18n/head";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  head: () => buildPageHead("home"),
  component: Index,
});

const capabilityItemKeys = [
  "consumerPositioning",
  "amazonAdvertising",
  "walmartAdvertising",
  "influencerSocialCommerce",
  "googleMetaAds",
  "fulfillmentEfficiency",
] as const;

const trafficBlockKeys = ["01", "02", "03", "04"] as const;

const resultKeys = ["roas", "reposition", "oem", "creator", "data"] as const;

const insightKeys = ["positioning", "trafficQuality", "walmart", "localization", "perception"] as const;

function Index() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 700px at 50% 10%, oklch(0.82 0.10 235) 0%, oklch(0.55 0.22 265) 40%, oklch(0.22 0.14 265) 85%)",
          }}
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-12 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur px-5 py-3 ring-1 ring-white/15">
            <span className="text-sm text-white/90">{t("home.hero.badge")}</span>
            <ArrowRight className="h-4 w-4 text-white/80" />
          </div>
          <h1 className="mt-10 text-4xl md:text-6xl font-semibold tracking-tight">
            {t("home.hero.title")}
          </h1>
          <p className="mt-12 text-xl md:text-3xl font-medium text-white/85 max-w-3xl mx-auto">
            {t("home.hero.subtitleLine1")}
            <br className="hidden md:block" />
            {t("home.hero.subtitleLine2")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/insights" className="inline-flex items-center gap-2 rounded-full bg-white text-foreground px-6 py-3 text-sm font-medium hover:bg-white/90">
              {t("home.hero.ctaInsights")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/25 text-white px-6 py-3 text-sm font-medium hover:bg-white/15">
              {t("home.hero.ctaConsultation")}
            </Link>
          </div>
        </div>
      </section>

      <Section
        eyebrow={t("home.capabilities.eyebrow")}
        title={t("home.capabilities.title")}
        description={t("home.capabilities.description")}
        href="/capabilities"
        learnMore={t("home.capabilities.learnMore")}
        items={capabilityItemKeys.map((key) => t(`home.capabilities.items.${key}`))}
      />

      <section className="flex min-h-[90vh] flex-col justify-center border-y border-border bg-secondary/40 py-12 md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionHeader eyebrow={t("home.traffic.eyebrow")} title={t("home.traffic.title")} />
          <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {trafficBlockKeys.map((k) => (
              <div key={k} className="rounded-2xl bg-card border border-border p-6 hover:shadow-sm transition-shadow">
                <span className="text-xs text-muted-foreground font-mono">{k}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{t(`home.traffic.blocks.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`home.traffic.blocks.${k}.subtitle`)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:mt-10">
            <Link to="/traffic" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              {t("home.traffic.explore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex min-h-[90vh] flex-col justify-center py-12 md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionHeader eyebrow={t("home.results.eyebrow")} title={t("home.results.title")} />
          <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {resultKeys.slice(0, 3).map((key) => (
              <article key={key} className="rounded-2xl border border-border p-6 hover:border-primary/40 transition-colors">
                <span className="text-xs font-mono text-primary">{t("home.results.caseStudy")}</span>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{t(`home.results.items.${key}`)}</h3>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/results" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              {t("home.results.seeAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex min-h-[90vh] flex-col justify-center bg-nav py-12 text-nav-foreground md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionHeader eyebrow={t("home.insights.eyebrow")} title={t("home.insights.title")} dark />
          <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2">
            {insightKeys.slice(0, 4).map((key) => (
              <Link key={key} to="/insights" className="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/10 transition-colors">
                <span className="text-xs font-mono text-white/60">{t("home.insights.article")}</span>
                <h3 className="mt-3 text-lg font-medium leading-snug group-hover:text-white">{t(`home.insights.items.${key}`)}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[90vh] flex-col items-center justify-center py-12 md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t("home.cta.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t("home.cta.description")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90">
              {t("home.cta.schedule")}
            </Link>
            <Link to="/insights" className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium hover:bg-accent">
              {t("home.cta.explore")}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function SectionHeader({ eyebrow, title, dark }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <span className={`text-xs font-mono ${dark ? "text-white/60" : "text-primary"}`}>{eyebrow.toUpperCase()}</span>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  description,
  items,
  href,
  learnMore,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  href: string;
  learnMore: string;
}) {
  return (
    <section className="flex min-h-[90vh] flex-col justify-center py-12 md:min-h-screen md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <span className="text-xs font-mono text-primary">{eyebrow.toUpperCase()}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-4 text-muted-foreground">{description}</p>
            <Link to={href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              {learnMore} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((i) => (
              <li key={i} className="rounded-xl border border-border bg-card p-4 text-sm">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

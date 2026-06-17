import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { DotGrid, GradientBlob, OrbitMotif } from "@/components/decor";
import { buildPageHead } from "@/i18n/head";
import { getCurrentLocale } from "@/i18n";
import { getSiteText } from "@/content/site";
import { capabilityIcons, resultIcons, resultImages, trafficIcons } from "@/lib/section-visuals";
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

const insightKeys = [
  "positioning",
  "trafficQuality",
  "walmart",
  "localization",
  "perception",
] as const;

function Index() {
  const { t } = useTranslation();
  const site = getSiteText(getCurrentLocale());

  return (
    <PageShell>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-white">
        <img
          src="/images/hero.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 720px at 50% 8%, oklch(0.62 0.18 255 / 0.78) 0%, oklch(0.32 0.16 262 / 0.90) 48%, oklch(0.16 0.10 262 / 0.96) 100%)",
          }}
        />
        <OrbitMotif className="absolute -right-24 -top-28 h-[460px] w-[460px] text-white/40" />
        <OrbitMotif className="absolute -bottom-40 -left-32 h-[420px] w-[420px] text-white/25" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-12 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur px-5 py-3 ring-1 ring-white/15">
            <span className="text-sm text-white/90">{site.home.heroBadge}</span>
            <ArrowRight className="h-4 w-4 text-white/80" />
          </div>
          <h1 className="mt-10 text-4xl md:text-6xl font-semibold tracking-tight">
            {site.home.heroTitle}
          </h1>
          <p className="mt-12 text-xl md:text-3xl font-medium text-white/85 max-w-3xl mx-auto">
            {site.home.heroSubtitleLine1}
            <br className="hidden md:block" />
            {site.home.heroSubtitleLine2}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 rounded-full bg-white text-foreground px-6 py-3 text-sm font-medium hover:bg-white/90"
            >
              {t("home.hero.ctaInsights")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/25 text-white px-6 py-3 text-sm font-medium hover:bg-white/15"
            >
              {t("home.hero.ctaConsultation")}
            </Link>
          </div>
        </div>
      </section>

      <CapabilitiesSection
        eyebrow={t("home.capabilities.eyebrow")}
        title={t("home.capabilities.title")}
        description={t("home.capabilities.description")}
        href="/capabilities"
        learnMore={t("home.capabilities.learnMore")}
        items={capabilityItemKeys.map((key) => ({
          key,
          label: t(`home.capabilities.items.${key}`),
        }))}
      />

      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden border-y border-border bg-secondary/40 py-12 md:min-h-screen md:py-16">
        <DotGrid className="text-primary/[0.05] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <SectionHeader eyebrow={t("home.traffic.eyebrow")} title={t("home.traffic.title")} />
          <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {trafficBlockKeys.map((k) => {
              const Icon = trafficIcons[k];
              return (
                <div
                  key={k}
                  className="group rounded-2xl bg-card border border-border p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-2xl font-semibold text-border">{k}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {t(`home.traffic.blocks.${k}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`home.traffic.blocks.${k}.subtitle`)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center md:mt-10">
            <Link
              to="/traffic"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              {t("home.traffic.explore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex min-h-[90vh] flex-col justify-center py-12 md:min-h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionHeader eyebrow={t("home.results.eyebrow")} title={t("home.results.title")} />
          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {resultKeys.slice(0, 3).map((key) => {
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
                      <Icon className="h-3.5 w-3.5" /> {t("home.results.caseStudy")}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold leading-snug">
                      {t(`home.results.items.${key}`)}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/results"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              {t("home.results.seeAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-nav py-12 text-nav-foreground md:min-h-screen md:py-16">
        <OrbitMotif className="absolute -right-28 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 text-white/15 lg:block" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <SectionHeader
            eyebrow={t("home.insights.eyebrow")}
            title={t("home.insights.title")}
            dark
          />
          <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2">
            {insightKeys.slice(0, 4).map((key) => (
              <Link
                key={key}
                to="/insights"
                className="group flex items-start gap-4 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 transition-colors hover:bg-white/10"
              >
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-white/80 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight className="h-4 w-4" />
                </span>
                <div>
                  <span className="text-xs font-mono text-white/60">
                    {t("home.insights.article")}
                  </span>
                  <h3 className="mt-1 text-lg font-medium leading-snug group-hover:text-white">
                    {t(`home.insights.items.${key}`)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden py-12 md:min-h-screen md:py-16">
        <GradientBlob className="left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 bg-primary/10" />
        <DotGrid className="text-primary/[0.05] [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]" />
        <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {site.home.ctaTitle}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{site.home.ctaDescription}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {t("home.cta.schedule")}
            </Link>
            <Link
              to="/insights"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium hover:bg-accent"
            >
              {t("home.cta.explore")}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function SectionHeader({
  eyebrow,
  title,
  dark,
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <span className={`text-xs font-mono ${dark ? "text-white/60" : "text-primary"}`}>
        {eyebrow.toUpperCase()}
      </span>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function CapabilitiesSection({
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
  items: { key: string; label: string }[];
  href: string;
  learnMore: string;
}) {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-12 md:min-h-screen md:py-16">
      <GradientBlob className="-left-20 top-10 h-[360px] w-[360px] bg-primary/10" />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <span className="text-xs font-mono text-primary">{eyebrow.toUpperCase()}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-4 text-muted-foreground">{description}</p>
            <Link
              to={href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              {learnMore} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map(({ key, label }) => {
              const Icon = capabilityIcons[key];
              return (
                <li
                  key={key}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </span>
                  <span className="text-sm font-medium leading-snug">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

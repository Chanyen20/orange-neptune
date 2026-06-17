import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { GradientBlob } from "@/components/decor";
import { buildPageHead } from "@/i18n/head";
import { getCurrentLocale } from "@/i18n";
import { formatArticleDate } from "@/lib/format-date";
import { getArticles } from "@/content/articles";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/insights")({
  head: () => buildPageHead("insights"),
  component: InsightsPage,
});

function InsightsPage() {
  const { t } = useTranslation();
  const locale = getCurrentLocale();
  const articles = getArticles(locale);

  return (
    <PageShell>
      <section className="relative overflow-hidden py-12 md:py-16">
        <GradientBlob className="-right-24 top-0 h-[360px] w-[360px] bg-primary/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6">
          {articles.length === 0 ? (
            <p className="text-center text-muted-foreground">{t("pages.insights.empty")}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to="/insights/$slug"
                  params={{ slug: article.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-colors hover:border-primary/40"
                >
                  {article.cover && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={article.cover}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/5 to-transparent" />
                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-mono text-primary backdrop-blur">
                        {t("pages.insights.article")}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                      {article.description}
                    </p>
                    <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                      {article.date && <span>{formatArticleDate(article.date, locale)}</span>}
                      {article.date && <span aria-hidden>·</span>}
                      <span>
                        {t("pages.insights.readingTime", { minutes: article.readingMinutes })}
                      </span>
                      <ArrowRight className="ml-auto h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

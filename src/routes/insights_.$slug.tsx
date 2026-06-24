import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PageShell } from "@/components/PageShell";
import { getAdjacentArticles, getArticle } from "@/content/articles";
import { getCurrentLocale } from "@/i18n";
import { formatArticleDate } from "@/lib/format-date";

export const Route = createFileRoute("/insights_/$slug")({
  head: ({ params }) => {
    const article = getArticle(getCurrentLocale(), params.slug);
    if (!article) return {};
    return {
      meta: [
        { title: `${article.title} — Orange Neptune` },
        { name: "description", content: article.description },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { t } = useTranslation();
  const locale = getCurrentLocale();
  const article = getArticle(locale, slug);
  const { prev, next } = getAdjacentArticles(locale, slug);

  // Keep the browser tab title in sync when the visitor switches language.
  useEffect(() => {
    if (article) document.title = `${article.title} — Orange Neptune`;
  }, [article]);

  return (
    <PageShell>
      {!article ? (
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <p className="text-muted-foreground">{t("pages.insights.empty")}</p>
          <Link
            to="/insights"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> {t("pages.insights.backToList")}
          </Link>
        </section>
      ) : (
        <article>
          <div className="mx-auto w-full max-w-3xl px-6 pt-10 md:pt-14">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> {t("pages.insights.backToList")}
            </Link>

            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
              {article.title}
            </h1>
            {article.description && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {article.description}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                O
              </span>
              <div className="text-xs uppercase leading-tight tracking-wide">
                <div className="font-semibold text-foreground">{t("brand.name")}</div>
                <div className="mt-0.5 text-muted-foreground">
                  {article.date && <>{formatArticleDate(article.date, locale)} · </>}
                  {t("pages.insights.readingTime", { minutes: article.readingMinutes })}
                </div>
              </div>
            </div>
          </div>

          {article.cover && (
            <div className="mx-auto w-full max-w-3xl px-6 pt-8">
              <img src={article.cover} alt="" aria-hidden className="w-full rounded-xl" />
            </div>
          )}

          <div className="mx-auto w-full max-w-3xl px-6 py-10 md:py-12">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />

            <nav className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {prev ? (
                <Link
                  to="/insights/$slug"
                  params={{ slug: prev.slug }}
                  className="group flex flex-col gap-1 rounded-lg border border-border p-3 transition-colors hover:border-primary/40"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <ArrowLeft className="h-3.5 w-3.5" /> {t("pages.insights.prevArticle")}
                  </span>
                  <span className="line-clamp-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  to="/insights/$slug"
                  params={{ slug: next.slug }}
                  className="group flex flex-col items-end gap-1 rounded-xl border border-border p-5 text-right transition-colors hover:border-primary/40"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    {t("pages.insights.nextArticle")} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="line-clamp-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
            </nav>
          </div>
        </article>
      )}
    </PageShell>
  );
}

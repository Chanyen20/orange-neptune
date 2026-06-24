import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PageShell } from "@/components/PageShell";
import { OrbitMotif } from "@/components/decor";
import { getArticle } from "@/content/articles";
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
          <header className="relative overflow-hidden bg-nav text-nav-foreground">
            <OrbitMotif className="absolute -right-24 -top-24 h-[420px] w-[420px] text-white/15" />
            <div className="relative mx-auto w-full max-w-3xl px-6 pb-14 pt-16 md:pb-16 md:pt-24">
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> {t("pages.insights.backToList")}
              </Link>
              <span className="mt-8 block text-xs font-mono uppercase tracking-wider text-white/60">
                {t("pages.insights.article")}
              </span>
              <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {article.title}
              </h1>
              <div className="mt-5 flex items-center gap-3 text-sm text-white/60">
                {article.date && <span>{formatArticleDate(article.date, locale)}</span>}
                {article.date && <span aria-hidden>·</span>}
                <span>{t("pages.insights.readingTime", { minutes: article.readingMinutes })}</span>
              </div>
            </div>
          </header>

          {article.cover && (
            <div className="mx-auto -mt-8 w-full max-w-4xl px-6">
              <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <img
                  src={article.cover}
                  alt=""
                  aria-hidden
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />

            <div className="mt-14 border-t border-border pt-8">
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> {t("pages.insights.backToList")}
              </Link>
            </div>
          </div>
        </article>
      )}
    </PageShell>
  );
}

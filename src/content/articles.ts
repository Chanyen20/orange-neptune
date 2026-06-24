/*
 * Build-time article loader.
 *
 * Articles live as Markdown files under content/articles/<locale>/<slug>.md and
 * are bundled at build time via Vite's import.meta.glob — no database and no
 * runtime fetch, so visitors only ever download static HTML. The CMS (Sveltia)
 * writes these same files back to the repo; a push then rebuilds the site.
 */
import { marked } from "marked";
import { parse as parseYaml } from "yaml";

import { type AppLocale, DEFAULT_LOCALE, SUPPORTED_LOCALES, isAppLocale } from "@/i18n/config";

export type Article = {
  slug: string;
  locale: AppLocale;
  title: string;
  description: string;
  date: string;
  cover?: string;
  bodyHtml: string;
  readingMinutes: number;
};

type ParsedArticle = Article & { draft: boolean };

const rawFiles = import.meta.glob("../../content/articles/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

marked.setOptions({ gfm: true, breaks: false });

function splitFrontmatter(src: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(src);
  if (!match) return { data: {}, body: src };
  const data = (parseYaml(match[1]) as Record<string, unknown>) ?? {};
  return { data, body: match[2] };
}

function parseFile(path: string, src: string): ParsedArticle | null {
  const m = /\/content\/articles\/([^/]+)\/([^/]+)\.md$/.exec(path);
  if (!m) return null;
  const [, locale, slug] = m;
  if (!isAppLocale(locale)) return null;

  const { data, body } = splitFrontmatter(src);
  const words = body.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: data.date ? String(data.date) : "",
    cover: data.cover ? String(data.cover) : undefined,
    bodyHtml: marked.parse(body) as string,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    draft: data.draft === true,
  };
}

const byLocale: Record<AppLocale, Map<string, ParsedArticle>> = {
  en: new Map(),
  "zh-CN": new Map(),
};

for (const [path, src] of Object.entries(rawFiles)) {
  const parsed = parseFile(path, src);
  if (!parsed || parsed.draft) continue;
  byLocale[parsed.locale].set(parsed.slug, parsed);
}

/** Resolve an article in the requested locale, falling back to the default locale. */
function resolve(locale: AppLocale, slug: string): ParsedArticle | undefined {
  return byLocale[locale].get(slug) ?? byLocale[DEFAULT_LOCALE].get(slug);
}

function allSlugs(): string[] {
  const slugs = new Set<string>();
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of byLocale[locale].keys()) slugs.add(slug);
  }
  return [...slugs];
}

/** Published articles for a locale, newest first. */
export function getArticles(locale: AppLocale): Article[] {
  return allSlugs()
    .map((slug) => resolve(locale, slug))
    .filter((a): a is ParsedArticle => Boolean(a))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getArticle(locale: AppLocale, slug: string): Article | undefined {
  return resolve(locale, slug);
}

/**
 * Neighbours of an article in the newest-first list:
 * `prev` is the newer article (above it), `next` is the older one (below it).
 */
export function getAdjacentArticles(
  locale: AppLocale,
  slug: string,
): { prev?: Article; next?: Article } {
  const list = getArticles(locale);
  const i = list.findIndex((a) => a.slug === slug);
  if (i === -1) return {};
  return { prev: list[i - 1], next: list[i + 1] };
}

/** Every slug that should be prerendered (union across locales). */
export function getArticleSlugs(): string[] {
  return allSlugs();
}

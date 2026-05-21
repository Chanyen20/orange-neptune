import { i18n } from "./index";

export type PageMetaKey =
  | "default"
  | "home"
  | "capabilities"
  | "traffic"
  | "results"
  | "insights"
  | "company";

const PATH_META: Record<string, PageMetaKey> = {
  "/": "home",
  "/capabilities": "capabilities",
  "/traffic": "traffic",
  "/results": "results",
  "/insights": "insights",
  "/company": "company",
};

export function pathnameToMetaKey(pathname: string): PageMetaKey {
  return PATH_META[pathname] ?? "default";
}

export function buildPageHead(key: PageMetaKey) {
  const t = i18n.getFixedT(i18n.language);
  const prefix = `meta.${key}`;

  return {
    meta: [
      { title: t(`${prefix}.title`) },
      { name: "description", content: t(`${prefix}.description`) },
      { property: "og:title", content: t(`${prefix}.ogTitle`) },
      { property: "og:description", content: t(`${prefix}.ogDescription`) },
    ],
  };
}

export function applyDocumentHead(key: PageMetaKey) {
  if (typeof document === "undefined") return;

  const t = i18n.getFixedT(i18n.language);
  const prefix = `meta.${key}`;

  document.title = t(`${prefix}.title`);

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute("content", content);
  };

  setMeta('meta[name="description"]', t(`${prefix}.description`));
  setMeta('meta[property="og:title"]', t(`${prefix}.ogTitle`));
  setMeta('meta[property="og:description"]', t(`${prefix}.ogDescription`));
}

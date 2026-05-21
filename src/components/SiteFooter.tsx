import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-sm font-bold">O</span>
            <span className="text-base font-semibold">{t("brand.name")}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t("footer.tagline")}</p>
        </div>
        <FooterCol
          title={t("footer.capabilities")}
          links={[
            [t("footer.links.consumerPositioning"), "/capabilities"],
            [t("footer.links.amazonAdvertising"), "/capabilities"],
            [t("footer.links.walmartAdvertising"), "/capabilities"],
            [t("footer.links.fulfillmentSolutions"), "/capabilities"],
          ]}
        />
        <FooterCol
          title={t("footer.explore")}
          links={[
            [t("footer.links.traffic"), "/traffic"],
            [t("footer.links.results"), "/results"],
            [t("footer.links.insights"), "/insights"],
          ]}
        />
        <FooterCol
          title={t("footer.company")}
          links={[
            [t("footer.links.about"), "/company"],
            [t("footer.links.team"), "/company"],
            [t("footer.links.principles"), "/company"],
            [t("footer.links.contact"), "/company"],
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-muted-foreground flex flex-col gap-2 sm:flex-row sm:justify-between">
          <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
          <span>{t("footer.badge")}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-muted-foreground hover:text-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

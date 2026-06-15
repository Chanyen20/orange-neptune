import { Link } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { type AppLocale, localeOptions } from "@/i18n/config";
import { getCurrentLocale, setAppLocale } from "@/i18n";
import { NAV_ITEMS, type NavItemId, type NavSubItemId } from "@/lib/nav-config";

export function SiteHeader() {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locale = getCurrentLocale();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setShowLangMenu(false);
  };

  const selectLocale = async (value: AppLocale) => {
    await setAppLocale(value);
    setShowLangMenu(false);
  };

  const navLabel = (id: NavItemId) => t(`nav.${id}.label`);
  const navIntro = (id: NavItemId) => t(`nav.${id}.intro`);
  const subLabel = (navId: NavItemId, itemId: NavSubItemId) => t(`nav.${navId}.items.${itemId}.label`);
  const subDesc = (navId: NavItemId, itemId: NavSubItemId) => t(`nav.${navId}.items.${itemId}.desc`);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-background border-b border-border">
        <div className="flex h-13 w-full items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex w-fit shrink-0 items-center">
            <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-sm font-bold">O</span>
              <span className="text-lg font-semibold tracking-tight text-foreground">{t("brand.name")}</span>
            </Link>
          </div>

          <div className="flex w-fit shrink-0 items-center gap-2">
            <div className="relative hidden lg:block">
              <button
                type="button"
                aria-label={t("header.selectLanguage")}
                aria-expanded={showLangMenu}
                onClick={() => {
                  setShowLangMenu((open) => !open);
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
              >
                <Globe className="h-5 w-5" />
              </button>
              {showLangMenu && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[60] mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-border bg-background py-1 shadow-lg"
                >
                  {localeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="menuitem"
                      onClick={() => selectLocale(option.value)}
                      className={
                        "flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent " +
                        (locale === option.value ? "font-medium text-foreground" : "text-muted-foreground")
                      }
                    >
                      {t(option.labelKey)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? t("header.closeMenu") : t("header.openMenu")}
              aria-expanded={isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((open) => !open);
                setShowLangMenu(false);
                setOpenIdx(null);
              }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link
              to="/contact"
              className="hidden h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 lg:inline-flex"
            >
              {t("header.scheduleConsultation")}
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label={t("header.closeMenuOverlay")}
            className="fixed inset-0 top-13 z-40 bg-foreground/20 lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed inset-x-0 top-13 bottom-0 z-50 flex flex-col overflow-y-auto bg-background lg:hidden">
            <nav className="flex flex-1 flex-col px-6 py-8">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((n) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      onClick={closeMobileMenu}
                      className="flex h-14 items-center border-b border-border text-lg font-medium text-foreground transition-colors hover:text-primary"
                      activeProps={{ className: "flex h-14 items-center border-b border-border text-lg font-medium text-primary" }}
                    >
                      {navLabel(n.id)}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <p className="flex items-center gap-2 px-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  {t("header.selectLanguage")}
                </p>
                <div className="mt-2 flex flex-col gap-1">
                  {localeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        void selectLocale(option.value);
                        closeMobileMenu();
                      }}
                      className={
                        "flex h-11 w-full items-center rounded-lg px-3 text-left text-base transition-colors hover:bg-accent " +
                        (locale === option.value ? "font-medium text-foreground" : "text-muted-foreground")
                      }
                    >
                      {t(option.labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-4 text-base font-medium text-primary-foreground hover:opacity-90"
              >
                {t("header.scheduleConsultation")}
              </Link>
            </nav>
          </div>
        </>
      )}

      <div
        className="relative hidden w-full bg-nav text-nav-foreground lg:block"
        onMouseLeave={() => setOpenIdx(null)}
      >
        <nav className="w-full">
          <ul className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 overflow-x-auto">
            {NAV_ITEMS.map((n, i) => (
              <li key={n.to} onMouseEnter={() => setOpenIdx(i)} onFocus={() => setOpenIdx(i)}>
                <Link
                  to={n.to}
                  className={
                    "relative inline-flex h-12 items-center gap-1 px-5 text-base font-medium transition-colors " +
                    (openIdx === i
                      ? "text-nav-foreground"
                      : "text-nav-foreground/90 hover:text-nav-foreground")
                  }
                  activeProps={{ className: "relative inline-flex h-12 items-center gap-1 px-5 text-base font-medium text-nav-foreground" }}
                >
                  <span>{navLabel(n.id)}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3.5 w-3.5 opacity-80"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                  <span
                    className={`absolute bottom-0 left-0 h-[5px] bg-primary transition-[width] duration-200 ease-out ${openIdx === i ? "w-full" : "w-0"}`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={
            "absolute left-0 right-0 top-full overflow-hidden bg-background text-foreground border-b border-border shadow-lg transition-[max-height,opacity] duration-200 ease-out " +
            (openIdx !== null ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0 pointer-events-none")
          }
        >
          {openIdx !== null && (
            <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-6 py-10">
              <div className="col-span-12 md:col-span-4">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {navLabel(NAV_ITEMS[openIdx].id)}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-snug text-foreground">
                  {navIntro(NAV_ITEMS[openIdx].id)}
                </h3>
                <Link
                  to={NAV_ITEMS[openIdx].to}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80"
                >
                  {t("header.explore", { label: navLabel(NAV_ITEMS[openIdx].id) })}
                </Link>
              </div>
              <ul className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                {NAV_ITEMS[openIdx].items.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.to}
                      className="group block rounded-lg px-3 py-3 hover:bg-accent transition-colors"
                    >
                      <div className="text-sm font-semibold text-foreground group-hover:text-primary">
                        {subLabel(NAV_ITEMS[openIdx].id, item.id)}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {subDesc(NAV_ITEMS[openIdx].id, item.id)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";

import { DEFAULT_LOCALE, isAppLocale, localeToHtmlLang } from "./config";
import { DocumentHeadSync } from "./DocumentHeadSync";
import { i18n } from "./index";

type I18nProviderProps = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    const syncHtmlLang = (lng: string) => {
      const locale = isAppLocale(lng) ? lng : DEFAULT_LOCALE;
      document.documentElement.lang = localeToHtmlLang(locale);
    };

    syncHtmlLang(i18n.language);
    i18n.on("languageChanged", syncHtmlLang);
    return () => {
      i18n.off("languageChanged", syncHtmlLang);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <DocumentHeadSync />
      {children}
    </I18nextProvider>
  );
}

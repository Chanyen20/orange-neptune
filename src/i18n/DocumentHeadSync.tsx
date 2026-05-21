import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { applyDocumentHead, pathnameToMetaKey } from "./head";

export function DocumentHeadSync() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { i18n } = useTranslation();

  useEffect(() => {
    applyDocumentHead(pathnameToMetaKey(pathname));
  }, [pathname, i18n.language]);

  return null;
}

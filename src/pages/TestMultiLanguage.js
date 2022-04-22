import React, { Suspense } from "react";
import { useTranslation, Trans } from "react-i18next";

function Page() {
  const { t } = useTranslation("other/ns");

  return (
      <div className="App-intro">
        <br />
        <Trans i18nKey="welcome">trans</Trans>
        <br />
        <br />
        <span>{t("interpolation.example", { what: "< 5" })}</span>
      </div>
  );
}

export default function TestMultiLanguage2() {
  return (
    <Suspense fallback="loading...">
      <Page />
    </Suspense>
  );
}

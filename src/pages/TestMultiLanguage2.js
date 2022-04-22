import React, { Suspense } from "react";
import { useTranslation, Trans } from "react-i18next";

function Page() {
  const { t, i18n } = useTranslation("other/ns");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>{t("Welcome to React")}</h2>
        <button onClick={() => changeLanguage("de")}>de</button>
        <button onClick={() => changeLanguage("en")}>en</button>
      </div>
      <div className="App-intro">
        <Trans>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Trans>
        <br />
        <br />
        <Trans i18nKey="welcome">trans</Trans>
        <br />
        <br />
        <span>{t("interpolation.example", { what: "< 5" })}</span>
      </div>
      <div style={{ marginTop: 40 }}>
        Learn more:&nbsp;
        <a href="https://react.i18next.com">https://react.i18next.js</a>
      </div>
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

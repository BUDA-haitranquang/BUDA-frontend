import React from "react";
import { useTranslation } from "react-i18next";
import { changeLanguageHandler } from "../translation/i18n";

const TestMultiLanguage = () => {
  const { t } = useTranslation();

  return (
    <div className="col-md-6">
      <div className="card p-2">
        <div className="card-body">
          <h5 class="card-title">{t("content.functional")}</h5>
          <button onClick={() => changeLanguageHandler("en")}>
            Change to ENG
          </button>
          <button onClick={() => changeLanguageHandler("vi")}>
            Change to VI
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestMultiLanguage;

import React from "react";
import { useTranslation } from "react-i18next";

const TestMultiLanguage2 = () => {
  const { t } = useTranslation(["common"]);
  return (
    <div className="col-md-6">
      <div className="card p-2">
        <div className="card-body">
          <h5 class="card-title">{t("content.class")}</h5>
          <h5 class="card-title">{t("common:error")}</h5>
        </div>
      </div>
    </div>
  );
};

export default TestMultiLanguage2;

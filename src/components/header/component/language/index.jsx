import { Tooltip } from "antd";
import iconImg from "assets";
import { ImageCustom } from "components";
import { t } from "i18next";
import React, { useState } from "react";
import i18n from "translation/i18n";

export const LanguageProject = () => {
  const [currentLocale, setCurrentLocale] = useState(
    sessionStorage.getItem("currentLocale") || "vi"
  );

  return (
    <Tooltip title={t("Click to change language")}>
      <div
        className="cursor-pointer"
        onClick={() => {
          let newLocale = currentLocale === "vi" ? "en" : "vi";
          setCurrentLocale(newLocale);
          i18n.changeLanguage(currentLocale === "vi" ? "en" : "vi");
          sessionStorage.setItem("currentLocale", newLocale);
        }}
      >
        <ImageCustom
          src={currentLocale === "vi" ? iconImg.flagVn : iconImg.flagUs}
          width="35px"
        />
      </div>
    </Tooltip>
  );
};

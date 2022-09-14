import { Tooltip } from "antd";
import iconImg from "assets";
import { ImageCustom } from "components";
import { t } from "i18next";
import React, { useState } from "react";
import i18n from "translation/i18n";

export const LanguageProject = () => {
  const [currentLocale, setCurrentLocale] = useState(
    sessionStorage.getItem("currentLocale") || "vi-VN"
  );

  return (
    <Tooltip title={t("Click to change language")}>
      <div
        className="cursor-pointer"
        onClick={() => {
          let newLocale = currentLocale === "vi-VN" ? "en-US" : "vi-VN";
          setCurrentLocale(newLocale);
          i18n.changeLanguage(currentLocale === "vi-VN" ? "en-US" : "vi-VN");
          sessionStorage.setItem("currentLocale", newLocale);
        }}
      >
        <ImageCustom
          data-aos="fade-right"
          src={currentLocale === "vi-VN" ? iconImg.flagVn : iconImg.flagUs}
          width="25px"
        />
      </div>
    </Tooltip>
  );
};

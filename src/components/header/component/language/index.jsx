import { Tooltip } from "antd";
import iconImg from "assets";
import { ImageCustom } from "components";
import { UserContext } from "contexts";
import { t } from "i18next";
import React, { useContext, useState } from "react";
import i18n from "translation/i18n";

export const LanguageProject = () => {
  const stateContext = useContext(UserContext);
  const { globalLocale, setGlobalLocale } = stateContext;

  return (
    <Tooltip title={t("Click to change language")}>
      <div
        className="flex cursor-pointer"
        onClick={() => {
          let newLocale = globalLocale === "vi-VN" ? "en-US" : "vi-VN";
          setGlobalLocale(newLocale);
          i18n.changeLanguage(globalLocale === "vi-VN" ? "en-US" : "vi-VN");
          sessionStorage.setItem("currentLocale", newLocale);
        }}
      >
        <div className="cursor-pointer flex">
          <ImageCustom
            src={globalLocale === "vi-VN" ? iconImg.flagVn : iconImg.flagUs}
            width="25px"
          />
        </div>
        <p className="text-[18px] ml-2 text-white">
          {globalLocale === "vi-VN" ? "Tiếng Việt" : "English"}
        </p>
      </div>
    </Tooltip>
  );
};

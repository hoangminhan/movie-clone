import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import iconImg from "assets";
import { ImageCustom } from "components";
import { UserContext } from "contexts";

import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import i18n from "translation/i18n";
import { NotificationFCM } from "..";

export const LanguageProject = () => {
  const stateContext = useContext(UserContext);
  const { localeGlobal } = stateContext;
  const [globalLocale, setGlobalLocale] = localeGlobal;
  const [t] = useTranslation();
  const isLogin = localStorage.getItem("accessToken");

  return (
    <div className="flex items-center gap-x-2">
      {Boolean(isLogin) && (
        <NotificationFCM>
          <Tooltip title={t("Notification")}>
            <p className="w-[24px] h-[24px] p-5 flex justify-center items-center rounded-full hover:bg-[#8a8888] cursor-pointer">
              <FontAwesomeIcon icon={faBell} className="" />
            </p>
          </Tooltip>
        </NotificationFCM>
      )}

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
          <p className="text-[16px] ml-2 text-white">
            {globalLocale === "vi-VN" ? "Viet Nam" : "English"}
          </p>
        </div>
      </Tooltip>
    </div>
  );
};

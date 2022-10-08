import { Menu } from "components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { LanguageProject, Profile, TabHeader } from "./component";

export const Header = ({ page }) => {
  const [t] = useTranslation();
  const location = useLocation();
  const { pathname } = location;
  const handleContentHeader = (page) => {
    switch (page) {
      case "keyword":
        return t("Keyword");
      case "discovery":
        return <p>{t("FIND FILMS THAT BEST FIT YOU")}</p>;
      case "genres":
        return t("Genres");
      case "movie":
        return "Detail movie";
      case "Cast":
        return t("Actor Info");
      case "Search":
        return t("Search");
      case "Favorite":
        return t("My Favorite");
      case "Account Settings":
        return t("Account Settings");
      default:
        return <Menu />;
    }
  };
  return (
    <header className="flex justify-between items-center h-[80px]  before:absolute before:h-[1px] before:w-[100%] before:left-[0px] before:right-[0px] before:top-[80px] before:bg-[#4f4e4e] text-white">
      {handleContentHeader(page)}

      <div className="flex justify-end items-center gap-[20px] basis-3/5">
        <LanguageProject />
        <Profile />
      </div>
    </header>
  );
};

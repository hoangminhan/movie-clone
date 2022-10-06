import { Menu } from "components";
import React from "react";
import { useLocation } from "react-router-dom";
import { LanguageProject, Profile, TabHeader } from "./component";

export const Header = ({ page }) => {
  const location = useLocation();
  const { pathname } = location;
  const handleContentHeader = (page) => {
    switch (page) {
      case "keyword":
        return "Keyword";
      case "discovery":
        return <p>FIND FILMS THAT BEST FIT YOU</p>;
      case "genres":
        return "Genres";
      case "movie":
        return "Detail movie";
      case "Cast":
        return "Information Cast";
      case "Search":
        return "Search";
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

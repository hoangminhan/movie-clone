import { Menu } from "components";
import React from "react";
import { useLocation } from "react-router-dom";
import { LanguageProject, Profile, TabHeader } from "./component";

export const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <header className="flex justify-between items-center h-[80px]  before:absolute before:h-[1px] before:w-[100%] before:left-[0px] before:right-[0px] before:top-[80px] before:bg-[#4f4e4e]">
      {pathname === "/discovery" ? (
        <p>FIND FILMS THAT BEST FIT YOU</p>
      ) : (
        <Menu />
      )}

      <div className="flex justify-end items-center gap-[20px] basis-4/5">
        <LanguageProject />
        <Profile />
      </div>
    </header>
  );
};

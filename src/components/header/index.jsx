import { Menu } from "components";
import React from "react";
import i18n from "translation/i18n";
import { LanguageProject, Notification, Profile } from "./component";

export const Header = () => {
  return (
    <header className="flex justify-between items-center h-[80px]  before:absolute before:h-[1px] before:w-[100%] before:left-[0px] before:right-[0px] before:top-[80px] before:bg-[#4f4e4e]">
      <Menu />

      <div className="flex justify-end items-center gap-[20px] basis-4/5">
        <LanguageProject />
        <Profile />
      </div>
    </header>
  );
};

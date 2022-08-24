import { Menu } from "components";
import React from "react";

import { Notification, Profile } from "./component";

export const Header = () => {
  return (
    <header className="flex justify-between items-center h-[80px]  before:absolute before:h-[1px] before:w-[100%] before:left-[0px] before:right-[0px] before:top-[80px] before:bg-[#ccc]">
      <Menu />
      <div className="flex justify-end items-center gap-[20px] basis-4/5">
        <Notification />
        <Profile />
      </div>
    </header>
  );
};

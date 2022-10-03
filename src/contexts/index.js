import React, { useState } from "react";

export const UserContext = React.createContext({});
export const UserProviderContext = ({ children }) => {
  const [globalLocale, setGlobalLocale] = useState(
    sessionStorage.getItem("currentLocale") || "vi-VN"
  );
  const [tabGlobal, setTabGlobal] = useState(
    sessionStorage.getItem("currentTab") || "/"
  );
  const stateContext = {
    localeGlobal: [globalLocale, setGlobalLocale],
    currentTabGlobal: [tabGlobal, setTabGlobal],
  };

  return (
    <UserContext.Provider value={stateContext}>{children}</UserContext.Provider>
  );
};

import React, { useState } from "react";

export const UserContext = React.createContext({});
export const UserProviderContext = ({ children }) => {
  const [globalLocale, setGlobalLocale] = useState(
    sessionStorage.getItem("currentLocale") || "vi-VN"
  );
  const [tabGlobal, setTabGlobal] = useState(
    sessionStorage.getItem("currentTab") || "/"
  );
  const [dataUser, setDataUser] = useState({});
  const stateContext = {
    localeGlobal: [globalLocale, setGlobalLocale],
    currentTabGlobal: [tabGlobal, setTabGlobal],
    currentDataUser: [dataUser, setDataUser],
  };

  return (
    <UserContext.Provider value={stateContext}>{children}</UserContext.Provider>
  );
};

import React, { useState } from "react";

export const UserContext = React.createContext({});
export const UserProviderContext = ({ children }) => {
  const [globalLocale, setGlobalLocale] = useState(
    sessionStorage.getItem("currentLocale") || "vi-VN"
  );
  const stateContext = {
    globalLocale,
    setGlobalLocale,
  };

  return (
    <UserContext.Provider value={stateContext}>{children}</UserContext.Provider>
  );
};

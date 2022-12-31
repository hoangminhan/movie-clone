import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = React.createContext({});
export const UserProviderContext = ({ children }) => {
  const [globalLocale, setGlobalLocale] = useState(
    sessionStorage.getItem("currentLocale") || "vi-VN"
  );
  const [tabGlobal, setTabGlobal] = useState(
    sessionStorage.getItem("currentTab") || "/"
  );
  const [dataUser, setDataUser] = useState({});
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);
  const stateContext = {
    localeGlobal: [globalLocale, setGlobalLocale],
    currentTabGlobal: [tabGlobal, setTabGlobal],
    currentDataUser: [dataUser, setDataUser],
    changeAvatar: [isChangeAvatar, setIsChangeAvatar],
  };

  useEffect(() => {
    const handleGetDataUser = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setDataUser(user);
          // ...
        } else {
        }
      });
    };
    handleGetDataUser();
  }, [isChangeAvatar]);

  return (
    <UserContext.Provider value={stateContext}>{children}</UserContext.Provider>
  );
};

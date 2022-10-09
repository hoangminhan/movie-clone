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
  const stateContext = {
    localeGlobal: [globalLocale, setGlobalLocale],
    currentTabGlobal: [tabGlobal, setTabGlobal],
    currentDataUser: [dataUser, setDataUser],
  };

  useEffect(() => {
    const handleGetDataUser = async () => {
      console.log("context");
      const auth = getAuth();
      console.log(auth);
      console.log(auth.currentUser);
      const user = auth.currentUser;
      setDataUser({ ...user });
      // onAuthStateChanged(auth, (user) => {
      //   if (user) {
      //     console.log(user);
      //     setDataUser(user);
      //     // ...
      //   } else {
      //   }
      // });
    };
    handleGetDataUser();
  }, []);
  console.log({ dataUser });

  return (
    <UserContext.Provider value={stateContext}>{children}</UserContext.Provider>
  );
};

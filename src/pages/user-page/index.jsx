import { Col, Row } from "antd";
import { UserContext } from "contexts";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useLayoutEffect } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const UserPage = () => {
  const stateContext = useContext(UserContext);
  const { currentDataUser } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const [t] = useTranslation();

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      try {
        const authentication = getAuth();

        onAuthStateChanged(authentication, (user) => {
          if (user) {
            setDataUser(user);
            // ...
          } else {
          }
        });
      } catch (error) {}
    };
    getUserInfo();
  }, []);
  return (
    <div className="min-h-[100vh]">
      <Row className="mt-7 text-[20px]">
        <Col span={12}>
          <div>
            <p className="text-[20px]">{t("User Information")}</p>
            <p className="text-[16px] text-[#989898]">
              {t("Here you can edit public information about yourself")}.
            </p>
            <p className="text-[16px] text-[#989898]">
              {t(
                "If you signed in with Google or Facebook, you can't change your email and password"
              )}
              .
            </p>
          </div>
          {/* email */}
          <div className="mt-7">
            <p>Email</p>
            <p className="text-[16px] text-[#989898]">{dataUser?.email}</p>
          </div>
          <div className="mt-4">
            <p>Name</p>
            <p className="text-[16px] text-[#989898] capitalize">
              {dataUser?.displayName
                ? dataUser?.displayName
                : dataUser?.email?.replace("@gmail.com", "")}
            </p>
          </div>
        </Col>
        <Col span={12}>
          <div>
            <p>{t("Profile photo")}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserPage;

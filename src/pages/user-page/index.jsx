import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import { UserContext } from "contexts";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useTitle } from "hooks";
import React, { useEffect, useLayoutEffect } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const UserPage = () => {
  const stateContext = useContext(UserContext);
  const { currentDataUser } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const [t] = useTranslation();
  const { handleChangeTitle } = useTitle();
  useEffect(() => {
    handleChangeTitle(t("Profile"));
  }, []);

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      try {
        const authentication = getAuth();

        onAuthStateChanged(authentication, (user) => {
          if (user) {
            setDataUser(user);
            // ...
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);
  console.log({ dataUser });
  return (
    <div className="min-h-[100vh]">
      <Row className="mt-7 text-[20px]">
        <Col span={16}>
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
        <Col span={8}>
          <p>{t("Profile photo")}</p>
          <div className="mt-3 flex justify-center items-center flex-col">
            <img
              src={dataUser.photoURL}
              alt=""
              className="w-[250px] h-[250px] object-cover rounded-full"
            />
            {/* upload new photo */}
            <div className="flex items-center gap-x-2 bg-[#333335] px-10 py-3 mt-5 rounded-full cursor-pointer hover:scale-105 transition-all duration-150 ease-linear">
              <FontAwesomeIcon
                icon={faUpload}
                beat
                className="text-primary text-[16px]"
              />
              <p className="text-[16px]">{t("Upload new photo")}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserPage;

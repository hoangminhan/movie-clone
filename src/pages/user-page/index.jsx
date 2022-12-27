import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faUpload, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Empty, Form, Modal, Popconfirm, Row } from "antd";
import { UserContext } from "contexts";
import {
  deleteUser,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
} from "firebase/auth";
import { useNotification, useTitle } from "hooks";
import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UserPage = () => {
  const stateContext = useContext(UserContext);
  const { currentDataUser } = stateContext;
  console.log({ currentDataUser });
  const [dataUser] = currentDataUser;
  const [t] = useTranslation();
  const { handlePopupNotification } = useNotification();
  const { handleChangeTitle } = useTitle();
  const navigate = useNavigate();

  console.log({ dataUser });

  // verify email
  const handleVerifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser).then((data) => {
      // Email verification sent!
      handlePopupNotification(
        `Verification email has been sent to`,
        "success",
        dataUser.email
      );

      // ...
    });
  };

  useEffect(() => {
    handleChangeTitle(t("Profile"));
  }, []);

  // useLayoutEffect(() => {
  //   const getUserInfo = async () => {
  //     try {
  //       const authentication = getAuth();
  //       console.log({ authentication });
  //       const userData = authentication.currentUser;
  //       console.log({ userData });

  //       onAuthStateChanged(authentication, (user) => {
  //         console.log({ user });
  //         if (user) {
  //           setDataUser(user);
  //           // ...
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUserInfo();
  // }, []);
  const [isShowModalPassword, setIsShowModalPassword] = useState(false);
  const handleConfirmDeleteAccount = (event) => {
    console.log("d");
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    setIsShowModalPassword(true);
    // const credential = promptForCredentials();
    // deleteUser(user)
    //   .then(() => {
    //     console.log("delete");
    //     // User deleted.
    //     handlePopupNotification(`Delete account success`, "success");
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("refreshToken");
    //     localStorage.removeItem("userInfo");
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     // An error ocurred
    //     console.log(error);
    //     // ...
    //   });
  };
  const [dataPassword, setDataPassword] = useState("");
  const handleCancelDeleteAccount = (event) => {
    console.log({ event });
  };
  const handleFinishSuccess = (values) => {
    console.log({ dataPassword });
    const auth = getAuth();
    const user = auth.currentUser;
    console.log({ user });
    reauthenticateWithCredential(user, {
      email: user.email,
      password: dataPassword,
    })
      .then(() => {
        // User re-authenticated.
        console.log("yes");
      })
      .catch((error) => {
        // An error ocurred
        console.log("no", error);
        // ...
      });
    console.log(values);
  };
  const handleFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };
  return (
    <div className="min-h-[100vh]">
      <Modal
        footer={null}
        visible={isShowModalPassword}
        wrapClassName="modal-config"
        closable={false}
        // style={{ top: "50%", transform: "translateY(-50%)" }}
        centered
        onCancel={() => {
          setIsShowModalPassword(false);
        }}
      >
        <div>
          <p className="text-[18px] mb-4 text-center">
            {t("Enter your password")}
          </p>
          <Form
            name="verify-password"
            onFinish={handleFinishSuccess}
            onFinishFailed={handleFinishFailed}
          >
            <Form.Item name="password">
              {" "}
              <input
                type="text"
                name="password"
                placeholder={t("Enter your password")}
                className="w-full border-none outline-none px-4 py-2 rounded-full"
                onChange={(event) => {
                  setDataPassword(event.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <div className="text-center flex justify-center">
                <button
                  htmlType="submit"
                  className="text-[16px] cursor-pointer w-fit px-4 py-1 bg-primarybg flex justify-center items-center rounded-lg text-[#fff]"
                >
                  {t("Continue")}
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Row className="mt-7 text-[20px] flex-wrap-reverse" gutter={[12, 32]}>
        <Col xs={24} lg={16} className="relative">
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
          {/* name */}
          <div className="mt-4">
            <p>{t("Name")}</p>
            <p className="text-[16px] text-[#989898] capitalize">
              {dataUser?.displayName
                ? dataUser?.displayName
                : dataUser?.email?.replace("@gmail.com", "")}
            </p>
          </div>
          {/* email */}
          <div className="mt-4 flex">
            <div>
              <p>Email</p>
              <div className="text-[16px] flex">
                <p className="text-[#989898]">{dataUser?.email}</p>

                {/* verify email */}
                {dataUser?.emailVerified ? (
                  <p
                    className="w-fit cursor-pointer text-[14px] ml-8 underline text-yellow-500"
                    onClick={() => {
                      handleVerifyEmail();
                    }}
                  >
                    {t("Send me verification email")}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* delete button */}
          <div className="absolute bottom-0 left-[50%] -translate-x-1/2">
            <Popconfirm
              title="Are you sure to delete this account?"
              onConfirm={handleConfirmDeleteAccount}
              onCancel={handleCancelDeleteAccount}
              okText="Yes"
              okType="default"
              cancelText="No"
            >
              <div className="flex items-center justify-center gap-x-1 w-[180px] py-1 rounded-full bg-[#333335] hover:scale-105 duration-150 transition-all ease-linear cursor-pointer">
                <FontAwesomeIcon
                  icon={faUserSlash}
                  className="text-[16px] text-red-500"
                />
                <p className="text-[16px] text-red-500">
                  {t("Delete account")}
                </p>
              </div>
            </Popconfirm>
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <p>{t("Profile photo")}</p>
          <div className="mt-3 flex justify-center items-center flex-col">
            {dataUser?.photoURL ? (
              <img
                src={dataUser?.photoURL}
                alt=""
                className="w-[250px] h-[250px] object-cover rounded-full"
              />
            ) : (
              <Empty />
            )}

            {/* upload new photo */}
            <div className="flex items-center justify-center gap-x-2 bg-[#333335] w-[230px] py-2 mt-5 rounded-full cursor-pointer hover:scale-105 transition-all duration-150 ease-linear">
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

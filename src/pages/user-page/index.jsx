import {
  faEdit,
  faEye,
  faEyeSlash,
  faPaperPlane,
  faUpload,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Empty, Form, Modal, Popconfirm, Row, Spin } from "antd";
import { UserContext } from "contexts";
import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNotification, useTitle } from "hooks";
import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ReactLoading from "react-loading";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { AiOutlineSend, AiOutlineEdit } from "react-icons/ai";

const UserPage = () => {
  const stateContext = useContext(UserContext);
  const { currentDataUser } = stateContext;
  const [dataUser] = currentDataUser;
  const [t] = useTranslation();
  const { handlePopupNotification } = useNotification();
  const { handleChangeTitle } = useTitle();
  const navigate = useNavigate();
  // Create a ref to store the timeout
  const timeoutRef = useRef();
  const [isLoadingContinue, setIsLoadingContinue] = useState(false);

  const [isShowModalPassword, setIsShowModalPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [dataPassword, setDataPassword] = useState("");

  const [form] = Form.useForm();

  // edit user name
  const [isEditUserName, setIsEditUserName] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const userRef = useRef(null);

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

  const handleConfirmDeleteAccount = (event) => {
    setIsShowModalPassword(true);
  };
  const handleCancelDeleteAccount = (event) => {
    console.log({ event });
  };
  //
  const handleFinishSuccess = async (values) => {
    setIsLoadingContinue(true);

    const auth = getAuth();
    const user = auth.currentUser;

    // get credential
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      dataPassword
    );
    try {
      const reAuthen = await reauthenticateWithCredential(user, credential);
      deleteUser(user);
      // clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
      navigate("/");
      handlePopupNotification("Delete account success", "success");
    } catch (error) {
      handlePopupNotification("Please check the Password", "error");
    } finally {
      setIsLoadingContinue(false);
    }
  };

  const handleFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  // input debounce
  const handleInputPassword = (event) => {
    const { value } = event.target;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setDataPassword(value), 1000);
  };

  // handle update info user
  const handleUpdateInfoUser = async (newUserName) => {
    const auth = getAuth();
    try {
      await updateProfile(auth.currentUser, {
        displayName: newUserName,
      });
      handlePopupNotification("Change user name success", "success");
    } catch (error) {
      console.log(error);
      handlePopupNotification("Something went wrong", "error");
    }
  };

  // trigger when click edit icon
  const handleOpenEditUserName = () => {
    setIsEditUserName(true);
    setNameUser(
      dataUser?.displayName
        ? dataUser?.displayName
        : dataUser?.email?.replace("@gmail.com", "")
    );
    // userRef.current = ;
  };

  // trigger when click icon send
  const handleChangeUserName = async () => {
    await handleUpdateInfoUser(nameUser);
    setIsEditUserName(false);
  };

  // trigger when press enter at input user name
  const handlePressEnterInput = async (event) => {
    if (event.key === "Enter") {
      await handleUpdateInfoUser(nameUser);

      setIsEditUserName(false);
    }
  };
  // auto focus when userRef exist
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, [isEditUserName]);

  useEffect(() => {
    handleChangeTitle(t("Profile"));
  }, []);
  return (
    <div className="min-h-[100vh]">
      <Modal
        width={400}
        footer={null}
        visible={isShowModalPassword}
        wrapClassName="modal-config"
        closable={false}
        centered
        onCancel={() => {
          setIsShowModalPassword(false);
          setIsShowPassword(false);
          form.resetFields();
        }}
      >
        <div className="flex flex-col items-stretch">
          <p className="text-[18px] mb-4 text-center">
            {t("Enter your password")}
          </p>
          <Form
            form={form}
            name="verify-password"
            onFinish={handleFinishSuccess}
            onFinishFailed={handleFinishFailed}
          >
            <Form.Item name="password">
              {" "}
              <div className="relative">
                <input
                  ref={timeoutRef}
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("Enter your password")}
                  className="w-full border-none outline-none px-4 py-2 rounded-full"
                  onChange={handleInputPassword}
                />
                {/* eye icon */}
                <div
                  className="absolute right-2 top-[50%] -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    setIsShowPassword(!isShowPassword);
                  }}
                >
                  <FontAwesomeIcon icon={isShowPassword ? faEye : faEyeSlash} />
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="text-center flex justify-center">
                {isLoadingContinue ? (
                  <ReactLoading type="bubbles" color="white" height={20} />
                ) : (
                  <button
                    htmlType="submit"
                    className="text-[16px] cursor-pointer w-[120px] py-2 bg-primarybg flex justify-center items-center rounded-lg text-[#fff]"
                  >
                    {t("Continue")}
                  </button>
                )}
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Row className="mt-7 text-[20px] flex-wrap-reverse" gutter={[12, 32]}>
        <Col xs={24} lg={16} className="relative pb-[100px]">
          <div className="max-w-[800px]">
            {/* info */}
            <div>
              <p className="text-[18px]">{t("User Information")}</p>
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
              <p className="text-[18px]">{t("Name")}</p>
              <div className="flex justify-between items-center">
                {isEditUserName ? (
                  <input
                    value={nameUser}
                    ref={userRef}
                    type="text"
                    className="border-none outline-none rounded-md pl-2 text-white bg-[#333335] text-[16px] flex-1 max-w-[400px]"
                    onChange={(event) => {
                      setNameUser(event.target.value);
                    }}
                    onKeyPress={handlePressEnterInput}
                  />
                ) : (
                  <p className="text-[16px] text-[#989898] capitalize">
                    {dataUser?.displayName
                      ? dataUser?.displayName
                      : dataUser?.email?.replace("@gmail.com", "")}
                  </p>
                )}
                <p className="cursor-pointer">
                  {isEditUserName ? (
                    <AiOutlineSend
                      className="text-[24px]"
                      onClick={() => {
                        handleChangeUserName();
                      }}
                    />
                  ) : (
                    <AiOutlineEdit
                      className="text-[24px]"
                      onClick={() => {
                        handleOpenEditUserName();
                      }}
                    />
                    // <FontAwesomeIcon
                    //   icon={faPenToSquare}
                    //   className="text-[22px]"

                    // />
                  )}
                </p>
              </div>
            </div>
            {/* email */}
            <div className="mt-4">
              <div>
                <p className="text-[18px]">Email</p>
                <div className="text-[16px] flex justify-between">
                  <p className="text-[#989898]">{dataUser?.email}</p>

                  {/* verify email */}
                  {!dataUser?.emailVerified ? (
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
                title={t("Are you sure to delete this account?")}
                onConfirm={handleConfirmDeleteAccount}
                onCancel={handleCancelDeleteAccount}
                okText={t("Yes")}
                okType="default"
                cancelText={t("No")}
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
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <p className="text-[18px]">{t("Profile photo")}</p>
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

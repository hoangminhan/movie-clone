import { Form, Input, message, Spin } from "antd";
import iconImg from "assets";
import { LanguageProject } from "components/header/component";
import { UserContext } from "contexts";
import { useContext, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useNotification, useTitle } from "hooks";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { AVATAR_EMPTY } from "constant";

const StyleInput = styled(Input)`
  &.ant-input {
    border-radius: 8px;
    overflow: hidden;
    padding: 10px;
    border: none;
    font-size: 16px;
  }
  &.ant-input:hover,
  &.ant-input:focus {
    border: none;
  }
`;
const StyleInputPassword = styled(Input.Password)`
  &.ant-input-affix-wrapper {
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
    border: none;
    font-size: 16px;
  }
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border: none;
  }

  /* } */
`;

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handlePopupNotification } = useNotification();

  const [t] = useTranslation();
  const db = getFirestore();
  const onFinish = async (values) => {
    const nameCheck = values.firstName ? values.firstName : "";
    const nameUser = nameCheck.concat(
      values.firstName ? " " : "",
      values.lastname ? values.lastname : ""
    );
    setIsLoading(true);

    const { username: email, password } = values;
    const authentication = getAuth();
    try {
      const response = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );
      const { accessToken, refreshToken } = response.user;

      const data = {
        user_id: response.user.uid || "",
        url: response.user.photoURL || AVATAR_EMPTY,
        name: nameUser || values.username,
        email: response.user.email || "",
        bookmark: [],
        history: [],
        notification: [],
      };
      // addDoc(collection(db, "user", response.user.uid), data);
      setDoc(doc(db, "user", response.user.uid), data);

      setIsLoading(false);

      localStorage.setItem("accessToken", accessToken);
      handlePopupNotification("Register success", "success");

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        message.error("email already in use");
      }
      setIsLoading(false);
    }
  };

  const stateContext = useContext(UserContext);
  const { currentTabGlobal } = stateContext;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;
  const navigate = useNavigate();
  const { handleChangeTitle } = useTitle();
  useEffect(() => {
    handleChangeTitle(t("Register"));
  }, []);
  const onFinishFailed = (errorInfo) => {};
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        className="fixed object-cover left-0 h-full w-full inset-0 -z-10"
      >
        <source src={iconImg.trailerMovie} type="video/mp4" />
      </video>
      <div className="bg-black/40 h-[100vh]"></div>

      <div className="px-3 sm:px-0 absolute top-[70px] sm:top-[50%] left-0 right-0 sm:left-[50%] sm:-translate-x-1/2 sm:-translate-y-1/2 pb-8 sm:pb-0 w-full sm:max-w-[550px] sm:w-[550px] text-center leading-relaxed ">
        <p className="text-[white] text-[25px] sm:text-[30px] font-bold">
          {t("Register Account")}
        </p>

        {/* <div>
          <div className="flex justify-center gap-5 mt-3">
            <p className="w-[50px] h-[50px] bg-[#fff] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
              <img src={iconImg.googleImg} alt="" />
            </p>
            <p className="w-[50px] h-[50px] bg-[#fff] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
              <img src={iconImg.facebookImg} alt="" />
            </p>
          </div>
        </div> */}
        {/* <p className="text-center mt-5 text-white font-[300]">
          {t("Or register with email account")}
        </p> */}
        <div className="text-center mt-9">
          <Form
            layout="vertical"
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-10 justify-between">
              <Form.Item
                label={
                  <label
                    style={{
                      color: "white",
                      fontSize: "16px",
                      letterSpacing: "1px",
                    }}
                  >
                    {t("First name")}:
                  </label>
                }
                name="firstName"
                style={{ flex: "1" }}
              >
                <StyleInput placeholder={t("First name")} />
              </Form.Item>

              <Form.Item
                label={
                  <label
                    style={{
                      color: "white",
                      fontSize: "16px",
                      letterSpacing: "1px",
                    }}
                  >
                    {t("Last name")}:
                  </label>
                }
                name="lastname"
                style={{ flex: "1" }}
              >
                <StyleInput placeholder={t("Last name")} />
              </Form.Item>
            </div>

            <Form.Item
              label={
                <label
                  style={{
                    color: "white",
                    fontSize: "16px",
                    letterSpacing: "1px",
                  }}
                >
                  {t("Username")}:
                </label>
              }
              name="username"
              rules={[
                {
                  type: "email",
                  message: t("Invalid Email"),
                },
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
              style={{ flex: "1" }}
            >
              <StyleInput placeholder={t("hoangminhan@gmail.com")} />
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    color: "white",
                    fontSize: "16px",
                    letterSpacing: "1px",
                  }}
                >
                  {t("Password")}:
                </label>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
                {
                  pattern: new RegExp(
                    /(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/
                  ),
                  message:
                    "Minimum six characters, at least one letter and one number",
                },
              ]}
              style={{ flex: "1" }}
            >
              <StyleInputPassword placeholder="Password" />
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    color: "white",
                    fontSize: "16px",
                    letterSpacing: "1px",
                  }}
                >
                  {t("Confirm Password")}:
                </label>
              }
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your passowrd",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
              style={{ flex: "1" }}
            >
              <StyleInputPassword placeholder={t("Confirm Password")} />
            </Form.Item>

            <button
              disabled={isLoading ? true : false}
              type="primary"
              htmlType="submit"
              className={`bg-primarybg hover:opacity-90 text-white hover:text-[#ccc] font-bold  w-[150px] py-2 rounded-lg text-[18px] min-w-[110px] mt-4
              ${isLoading ? "cursor-not-allowed bg-[#ccc] hover:bg-[#ccc]" : ""}
              
              `}
            >
              {isLoading ? <Spin className="text-white" /> : t("Register")}
              {/* <FontAwesomeIcon icon={faRightToBracket} className="ml-1" /> */}
            </button>

            <div className="text-white text-[16px] mt-4">
              <span>{t("Already have an account")} ?</span>{" "}
              <Link to="/login">
                <span className="underline text-primarybg font-bold">
                  {t("Login")}
                </span>
              </Link>
            </div>
          </Form>
        </div>
      </div>

      {/* language */}
      <div className="absolute top-0 right-[3%] left-[3%] flex justify-between items-center">
        <div className="flex justify-center mt-2">
          <img
            src={iconImg.logoImg}
            className="rounded-full w-[50px] h-[50px] object-cover cursor-pointer"
            alt=""
            onClick={() => {
              setTabGlobal("/");
              sessionStorage.setItem("currentTab", "/");
              navigate("/");
            }}
          />
        </div>
        <LanguageProject />
      </div>
    </div>
  );
};
export default RegisterPage;

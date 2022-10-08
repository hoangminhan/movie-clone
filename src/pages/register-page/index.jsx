import { Form, Input, message } from "antd";
import iconImg from "assets";
import { LanguageProject } from "components/header/component";
import { UserContext } from "contexts";
import { useContext } from "react";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  const [t] = useTranslation();
  const onFinish = async (values) => {
    console.log(values);
    const { username: email, password } = values;
    const authentication = getAuth();
    try {
      const response = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );
      const { idToken: accessToken, refreshToken } = response;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        message.error("email already in use");
      }
    }
  };

  const stateContext = useContext(UserContext);
  const { currentTabGlobal } = stateContext;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;
  const navigate = useNavigate();

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

      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 max-w-[550px] w-[550px] text-center leading-relaxed ">
        <p className="text-[white] text-[40px] font-bold">
          {t("Register Account")}
        </p>

        <div>
          <div className="flex justify-center gap-5 mt-3">
            <p className="w-[50px] h-[50px] bg-[#fff] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
              <img src={iconImg.googleImg} alt="" />
            </p>
            <p className="w-[50px] h-[50px] bg-[#fff] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
              <img src={iconImg.facebookImg} alt="" />
            </p>
          </div>
        </div>
        <p className="text-center mt-5 text-white font-[300]">
          {t("Or register with email account")}
        </p>
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
            <div className="flex gap-10 justify-between">
              <Form.Item
                label={
                  <label
                    style={{
                      color: "white",
                      fontSize: "18px",
                      letterSpacing: "1px",
                    }}
                  >
                    {t("First name")}:
                  </label>
                }
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
                style={{ flex: "1" }}
              >
                <StyleInput placeholder={t("First name")} />
              </Form.Item>

              <Form.Item
                label={
                  <label
                    style={{
                      color: "white",
                      fontSize: "18px",
                      letterSpacing: "1px",
                    }}
                  >
                    {t("Last name")}:
                  </label>
                }
                name="lastname"
                style={{ flex: "1" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <StyleInput placeholder={t("Last name")} />
              </Form.Item>
            </div>

            <Form.Item
              label={
                <label
                  style={{
                    color: "white",
                    fontSize: "18px",
                    letterSpacing: "1px",
                  }}
                >
                  {t("Username")}:
                </label>
              }
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
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
                    fontSize: "18px",
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
                  message: "Please input your username!",
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
                    fontSize: "18px",
                    letterSpacing: "1px",
                  }}
                >
                  {t("Confirm Password")}:
                </label>
              }
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              style={{ flex: "1" }}
            >
              <StyleInputPassword placeholder={t("Confirm Password")} />
            </Form.Item>

            <button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white hover:text-[#ccc] font-bold py-3 px-5 rounded-lg text-[18px] min-w-[110px] mt-4"
            >
              {t("Register")}
              {/* <FontAwesomeIcon icon={faRightToBracket} className="ml-1" /> */}
            </button>

            <div className="text-white text-[18px] mt-4">
              <span>{t("Already have an account")} ?</span>{" "}
              <Link to="/login">
                <span className="underline text-primary font-bold">
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

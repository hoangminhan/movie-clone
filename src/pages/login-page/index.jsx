import { Form, Input } from "antd";
import iconImg from "assets";
import { LanguageProject } from "components/header/component";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
  &.ant-select-selection__placeholder {
    color: blue;
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
  /* &.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper {
    background-color: #555353;
  }
  .ant-input {
    background-color: #555353; */
  /* } */
`;

const LoginPage = () => {
  const [t] = useTranslation();
  const onFinish = (values) => {};

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

      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 max-w-[500px] text-center leading-relaxed ">
        <p className="text-[white] text-[40px] font-bold">
          {t("Login to Your Account")}
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
          {t("Or login with email account")}
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
            >
              <StyleInput placeholder="hoangminhan13g@gmail.com" />
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
              style={{ color: "red" }}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <StyleInputPassword placeholder={t("Password")} />
            </Form.Item>

            <button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white hover:text-[#ccc] font-bold py-3 px-5 rounded-lg text-[18px] min-w-[110px] mt-4"
            >
              {t("Login")}
              {/* <FontAwesomeIcon icon={faRightToBracket} className="ml-1" /> */}
            </button>

            <div className="text-white text-[18px] mt-4">
              <span>{t("Not a member?")}</span>{" "}
              <Link to="/register">
                <span className="underline text-primary font-bold">
                  {t("Register")}
                </span>
              </Link>
            </div>
          </Form>
        </div>
      </div>

      {/* language */}
      <div className="absolute top-[2%] right-[3%]">
        <LanguageProject />
      </div>
    </div>
  );
};
export default LoginPage;

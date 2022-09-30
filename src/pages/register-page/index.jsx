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
  /* &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input {
    background-color: #555353;
  }
  .ant-input {
    background-color: #555353 !important; */
  /* } */
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

const RegisterPage = () => {
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
              name="firstName"
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
      <div className="absolute top-[2%] right-[3%]">
        <LanguageProject />
      </div>
    </div>
  );
};
export default RegisterPage;

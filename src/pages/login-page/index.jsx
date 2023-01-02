import { Form, Input, message, Spin } from "antd";
import iconImg from "assets";
import { LanguageProject } from "components/header/component";
import { UserContext } from "contexts";
import { useContext, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

import { useState } from "react";
import { useFirebaseRealTime, useNotification, useTitle } from "hooks";

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
`;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [t] = useTranslation();
  const stateContext = useContext(UserContext);
  const { currentTabGlobal, currentDataUser } = stateContext;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;
  const [dataUser, setDataUser] = currentDataUser;
  const navigate = useNavigate();
  const { handleChangeTitle } = useTitle();
  const { handleCheckUserExist } = useFirebaseRealTime();
  const { handlePopupNotification } = useNotification();

  // login with user and password
  const onFinish = async (values) => {
    setIsLoading(true);
    const { username: email, password } = values;
    const authentication = getAuth();
    try {
      const response = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      const { idToken: accessToken, refreshToken } = response._tokenResponse;
      setDataUser({ ...response.user, isManually: true });
      localStorage.setItem("accessToken", accessToken);
      setIsLoading(false);
      localStorage.setItem("refreshToken", refreshToken);
      handlePopupNotification("Login success", "success");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/wrong-password") {
        message.error(t("Please check the Password"));
      }
      if (error.code === "auth/user-not-found") {
        message.error(t("Please check the Email"));
      } else if (error.code === "auth/invalid-email") {
        message.error(t("Invalid Email"));
      }
    }
  };

  // login with facebook
  // const handleSignInWithfacebook = async () => {
  //   try {
  //     const provider = new FacebookAuthProvider();
  //     const authentication = getAuth();
  //     const res = await signInWithPopup(authentication, provider);
  //     console.log({ res });
  //     const {
  //       oauthAccessToken: accessToken,
  //       refreshToken,
  //       displayName,
  //       email,
  //     } = res._tokenResponse;
  //     handleCheckUserExist(res.user);
  //     setDataUser(res.user);
  //     const userInfo = {
  //       displayName,
  //       email,
  //     };
  //     localStorage.setItem("accessToken", accessToken);
  //     localStorage.setItem("refreshToken", refreshToken);
  //     localStorage.setItem("userInfo", JSON.stringify(userInfo));
  //     navigate("/");
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // login with google
  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const authentication = getAuth();
      const res = await signInWithPopup(authentication, provider);
      const {
        oauthAccessToken: accessToken,
        refreshToken,
        displayName,
        email,
      } = res._tokenResponse;
      // check user exist in db
      handleCheckUserExist(res.user);
      setDataUser(res.user);

      const userInfo = {
        displayName,
        email,
      };
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      handlePopupNotification("Login success", "success");

      navigate("/");
    } catch (error) {}
  };
  useEffect(() => {
    handleChangeTitle(t("Login"));
  }, []);
  return (
    <div className="h-[100vh]">
      <video
        autoPlay
        loop
        muted
        className="fixed object-cover left-0 h-full w-full inset-0 -z-10"
      >
        <source src={iconImg.trailerMovie} type="video/mp4" />
        <source src="" type="video/mp4" />
      </video>
      <div className="bg-black/40 h-[100vh]"></div>

      <div className="absolute left-0 right-0 px-3 sm:p-0 top-[50%] sm:left-[50%] sm:-translate-x-1/2 -translate-y-1/2 w-full sm:max-w-[500px] text-center leading-relaxed ">
        <p className="text-[white] text:[25px] sm:text-[30px] font-bold whitespace-normal ssm:whitespace-nowrap">
          {t("Login to Your Account")}
        </p>

        <div>
          <div className="flex justify-center gap-5 mt-3">
            <p className="w-[50px] h-[50px] bg-[#fff] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
              <img
                src={iconImg.googleImg}
                alt=""
                onClick={handleSignInWithGoogle}
              />
            </p>
            {/* <p className="w-[50px] h-[50px] bg-[#fff] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
              <img
                src={iconImg.facebookImg}
                alt=""
                onClick={handleSignInWithfacebook}
              />
            </p> */}
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
            autoComplete="off"
          >
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
                  required: true,
                  message: t("Please input your username"),
                },
                {
                  type: "email",
                  message: t("Invalid Email"),
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
                    fontSize: "16px",
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
                  message: t("Please input your password"),
                },
              ]}
            >
              <StyleInputPassword placeholder={t("Password")} />
            </Form.Item>

            <button
              disabled={isLoading ? true : false}
              type="primary"
              htmltype="submit"
              className={`bg-primarybg hover:opacity-90 text-white hover:text-[#ccc] font-bold  w-[150px] py-2 rounded-lg text-[18px] min-w-[110px] mt-4
              ${isLoading ? "cursor-not-allowed bg-[#ccc] hover:bg-[#ccc]" : ""}
              
              `}
            >
              {isLoading ? <Spin className="text-white" /> : t("Login")}
              {/* <FontAwesomeIcon icon={faRightToBracket} className="ml-1" /> */}
            </button>

            <div className="text-white text-[16px] mt-4">
              <span>{t("Not a member?")}</span>{" "}
              <Link to="/register">
                <span className="underline text-primarybg font-bold">
                  {t("Register")}
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
export default LoginPage;

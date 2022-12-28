import { UserOutlined } from "@ant-design/icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Dropdown, Menu } from "antd";
import { UserContext } from "contexts";
import { getAuth, signOut } from "firebase/auth";
import { useNotification } from "hooks";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./styles.scss";
const StyledDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    background-color: #1c1c1e;
  }
`;

export const Profile = () => {
  const navigate = useNavigate();

  const stateContext = useContext(UserContext);
  const { currentDataUser } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const [t] = useTranslation();
  const { handlePopupNotification } = useNotification();
  const location = useLocation();
  const { pathname } = location;

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              className="flex items-center gap-x-2 text-[16px]"
              onClick={() => {
                navigate("/account");
              }}
            >
              <FontAwesomeIcon
                icon={faUserTie}
                className={`${
                  pathname === "/account" ? "text-primarybg" : "text-white"
                }`}
              />
              <p
                className={`text-[18px] ${
                  pathname === "/account" ? "text-primarybg" : "text-white"
                }`}
              >
                {t("Profile")}
              </p>
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              className="flex items-center gap-x-2 text-[16px]"
              onClick={() => {
                const auth = getAuth();
                signOut(auth)
                  .then((data) => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("userInfo");
                    navigate("/");
                    handlePopupNotification("Logout success", "success");
                  })
                  .catch((error) => {});
              }}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} color="white" />
              <p className="text-[18px]">{t("Logout")}</p>
            </div>
          ),
        },
      ]}
    />
  );
  const isLogin = localStorage.getItem("accessToken") || "";
  return isLogin ? (
    <StyledDropdown
      overlay={menu}
      placement="bottomLeft"
      overlayClassName="dropdown-profile"
    >
      <Avatar
        size="large"
        src={dataUser?.photoURL}
        icon={<FontAwesomeIcon icon={faCircleUser} />}
        className="cursor-pointer"
      />
    </StyledDropdown>
  ) : (
    <Link to="/login">
      <p className="bg-primarybg rounded-3xl hover:scale-110 duration-200 flex items-center justify-center">
        <button className="text-white text-[15px] min-w-[100px] px-3">
          {t("Login")}
        </button>
      </p>
    </Link>
  );
};

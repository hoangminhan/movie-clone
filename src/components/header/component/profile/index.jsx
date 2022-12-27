import { UserOutlined } from "@ant-design/icons";
import {
  faArrowRightFromBracket,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Dropdown, Menu } from "antd";
import { UserContext } from "contexts";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
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

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div className="flex items-center gap-x-2 text-[16px]">
              <FontAwesomeIcon icon={faArrowRightFromBracket} color="white" />
              <p
                onClick={() => {
                  const auth = getAuth();
                  signOut(auth)
                    .then((data) => {
                      localStorage.removeItem("accessToken");
                      localStorage.removeItem("refreshToken");
                      localStorage.removeItem("userInfo");
                      navigate("/");
                    })
                    .catch((error) => {});
                }}
              >
                {t("Logout")}
              </p>
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div className="flex items-center gap-x-2 text-[16px]">
              <FontAwesomeIcon icon={faUserTie} color="white" />
              <p
                onClick={() => {
                  console.log("account");
                  navigate("/account");
                }}
              >
                {t("Profile")}
              </p>
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
        icon={<UserOutlined />}
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

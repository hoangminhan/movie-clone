import {
  ContainerOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, notification } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { faClock, faCompass } from "@fortawesome/free-regular-svg-icons";
import {
  faRightFromBracket,
  faRightToBracket,
  faSearch,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { UserContext } from "contexts";
import iconImg from "assets";

// styled
const StyledMenu = styled(Menu)`
  width: 100px !important;
  border-right: none;
  .ant-menu-item .ant-menu-item-icon,
  .ant-menu-submenu-title .ant-menu-item-icon,
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    font-size: 20px !important;
  }

  /* close */
`;
const StyledMenuToggle = styled(Menu)`
  border-right: none;
  .ant-menu-item:hover {
    color: #fff !important;
    background-color: #1f2737;
    cursor: pointer;
  }
  .ant-menu-item-selected {
    color: #fff;
  }

  .ant-menu-title-content {
    font-size: 18px !important;
  }
  .ant-menu-item .ant-menu-item-icon,
  .ant-menu-submenu-title .ant-menu-item-icon,
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    font-size: 20px !important;
  }
  .ant-menu-sub.ant-menu-inline {
    background-color: #1c1c1e;
  }
  &.ant-menu-light .ant-menu-submenu-title:hover {
    color: #fff;
    background-color: #1f2737;
    cursor: pointer;
  }
`;
// menu
function getItem(label, key, icon, children, title) {
  return {
    key,
    icon,
    children,
    label,
    title,
  };
}

export const Sidebar = ({ isToggle, handleToggleMenu }) => {
  // const [isLogin, setIsLogin] = useState(true);
  const isLogin = localStorage.getItem("accessToken") || "";
  const { t } = useTranslation();
  const items = [
    getItem("Home", "/", <HomeOutlined />),
    // getItem("Movie", "/movie", <DesktopOutlined />),
    getItem(t("Discovery"), "/discovery", <FontAwesomeIcon icon={faCompass} />),
    getItem(t("Search"), "/search", <FontAwesomeIcon icon={faSearch} />),
    getItem(t("Favorite"), "/favorite", <ContainerOutlined />),
    getItem(t("History"), "/history", <FontAwesomeIcon icon={faClock} />),
    getItem(t("Settings"), "/settings", <SettingOutlined />, [
      getItem(t("Profile"), "/account", <FontAwesomeIcon icon={faUserTie} />),
    ]),
    getItem(
      `${isLogin ? t("Logout") : t("Login")}`,
      `${isLogin ? "/login" : "/login"}`,
      <FontAwesomeIcon icon={isLogin ? faRightFromBracket : faRightToBracket} />
    ),
  ];
  let navigate = useNavigate();
  const location = useLocation();

  const stateContext = useContext(UserContext);
  const { currentTabGlobal } = stateContext;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;

  //  check full sidebar
  const handleChangeStatusMenu = (event) => {
    handleToggleMenu(!isToggle);
  };

  const handleChangeCurrentMenu = ({
    item,
    key,
    keyPath,
    selectedKeys,
    domEvent,
  }) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    if (
      (key === "/favorite" ||
        key === "/history" ||
        key === "/settings" ||
        key === "/account") &&
      !accessToken
    ) {
      notification.warning({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
      });
    } else {
      setTabGlobal("/");
      sessionStorage.setItem("currentTab", "/");
      navigate(key);
    }
  };

  return (
    <aside
      className={`fixed z-[2] top-0 bottom-0 left-0  bg-[#0d0c0f] duration-300 ease-in-out ${
        !isToggle ? "w-[270px]" : "w-[100px]"
      }`}
    >
      <div className="flex justify-center mt-5">
        <img
          src={iconImg.logoImg}
          className="rounded-full w-[70px] h-[70px] object-cover cursor-pointer"
          alt=""
          onClick={() => {
            setTabGlobal("/");
            sessionStorage.setItem("currentTab", "/");
            navigate("/");
          }}
        />
      </div>
      <section className="mt-[64px] text-[18px]">
        {!isToggle ? (
          <StyledMenuToggle
            defaultSelectedKeys={[location.pathname]}
            selectedKeys={[location.pathname]}
            mode="inline"
            inlineCollapsed={isToggle}
            items={items}
            onSelect={handleChangeCurrentMenu}
          />
        ) : (
          <StyledMenu
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            selectedKeys={[location.pathname]}
            inlineCollapsed={isToggle}
            items={items}
            onSelect={handleChangeCurrentMenu}
          />
        )}
      </section>
      <div className="absolute bottom-[16px] left-[50%] translate-x-[-50%] cursor-pointer">
        <div onClick={handleChangeStatusMenu}>
          {isToggle ? <RightOutlined /> : <LeftOutlined />}
        </div>
      </div>
    </aside>
  );
};

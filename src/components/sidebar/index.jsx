import {
  ContainerOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { faClock, faCompass } from "@fortawesome/free-regular-svg-icons";
import {
  faRightFromBracket,
  faRightToBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconImg from "assets";
import { UserContext } from "contexts";
import { useNotification } from "hooks";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { getAuth, signOut } from "firebase/auth";

// styled
const StyledMenu = styled(Menu)`
  width: 80px !important;
  border-right: none;
  .ant-menu-item .ant-menu-item-icon,
  .ant-menu-submenu-title .ant-menu-item-icon,
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    font-size: 20px !important;
  }

  &.ant-menu.ant-menu-inline-collapsed {
    background-color: #22354e !important;
  }
  /* &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #ccc;
  } */

  /* close */
`;
const StyledMenuToggle = styled(Menu)`
  &.ant-menu-inline {
    background-color: #22354e !important;
  }
  border-right: none;
  .ant-menu-item:hover {
    color: #fff !important;
    background-color: #394a60;
    cursor: pointer;
  }
  &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #394a60;
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
    background-color: #22354e;
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

export const Sidebar = ({
  isToggle,
  handleToggleMenu,
  isHiddenSidebar,
  setIsHiddenSidebar,
}) => {
  const accessToken = localStorage.getItem("accessToken");
  const { handlePopupNotification } = useNotification();
  const isLogin = localStorage.getItem("accessToken") || "";
  const { t } = useTranslation();
  let navigate = useNavigate();
  const location = useLocation();

  const stateContext = useContext(UserContext);
  const { currentTabGlobal } = stateContext;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;

  const items = [
    getItem(t("Home page"), "/", <HomeOutlined />),
    getItem(t("Discovery"), "/discovery", <FontAwesomeIcon icon={faCompass} />),
    getItem(t("Search"), "/search", <FontAwesomeIcon icon={faSearch} />),
    getItem(t("Favorite"), "/favorite", <ContainerOutlined />),
    getItem(t("History"), "/history", <FontAwesomeIcon icon={faClock} />),
    // getItem(t("Settings"), "/settings", <SettingOutlined />, [
    //   getItem(t("Profile"), "/account", <FontAwesomeIcon icon={faUserTie} />),
    // ]),
    getItem(
      `${isLogin ? t("Logout") : t("Login")}`,
      `${isLogin ? "/login" : "/login"}`,
      <FontAwesomeIcon icon={isLogin ? faRightFromBracket : faRightToBracket} />
    ),
  ];

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
    if (key === "/login") {
      if (Boolean(accessToken)) {
        const auth = getAuth();
        signOut(auth)
          .then((data) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userInfo");
            handlePopupNotification("Logout success", "success");
            navigate("/");
          })
          .catch((error) => {});
      } else {
        navigate(key);
      }
    } else if (
      (key === "/favorite" ||
        key === "/history" ||
        key === "/settings" ||
        key === "/account") &&
      !accessToken
    ) {
      handlePopupNotification(
        "You need to login to perform this function",
        "warning"
      );
    } else {
      setTabGlobal("/");
      sessionStorage.setItem("currentTab", "/");
      navigate(key);
    }
    setIsHiddenSidebar(true);
  };

  return (
    <>
      <div className="flex justify-center pt-5">
        <img
          src={iconImg.logoImg}
          className="rounded-full w-[50px] h-[50px] object-cover cursor-pointer mb-3 tablet:mb-0"
          alt=""
          onClick={() => {
            setTabGlobal("/");
            sessionStorage.setItem("currentTab", "/");
            navigate("/");
          }}
        />
      </div>
      <section className="hidden tablet:block mt-[64px] text-[18px]">
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
      {/* menu mobile */}
      <section
        className={`${isHiddenSidebar ? "hidden" : "block tablet:hidden"}`}
      >
        <StyledMenuToggle
          defaultSelectedKeys={[location.pathname]}
          selectedKeys={[location.pathname]}
          mode="inline"
          // inlineCollapsed={isToggle}
          items={items}
          onSelect={handleChangeCurrentMenu}
        />
      </section>
      <div className="absolute bottom-[16px] left-[50%] translate-x-[-50%] cursor-pointer hidden lg:block">
        {location.pathname.includes("/movie/") ? (
          ""
        ) : (
          <div onClick={handleChangeStatusMenu}>
            {isToggle ? <RightOutlined /> : <LeftOutlined />}
          </div>
        )}
      </div>
    </>
  );
};

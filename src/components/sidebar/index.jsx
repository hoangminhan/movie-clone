import {
  ContainerOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { faClock, faCompass } from "@fortawesome/free-regular-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const items = [
    getItem("Home", "/", <HomeOutlined />),
    // getItem("Movie", "/movie", <DesktopOutlined />),
    getItem(t("Discovery"), "/discovery", <FontAwesomeIcon icon={faCompass} />),
    getItem(t("Favorite"), "/favorite", <ContainerOutlined />),
    getItem(t("History"), "/history", <FontAwesomeIcon icon={faClock} />),
    getItem(t("Settings"), "/settings", <SettingOutlined />, [
      getItem(t("Profile"), "account", <FontAwesomeIcon icon={faUserTie} />),
    ]),
  ];
  let navigate = useNavigate();
  const location = useLocation();

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
    navigate(key);
  };

  return (
    // <Col xs={24} md={collapsed ? 2 : 3}>

    <aside
      className={`fixed top-0 bottom-0 left-0  bg-[#0d0c0f] duration-300 ease-in-out ${
        !isToggle ? "w-[270px]" : "w-[100px]"
      }`}
    >
      <section className="mt-[64px] text-[18px]">
        {!isToggle ? (
          <StyledMenuToggle
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            inlineCollapsed={isToggle}
            items={items}
            onSelect={handleChangeCurrentMenu}
          />
        ) : (
          <StyledMenu
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
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

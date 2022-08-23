import React from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "styled-components";

// styled
const StyledMenu = styled(Menu)`
  width: 100px !important;
  border-right: none;

  .ant-menu-light.ant-menu-item:hover {
    color: red;
  }
`;
const StyledMenuToggle = styled(Menu)`
  border-right: none;
  .ant-menu-item:hover {
    color: #fff !important;
    background-color: #1f2737;
  }
  .ant-menu-item-selected {
    color: #fff;
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

const items = [
  getItem("Home", "/", <HomeOutlined />),
  getItem("Discovery", "/discovery", <DesktopOutlined />),
  getItem("Favorite", "/favorite", <ContainerOutlined />),
  getItem("Playlist", "/playlist", <ContainerOutlined />),
  getItem("Settings", "/settings", <ContainerOutlined />),
];

export const Sidebar = ({ toggleMenu, handleToggleMenu }) => {
  const theme = useTheme();
  console.log("Current theme: ", theme);
  const location = useLocation();
  const handleChangeStatusMenu = (event) => {
    handleToggleMenu(!toggleMenu);
  };

  const handleChangeCurrentMenu = ({
    item,
    key,
    keyPath,
    selectedKeys,
    domEvent,
  }) => {
    console.log({ item, key, keyPath, selectedKeys, domEvent });
  };
  return (
    // <Col xs={24} md={collapsed ? 2 : 3}>

    <aside
      className={`fixed top-0 bottom-0 left-0  bg-[#11192a] ${
        !toggleMenu ? "w-[270px]" : "w-[100px]"
      }`}
    >
      <Button
        type="primary"
        onClick={handleChangeStatusMenu}
        style={{
          marginBottom: 16,
        }}
      >
        {toggleMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <section className="mt-[64px]">
        {!toggleMenu ? (
          <StyledMenuToggle
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={toggleMenu}
            items={items}
            onSelect={handleChangeCurrentMenu}
          />
        ) : (
          <StyledMenu
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={toggleMenu}
            items={items}
            onSelect={handleChangeCurrentMenu}
          />
        )}
      </section>
    </aside>
  );
};

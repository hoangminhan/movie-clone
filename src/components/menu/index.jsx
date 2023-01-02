import React, { useState } from "react";
import { Tabs } from "antd";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "contexts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    color: #ffffff80;
    font-size: 22px;
  }
  .ant-tabs-tab:hover {
    color: #fff !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff;
  }
  &.ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-bottom > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before,
  &.ant-tabs-bottom > div > .ant-tabs-nav::before {
    border-bottom-color: transparent;
  }
  &.ant-tabs > .ant-tabs-nav,
  .ant-tabs > div > .ant-tabs-nav {
    margin-bottom: 0;
  }
`;

// menu
const menus = [
  {
    title: "Movie",
    path: "/",
  },
  {
    title: "Tv Show",
    path: "/tv-show",
  },
  {
    title: "People",
    path: "/people",
  },
];

export const Menu = () => {
  const stateContext = useContext(UserContext);
  const { currentTabGlobal } = stateContext;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;
  const [currentTab, setCurrentTab] = useState(tabGlobal);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleChangeCurrentTab = (data) => {
    sessionStorage.setItem("currentTab", data);
    setCurrentTab(data);
    setTabGlobal(data);
    // dispatch(reducerLoadingChangeTab(true));

    if (data === "/") {
      navigate(`/`);
    } else if (data === "/people") {
      navigate("/people");
    } else {
      navigate("/tv-show");
    }
  };
  const [isLocation, setIsLocation] = useState();
  useEffect(() => {
    setIsLocation(pathname);
  }, [pathname]);
  return (
    <nav className="basis-1/5">
      <ul className="flex gap-x-5">
        {menus.map((menu, index) => {
          return (
            <li
              key={index}
              className={`transition-all duration-150 ease-linear cursor-pointer hover:text-primarybg text-[22px] ${
                isLocation === menu.path ? "text-primarybg" : "text-white"
              }`}
              onClick={() => {
                handleChangeCurrentTab(menu.path);
              }}
            >
              {menu.title}
            </li>
          );
        })}
      </ul>
      {/* 
      <StyledTabs
        defaultActiveKey={currentTab}
        activeKey={currentTab}
        animated
        onChange={handleChangeCurrentTab}
      >
        <TabPane key={"/"} tab={"Movie"}></TabPane>
        <TabPane key={"/tv-show"} tab={"Tv Show"}></TabPane>
        <TabPane key={"tab-people"} tab={"People"}></TabPane>
      </StyledTabs> */}
    </nav>
  );
};

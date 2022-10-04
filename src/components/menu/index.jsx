import React, { useState } from "react";
import { Tabs } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "contexts";

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    color: #989898;
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

export const Menu = () => {
  const stateContext = useContext(UserContext);
  const { currentTabGlobal } = stateContext;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;
  const [currentTab, setCurrentTab] = useState(tabGlobal || "/");
  const navigate = useNavigate();

  const handleChangeCurrentTab = (data) => {
    sessionStorage.setItem("currentTab", data);
    setCurrentTab(data);
    setTabGlobal(data);

    if (data === "/") {
      navigate(`/`);
    } else if (data === "tab-people") {
      navigate("/people");
    } else {
      navigate("/tv-show");
    }
  };
  return (
    <nav className="basis-1/5">
      <StyledTabs
        defaultActiveKey={currentTab}
        activeKey={currentTab}
        animated
        onChange={handleChangeCurrentTab}
      >
        <TabPane key={"/"} tab={"Movie"}></TabPane>
        <TabPane key={"tab-tv-show"} tab={"Tv Show"}></TabPane>
        <TabPane key={"tab-people"} tab={"People"}></TabPane>
      </StyledTabs>
    </nav>
  );
};
